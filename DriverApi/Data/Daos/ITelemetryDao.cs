using DriverApi.Models;

namespace DriverApi.Data.Daos;

public interface ITelemetryDao
{
    Task<Telemetry> AddSampleAsync(string tripId, DateTime? curTime, decimal latitude, decimal longitude);
    Task<Telemetry?> GetLatestAsync(string tripId);
    Task<IReadOnlyList<Telemetry>> ListByTripAsync(string tripId);
    Task<decimal> ComputeAverageSpeedAsync(string tripId);
}
