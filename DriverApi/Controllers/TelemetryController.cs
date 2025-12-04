using DriverApi.Contracts;
using DriverApi.Data.Daos;
using Microsoft.AspNetCore.Mvc;

namespace DriverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TelemetryController(ITelemetryDao telemetry, ITripDao trips, IDriverAnalyticsDao analytics) : ControllerBase
{
    [HttpPost("trip/{tripId}")]
    public async Task<IActionResult> AddSample(string tripId, [FromBody] AddTelemetrySampleRequest request)
    {
        var trip = await trips.GetByIdAsync(tripId);
        if (trip is null)
        {
            return BadRequest(new { message = "Trip does not exist." });
        }

        var sample = await telemetry.AddSampleAsync(tripId, request.CurTime, request.Latitude, request.Longitude);

        // Refresh driver analytics based on latest telemetry data.
        await analytics.RecomputeAsync(trip.DriverId);

        return Ok(new TelemetryResponse(sample.SampleId, sample.CurTime, sample.Latitude, sample.Longitude, sample.CalculatedSpeed, sample.TripId));
    }

    [HttpGet("trip/{tripId}")]
    public async Task<IActionResult> ListForTrip(string tripId)
    {
        var list = await telemetry.ListByTripAsync(tripId);
        var response = list.Select(s => new TelemetryResponse(s.SampleId, s.CurTime, s.Latitude, s.Longitude, s.CalculatedSpeed, s.TripId));
        return Ok(response);
    }
}
