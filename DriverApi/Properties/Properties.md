# Properties Folder Guide

This folder is where Visual Studio/`dotnet run` stash project-specific settings. `launchSettings.json` tells the tooling which URL to use, whether to launch a browser, and what environment variables to set while debugging.

You’ll touch this if you need to change the dev port, add a new launch profile, or set local environment variables for the API. For production or deployment settings you would use other tooling, but for day-to-day “F5” runs, this file is the place.

To tweak dev behavior:
1. Open `launchSettings.json`.
2. Update the profile you use (e.g., change the `applicationUrl`).
3. Save and restart `dotnet run`—the new settings apply automatically.
