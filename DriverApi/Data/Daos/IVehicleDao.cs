using DriverApi.Models;

namespace DriverApi.Data.Daos;

public interface IVehicleDao
{
    Task<Vehicle> CreateAsync(string driverId, string plateNumber, string carName);
    Task<bool> DeleteAsync(string vehicleId);
    Task<IReadOnlyList<Vehicle>> ListByDriverAsync(string driverId);
    Task<Vehicle?> GetByIdAsync(string vehicleId);
}
