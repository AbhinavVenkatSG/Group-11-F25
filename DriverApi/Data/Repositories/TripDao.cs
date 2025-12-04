using DriverApi.Data.Daos;
using DriverApi.Models;
using Microsoft.EntityFrameworkCore;

namespace DriverApi.Data.Repositories;

public class TripDao(DriverDbContext db) : ITripDao
{
    public async Task<Trip> StartTripAsync(string driverId, string vehicleId, DateTime? startTime = null)
    {
        var start = startTime ?? DateTime.UtcNow;

        var trip = new Trip
        {
            DriverId = driverId,
            VehicleId = vehicleId,
            StartTime = start,
            EndTime = start
        };

        db.Trips.Add(trip);
        await db.SaveChangesAsync();
        return trip;
    }

    public async Task<Trip?> EndTripAsync(string tripId, DateTime? endTime = null)
    {
        var trip = await db.Trips.FirstOrDefaultAsync(t => t.TripId == tripId);
        if (trip is null)
        {
            return null;
        }

        trip.EndTime = endTime ?? DateTime.UtcNow;
        await db.SaveChangesAsync();
        return trip;
    }

    public async Task<IReadOnlyList<Trip>> ListByDriverAsync(string driverId)
    {
        var trips = await db.Trips
            .Where(t => t.DriverId == driverId)
            .OrderByDescending(t => t.StartTime)
            .ToListAsync();
        return trips;
    }

    public Task<Trip?> GetByIdAsync(string tripId) =>
        db.Trips.Include(t => t.TelemetrySamples).FirstOrDefaultAsync(t => t.TripId == tripId);
}
