using DriverApi.Contracts;
using DriverApi.Data;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var serverVersion = new MySqlServerVersion(new Version(8, 0, 0));

builder.Services.AddDbContext<DriverDbContext>(options =>
    options.UseMySql(connectionString, serverVersion));

var app = builder.Build();

app.MapPost("/api/drivers", async (DriverRegistrationRequest request, DriverDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
        return Results.BadRequest("Email and password are required.");
    }

    var normalizedEmail = request.Email.Trim();

    var existingDriver = await db.Drivers
        .AsNoTracking()
        .FirstOrDefaultAsync(d => d.Email == normalizedEmail);

    if (existingDriver is not null)
    {
        return Results.Conflict("An account already exists for this email.");
    }

    var driver = new Driver
    {
        Email = normalizedEmail,
        Password = request.Password
    };

    db.Drivers.Add(driver);
    await db.SaveChangesAsync();

    return Results.Created($"/api/drivers/{driver.DriverId}", new DriverResponse(driver.DriverId, driver.Email));
});

app.MapPost("/api/drivers/login", async (DriverLoginRequest request, DriverDbContext db) =>
{
    if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
        return Results.BadRequest("Email and password are required.");
    }

    var normalizedEmail = request.Email.Trim();

    var driver = await db.Drivers
        .AsNoTracking()
        .FirstOrDefaultAsync(d => d.Email == normalizedEmail);

    if (driver is null || driver.Password != request.Password)
    {
        return Results.Unauthorized();
    }

    return Results.Ok(new DriverResponse(driver.DriverId, driver.Email));
});

app.Run();
