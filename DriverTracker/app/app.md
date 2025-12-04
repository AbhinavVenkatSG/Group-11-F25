# app Folder Guide

The `app` directory is Expo Router’s map of your screens. Every `.tsx` file is a route: `index.tsx` becomes `/`, `CreateAccount.tsx` becomes `/CreateAccount`, and so on. When the app navigates, Expo loads the matching file here.

Keep UI components that represent entire screens inside this folder. If you need helper components, stash them in another folder (e.g., `components/`) and import them.

To add a new screen:
1. Create a `FeatureName.tsx` file in this folder.
2. Export a React component that renders the screen.
3. Use `Link` or `router.push('/FeatureName')` to navigate to it from other screens.
