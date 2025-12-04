using DriverApi.Data.Daos;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data.Repositories;

public class VehicleDao(DriverDbContext db) : IVehicleDao
{
    public async Task<Vehicle> CreateAsync(string driverId, string plateNumber, string carName)
    {
        var vehicle = new Vehicle
        {
            DriverId = driverId,
            PlateNumber = plateNumber.Trim(),
            CarName = carName.Trim()
        };

        db.Vehicles.Add(vehicle);
        await db.SaveChangesAsync();
        return vehicle;
    }

    public async Task<bool> DeleteAsync(string vehicleId)
    {
        var vehicle = await db.Vehicles.FirstOrDefaultAsync(v => v.VehicleId == vehicleId);
        if (vehicle is null)
        {
            return false;
        }

        db.Vehicles.Remove(vehicle);
        await db.SaveChangesAsync();
        return true;
    }

    public async Task<IReadOnlyList<Vehicle>> ListByDriverAsync(string driverId)
    {
        var vehicles = await db.Vehicles
            .Where(v => v.DriverId == driverId)
            .ToListAsync();
        return vehicles;
    }

    public Task<Vehicle?> GetByIdAsync(string vehicleId) =>
        db.Vehicles.FirstOrDefaultAsync(v => v.VehicleId == vehicleId);
}
