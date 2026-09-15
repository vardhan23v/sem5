# 📚 NoteVault — Semester 5

<p align="center">
  <a href="https://vardhan23v.github.io/sem5/">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fvardhan23v.github.io%2Fsem5%2F&label=Live%20Site&color=6b5ae0&style=for-the-badge" alt="Live Site">
  </a>
  <img src="https://img.shields.io/github/deployments/vardhan23v/sem5/github-pages?label=GitHub%20Pages&color=6b5ae0&style=for-the-badge" alt="GitHub Pages deployment">
  <img src="https://img.shields.io/badge/built%20with-HTML%20%E2%80%A2%20CSS%20%E2%80%A2%20JS-e34f26?style=for-the-badge&logo=html5&logoColor=white" alt="Built with HTML/CSS/JS">
  <img src="https://img.shields.io/badge/PWA-ready-2e8d8f?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
  <img src="https://img.shields.io/github/last-commit/vardhan23v/sem5?color=9c6fb5&style=for-the-badge" alt="Last commit">
</p>

Study materials for my 5th semester, organized by subject and readable right in the browser.

**Live site:** https://vardhan23v.github.io/sem5/

## What's inside

| Section | Contents |
|---------|----------|
| CNC | Computer Networks & Communication — unit PDFs, HTML notes, MCQs, important-topic photos |
| OS | Operating Systems — unit PDFs, chapter PDFs, HTML notes, MCQs, important-topic photos |
| TOC | Theory of Computation — master notes, interactive HTML notes, DFA playground, MCQs, MSE paper |
| Data Science | Unit PDF and interactive HTML notes |
| PPTs | Lecture presentations for CNC, OS and Data Science |
| ESD | Employability & Social Development |
| SCR | Social Connect Responsibility |
| UHV | Universal Human Values — MCQs and descriptive Q&A |
| Lab Manuals | C++, Java Spring, CNC, OS, plus the PC++ syllabus |

## Features

- **Built-in PDF viewer** with zoom, page thumbnails, two-page mode, swipe gestures and fullscreen
- **HTML notes and images** open in the same reader
- **PPT viewer** via the Microsoft Office Online embed (live site only)
- **Search** across files and subjects
- **Favorites and recently opened** rows on the home screen
- **Reading progress** remembers the page you were on in every PDF
- **Light and dark themes**
- **Installable** as a PWA, with the app shell available offline
- Press `?` in the reader to see keyboard shortcuts

Favorites, recents, progress and theme are stored in your browser's `localStorage` and never leave your device. The site also records anonymous presence in Firebase so a live-viewer count can be added later; no personal data is sent.

## Adding materials

1. Drop the file into the matching subject folder.
2. Add an entry to `SUBJECTS` in [`assets/js/app.js`](assets/js/app.js) with a display name, path and size.
3. Bump the `?v=` query on `app.js` in `index.html` and `sw.js` so browsers pick up the new index.

## Run locally

Any static file server works, for example:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. PPT previews only work on the live site; locally they offer a download instead.

## Tech

Plain HTML/CSS/JavaScript with [PDF.js](https://mozilla.github.io/pdf.js/) loaded on demand. No build step. Deployed to GitHub Pages automatically on every push to `main`.

## License

MIT — feel free to adapt this for your own course materials.
