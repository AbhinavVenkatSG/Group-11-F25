using DriverApi.Data.Daos;
using DriverApi.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace DriverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TripsController(ITripDao trips, IDriverDao drivers, IVehicleDao vehicles, ITelemetryDao telemetry, IDriverAnalyticsDao analyticsDao) : ControllerBase
{
    [HttpPost("start")]
    public async Task<IActionResult> Start([FromBody] StartTripRequest request)
    {
        var driver = await drivers.GetByIdAsync(request.DriverId);
        if (driver is null)
        {
            return BadRequest(new { message = "Driver does not exist." });
        }

        var vehicle = await vehicles.GetByIdAsync(request.VehicleId);
        if (vehicle is null || vehicle.DriverId != request.DriverId)
        {
            return BadRequest(new { message = "Vehicle does not belong to driver." });
        }

        var trip = await trips.StartTripAsync(request.DriverId, request.VehicleId, request.StartTime);
        return CreatedAtAction(nameof(GetById), new { tripId = trip.TripId },
            new TripResponse(trip.TripId, trip.StartTime, trip.EndTime, trip.DriverId, trip.VehicleId));
    }

    [HttpPost("{tripId}/end")]
    public async Task<IActionResult> End(string tripId, [FromBody] EndTripRequest request)
    {
        var trip = await trips.EndTripAsync(tripId, request.EndTime);
        if (trip is null)
        {
            return NotFound();
        }

        var samples = await telemetry.ListByTripAsync(tripId);
        var avgSpeed = await telemetry.ComputeAverageSpeedAsync(tripId);
        var durationSeconds = (trip.EndTime - trip.StartTime).TotalSeconds;

        // Recompute analytics (driver score) based on all trips.
        var analytics = await analyticsDao.RecomputeAsync(trip.DriverId);

        var response = new TripSummaryResponse(
            trip.TripId,
            trip.StartTime,
            trip.EndTime,
            trip.DriverId,
            trip.VehicleId,
            avgSpeed,
            durationSeconds,
            samples.Select(s => new TelemetryResponse(s.SampleId, s.CurTime, s.Latitude, s.Longitude, s.CalculatedSpeed, s.TripId))
        );

        return Ok(new { trip = response, driverScore = analytics.DriverScore });
    }

    [HttpGet("by-driver/{driverId}")]
    public async Task<IActionResult> ListForDriver(string driverId)
    {
        var list = await trips.ListByDriverAsync(driverId);
        var response = list.Select(t => new TripResponse(t.TripId, t.StartTime, t.EndTime, t.DriverId, t.VehicleId));
        return Ok(response);
    }

    [HttpGet("{tripId}")]
    public async Task<IActionResult> GetById(string tripId)
    {
        var trip = await trips.GetByIdAsync(tripId);
        if (trip is null)
        {
            return NotFound();
        }

        return Ok(new TripResponse(trip.TripId, trip.StartTime, trip.EndTime, trip.DriverId, trip.VehicleId));
    }
}
