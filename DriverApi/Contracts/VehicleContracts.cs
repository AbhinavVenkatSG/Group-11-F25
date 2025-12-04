namespace DriverApi.Contracts;

public record PairVehicleRequest(string DriverId, string PlateNumber, string CarName);
public record VehicleResponse(string VehicleId, string DriverId, string PlateNumber, string CarName);
