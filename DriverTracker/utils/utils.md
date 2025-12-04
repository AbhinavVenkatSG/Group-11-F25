# utils Folder Guide

“Utils” is the toolbox for shared logic that doesn’t belong to a single screen. The validation helper shows the pattern: write the rule once, import it wherever you need it, and keep components lean.

If you find yourself copy/pasting the same function across files, pull it into this folder instead.

Adding a new helper:
1. Create a descriptive file (`formatters.js`, `storage.js`, etc.).
2. Export the functions/constants you want to reuse.
3. Import them in your screens or other helpers as needed.
