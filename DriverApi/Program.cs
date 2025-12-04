using DriverApi.Data;
using DriverApi.Data.Daos;
using DriverApi.Data.Repositories;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;

// Program.cs wires everything together: services first, then the HTTP pipeline.
var builder = WebApplication.CreateBuilder(args);

// Pull the database connection string from appsettings.json.
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

var serverVersion = new MySqlServerVersion(new Version(8, 0, 0));

// Register our DbContext so we can talk to the database through EF Core.
builder.Services.AddDbContext<DriverDbContext>(options =>
    options.UseMySql(connectionString, serverVersion, mySqlOptions =>
        mySqlOptions.EnableRetryOnFailure()));

// Register data access objects to decouple controllers from EF.
builder.Services.AddScoped<IDriverDao, DriverDao>();
builder.Services.AddScoped<IVehicleDao, VehicleDao>();
builder.Services.AddScoped<ITripDao, TripDao>();
builder.Services.AddScoped<ITelemetryDao, TelemetryDao>();
builder.Services.AddScoped<IDriverAnalyticsDao, DriverAnalyticsDao>();

builder.Services.AddControllers();

// Allow any origin during development so the Expo app can call the API.
builder.Services.AddCors(options =>
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

// Enable CORS before mapping routes.
app.UseCors();

app.MapControllers();

app.Run();
