using DriverApi.Models;

namespace DriverApi.Data.Daos;

public interface ITripDao
{
    Task<Trip> StartTripAsync(string driverId, string vehicleId, DateTime? startTime = null);
    Task<Trip?> EndTripAsync(string tripId, DateTime? endTime = null);
    Task<IReadOnlyList<Trip>> ListByDriverAsync(string driverId);
    Task<Trip?> GetByIdAsync(string tripId);
}
