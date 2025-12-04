namespace DriverApi.Contracts;

// Request body sent when someone signs up for a driver account.
public record DriverRegistrationRequest(string Name, string EmailAddress, string Password);

// Request body sent when someone logs into an existing driver account.
public record DriverLoginRequest(string EmailAddress, string Password);

// Request to update driver information.
public record DriverUpdateRequest(string? Name, string? EmailAddress, string? Password);

// Simple logout request (kept for symmetry even though no server state is stored).
public record DriverLogoutRequest(string DriverId);

// Standard response body returned after successful account actions.
public record DriverResponse(string DriverId, string Name, string EmailAddress);
