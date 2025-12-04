# Driver Tracker Learning Project

This repository holds two small apps that work together while you learn the basics of full-stack development:

- `DriverApi` - an ASP.NET Core Web API that stores driver records in MySQL.
- `DriverTracker` - an Expo / React Native client that lets users create an account and log in.

Everything is intentionally lightweight and heavily commented so you can focus on how the pieces connect.

## Getting Started

1. **Run the API**
   - Update your MySQL connection string in `DriverApi/appsettings.json` if needed.
   - From the repository root run `dotnet run --project DriverApi`.
   - The API listens on `http://localhost:5086` by default.

2. **Run the Expo app**
   - Install dependencies once with `npm install` inside `DriverTracker`.
   - Start the dev server with `npm run start`.
   - Make sure `DriverTracker/config/api.js` points to the same base URL as the API (`http://localhost:5086` by default).

## Project Layout

```
DriverApi/          - ASP.NET Core API (EF Core + MySQL)
  Contracts/        - Request/response record types
  Data/             - DbContext configuration
  Endpoints/        - Minimal API endpoint definitions
  Models/           - Database entity classes

DriverTracker/      - Expo Router React Native app
  app/              - Route files (Login + CreateAccount screens)
  assets/           - Images used by the app
  config/           - API client helpers
  utils/            - Shared validation helpers
```

## API Routes

- `POST /api/drivers/register` — create a new driver account (email + password).
- `POST /api/drivers/login` — sign into an existing account.

Both routes return a JSON object with `driverId` and `email` when they succeed. Error responses include a simple `message` field that the app can display.

## Frontend Notes

- The login and registration screens live in `DriverTracker/app/index.jsx` and `DriverTracker/app/CreateAccount.jsx`.
- Shared code (API client + validation helpers) lives outside of the `app` folder so Expo Router treats it as normal modules instead of routes.
- Update `API_BASE_URL` in `DriverTracker/config/api.js` when your backend host or port changes.

Feel free to extend each project once you are comfortable with the basics - add new fields, screens, or API routes. The current structure should give you a clear starting point for experimenting.
