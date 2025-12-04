namespace DriverApi.Contracts;

public record StartTripRequest(string DriverId, string VehicleId, DateTime? StartTime);
public record EndTripRequest(DateTime? EndTime);
public record TripResponse(string TripId, DateTime StartTime, DateTime EndTime, string DriverId, string VehicleId);

public record TripSummaryResponse(
    string TripId,
    DateTime StartTime,
    DateTime EndTime,
    string DriverId,
    string VehicleId,
    decimal AvgSpeed,
    double DurationSeconds,
    IEnumerable<TelemetryResponse> Samples);
