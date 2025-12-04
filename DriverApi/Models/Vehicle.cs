namespace DriverApi.Models;

// Vehicle owned by a driver and used on trips.
public class Vehicle
{
    public string VehicleId { get; set; } = Guid.NewGuid().ToString();
    public string PlateNumber { get; set; } = string.Empty;
    public string CarName { get; set; } = string.Empty;

    public string DriverId { get; set; } = string.Empty;
    public Driver? Driver { get; set; }

    public ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
