using DriverApi.Data.Daos;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data.Repositories;

public class DriverAnalyticsDao(DriverDbContext db) : IDriverAnalyticsDao
{
    public async Task<DriverAnalytics> GetAsync(string driverId)
    {
        var analytics = await db.DriverAnalytics.FirstOrDefaultAsync(a => a.DriverId == driverId);
        if (analytics is not null)
        {
            return analytics;
        }

        var created = new DriverAnalytics
        {
            DriverId = driverId,
            DriverScore = 0,
            AvgTripSpeed = 0
        };

        db.DriverAnalytics.Add(created);
        await db.SaveChangesAsync();
        return created;
    }

    public async Task<DriverAnalytics> RecomputeAsync(string driverId)
    {
        var tripAverages = await (from trip in db.Trips
                                  where trip.DriverId == driverId
                                  join telemetry in db.TelemetrySamples on trip.TripId equals telemetry.TripId into samples
                                  select samples.Average(t => (decimal?)t.CalculatedSpeed) ?? 0m).ToListAsync();

        var avgAcrossTrips = tripAverages.Count > 0 ? Math.Round(tripAverages.Average(), 1) : 0m;

        var analytics = await db.DriverAnalytics.FirstOrDefaultAsync(a => a.DriverId == driverId);

        if (analytics is null)
        {
            analytics = new DriverAnalytics { DriverId = driverId };
            db.DriverAnalytics.Add(analytics);
        }

        analytics.AvgTripSpeed = avgAcrossTrips;
        analytics.DriverScore = (int)Math.Round(avgAcrossTrips);

        await db.SaveChangesAsync();
        return analytics;
    }
}
