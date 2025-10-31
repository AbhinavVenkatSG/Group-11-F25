namespace DriverApi.Models;

public class Driver
{
    public int DriverId { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}
