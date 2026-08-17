# 📚 NoteVault — Semester 5

**NoteVault** is a beautifully designed, interactive PDF reader and study material hub for 5th semester engineering students. Browse, search, and read organized notes and PDFs — all in one place with a sleek dark-themed UI featuring ambient background animations.

## 🚀 Features

- **📖 PDF.js Canvas Rendering** — smooth page-by-page PDF reading with zoom, two-page mode, and fullscreen
- **🌐 HTML Note Viewer** — detailed HTML notes open inline with their original styling preserved
- **🔍 Live Search** — filter files across all subjects instantly
- **🎨 Dark Glassmorphism UI** — ambient floating orbs, glass sidebar, gradient accents
- **📱 Fully Responsive** — mobile-friendly with collapsible sidebar and floating toggle
- **⌨️ Keyboard Shortcuts** — arrow keys for page nav, +/- for zoom, Escape to go back
- **📥 One-Click Downloads** — download any file directly from the sidebar
- **📊 Views Counter** — track how many people have visited

## 📋 Subjects

| Subject | Full Name | Files |
| --- | --- | --- |
| CNC | Computer Networks & Communication | 3 PDFs |
| OS | Operating Systems | 3 PDFs |
| TOC | Theory of Computation | 1 PDF + 1 HTML |
| Data Science | Introduction to Data Science | 1 HTML |
| Data Analysis | Data Analysis using Excel | 1 HTML |
| Networks | Computer Network & Communication | 1 HTML |

## 🛠️ Technology Stack

- **PDF.js** — client-side PDF rendering with canvas
- **Vanilla HTML/CSS/JS** — no frameworks, no build step
- **GitHub Pages** — free hosting with automatic deployment

## ⚙️ Getting Started

### Prerequisites

Any modern browser — Chrome, Firefox, Safari, or Edge.

### Open in Browser

Simply open `index.html` in your browser, or use a local server:

```bash
# Using Python
python3 -m http.server 8000
```

Then visit `http://localhost:8000`

## 📁 Project Structure

```
sem5/
├── index.html              # Main application page
├── assets/
│   ├── css/
│   │   └── style.css       # Dark glassmorphism design system
│   └── js/
│       ├── app.js          # PDF.js viewer, sidebar, search logic
│       └── nav.js          # Legacy navigation (retired)
├── CNC UNIT 1.pdf
├── CNC UNIT 2.pdf
├── CSE_CNC_LAB_MANUAL-20CS502_2023.pdf
├── OS UNIT 1.pdf
├── OS UNIT 2.pdf
├── OS UNIT 3.pdf
├── TOC_Unit1_Automata_Master_Notes.pdf
├── data-science-master-notes.html
├── unit1-computer-networks_1.html
├── unit1-detailed-notes.html
└── unit1-theory-of-computation.html
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vardhan23v/sem5/issues).

## 📄 License

This project is licensed under the MIT License.