using DriverApi.Contracts;
using DriverApi.Data.Daos;
using Microsoft.AspNetCore.Mvc;

namespace DriverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class VehiclesController(IVehicleDao vehicles, IDriverDao drivers) : ControllerBase
{
    [HttpPost]
    public async Task<IActionResult> PairVehicle([FromBody] PairVehicleRequest request)
    {
        var driver = await drivers.GetByIdAsync(request.DriverId);
        if (driver is null)
        {
            return BadRequest(new { message = "Driver does not exist." });
        }

        if (string.IsNullOrWhiteSpace(request.PlateNumber) || string.IsNullOrWhiteSpace(request.CarName))
        {
            return BadRequest(new { message = "Plate number and car name are required." });
        }

        var vehicle = await vehicles.CreateAsync(request.DriverId, request.PlateNumber, request.CarName);
        return CreatedAtAction(nameof(GetById), new { vehicleId = vehicle.VehicleId },
            new VehicleResponse(vehicle.VehicleId, vehicle.DriverId, vehicle.PlateNumber, vehicle.CarName));
    }

    [HttpGet("{vehicleId}")]
    public async Task<IActionResult> GetById(string vehicleId)
    {
        var vehicle = await vehicles.GetByIdAsync(vehicleId);
        if (vehicle is null)
        {
            return NotFound();
        }

        return Ok(new VehicleResponse(vehicle.VehicleId, vehicle.DriverId, vehicle.PlateNumber, vehicle.CarName));
    }

    [HttpGet("by-driver/{driverId}")]
    public async Task<IActionResult> ListForDriver(string driverId)
    {
        var list = await vehicles.ListByDriverAsync(driverId);
        var response = list.Select(v => new VehicleResponse(v.VehicleId, v.DriverId, v.PlateNumber, v.CarName));
        return Ok(response);
    }

    [HttpDelete("{vehicleId}")]
    public async Task<IActionResult> Remove(string vehicleId)
    {
        var removed = await vehicles.DeleteAsync(vehicleId);
        if (!removed)
        {
            return NotFound();
        }

        return NoContent();
    }
}
