using DriverApi.Data.Daos;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data.Repositories;

public class TelemetryDao(DriverDbContext db) : ITelemetryDao
{
    public async Task<Telemetry> AddSampleAsync(string tripId, DateTime? curTime, decimal latitude, decimal longitude)
    {
        var now = curTime ?? DateTime.UtcNow;
        var last = await db.TelemetrySamples
            .Where(t => t.TripId == tripId)
            .OrderByDescending(t => t.CurTime)
            .FirstOrDefaultAsync();

        // Default speed to zero; only compute if we have a valid previous sample and positive time delta.
        var speed = 0m;
        if (last is not null)
        {
            var hours = (now - last.CurTime).TotalHours;
            if (hours > 0)
            {
                var distanceKm = HaversineKm((double)last.Latitude, (double)last.Longitude, (double)latitude, (double)longitude);
                speed = Math.Round((decimal)(distanceKm / hours), 1);
            }
        }

        var sample = new Telemetry
        {
            TripId = tripId,
            CurTime = now,
            Latitude = latitude,
            Longitude = longitude,
            CalculatedSpeed = speed
        };

        db.TelemetrySamples.Add(sample);
        await db.SaveChangesAsync();
        return sample;
    }

    public Task<Telemetry?> GetLatestAsync(string tripId) =>
        db.TelemetrySamples
            .Where(t => t.TripId == tripId)
            .OrderByDescending(t => t.CurTime)
            .FirstOrDefaultAsync();

    public async Task<IReadOnlyList<Telemetry>> ListByTripAsync(string tripId)
    {
        var samples = await db.TelemetrySamples
            .Where(t => t.TripId == tripId)
            .OrderBy(t => t.CurTime)
            .ToListAsync();
        return samples;
    }

    public async Task<decimal> ComputeAverageSpeedAsync(string tripId)
    {
        var speeds = await db.TelemetrySamples
            .Where(t => t.TripId == tripId)
            .Select(t => t.CalculatedSpeed)
            .ToListAsync();

        if (speeds.Count == 0)
        {
            return 0;
        }

        return Math.Round(speeds.Average(), 1);
    }

    private static double HaversineKm(double lat1, double lon1, double lat2, double lon2)
    {
        const double EarthRadiusKm = 6371;

        double Deg2Rad(double deg) => deg * (Math.PI / 180.0);

        var dLat = Deg2Rad(lat2 - lat1);
        var dLon = Deg2Rad(lon2 - lon1);

        var a = Math.Pow(Math.Sin(dLat / 2), 2) +
                Math.Cos(Deg2Rad(lat1)) * Math.Cos(Deg2Rad(lat2)) *
                Math.Pow(Math.Sin(dLon / 2), 2);

        var c = 2 * Math.Atan2(Math.Sqrt(a), Math.Sqrt(1 - a));
        return EarthRadiusKm * c;
    }
}
