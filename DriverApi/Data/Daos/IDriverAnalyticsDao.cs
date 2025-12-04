using DriverApi.Models;

namespace DriverApi.Data.Daos;

public interface IDriverAnalyticsDao
{
    Task<DriverAnalytics> GetAsync(string driverId);
    Task<DriverAnalytics> RecomputeAsync(string driverId);
}
