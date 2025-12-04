namespace DriverApi.Models;

// Aggregated stats calculated per driver.
public class DriverAnalytics
{
    public string DriverId { get; set; } = string.Empty;
    public int DriverScore { get; set; }
    public decimal AvgTripSpeed { get; set; }

    public Driver? Driver { get; set; }
}
