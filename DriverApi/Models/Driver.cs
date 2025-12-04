namespace DriverApi.Models;

// Plain representation of the data we store for each driver in the database.
public class Driver
{
    public string DriverId { get; set; } = Guid.NewGuid().ToString();
    public string Name { get; set; } = string.Empty;
    public string EmailAddress { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;

    public DriverAnalytics? Analytics { get; set; }
    public ICollection<Vehicle> Vehicles { get; set; } = new List<Vehicle>();
    public ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
