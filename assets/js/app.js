// ============================================================
// NoteVault — Semester 5
// Subject data structure and interactive logic
// ============================================================

// ===== Subject Data =====
var SUBJECTS = [
  {
    id: 'cnc',
    name: 'CNC',
    fullName: 'Computer Networks & Communication',
    color: '#f97316',
    files: [
      { name: 'CNC Unit 1', path: 'CNC UNIT 1.pdf', type: 'pdf' },
      { name: 'CNC Unit 2', path: 'CNC UNIT 2.pdf', type: 'pdf' },
      { name: 'CNC Lab Manual', path: 'CSE_CNC_LAB_MANUAL-20CS502_2023.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'os',
    name: 'OS',
    fullName: 'Operating Systems',
    color: '#3b82f6',
    files: [
      { name: 'OS Unit 1', path: 'OS UNIT 1.pdf', type: 'pdf' },
      { name: 'OS Unit 2', path: 'OS UNIT 2.pdf', type: 'pdf' },
      { name: 'OS Unit 3', path: 'OS UNIT 3.pdf', type: 'pdf' }
    ]
  },
  {
    id: 'toc',
    name: 'TOC',
    fullName: 'Theory of Computation',
    color: '#a855f7',
    files: [
      { name: 'TOC Unit 1 — Automata (Master Notes)', path: 'TOC_Unit1_Automata_Master_Notes.pdf', type: 'pdf' },
      { name: 'TOC Unit 1 — Automata (HTML)', path: 'unit1-theory-of-computation.html', type: 'html' }
    ]
  },
  {
    id: 'ds',
    name: 'Data Science',
    fullName: 'Introduction to Data Science',
    color: '#10b981',
    files: [
      { name: 'Data Science — Master Notes', path: 'data-science-master-notes.html', type: 'html' }
    ]
  },
  {
    id: 'da',
    name: 'Data Analysis',
    fullName: 'Data Analysis using Excel',
    color: '#06b6d4',
    files: [
      { name: 'Data Analysis — Detailed Notes', path: 'unit1-detailed-notes.html', type: 'html' }
    ]
  },
  {
    id: 'net',
    name: 'Networks',
    fullName: 'Computer Network & Communication',
    color: '#ef4444',
    files: [
      { name: 'Computer Networks — Unit 1', path: 'unit1-computer-networks_1.html', type: 'html' }
    ]
  }
];

// ===== State =====
var activeSubject = null;
var activeFile = null;

// ===== Initialization =====
document.addEventListener('DOMContentLoaded', function () {
  renderSidebar();
  wireSearch();
  wireMobileToggle();
  showWelcome();
});

// ===== Render Sidebar =====
function renderSidebar() {
  var list = document.getElementById('subject-list');
  if (!list) return;

  var html = '';
  var totalFiles = 0;

  for (var i = 0; i < SUBJECTS.length; i++) {
    var subj = SUBJECTS[i];
    totalFiles += subj.files.length;

    html += '<div class="subject-group">';
    html += '  <div class="subject-header" data-subject="' + subj.id + '" onclick="toggleSubject(\'' + subj.id + '\')">';
    html += '    <span class="subject-dot" style="background:' + subj.color + '"></span>';
    html += '    <span class="subject-name">' + subj.fullName + '</span>';
    html += '    <span class="subject-count">' + subj.files.length + '</span>';
    html += '    <span class="subject-chevron">▶</span>';
    html += '  </div>';
    html += '  <div class="file-list" id="files-' + subj.id + '">';

    for (var j = 0; j < subj.files.length; j++) {
      var f = subj.files[j];
      var icon = f.type === 'pdf' ? '📄' : '🌐';
      var badgeClass = f.type === 'pdf' ? 'badge-pdf' : 'badge-html';
      var badgeText = f.type === 'pdf' ? 'PDF' : 'HTML';

      html += '    <div class="file-item" data-subject="' + subj.id + '" data-path="' + f.path + '" data-type="' + f.type + '" onclick="openFile(\'' + subj.id + '\', \'' + f.path + '\', \'' + f.type + '\', this)" title="' + f.name + '">';
      html += '      <span class="file-icon">' + icon + '</span>';
      html += '      <span class="file-name">' + f.name + '</span>';
      html += '      <span class="file-badge ' + badgeClass + '">' + badgeText + '</span>';
      html += '    </div>';
    }

    html += '  </div>';
    html += '</div>';
  }

  list.innerHTML = html;

  // Update stats
  var subjCount = document.getElementById('stat-subjects');
  var fileCount = document.getElementById('stat-files');
  if (subjCount) subjCount.textContent = SUBJECTS.length;
  if (fileCount) fileCount.textContent = totalFiles;
}

// ===== Toggle Subject =====
function toggleSubject(subjectId) {
  var header = document.querySelector('.subject-header[data-subject="' + subjectId + '"]');
  var fileList = document.getElementById('files-' + subjectId);

  if (!header || !fileList) return;

  var isOpen = fileList.classList.contains('open');

  // Close all
  var allHeaders = document.querySelectorAll('.subject-header');
  var allLists = document.querySelectorAll('.file-list');
  for (var i = 0; i < allHeaders.length; i++) {
    allHeaders[i].classList.remove('expanded', 'active');
  }
  for (var j = 0; j < allLists.length; j++) {
    allLists[j].classList.remove('open');
  }

  // Open clicked (if it wasn't already open)
  if (!isOpen) {
    header.classList.add('expanded', 'active');
    fileList.classList.add('open');
    activeSubject = subjectId;
  } else {
    activeSubject = null;
  }
}

// ===== Open File =====
function openFile(subjectId, path, type, el) {
  // Highlight active file
  var allFiles = document.querySelectorAll('.file-item');
  for (var i = 0; i < allFiles.length; i++) {
    allFiles[i].classList.remove('active-file');
  }
  if (el) el.classList.add('active-file');

  activeFile = path;

  // Find subject info
  var subj = null;
  for (var s = 0; s < SUBJECTS.length; s++) {
    if (SUBJECTS[s].id === subjectId) { subj = SUBJECTS[s]; break; }
  }

  // Update topbar
  var topbarTitle = document.getElementById('topbar-title');
  var topbarBadge = document.getElementById('topbar-badge');
  var viewerContainer = document.getElementById('viewer-container');

  if (topbarTitle && el) {
    topbarTitle.textContent = el.querySelector('.file-name').textContent;
  }
  if (topbarBadge && subj) {
    topbarBadge.textContent = subj.name;
    topbarBadge.style.background = subj.color + '22';
    topbarBadge.style.color = subj.color;
  }

  // Render viewer
  if (viewerContainer) {
    if (type === 'pdf') {
      viewerContainer.innerHTML = '<iframe class="viewer-iframe" src="' + path + '#toolbar=0&navpanes=0" title="PDF Viewer"></iframe>';
    } else if (type === 'html') {
      viewerContainer.innerHTML = '<iframe class="note-embed" src="' + path + '" title="HTML Note"></iframe>';
    }
  }

  // Close sidebar on mobile
  closeMobileSidebar();
}

// ===== Search =====
function wireSearch() {
  var input = document.getElementById('search-input');
  if (!input) return;

  input.addEventListener('input', function () {
    var query = (this.value || '').trim().toLowerCase();

    var groups = document.querySelectorAll('.subject-group');
    var anyVisible = false;

    for (var i = 0; i < groups.length; i++) {
      var group = groups[i];
      var header = group.querySelector('.subject-header');
      var subjectId = header ? header.getAttribute('data-subject') : '';
      var fileItems = group.querySelectorAll('.file-item');

      var groupVisible = false;

      // Check if subject name matches
      var subj = null;
      for (var s = 0; s < SUBJECTS.length; s++) {
        if (SUBJECTS[s].id === subjectId) { subj = SUBJECTS[s]; break; }
      }

      if (!query) {
        // Show all, collapse all
        group.style.display = '';
        var fl = group.querySelector('.file-list');
        var hd = group.querySelector('.subject-header');
        if (fl) fl.classList.remove('open');
        if (hd) hd.classList.remove('expanded', 'active');
        for (var fi = 0; fi < fileItems.length; fi++) {
          fileItems[fi].style.display = '';
        }
        continue;
      }

      // Check subject name match
      if (subj && (subj.name.toLowerCase().indexOf(query) !== -1 || subj.fullName.toLowerCase().indexOf(query) !== -1)) {
        groupVisible = true;
        // Show all files in this group
        for (var fi2 = 0; fi2 < fileItems.length; fi2++) {
          fileItems[fi2].style.display = '';
        }
      } else {
        // Check individual files
        for (var fj = 0; fj < fileItems.length; fj++) {
          var item = fileItems[fj];
          var name = (item.querySelector('.file-name') || {}).textContent || '';
          if (name.toLowerCase().indexOf(query) !== -1) {
            item.style.display = '';
            groupVisible = true;
          } else {
            item.style.display = 'none';
          }
        }
      }

      group.style.display = groupVisible ? '' : 'none';

      // Auto-expand matching groups
      var fl2 = group.querySelector('.file-list');
      var hd2 = group.querySelector('.subject-header');
      if (groupVisible && query) {
        if (fl2) fl2.classList.add('open');
        if (hd2) hd2.classList.add('expanded');
      } else if (!query) {
        if (fl2) fl2.classList.remove('open');
        if (hd2) hd2.classList.remove('expanded', 'active');
      }

      if (groupVisible) anyVisible = true;
    }
  });
}

// ===== Mobile Sidebar =====
function wireMobileToggle() {
  var toggleBtn = document.getElementById('sidebar-toggle');
  var overlay = document.getElementById('mobile-overlay');
  var sidebar = document.getElementById('sidebar');

  if (!toggleBtn || !overlay || !sidebar) return;

  toggleBtn.addEventListener('click', function () {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('show');
  });

  overlay.addEventListener('click', function () {
    sidebar.classList.remove('open');
    overlay.classList.remove('show');
  });
}

function closeMobileSidebar() {
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('mobile-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

// ===== Welcome State =====
function showWelcome() {
  var container = document.getElementById('viewer-container');
  if (!container) return;

  container.innerHTML =
    '<div class="welcome-state">' +
    '  <div class="welcome-icon">' +
    '    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
    '      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>' +
    '      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>' +
    '      <line x1="8" y1="7" x2="16" y2="7"></line>' +
    '      <line x1="8" y1="11" x2="14" y2="11"></line>' +
    '    </svg>' +
    '  </div>' +
    '  <h2>Welcome to NoteVault</h2>' +
    '  <p>Your 5th semester materials, organized by subject. Pick a file from the sidebar and start reading.</p>' +
    '</div>';
}