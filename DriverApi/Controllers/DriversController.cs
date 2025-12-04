using DriverApi.Contracts;
using DriverApi.Data.Daos;
using Microsoft.AspNetCore.Mvc;

namespace DriverApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DriversController(IDriverDao drivers) : ControllerBase
{
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] DriverRegistrationRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name) ||
            string.IsNullOrWhiteSpace(request.EmailAddress) ||
            string.IsNullOrWhiteSpace(request.Password))
        {
            return BadRequest(new { message = "Name, email, and password are required." });
        }

        var existing = await drivers.GetByEmailAsync(request.EmailAddress.Trim());
        if (existing is not null)
        {
            return Conflict(new { message = "Email is already registered." });
        }

        var driver = await drivers.CreateAsync(request.Name.Trim(), request.EmailAddress.Trim(), request.Password);
        return CreatedAtAction(nameof(GetById), new { driverId = driver.DriverId },
            new DriverResponse(driver.DriverId, driver.Name, driver.EmailAddress));
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] DriverLoginRequest request)
    {
        var driver = await drivers.GetByEmailAsync(request.EmailAddress.Trim());
        if (driver is null || driver.Password != request.Password)
        {
            return Unauthorized(new { message = "Invalid email or password." });
        }

        return Ok(new DriverResponse(driver.DriverId, driver.Name, driver.EmailAddress));
    }

    [HttpPost("logout")]
    public IActionResult Logout([FromBody] DriverLogoutRequest request)
    {
        // No server-side session to clear; acknowledge the request.
        return Ok(new { message = "Logged out." });
    }

    [HttpGet("{driverId}")]
    public async Task<IActionResult> GetById(string driverId)
    {
        var driver = await drivers.GetByIdAsync(driverId);
        if (driver is null)
        {
            return NotFound();
        }

        return Ok(new DriverResponse(driver.DriverId, driver.Name, driver.EmailAddress));
    }

    [HttpPut("{driverId}")]
    public async Task<IActionResult> Update(string driverId, [FromBody] DriverUpdateRequest request)
    {
        if (!string.IsNullOrWhiteSpace(request.EmailAddress))
        {
            var other = await drivers.GetByEmailAsync(request.EmailAddress.Trim());
            if (other is not null && other.DriverId != driverId)
            {
                return Conflict(new { message = "Email is already registered to another driver." });
            }
        }

        var updated = await drivers.UpdateAsync(driverId, request.Name, request.EmailAddress, request.Password);
        if (updated is null)
        {
            return NotFound();
        }

        return Ok(new DriverResponse(updated.DriverId, updated.Name, updated.EmailAddress));
    }

    [HttpDelete("{driverId}")]
    public async Task<IActionResult> Delete(string driverId)
    {
        var deleted = await drivers.DeleteAsync(driverId);
        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}
