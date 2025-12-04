using DriverApi.Data.Daos;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data.Repositories;

public class DriverDao(DriverDbContext db) : IDriverDao
{
    public Task<Driver?> GetByIdAsync(string driverId) =>
        db.Drivers.Include(d => d.Analytics).FirstOrDefaultAsync(d => d.DriverId == driverId);

    public Task<Driver?> GetByEmailAsync(string email) =>
        db.Drivers.Include(d => d.Analytics).FirstOrDefaultAsync(d => d.EmailAddress == email);

    public async Task<Driver> CreateAsync(string name, string emailAddress, string password)
    {
        var driver = new Driver
        {
            Name = name,
            EmailAddress = emailAddress,
            Password = password,
            Analytics = new DriverAnalytics
            {
                DriverScore = 0,
                AvgTripSpeed = 0
            }
        };

        db.Drivers.Add(driver);
        await db.SaveChangesAsync();
        return driver;
    }

    public async Task<bool> DeleteAsync(string driverId)
    {
        var driver = await db.Drivers.FirstOrDefaultAsync(d => d.DriverId == driverId);
        if (driver is null)
        {
            return false;
        }

        db.Drivers.Remove(driver);
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<Driver?> UpdateAsync(string driverId, string? name, string? emailAddress, string? password)
    {
        var driver = await db.Drivers.FirstOrDefaultAsync(d => d.DriverId == driverId);
        if (driver is null)
        {
            return null;
        }

        if (!string.IsNullOrWhiteSpace(name))
        {
            driver.Name = name.Trim();
        }

        if (!string.IsNullOrWhiteSpace(emailAddress))
        {
            driver.EmailAddress = emailAddress.Trim();
        }

        if (!string.IsNullOrWhiteSpace(password))
        {
            driver.Password = password;
        }

        await db.SaveChangesAsync();
        return driver;
    }
}
