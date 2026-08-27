# 📚 NoteVault — Semester 5

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
