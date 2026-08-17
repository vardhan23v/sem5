# Build an interactive static NoteVault-style interface that connects the existing 5th-semester HTML note files. Create a dashboard (index.html) with search/filter cards linking to each subject, add shared CSS/JS for theming and navigation, and wire the four existing note pages into this unified interface by injecting shared assets and a cross-page nav bar.

## Review

Reviewed before you saw it: process.exit (asserted by "index.html exists and links to all four note files") is named nowhere in the task, so this check could only be satisfied by inventing it; process.exit (asserted by "All existing note files reference the shared CSS and JS assets") is named nowhere in the task, so this check could only be satisfied by inventing it; process.exit (asserted by "Shared asset files exist") is named nowhere in the task, so this check could only be satisfied by inventing it

## Structure

Files and folders this plan touches or creates:

```
assets/
  css/
    style.css
  js/
    nav.js
data-science-master-notes.html
index.html
unit1-computer-networks_1.html
unit1-detailed-notes.html
unit1-theory-of-computation.html
```

- `index.html` - Interactive dashboard landing page with searchable cards for each note file
- `assets/css/style.css` - Shared stylesheet for theme variables, nav bar, card grid, and responsive layout
- `assets/js/nav.js` - Navigation injection and theme toggle script used by index and all note pages
- `data-science-master-notes.html` - Existing note page modified to include shared assets and nav
- `unit1-computer-networks_1.html` - Existing note page modified to include shared assets and nav
- `unit1-detailed-notes.html` - Existing note page modified to include shared assets and nav
- `unit1-theory-of-computation.html` - Existing note page modified to include shared assets and nav

## Steps

1. **Read existing note files to extract structure**
   Read data-science-master-notes.html, unit1-computer-networks_1.html, unit1-detailed-notes.html, and unit1-theory-of-computation.html. Record each file's <title> or main <h1>/<h2> text and the exact location of its </head> tag so shared assets can be inserted precisely in Step 4.

2. **Create shared CSS and navigation JS**
   Create assets/css/style.css defining CSS variables for light/dark themes, a sticky top-nav, card grid layout, and mobile responsiveness. Create assets/js/nav.js defining a global injectNav(currentFile, noteFiles) which prepends a <nav> element to <body> containing a home link, links to every note file, and a theme-toggle button. Also define a global toggleTheme() which switches data-theme on <html> and persists the choice to localStorage.
   Interfaces: injectNav(currentFile: string, noteFiles: Array<{file:string,title:string}>): void, toggleTheme(): void

3. **Create index.html interactive dashboard**
   Create index.html at the root. Link assets/css/style.css and assets/js/nav.js in <head>. In <body> render a responsive grid of cards—one per existing note file—using titles from Step 1. Each card is an <a> linking to the corresponding HTML file. Add an <input id="search"> that calls filterNotes(query) to show/hide cards by matching card text. Define filterNotes in an inline script or in nav.js. Call injectNav('index.html', [...]) on load.
   Interfaces: filterNotes(query: string): void

4. **Wire shared assets into existing note pages**
   In each existing note file, insert <link rel="stylesheet" href="assets/css/style.css"> and <script src="assets/js/nav.js" defer></script> immediately before the closing </head> tag. Add a small inline script at the end of <body> that calls the global injectNav with the current filename and the full note file list so the nav bar renders on every page.

5. **Verify connectivity and interactivity**
   Confirm that index.html references all four note files, that every note file references assets/, and that the dashboard search input and theme toggle are present in the markup.

---

Written by OxCode for you to read. Editing this file does not change the run: use the comment box on the plan card to ask for changes.
