using DriverApi.Contracts;
using DriverApi.Data.Daos;
using Microsoft.AspNetCore.Mvc;

namespace DriverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AnalyticsController(IDriverAnalyticsDao analytics, IDriverDao drivers) : ControllerBase
{
    [HttpGet("{driverId}")]
    public async Task<IActionResult> GetForDriver(string driverId)
    {
        var driver = await drivers.GetByIdAsync(driverId);
        if (driver is null)
        {
            return NotFound();
        }

        var data = await analytics.RecomputeAsync(driverId);
        return Ok(new DriverAnalyticsResponse(data.DriverId, data.DriverScore, data.AvgTripSpeed));
    }
}
