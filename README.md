# 📚 NoteVault — Semester 5

<p align="center">
  <a href="https://vardhan23v.github.io/sem5/">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fvardhan23v.github.io%2Fsem5%2F&label=Live%20Site&color=6b5ae0&style=for-the-badge" alt="Live Site">
  </a>
  <img src="https://img.shields.io/github/deployments/vardhan23v/sem5/github-pages?label=GitHub%20Pages&color=6b5ae0&style=for-the-badge" alt="GitHub Pages deployment">
  <img src="https://img.shields.io/badge/built%20with-HTML%20%E2%80%A2%20CSS%20%E2%80%A2%20JS-e34f26?style=for-the-badge&logo=html5&logoColor=white" alt="Built with HTML/CSS/JS">
  <img src="https://img.shields.io/badge/PWA-ready-2e8d8f?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
  <img src="https://img.shields.io/badge/Firebase-live%20presence-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase live presence">
  <img src="https://img.shields.io/github/last-commit/vardhan23v/sem5?color=9c6fb5&style=for-the-badge" alt="Last commit">
  <img src="https://img.shields.io/github/repo-size/vardhan23v/sem5?color=6b5ae0&style=for-the-badge" alt="Repo size">
</p>

Study materials for my 5th semester, organized by subject and readable right in the browser.

**Live site:** https://vardhan23v.github.io/sem5/

## What's inside

| Section | Contents |
|---------|----------|
| CNC | Computer Networks — PDFs and HTML notes |
| OS | Operating Systems — PDFs, HTML notes, images |
| TOC | Theory of Computation — PDFs and interactive notes |
| Data Science | Interactive HTML notes |
| PPTs | Lecture presentations (viewable in-browser) |
| UHV | Universal Human Values — MCQs and Q&A |
| Lab Manuals | C++, Java Spring, CNC, OS |

## Features

- Built-in PDF viewer with zoom, page navigation, and swipe gestures
- PPT viewer (Microsoft Office Online embed)
- Search across all files
- Favorites and reading progress, saved in your browser
- Works on mobile
- Press `?` in the app to see keyboard shortcuts

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. (PPT previews only work on the live site — locally they offer a download instead.)

## Tech

Plain HTML/CSS/JavaScript with [PDF.js](https://mozilla.github.io/pdf.js/). No build step. Deployed to GitHub Pages automatically on every push to `main`.

## License

MIT — feel free to adapt this for your own course materials.
