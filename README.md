# Shivangi — Portfolio

Static site, no build step: `index.html`, `style.css`, `script.js`, `apps.js`.

## Host it free on GitHub Pages
1. Create a public GitHub repo named `<your-username>.github.io`.
2. Upload everything in this folder (including `assets/`).
3. Settings → Pages → Deploy from a branch → `main` / root.
4. Live in about a minute at `https://<your-username>.github.io`. Put that link on your CV.
(Alternative: drag the folder onto app.netlify.com/drop.)

## Edit content (all in `apps.js`)
- Apps, store links, screenshots, captions and accent colours.
- Screenshots are in `assets/screens/<app>/N.webp`. To swap one, replace the file or change the list in `apps.js`.
- BugBubble: download `android.gif` and `ios.gif` from https://github.com/lokal-app/react-native-bugbubble/tree/main/docs into `assets/bugbubble/` for the most reliable loading. Until then the page loads them from GitHub.
- Add your personal GitHub URL in `PROFILE.github`.
- `assets/Shivangi_Resume2026.pdf` is your CV and includes your phone numbers. Delete it and set `cv: ""` to remove the Download CV button.

## Preview locally
`python3 -m http.server`, then open http://localhost:8000

## Notes on fonts and responsiveness
- Fonts (Inter and Inter Display, Latin subset) are self-hosted in `assets/fonts/`, so nothing is fetched from Google at load time.
- Headlines size themselves from the width of their own column, so long names (AstroLokal, Simpliscada) never overlap neighbouring content.
- Tested for overflow and overlap at 15 widths from 320px to 2560px.
