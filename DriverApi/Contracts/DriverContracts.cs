namespace DriverApi.Contracts;

public record DriverRegistrationRequest(string Email, string Password);

public record DriverLoginRequest(string Email, string Password);

public record DriverResponse(int DriverId, string Email);
