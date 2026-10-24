# NoteVault — Semester 5

<p align="center">
  <a href="https://vardhan23v.github.io/sem5/">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fvardhan23v.github.io%2Fsem5%2F&label=Live%20Site&color=6b5ae0&style=for-the-badge" alt="Live Site">
  </a>
  <img src="https://img.shields.io/github/deployments/vardhan23v/sem5/github-pages?label=GitHub%20Pages&color=6b5ae0&style=for-the-badge" alt="GitHub Pages deployment">
  <img src="https://img.shields.io/badge/built%20with-React%20%E2%80%A2%20TypeScript%20%E2%80%A2%20Vite-61dafb?style=for-the-badge&logo=react&logoColor=white" alt="Built with React, TypeScript and Vite">
  <img src="https://img.shields.io/badge/PWA-ready-2e8d8f?style=for-the-badge&logo=pwa&logoColor=white" alt="PWA">
  <img src="https://img.shields.io/github/last-commit/vardhan23v/sem5?color=9c6fb5&style=for-the-badge" alt="Last commit">
</p>

Study materials for my 5th semester, organised by subject and readable right in the browser.

**Live site:** https://vardhan23v.github.io/sem5/

## What's inside

66 indexed resources across 9 subjects: 54 PDF, slide and HTML files plus 12 important-topic scans.

| Subject | Contents |
|---------|----------|
| CNC | Computer Networks & Communication — unit PDFs, HTML notes, MCQs, important-topic scans |
| OS | Operating Systems — unit and chapter PDFs, HTML notes, MCQs, important-topic scans |
| TOC | Theory of Computation — master notes, interactive HTML notes, MCQs, MSE papers |
| Data Science | Unit PDF and interactive HTML notes |
| PPTs | Lecture presentations for CNC, OS and Data Science |
| ESD | Employability & Social Development |
| SCR | Social Connect Responsibility |
| UHV | Universal Human Values — MCQs and descriptive Q&A |
| Lab Manuals | C++, CNC and OS lab manuals, plus the syllabus |

Resources are grouped by the real units — **Unit 1, Unit 2, Unit 3 and Lab Manuals**. There is no Unit 4 in this semester.

## Features

- **Dashboard** with unit cards, a complete resource archive, every subject and a *Continue studying* row built from your history
- **Built-in PDF reader** with page navigation, jump-to-page, zoom, thumbnails, find in document, two-page spread, fullscreen and keyboard shortcuts
- **Reading progress** remembers the page you reached in every PDF and offers to resume, with deep links such as `#/reader?file=…&page=12`
- **Favourites and mark-as-done** on every card, with per-subject completion bars
- **Search** across names, topics, subjects and units, combining keyword, file type, unit and subject filters
- **HTML notes and images** open in the same reader; PPT/PPTX files open in the Office viewer
- **Light and dark themes** (dark by default), responsive layout from 320px up, and an installable PWA shell
- **Old links keep working** — `#file=`, `#unit=`, `#subject=`, `#all` and `#search` fragments are translated to the new routes

Favourites, done marks, progress, history and theme are stored in `localStorage` (`notevault_favorites`, `notevault_done`, `notevault_progress`, `notevault_history`, `notevault_theme`) and never leave the device. Existing data from the previous version is read as-is and migrated in place.

## Project structure

```
src/
  data/subjects.ts        authoritative resource metadata (one entry per file)
  data/units.ts           the four units
  lib/library.ts          index, counts and lookups
  lib/filters.ts          search and AND-combined filters
  lib/storage.ts          legacy-compatible localStorage adapters
  lib/legacyLinks.ts      pre-migration hash translation
  components/             layout, cards, search, reader
  pages/                  home, search, subjects, units, all, favourites, reader
  hooks/                  app state and PDF loading
scripts/copy-resources.mjs copies indexed files into dist/ after a build
public/                   service worker, 404 fallback, manifest, icons
```

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev       # http://localhost:3000/
```

Other commands:

```bash
npm run check     # TypeScript, no emit
npm test          # Vitest unit tests
npm run build     # type-check, build to dist/, copy all 66 resources
npm run preview   # serve the production build at http://localhost:4173/sem5/
```

The production build is served from `/sem5/`; development and preview use the server root so resource URLs resolve locally.

## Adding materials

1. Drop the file into the matching subject folder (or create one).
2. Add an entry with `name`, `path`, `units`, `kind` and `topic` to `src/data/subjects.ts`.
3. If the subject or unit is new, update `src/data/units.ts` and the subject list as well.
4. Run `npm test` — the library tests check that every indexed path exists on disk and that counts add up.
5. Run `npm run build`; `scripts/copy-resources.mjs` copies only the files referenced by the metadata into `dist/`.

## Tests

Vitest covers the parts most likely to break silently:

- resource indexing, unique IDs, subject and unit counts (66 / 54 / 12, units 30 / 11 / 9 / 5)
- every indexed file existing on disk
- search normalisation and AND-combined filters
- storage migration from the legacy progress/history shapes, including corrupt JSON
- legacy hash translation and one-time redirects

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which installs with `npm ci`, runs the type-check and tests, builds to `dist/`, and publishes `dist/` with GitHub Pages. The `dist` folder already contains every referenced resource, `.nojekyll`, `404.html`, the manifest and the service worker.

Deep links use hash routing, so they survive a refresh on Pages. Path-based fallbacks are forwarded by `public/404.html` to the equivalent hash route. The service worker uses network-first navigation and cache-first hashed assets, so a new deployment is picked up on the next load.

PDFs are never cached by the service worker: they are large, support range requests, and must always come from the network.

## Tech

React 19, TypeScript, Vite, React Router (hash history), CSS Modules with design tokens, Lucide icons, PDF.js. Tests with Vitest. No backend.

## License

MIT — feel free to adapt this for your own course materials.
