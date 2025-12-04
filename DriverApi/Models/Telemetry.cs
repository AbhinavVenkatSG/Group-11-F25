namespace DriverApi.Models;

// Timestamped GPS and speed measurement for a trip.
public class Telemetry
{
    public string SampleId { get; set; } = Guid.NewGuid().ToString();
    public DateTime CurTime { get; set; }
    public decimal Latitude { get; set; }
    public decimal Longitude { get; set; }
    public decimal CalculatedSpeed { get; set; }

    public string TripId { get; set; } = string.Empty;
    public Trip? Trip { get; set; }
}
