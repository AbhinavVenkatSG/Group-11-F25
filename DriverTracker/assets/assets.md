# assets Folder Guide

Static files—images, icons, splash art—live here. React Native doesn’t fetch these over the network; instead you import them (e.g., `import Logo from '../assets/logo.png'`) so bundlers include them with the app.

Whenever the UI needs a new picture or sound, drop it in this folder and reference it from your components.

Tip: keep filenames descriptive (`login-background.png`) so teammates immediately know what they’re looking at.
