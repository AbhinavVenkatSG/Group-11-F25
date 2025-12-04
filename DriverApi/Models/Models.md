# Models Folder Guide

This folder holds the “shapes” of the data that live in the database. A class here (like `Driver`) is basically a typed diagram of a table: every property becomes a column, and EF Core uses it to know what to store or read.

Think of these files as your project’s nouns—drivers, deliveries, trips, etc. If you want to capture a new kind of thing in the database, make a new class in this folder and give it properties for each piece of data you care about.

When you add a model:
1. Create a new C# class in this folder.
2. Add properties (ideally with simple types like `int`, `string`, `DateTime`).
3. Register it in the DbContext (see the `Data` folder) and add a migration so the table exists.
