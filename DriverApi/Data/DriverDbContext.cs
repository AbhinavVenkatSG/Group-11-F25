using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data;

// Entity Framework context: keeps the tables (DbSets) that the API works with.
public class DriverDbContext(DbContextOptions<DriverDbContext> options) : DbContext(options)
{
    // Represents rows in the Drivers table as Driver objects.
    public DbSet<Driver> Drivers => Set<Driver>();
    public DbSet<Vehicle> Vehicles => Set<Vehicle>();
    public DbSet<Trip> Trips => Set<Trip>();
    public DbSet<Telemetry> TelemetrySamples => Set<Telemetry>();
    public DbSet<DriverAnalytics> DriverAnalytics => Set<DriverAnalytics>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Describe how the Driver model maps to the database.
        var driver = modelBuilder.Entity<Driver>();

        driver.HasKey(d => d.DriverId);
        driver.Property(d => d.DriverId).IsRequired().ValueGeneratedNever();
        driver.Property(d => d.Name).IsRequired();
        driver.Property(d => d.EmailAddress).IsRequired();
        driver.Property(d => d.Password).IsRequired();
        driver.HasIndex(d => d.EmailAddress).IsUnique();

        driver.HasMany(d => d.Vehicles)
            .WithOne(v => v.Driver)
            .HasForeignKey(v => v.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        driver.HasMany(d => d.Trips)
            .WithOne(t => t.Driver)
            .HasForeignKey(t => t.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        driver.HasOne(d => d.Analytics)
            .WithOne(a => a.Driver)
            .HasForeignKey<DriverAnalytics>(a => a.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        var vehicle = modelBuilder.Entity<Vehicle>();

        vehicle.HasKey(v => v.VehicleId);
        vehicle.Property(v => v.VehicleId).IsRequired().ValueGeneratedNever();
        vehicle.Property(v => v.PlateNumber).IsRequired();
        vehicle.Property(v => v.CarName).IsRequired();
        vehicle.Property(v => v.DriverId).IsRequired();

        vehicle.HasOne(v => v.Driver)
            .WithMany(d => d.Vehicles)
            .HasForeignKey(v => v.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        vehicle.HasMany(v => v.Trips)
            .WithOne(t => t.Vehicle)
            .HasForeignKey(t => t.VehicleId)
            .OnDelete(DeleteBehavior.Cascade);

        var trip = modelBuilder.Entity<Trip>();

        trip.HasKey(t => t.TripId);
        trip.Property(t => t.TripId).IsRequired().ValueGeneratedNever();
        trip.Property(t => t.StartTime).IsRequired();
        trip.Property(t => t.EndTime).IsRequired();
        trip.Property(t => t.DriverId).IsRequired();
        trip.Property(t => t.VehicleId).IsRequired();

        trip.HasOne(t => t.Driver)
            .WithMany(d => d.Trips)
            .HasForeignKey(t => t.DriverId)
            .OnDelete(DeleteBehavior.Cascade);

        trip.HasOne(t => t.Vehicle)
            .WithMany(v => v.Trips)
            .HasForeignKey(t => t.VehicleId)
            .OnDelete(DeleteBehavior.Cascade);

        trip.HasMany(t => t.TelemetrySamples)
            .WithOne(s => s.Trip)
            .HasForeignKey(s => s.TripId)
            .OnDelete(DeleteBehavior.Cascade);

        var telemetry = modelBuilder.Entity<Telemetry>();

        telemetry.HasKey(s => s.SampleId);
        telemetry.Property(s => s.SampleId).IsRequired().ValueGeneratedNever();
        telemetry.Property(s => s.CurTime).IsRequired();
        telemetry.Property(s => s.Latitude).HasPrecision(9, 6);
        telemetry.Property(s => s.Longitude).HasPrecision(9, 6);
        telemetry.Property(s => s.CalculatedSpeed).HasPrecision(4, 1);
        telemetry.Property(s => s.TripId).IsRequired();

        telemetry.HasOne(s => s.Trip)
            .WithMany(t => t.TelemetrySamples)
            .HasForeignKey(s => s.TripId)
            .OnDelete(DeleteBehavior.Cascade);

        var analytics = modelBuilder.Entity<DriverAnalytics>();

        analytics.HasKey(a => a.DriverId);
        analytics.Property(a => a.DriverId).IsRequired().ValueGeneratedNever();
        analytics.Property(a => a.DriverScore).IsRequired();
        analytics.Property(a => a.AvgTripSpeed).HasPrecision(4, 1);
    }
}
