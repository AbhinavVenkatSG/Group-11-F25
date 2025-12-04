# Endpoints Folder Guide

Routes live here. Each file groups related HTTP endpoints so Program.cs can stay tiny and just call `app.MapWhatever()`. In our case, `DriverEndpoints` owns the `/api/drivers/...` routes.

Think of an endpoint as “what should happen when the client hits this URL.” Keep the work simple: read the request contract, talk to the DbContext, return a response contract.

To add a new feature:
1. Create a new static class with a `Map*Endpoints` method.
2. Inside, use `app.MapGroup("/api/...")` and `MapGet`/`MapPost` for each route.
3. Use contracts from the Contracts folder and models from Models/Data to do the actual work.
