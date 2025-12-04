using DriverApi.Contracts;
using DriverApi.Data;
using DriverApi.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Endpoints;

// Extension methods that add the driver-related routes to the application.
public static class DriverEndpoints
{
    public static void MapDriverEndpoints(this IEndpointRouteBuilder app)
    {
        // Group all driver endpoints under a common /api/drivers path.
        var group = app.MapGroup("/api/drivers");

        group.MapPost("/register", async (DriverRegistrationRequest request, DriverDbContext db) =>
        {
            // Basic input checks so the database only sees valid data.
            var name = request.Name?.Trim();
            var email = request.EmailAddress?.Trim();
            if (string.IsNullOrWhiteSpace(name) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest(new { message = "Name, email, and password are required." });
            }

            // Avoid creating duplicate accounts.
            var emailAlreadyUsed = await db.Drivers.AnyAsync(d => d.EmailAddress == email);
            if (emailAlreadyUsed)
            {
                return Results.Conflict(new { message = "An account already exists for this email." });
            }

            // Save the driver exactly as it was submitted.
            var driver = new Driver
            {
                Name = name,
                EmailAddress = email,
                Password = request.Password
            };

            db.Drivers.Add(driver);
            db.DriverAnalytics.Add(new DriverAnalytics
            {
                DriverId = driver.DriverId,
                DriverScore = 0,
                AvgTripSpeed = 0
            });
            await db.SaveChangesAsync();

            return Results.Created($"/api/drivers/{driver.DriverId}", new DriverResponse(driver.DriverId, driver.Name, driver.EmailAddress));
        });

        group.MapPost("/login", async (DriverLoginRequest request, DriverDbContext db) =>
        {
            var email = request.EmailAddress?.Trim();
            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return Results.BadRequest(new { message = "Email and password are required." });
            }

            // Look up the existing account.
            var driver = await db.Drivers.FirstOrDefaultAsync(d => d.EmailAddress == email);
            if (driver is null || driver.Password != request.Password)
            {
                return Results.Json(new { message = "Invalid email or password." }, statusCode: StatusCodes.Status401Unauthorized);
            }

            return Results.Ok(new DriverResponse(driver.DriverId, driver.Name, driver.EmailAddress));
        });
    }
}
