# Contracts Folder Guide

Contracts describe the messages that go in and out of the API. If a mobile screen sends JSON to the server or expects JSON back, a matching record/class lives here to spell out what fields exist.

They keep the API stable and self-documenting: the frontend imports the same definition, so everyone agrees on property names and types.

When you design a new endpoint:
1. Decide what the request should look like and create a record/class here.
2. Do the same for the response if it isn’t already covered.
3. Use these types inside your endpoint method so ASP.NET Core handles the JSON (validation, model binding) for you.
