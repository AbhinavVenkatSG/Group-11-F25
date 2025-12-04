namespace DriverApi.Contracts;

public record AddTelemetrySampleRequest(decimal Latitude, decimal Longitude, DateTime? CurTime);
public record TelemetryResponse(string SampleId, DateTime CurTime, decimal Latitude, decimal Longitude, decimal CalculatedSpeed, string TripId);
