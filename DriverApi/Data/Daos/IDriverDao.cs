using DriverApi.Models;

namespace DriverApi.Data.Daos;

public interface IDriverDao
{
    Task<Driver?> GetByIdAsync(string driverId);
    Task<Driver?> GetByEmailAsync(string email);
    Task<Driver> CreateAsync(string name, string emailAddress, string password);
    Task<bool> DeleteAsync(string driverId);
    Task<Driver?> UpdateAsync(string driverId, string? name, string? emailAddress, string? password);
}
