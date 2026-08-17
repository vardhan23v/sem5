/* ============================================================
   NoteVault — Shared Navigation & Theme Toggle
   ============================================================ */

/**
 * Inject a sticky top navigation bar into the page.
 *
 * @param {string} currentFile - The filename of the current page (e.g. "index.html").
 * @param {Array<{file: string, title: string}>} noteFiles - Array of note objects
 *   with `file` (filename) and `title` (display label).
 */
function injectNav(currentFile, noteFiles) {
  // Guard: don't inject twice
  if (document.getElementById('nv-topnav')) return;

  var nav = document.createElement('nav');
  nav.id = 'nv-topnav';

  // Brand / home link
  var brand = document.createElement('a');
  brand.href = 'index.html';
  brand.className = 'nv-brand';
  brand.textContent = 'NoteVault';
  nav.appendChild(brand);

  // Separator
  var sep = document.createElement('span');
  sep.className = 'nv-sep';
  nav.appendChild(sep);

  // Links container
  var links = document.createElement('div');
  links.className = 'nv-links';

  // Home link
  var homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  if (currentFile === 'index.html') {
    homeLink.classList.add('nv-active');
  }
  links.appendChild(homeLink);

  // Note file links
  if (noteFiles && noteFiles.length) {
    for (var i = 0; i < noteFiles.length; i++) {
      var nf = noteFiles[i];
      var a = document.createElement('a');
      a.href = nf.file;
      a.textContent = nf.title;
      if (currentFile === nf.file) {
        a.classList.add('nv-active');
      }
      links.appendChild(a);
    }
  }

  nav.appendChild(links);

  // Theme toggle button
  var themeBtn = document.createElement('button');
  themeBtn.className = 'nv-theme-btn';
  themeBtn.setAttribute('aria-label', 'Toggle dark mode');
  themeBtn.title = 'Toggle dark mode';
  themeBtn.textContent = getThemeIcon();
  themeBtn.addEventListener('click', toggleTheme);
  nav.appendChild(themeBtn);

  // Prepend to body
  document.body.insertBefore(nav, document.body.firstChild);
}

/**
 * Toggle between light and dark theme.
 * Switches data-theme on <html> and persists to localStorage.
 */
function toggleTheme() {
  var html = document.documentElement;
  var current = html.getAttribute('data-theme');
  var next = (current === 'dark') ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('nv-theme', next);
  updateThemeIcon(next);
}

/**
 * Apply the saved theme on page load.
 * Call this early (before DOMContentLoaded if possible).
 */
function applySavedTheme() {
  var saved = localStorage.getItem('nv-theme');
  if (saved) {
    document.documentElement.setAttribute('data-theme', saved);
  }
}

/**
 * Update the theme button icon to reflect current state.
 * @param {string} theme - 'light' or 'dark'
 */
function updateThemeIcon(theme) {
  var btn = document.querySelector('#nv-topnav .nv-theme-btn');
  if (btn) {
    btn.textContent = theme === 'dark' ? '\u2600' : '\u263D';  /* ☀ / ☽ */
  }
}

/**
 * Return the correct icon for the current theme.
 * @returns {string}
 */
function getThemeIcon() {
  var current = document.documentElement.getAttribute('data-theme');
  return (current === 'dark') ? '\u2600' : '\u263D';
}

// Apply saved theme immediately (before DOM is fully parsed)
applySavedTheme();