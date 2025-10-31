using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data;

public class DriverDbContext(DbContextOptions<DriverDbContext> options) : DbContext(options)
{
    public DbSet<Driver> Drivers => Set<Driver>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        var driver = modelBuilder.Entity<Driver>();

        driver.HasKey(d => d.DriverId);
        driver.Property(d => d.Email).IsRequired();
        driver.Property(d => d.Password).IsRequired();
        driver.HasIndex(d => d.Email).IsUnique();
    }
}
