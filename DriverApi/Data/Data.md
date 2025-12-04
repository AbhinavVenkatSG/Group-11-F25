# Data Folder Guide

Everything in this folder is about *how* the app talks to the database. The `DriverDbContext` is the doorway: EF Core asks it which tables exist (DbSets) and how those tables are shaped (model configuration).

If the Models folder defines the nouns, this folder explains how to store them. You usually touch this when you add a new model or tweak relationships/indexes.

To register a new model:
1. Add a `DbSet<T>` to the DbContext so EF knows the table exists.
2. Optionally configure extra rules in `OnModelCreating` (e.g., required fields, unique indexes).
3. Run `dotnet ef migrations add SomeName` so the database schema stays in sync.
