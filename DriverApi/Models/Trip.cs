namespace DriverApi.Models;

// A single journey tying together a driver, vehicle, and telemetry samples.
public class Trip
{
    public string TripId { get; set; } = Guid.NewGuid().ToString();
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }

    public string DriverId { get; set; } = string.Empty;
    public Driver? Driver { get; set; }

    public string VehicleId { get; set; } = string.Empty;
    public Vehicle? Vehicle { get; set; }

    public ICollection<Telemetry> TelemetrySamples { get; set; } = new List<Telemetry>();
}
