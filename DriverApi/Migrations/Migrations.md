# Migrations Folder Guide

These files are EF Core’s timeline of your database. Every time you run `dotnet ef migrations add ...`, EF writes a snapshot of the schema and the steps needed to reach it. At runtime, `dotnet ef database update` replays those steps so MySQL matches your models.

Treat this folder like compiled history: you rarely edit it by hand. Instead, change your models/DbContext and generate a new migration so the tooling keeps the schema aligned.

Quick workflow:
1. Change a model or its configuration.
2. Run `dotnet ef migrations add MeaningfulName` to create the migration here.
3. Run `dotnet ef database update` to apply it to your local database.
