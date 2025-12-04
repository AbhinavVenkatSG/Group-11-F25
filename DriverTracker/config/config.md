# config Folder Guide

This folder collects small modules that configure how the app talks to the outside world. Right now `api.js` stores the backend base URL and a helper for making JSON requests.

Whenever you need a global setting—API endpoints, feature flags, environment switches—add a file here so every screen can share it.

Example workflow:
1. Update `api.js` when the backend URL changes (or read from env vars later).
2. Export helper functions here to avoid duplicating fetch logic in each screen.
3. Import from `config` wherever you need those shared settings.
