namespace DriverApi.Contracts;

public record DriverAnalyticsResponse(string DriverId, int DriverScore, decimal AvgTripSpeed);
