// ============================================================
// NoteVault — Semester 5
// Subject data structure and interactive logic
// ============================================================

// ===== Subject Data =====
var SUBJECTS = [
    {
        name: "CNC",
        fullName: "Computer Networks & Communication",
        color: "#f97316",
        important: [
            { name: "Important Topic 1", path: "CNC/important/IMG-20250913-WA0002.jpg" },
            { name: "Important Topic 2", path: "CNC/important/IMG-20250913-WA0008.jpg" },
            { name: "Important Topic 3", path: "CNC/important/IMG-20250913-WA0012.jpg" },
            { name: "Important Topic 4", path: "CNC/important/IMG-20250913-WA0016.jpg" }
        ],
        files: [
            { name: "CNC Unit 1.pdf", path: "CNC/CNC UNIT 1.pdf", size: "27.0 MB" },
            { name: "CNC Unit 2.pdf", path: "CNC/CNC UNIT 2.pdf", size: "23.1 MB" },
            { name: "Computer Networks — Unit 1 (HTML)", path: "CNC/unit1-computer-networks_1.html", size: "56 KB" },
            { name: "Unit 1 — Mastery Notes (HTML)", path: "CNC/CS3001-1_Unit1_Notes.html", size: "76 KB" },
            { name: "Unit 1 MCQs.pdf", path: "CNC/mcqs/Unit 1 MCQs.pdf", size: "116 KB" },
            { name: "Unit 1 MCQs — 30 Questions (Clean).pdf", path: "CNC/mcqs/CS3001-1_CNC_UNIT 1_MCQs-30 (clean).pdf", size: "156 KB" }
        ]
    },
    {
        name: "OS",
        fullName: "Operating Systems",
        color: "#3b82f6",
        important: [
            { name: "Important Topic 1", path: "OS/important/IMG-20250913-WA0006.jpg" },
            { name: "Important Topic 2", path: "OS/important/IMG-20250913-WA0020.jpg" },
            { name: "Important Topic 3", path: "OS/important/WhatsApp Image 2026-09-11 at 13.05.24 (1).jpeg" },
            { name: "Important Topic 4", path: "OS/important/WhatsApp Image 2026-09-11 at 13.05.24.jpeg" }
        ],
        files: [
            { name: "OS Unit 1.pdf", path: "OS/OS UNIT 1.pdf", size: "10.5 MB" },
            { name: "OS Unit 2.pdf", path: "OS/OS UNIT 2.pdf", size: "16.8 MB" },
            { name: "OS Unit 3.pdf", path: "OS/OS UNIT 3.pdf", size: "8.8 MB" },
            { name: "Unit 1 — OS Structure & Scheduling (HTML)", path: "OS/CS2004-1_Unit1_OS_Notes.html", size: "56 KB" },
            { name: "Notes — Page 1 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.09.28.jpeg", size: "96 KB" },
            { name: "Notes — Page 2 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.10.26.jpeg", size: "339 KB" },
            { name: "OS Syllabus.pdf", path: "OS/ppts/OS syllabus.pdf", size: "166 KB" },
            { name: "Unit 2 — Ch 5 Process Synchronization.pdf", path: "OS/Unit-2/CH5_PROCESS SYNCHRONIZATION.pdf", size: "685 KB" },
            { name: "Unit 2 — Ch 6 Deadlocks.pdf", path: "OS/Unit-2/CH6_DEADLOCKS.pdf", size: "426 KB" },
            { name: "Unit 2 — Ch 7 Main Memory.pdf", path: "OS/Unit-2/CH7_MAIN MEMORY.pdf", size: "1.9 MB" },
            { name: "Unit 2 — MCQs.pdf", path: "OS/Unit-2/OS_MCQS_UNIT2 .pdf", size: "138 KB" },
            { name: "Unit 3 — Ch 9 File System Concept.pdf", path: "OS/Unit-3/CH9_FILE SYSTEM CONCEPT.pdf", size: "110 KB" },
            { name: "Unit 3 — Ch 10 File System Structure.pdf", path: "OS/Unit-3/CH10_FILE SYSTEM STRUCTURE.pdf", size: "534 KB" },
            { name: "Unit 3 — Ch 11 Disk Scheduling.pdf", path: "OS/Unit-3/CH11_DISK SCHEDULING.pdf", size: "645 KB" },
            { name: "Unit 3 — MCQs.pdf", path: "OS/Unit-3/OS_MCQ_UNIT3.pdf", size: "133 KB" }
        ]
    },
    {
        name: "PPTs",
        fullName: "Lecture Presentations",
        color: "#f43f5e",
        files: [
            { name: "CNC — Unit 1 Chapter 1", path: "CNC/ppts/UNIT-1 Chap-1.pptx", size: "7.6 MB" },
            { name: "CNC — Unit 1 Chapter 2", path: "CNC/ppts/UNIT-1 Chap-2.pptx", size: "3.4 MB" },
            { name: "OS — Ch 1 Operating System Structure", path: "OS/ppts/CH_1_OPERATING SYSTEM STRUCTURE.pptx", size: "2.2 MB" },
            { name: "OS — Ch 2 Process Management", path: "OS/ppts/CH_2_PROCESS MANAGEMENT.pptx", size: "2.6 MB" },
            { name: "OS — Ch 3 Threads", path: "OS/ppts/CH3_THREADS.pptx", size: "1.9 MB" },
            { name: "OS — Ch 4 CPU Scheduling", path: "OS/ppts/CH4_CPU SCHEDULING.pptx", size: "2.4 MB" },
            { name: "Data Science — IDS Unit 1", path: "Data Science/ppts/IDS Unit-1(1).pptx", size: "2.6 MB" }
        ]
    },
    {
        name: "TOC",
        fullName: "Theory of Computation",
        color: "#a855f7",
        important: [
            { name: "Important Topic 1", path: "TOC/important/IMG-20250913-WA0010.jpg" },
            { name: "Important Topic 2", path: "TOC/important/IMG-20250913-WA0018.jpg" }
        ],
        files: [
            { name: "TOC Unit 1 — Automata (Master Notes).pdf", path: "TOC/TOC_Unit1_Automata_Master_Notes.pdf", size: "1.0 MB" },
            { name: "TOC Unit 1 — Automata (HTML)", path: "TOC/unit1-theory-of-computation.html", size: "33 KB" },
            { name: "Unit 1 — Automata Solved & Animated (HTML)", path: "TOC/CS3103-1_Unit1_TOC_Notes.html", size: "48 KB" },
            { name: "DFA Mastery — Live Machines (HTML)", path: "TOC/CS3103-1_DFA_Mastery.html", size: "44 KB" },
            { name: "TOC — MSE 1 Question Paper.pdf", path: "TOC/TOC MSE1.pdf", size: "18.8 MB" },
            { name: "TOC — MCQs (Word)", path: "TOC/Toc_MCQs.docx", size: "1.4 MB" }
        ]
    },
    {
        name: "ESD",
        fullName: "Employability & Social Development",
        color: "#14b8a6",
        files: [
            { name: "ESD — Unit 1.pdf", path: "ESD/ESD Unit 1.pdf", size: "139 KB" }
        ]
    },
    {
        name: "SCR",
        fullName: "Social Connect Responsibility",
        color: "#f59e0b",
        files: [
            { name: "SCR — Unit I.pdf", path: "SCR/SCR_Unit I.pdf", size: "838 KB" },
            { name: "SCR — Unit II.pdf", path: "SCR/SCR_Unit II.pdf", size: "605 KB" },
            { name: "SCR — Unit III.pdf", path: "SCR/SCR_Unit III.pdf", size: "297 KB" }
        ]
    },
    {
        name: "Data Science",
        fullName: "Introduction to Data Science",
        color: "#10b981",
        files: [
            { name: "Data Science — Master Notes (HTML)", path: "Data Science/data-science-master-notes.html", size: "57 KB" },
            { name: "Data Analysis — Detailed Notes (HTML)", path: "Data Science/unit1-detailed-notes.html", size: "52 KB" },
            { name: "Unit 1 — Data Analysis with Excel (HTML)", path: "Data Science/CS1231-1_Unit1_DataScience_Notes.html", size: "56 KB" }
        ]
    },
    {
        name: "UHV",
        fullName: "Universal Human Values",
        color: "#ec4899",
        files: [
            { name: "MCQ — Unit 1 Questions.pdf", path: "UHV/MCQ_UHV_1.pdf", size: "46 KB" },
            { name: "Unit 1 — Descriptive Q&A.docx", path: "UHV/UHV_Unit I - Descriptive Question and Answer.docx", size: "570 KB" }
        ]
    },
    {
        name: "Lab Manuals",
        fullName: "Lab Manuals & Syllabus",
        color: "#eab308",
        files: [
            { name: "PC++ Syllabus.pdf", path: "PC++_SYLLABUS.pdf", size: "107 KB" },
            { name: "CNC Lab Manual.pdf", path: "Lab Manuals/CSE_CNC_LAB_MANUAL-20CS502_2023.pdf", size: "767 KB" },
            { name: "OS Lab Manual.pdf", path: "Lab Manuals/OS_LAB_MANUAL.pdf", size: "959 KB" },
            { name: "C++ Lab Manual.pdf", path: "Lab Manuals/C++_LAB_MANUAL.pdf", size: "313 KB" },
            { name: "Java Spring Lab Manual.pdf", path: "Lab Manuals/Java_Spring_Lab_Manual.pdf", size: "513 KB" }
        ]
    }
];

// ===== State =====
var currentPdf = null;
var pdfDoc = null;
var currentPage = 1;
var totalPages = 0;
var zoomScale = 1.0;
var rendering = false;
var pendingRender = null;
var twoPageMode = false;
var currentFileType = 'pdf';
var thumbRendered = 0;

// ===== Subject Card Icons (inline SVG paths) =====
var SUBJECT_ICONS = {
    "CNC": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    "OS": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>',
    "TOC": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    "Data Science": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    "UHV": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    "ESD": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="2" y1="11" x2="22" y2="11"/></svg>',
    "SCR": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "PPTs": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
    "Lab Manuals": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v7.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V2"/><path d="M8.5 2h7"/><line x1="7" y1="15" x2="17" y2="15"/></svg>',
    "default": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
};

// ===== Subject tonal colors (Material 3: container / on-container) =====
var SUBJECT_TONES = {
    "CNC": ["#ffdcc9", "#8f3b00"],
    "OS": ["#d8e6ff", "#1a4a8f"],
    "TOC": ["#ecdfff", "#5a2a9e"],
    "Data Science": ["#d4f7e8", "#1a6b4a"],
    "UHV": ["#ffdcec", "#8f2a63"],
    "PPTs": ["#d3f2f7", "#165e6b"],
    "Lab Manuals": ["#ffe0dd", "#8f2e24"],
    "ESD": ["#d2f4f4", "#073b3b"],
    "SCR": ["#ffe9c2", "#7a5300"]
};

function subjectTone(name) {
    var t = SUBJECT_TONES[name] || ["#e4e0ff", "#3b2e9e"];
    return { fill: t[0], tint: t[1] };
}

// ===== New Features State =====
var favorites = [];
var recentFiles = [];
var readingProgress = {};
var darkMode = true;

// Load saved data from localStorage
function loadUserData() {
    try {
        favorites = JSON.parse(localStorage.getItem('notevault_favorites') || '[]');
        recentFiles = JSON.parse(localStorage.getItem('notevault_recent') || '[]');
        readingProgress = JSON.parse(localStorage.getItem('notevault_progress') || '{}');
        darkMode = localStorage.getItem('notevault_theme') !== 'light';
    } catch (e) {
        console.error('Error loading user data:', e);
    }
}

// Save data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('notevault_favorites', JSON.stringify(favorites));
        localStorage.setItem('notevault_recent', JSON.stringify(recentFiles.slice(0, 10)));
        localStorage.setItem('notevault_progress', JSON.stringify(readingProgress));
        localStorage.setItem('notevault_theme', darkMode ? 'dark' : 'light');
    } catch (e) {
        console.error('Error saving user data:', e);
    }
}

// ===== File Type Detection =====
function getFileType(path) {
    var ext = path.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'html') return 'html';
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') return 'img';
    if (ext === 'pptx' || ext === 'ppt') return 'ppt';
    if (ext === 'docx' || ext === 'doc') return 'docx';
    return 'pdf';
}

function getFileLabel(path) {
    var ext = path.split('.').pop().toLowerCase();
    if (ext === 'html') return 'HTML';
    if (ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'webp') return 'IMG';
    if (ext === 'pptx' || ext === 'ppt') return 'PPT';
    if (ext === 'docx' || ext === 'doc') return 'DOC';
    return 'PDF';
}

// ===== DOM Elements =====
var sidebar = document.getElementById('sidebar');
var sidebarOverlay = document.getElementById('sidebarOverlay');
var subjectList = document.getElementById('subjectList');
var searchInput = document.getElementById('searchInput');
var totalPdfsEl = document.getElementById('totalPdfs');
var welcomeScreen = document.getElementById('welcomeScreen');
var pdfViewer = document.getElementById('pdfViewer');
var viewerTitle = document.getElementById('viewerTitle');
var pdfCanvas = document.getElementById('pdfCanvas');
var pdfCanvas2 = document.getElementById('pdfCanvas2');
var pagesWrapper = document.getElementById('pagesWrapper');
var pdfCanvasContainer = document.getElementById('pdfCanvasContainer');
var loadingSpinner = document.getElementById('loadingSpinner');
var pageInfo = document.getElementById('pageInfo');
var pageInfoBot = document.getElementById('pageInfoBot');
var zoomLevelEl = document.getElementById('zoomLevel');
var subjectCards = document.getElementById('subjectCards');
var thumbRail = document.getElementById('thumbRail');
var thumbRailList = document.getElementById('thumbRailList');
var viewerProgressFill = document.getElementById('viewerProgressFill');
var noteViewer = document.getElementById('noteViewer');
var imageViewer = document.getElementById('imageViewer');

// ===== Initialize =====
function init() {
    try {
        loadUserData();
        buildSidebar();
        buildSubjectCards();
        countPdfs();
        attachEvents();
        addMobileToggle();
        updateFavoritesUI();
        updateRecentFilesUI();
        var navHome = document.getElementById('navHome');
        if (navHome) navHome.classList.add('active');
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

function countPdfs() {
    var count = 0;
    SUBJECTS.forEach(function(s) { count += s.files.length; });
    totalPdfsEl.textContent = count;
    var subjectsEl = document.getElementById('totalSubjects');
    if (subjectsEl) subjectsEl.textContent = SUBJECTS.length;
    var chipF = document.getElementById('chipFiles');
    if (chipF) chipF.textContent = count;
    var chipS = document.getElementById('chipSubjects');
    if (chipS) chipS.textContent = SUBJECTS.length;
}

// ===== Build Sidebar =====
function buildSidebar() {
    var html = '';
    SUBJECTS.forEach(function(subject, idx) {
        var totalFiles = subject.files.length;
        var expandedClass = idx === 0 ? ' expanded' : '';
        var tone = subjectTone(subject.name);
        html += '<div class="subject-group' + expandedClass + '" data-subject="' + subject.name + '">';
        html += '  <div class="subject-header" onclick="toggleSubject(this)">';
        html += '    <span class="subject-dot" style="--subject-fill: ' + tone.fill + '; --subject-tint: ' + tone.tint + '"></span>';
        html += '    <span class="subject-name">' + subject.name + '</span>';
        html += '    <span class="subject-count" style="--subject-fill: ' + tone.fill + '; --subject-tint: ' + tone.tint + '">' + totalFiles + '</span>';
        html += '    <svg class="subject-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
        html += '  </div>';
        html += '  <div class="subject-files">';
        if (subject.important && subject.important.length) {
            html += '    <div class="important-section">';
            html += '      <div class="important-label" style="color: ' + tone.tint + '">Important Topics</div>';
            html += '      <div class="important-grid">';
            html += subject.important.map(function(imp, i) {
                return '<div class="important-item" title="' + escapeHtml(imp.name) + '" onclick="openFile(\'' + encodeURIComponent(imp.path) + '\', \'' + encodeURIComponent(imp.name) + '\')">' +
                    '<img class="important-thumb" loading="lazy" src="' + escapeHtml(imp.path) + '" alt="' + escapeHtml(imp.name) + '" onerror="this.style.display=\'none\'">' +
                    '<span class="important-index">' + (i + 1) + '</span>' +
                    '</div>';
            }).join('');
            html += '      </div>';
            html += '    </div>';
        }
        html += subject.files.map(function(f) { return fileItemHTML(f, tone); }).join('');
        html += '  </div>';
        html += '</div>';
    });
    subjectList.innerHTML = html;
}

function fileItemHTML(file, tone) {
    var label = getFileLabel(file.path);
    var isFavorite = favorites.indexOf(file.path) !== -1;
    var starIcon = isFavorite ? '★' : '☆';
    var starColor = isFavorite ? tone.tint : 'var(--md-on-surface-variant)';
    var prog = readingProgress[file.path];
    var progBar = (prog && prog.total > 0) ?
        '<span class="file-progress"><span class="file-progress-fill" style="width:' + Math.min(100, Math.max(3, prog.percentage || 0)) + '%"></span></span>' : '';

    return '<div class="file-item" data-path="' + escapeHtml(file.path) + '" onclick="openFile(\'' + encodeURIComponent(file.path) + '\', \'' + encodeURIComponent(file.name) + '\')">' +
        '<div class="file-icon" style="--subject-fill: ' + tone.fill + '; --subject-tint: ' + tone.tint + '">' + label + '</div>' +
        '<span class="file-name" title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>' +
        '<span class="file-size">' + (file.size || '') + '</span>' +
        '<button class="btn-favorite" onclick="event.stopPropagation(); toggleFavorite(\'' + encodeURIComponent(file.path) + '\')" title="' + (isFavorite ? 'Remove from favorites' : 'Add to favorites') + '" style="color: ' + starColor + '">' + starIcon + '</button>' +
        '<button class="btn-dl" onclick="event.stopPropagation(); downloadPdf(\'' + encodeURIComponent(file.path) + '\', \'' + encodeURIComponent(file.name) + '\')" title="Download">' +
        '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
        '</button>' +
        progBar +
        '</div>';
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildSubjectCards() {
    if (!subjectCards) return;
    subjectCards.innerHTML = SUBJECTS.map(function(s, i) {
        var icon = SUBJECT_ICONS[s.name] || SUBJECT_ICONS['default'];
        var tone = subjectTone(s.name);
        return '<button class="subject-card" style="--subject-fill:' + tone.fill + '; --subject-tint:' + tone.tint + '; animation-delay:' + (i * 60) + 'ms" onclick="expandSubject(\'' + s.name + '\')">' +
            '<span class="subject-card-icon">' + icon + '</span>' +
            '<span class="subject-card-info">' +
            '<span class="subject-card-name">' + escapeHtml(s.name) + '</span>' +
            '<span class="subject-card-full">' + escapeHtml(s.fullName) + '</span>' +
            '</span>' +
            '<span class="subject-card-count">' + s.files.length + ' files</span>' +
            '<svg class="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
            '</button>';
    }).join('');
}

// ===== Toggle Subject =====
function toggleSubject(header) { header.parentElement.classList.toggle('expanded'); }

function expandSubject(name) {
    var group = document.querySelector('.subject-group[data-subject="' + name + '"]');
    if (group) {
        document.querySelectorAll('.subject-group').forEach(function(g) { g.classList.remove('expanded'); });
        group.classList.add('expanded');
        // Open the sheet (desktop rail opens the right sheet; mobile opens the bottom sheet)
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setTimeout(function() { group.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 260);
    }
}

// ===== Favorites System =====
function toggleFavorite(encodedPath) {
    var path = decodeURIComponent(encodedPath);
    var index = favorites.indexOf(path);

    if (index === -1) {
        favorites.push(path);
        showNotification('Added to favorites', 'success');
    } else {
        favorites.splice(index, 1);
        showNotification('Removed from favorites', 'info');
    }

    saveUserData();
    buildSidebar();
    updateFavoritesUI();
}

function updateFavoritesUI() {
    // Update favorite stars in sidebar
    document.querySelectorAll('.file-item').forEach(function(item) {
        var path = item.getAttribute('data-path');
        var btn = item.querySelector('.btn-favorite');
        if (btn) {
            var isFavorite = favorites.indexOf(path) !== -1;
            btn.textContent = isFavorite ? '★' : '☆';
            btn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
        }
    });
}

// ===== Recent Files =====
function addToRecent(path, name) {
    // Remove if already exists
    recentFiles = recentFiles.filter(function(f) { return f.path !== path; });

    // Add to beginning
    recentFiles.unshift({ path: path, name: name, timestamp: Date.now() });

    // Keep only last 10
    recentFiles = recentFiles.slice(0, 10);

    saveUserData();
    updateRecentFilesUI();
}

function updateRecentFilesUI() {
    // This will be called to update any recent files display
    // For now, we'll add it to the welcome screen
}

// ===== Reading Progress =====
function saveReadingProgress(path, page, total) {
    readingProgress[path] = {
        page: page,
        total: total,
        timestamp: Date.now(),
        percentage: Math.round((page / total) * 100)
    };
    saveUserData();
}

function getReadingProgress(path) {
    return readingProgress[path] || null;
}

// ===== Notification System =====
function showNotification(message, type) {
    var notification = document.createElement('div');
    notification.className = 'notification notification-' + (type || 'info');
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(function() {
        notification.classList.add('show');
    }, 10);

    setTimeout(function() {
        notification.classList.remove('show');
        setTimeout(function() {
            document.body.removeChild(notification);
        }, 300);
    }, 2500);
}

// ===== Open File =====
function openFile(encodedPath, encodedName) {
    var path = decodeURIComponent(encodedPath);
    var name = decodeURIComponent(encodedName);
    currentPdf = path;
    currentPage = 1;
    zoomScale = 1.0;
    currentFileType = getFileType(path);
    thumbRendered = 0;

    // Add to recent files
    addToRecent(path, name);

    // Check for saved progress
    var progress = getReadingProgress(path);
    if (progress && currentFileType === 'pdf') {
        currentPage = progress.page;
    }

    document.querySelectorAll('.file-item').forEach(function(el) { el.classList.remove('active'); });
    var activeItem = document.querySelector('.file-item[data-path="' + CSS.escape(path) + '"]');
    if (activeItem) activeItem.classList.add('active');

    welcomeScreen.style.display = 'none';
    pdfViewer.style.display = 'flex';
    document.body.classList.add('viewer-open');
    viewerTitle.textContent = name;
    closeSidebar();
    zoomLevelEl.textContent = '100%';

    hideAllViewers();

    var pageControls = [document.getElementById('btnPrevPage'), document.getElementById('btnNextPage'), document.getElementById('btnTwoPage')];
    var pageInfoEls = [pageInfo, pageInfoBot];
    var bottomBar = document.getElementById('viewerBottombar');
    var zoomControls = [document.getElementById('btnZoomIn'), document.getElementById('btnZoomOut'), zoomLevelEl];

    if (currentFileType === 'pdf') {
        pageControls.forEach(function(b) { b.style.display = ''; });
        pageInfoEls.forEach(function(e) { e.style.display = ''; });
        bottomBar.style.display = '';
        zoomControls.forEach(function(e) { e.style.display = ''; });
        openPdfFile(path);
        if (progress && progress.page > 1) showResumeChip(progress.page);
    } else if (currentFileType === 'html') {
        pageControls.forEach(function(b) { b.style.display = 'none'; });
        pageInfoEls.forEach(function(e) { e.style.display = 'none'; });
        bottomBar.style.display = 'none';
        zoomControls.forEach(function(e) { e.style.display = 'none'; });
        openHtmlFile(path);
    } else if (currentFileType === 'img') {
        pageControls.forEach(function(b) { b.style.display = 'none'; });
        pageInfoEls.forEach(function(e) { e.style.display = 'none'; });
        bottomBar.style.display = 'none';
        zoomControls.forEach(function(e) { e.style.display = 'none'; });
        openImageFile(path);
    } else if (currentFileType === 'ppt') {
        pageControls.forEach(function(b) { b.style.display = 'none'; });
        pageInfoEls.forEach(function(e) { e.style.display = 'none'; });
        bottomBar.style.display = 'none';
        zoomControls.forEach(function(e) { e.style.display = 'none'; });
        openPptFile(path, name);
    } else if (currentFileType === 'download' || currentFileType === 'docx') {
        // For PPTX/DOCX files, trigger download instead of trying to display
        downloadPdf(encodedPath, name);
        goBack();
        return;
    }
}

function hideAllViewers() {
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    noteViewer.style.display = 'none';
    imageViewer.style.display = 'none';
    pagesWrapper.style.display = 'none';
    loadingSpinner.classList.remove('visible');
    var fallback = document.getElementById('pptFallback');
    if (fallback) fallback.style.display = 'none';
    var chip = document.getElementById('resumeChip');
    if (chip) chip.remove();
}

// ===== Resume Chip =====
function showResumeChip(page) {
    var old = document.getElementById('resumeChip');
    if (old) old.remove();
    var chip = document.createElement('div');
    chip.className = 'resume-chip';
    chip.id = 'resumeChip';
    chip.innerHTML = 'Resumed at page ' + page +
        '<button class="resume-chip-go" onclick="goBack()">Close</button>';
    pdfCanvasContainer.appendChild(chip);
    setTimeout(function() {
        if (chip.parentNode) chip.parentNode.removeChild(chip);
    }, 5000);
}

// ===== Thumbnail Rail =====
function toggleThumbRail() {
    if (!pdfDoc || currentFileType !== 'pdf') return;
    if (!thumbRail) return;
    var willOpen = !thumbRail.classList.contains('open');
    thumbRail.classList.toggle('open');
    var btn = document.getElementById('btnThumbs');
    if (btn) btn.classList.toggle('active', willOpen);
    if (willOpen) {
        if (!thumbRendered) buildThumbs();
        updateThumbActive();
    }
}

function buildThumbs() {
    if (!thumbRailList || !pdfDoc) return;
    var html = '';
    for (var i = 1; i <= totalPages; i++) {
        html += '<div class="thumb-item" data-page="' + i + '" onclick="goToThumbPage(' + i + ')"><canvas></canvas><span>' + i + '</span></div>';
    }
    thumbRailList.innerHTML = html;
    renderThumbBatch();
}

function renderThumbBatch() {
    if (!pdfDoc) return;
    var target = Math.min(thumbRendered + 15, totalPages);
    for (var p = thumbRendered + 1; p <= target; p++) renderThumb(p);
    thumbRendered = target;
}

async function renderThumb(p) {
    try {
        var page = await pdfDoc.getPage(p);
        var viewport = page.getViewport({ scale: 0.12 });
        var canvas = document.querySelector('.thumb-item[data-page="' + p + '"] canvas');
        if (!canvas) return;
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvasContext: canvas.getContext('2d'), viewport: viewport }).promise;
    } catch (e) { /* skip thumbnails that fail to render */ }
}

function goToThumbPage(p) {
    if (!pdfDoc) return;
    currentPage = p;
    updatePageInfo();
    renderCurrentView();
    pdfCanvasContainer.scrollTop = 0;
    updateThumbActive();
}

function updateThumbActive() {
    if (!thumbRailList || !thumbRailList.children.length) return;
    for (var i = 0; i < thumbRailList.children.length; i++) {
        var it = thumbRailList.children[i];
        it.classList.toggle('active', Number(it.getAttribute('data-page')) === currentPage);
    }
}

function openImageFile(path) {
    loadingSpinner.classList.remove('visible');
    pagesWrapper.style.display = 'none';
    noteViewer.style.display = 'none';
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    imageViewer.style.display = 'flex';
    imageViewer.src = path;
}

function openHtmlFile(path) {
    loadingSpinner.classList.remove('visible');
    pagesWrapper.style.display = 'none';
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    noteViewer.style.display = 'block';
    noteViewer.src = path;
}

// ===== PPT Viewer (Microsoft Office Online embed) =====
function isPublicHost() {
    var h = window.location.hostname;
    return h && h !== 'localhost' && h !== '127.0.0.1' && h.indexOf('192.168.') !== 0 && window.location.protocol !== 'file:';
}

function openPptFile(path, name) {
    loadingSpinner.classList.remove('visible');
    pagesWrapper.style.display = 'none';
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    imageViewer.style.display = 'none';

    var fallback = document.getElementById('pptFallback');

    if (isPublicHost()) {
        // Office Online can only fetch publicly reachable URLs
        var base = window.location.href.replace(/[^/]*$/, '');
        var fileUrl = base + path.split('/').map(encodeURIComponent).join('/');
        noteViewer.style.display = 'block';
        noteViewer.src = 'https://view.officeapps.live.com/op/embed.aspx?src=' + encodeURIComponent(fileUrl);
        if (fallback) fallback.style.display = 'none';
    } else {
        // Local preview: the embed service can't reach this host — offer download
        noteViewer.style.display = 'none';
        if (fallback) {
            fallback.style.display = 'flex';
            var btn = document.getElementById('pptFallbackDownload');
            if (btn) {
                btn.onclick = function() { downloadPdf(encodeURIComponent(path), encodeURIComponent(name)); };
            }
        }
    }
}

async function openPdfFile(path) {
    loadingSpinner.classList.add('visible');
    pagesWrapper.style.display = 'none';
    noteViewer.style.display = 'none';
    try {
        // Fetch only the chunks needed for the current page when the server
        // supports range requests (GitHub Pages does) — big PDFs open much faster.
        var loadingTask = pdfjsLib.getDocument({ url: path, disableAutoFetch: true });
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        updatePageInfo();
        await renderCurrentView();
    } catch (err) {
        console.error('Error loading PDF:', err);
        loadingSpinner.innerHTML = '<div style="color: var(--text-secondary); text-align: center;">' +
            '<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>' +
            '<p style="margin-top: 12px; font-size: 0.9rem; color: #ef4444;">Failed to load PDF</p>' +
            '<p style="margin-top: 6px; font-size: 0.8rem;">Make sure the file exists and try again.</p></div>';
    }
}

// ===== HiDPI Canvas Rendering =====
async function renderPageToCanvas(canvas, pageNum) {
    var page = await pdfDoc.getPage(pageNum);
    var dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Adjust base scale for mobile devices
    var isMobile = window.innerWidth <= 768;
    var baseScale = isMobile ? zoomScale * 1.2 : zoomScale * 1.5;

    var viewport = page.getViewport({ scale: baseScale });

    // On mobile, ensure canvas doesn't exceed container width
    if (isMobile) {
        var container = pdfCanvasContainer;
        var maxWidth = container.clientWidth - 16; // account for padding
        if (viewport.width > maxWidth) {
            var scaleAdjust = maxWidth / viewport.width;
            baseScale *= scaleAdjust;
            viewport = page.getViewport({ scale: baseScale });
        }
    }

    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';

    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    await page.render({ canvasContext: ctx, viewport: viewport }).promise;
}

async function renderCurrentView() {
    if (rendering) { pendingRender = true; return; }
    rendering = true;

    try {
        await renderPageToCanvas(pdfCanvas, currentPage);
        pdfCanvas.style.display = 'block';

        if (twoPageMode && currentPage + 1 <= totalPages) {
            await renderPageToCanvas(pdfCanvas2, currentPage + 1);
            pdfCanvas2.style.display = 'block';
        } else {
            pdfCanvas2.style.display = 'none';
        }

        loadingSpinner.classList.remove('visible');
        pagesWrapper.style.display = 'flex';
    } catch (err) {
        console.error('Error rendering:', err);
    }

    rendering = false;
    if (pendingRender) { pendingRender = false; await renderCurrentView(); }
}

// ===== Navigation =====
function nextPage() {
    var step = twoPageMode ? 2 : 1;
    if (currentPage + step <= totalPages) {
        currentPage += step;
        updatePageInfo();
        renderCurrentView();
        pdfCanvasContainer.scrollTop = 0;
    } else if (twoPageMode && currentPage < totalPages) {
        currentPage = totalPages;
        updatePageInfo();
        renderCurrentView();
        pdfCanvasContainer.scrollTop = 0;
    }
}

function prevPage() {
    var step = twoPageMode ? 2 : 1;
    if (currentPage - step >= 1) {
        currentPage -= step;
        updatePageInfo();
        renderCurrentView();
        pdfCanvasContainer.scrollTop = 0;
    } else if (currentPage > 1) {
        currentPage = 1;
        updatePageInfo();
        renderCurrentView();
        pdfCanvasContainer.scrollTop = 0;
    }
}

function updatePageInfo() {
    var text;
    if (twoPageMode && currentPage + 1 <= totalPages) {
        text = currentPage + '-' + (currentPage + 1) + ' / ' + totalPages;
    } else {
        text = currentPage + ' / ' + totalPages;
    }
    pageInfo.textContent = text;
    pageInfoBot.textContent = text;

    // Update reading progress bar
    if (viewerProgressFill && totalPages > 0) {
        viewerProgressFill.style.width = Math.round((currentPage / totalPages) * 100) + '%';
    }
    updateThumbActive();

    // Save reading progress
    if (currentPdf && totalPages > 0) {
        saveReadingProgress(currentPdf, currentPage, totalPages);
    }
}

// ===== Zoom (cursor-centered via scroll/pinch) =====
function applyZoom(newScale, originX, originY) {
    var container = pdfCanvasContainer;
    var oldScale = zoomScale;
    newScale = Math.max(0.25, Math.min(5.0, newScale));
    if (newScale === oldScale) return;

    var scrollLeft = container.scrollLeft;
    var scrollTop = container.scrollTop;
    var ratio = newScale / oldScale;

    zoomScale = newScale;
    zoomLevelEl.textContent = Math.round(zoomScale * 100) + '%';

    renderCurrentView().then(function() {
        container.scrollLeft = (scrollLeft + originX) * ratio - originX;
        container.scrollTop = (scrollTop + originY) * ratio - originY;
    });
}

function zoomIn() {
    var container = pdfCanvasContainer;
    var cx = container.clientWidth / 2;
    var cy = container.clientHeight / 2;
    applyZoom(zoomScale + 0.25, cx, cy);
}

function zoomOut() {
    var container = pdfCanvasContainer;
    var cx = container.clientWidth / 2;
    var cy = container.clientHeight / 2;
    applyZoom(zoomScale - 0.25, cx, cy);
}

// ===== Two-Page Mode =====
function toggleTwoPageMode() {
    twoPageMode = !twoPageMode;
    var btn = document.getElementById('btnTwoPage');
    btn.classList.toggle('active', twoPageMode);
    if (twoPageMode && currentPage % 2 === 0) { currentPage = Math.max(1, currentPage - 1); }
    updatePageInfo();
    renderCurrentView();
}

// ===== Download =====
function downloadPdf(encodedPath, encodedName) {
    var path = decodeURIComponent(encodedPath);
    var name = encodedName ? decodeURIComponent(encodedName) : '';
    var a = document.createElement('a');
    a.href = encodeURI(path);
    a.download = name || path.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function downloadCurrentPdf() {
    if (currentPdf) downloadPdf(encodeURIComponent(currentPdf), viewerTitle.textContent);
}

// ===== Fullscreen =====
function toggleFullscreen() {
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen(); }
}

// ===== Go Back =====
function goBack() {
    pdfViewer.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    document.body.classList.remove('viewer-open');
    pdfDoc = null;
    currentPdf = null;
    currentFileType = 'pdf';
    thumbRendered = 0;
    hideAllViewers();
    if (thumbRail) thumbRail.classList.remove('open');
    if (thumbRailList) thumbRailList.innerHTML = '';
    var btnT = document.getElementById('btnThumbs');
    if (btnT) btnT.classList.remove('active');
    if (viewerProgressFill) viewerProgressFill.style.width = '0%';
    loadingSpinner.innerHTML = '<div class="spinner"></div><p>Loading document...</p>';
    loadingSpinner.classList.remove('visible');
    noteViewer.src = '';
    imageViewer.src = '';
    document.querySelectorAll('.file-item').forEach(function(el) { el.classList.remove('active'); });
}

// ===== Keyboard Shortcuts Modal =====
function openShortcutsModal() {
    var modal = document.getElementById('shortcutsModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeShortcutsModal() {
    var modal = document.getElementById('shortcutsModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// ===== Search =====
function filterFiles(query) {
    var q = query.toLowerCase().trim();
    var items = document.querySelectorAll('.file-item');
    var groups = document.querySelectorAll('.subject-group');

    if (!q) {
        items.forEach(function(el) { el.style.display = ''; });
        groups.forEach(function(g) { g.style.display = ''; });
        return;
    }

    items.forEach(function(el) {
        var name = el.querySelector('.file-name').textContent.toLowerCase();
        el.style.display = name.indexOf(q) !== -1 ? '' : 'none';
    });

    groups.forEach(function(g) {
        var vis = g.querySelectorAll('.file-item:not([style*="display: none"])');
        g.style.display = vis.length > 0 ? '' : 'none';
        if (vis.length > 0) g.classList.add('expanded');
    });
}

// ===== Page Turn Animation =====
function animatePageTurn(direction) {
    if (!pdfDoc) return;

    var isNext = direction === 'left';
    if (isNext && currentPage >= totalPages) return;
    if (!isNext && currentPage <= 1) return;

    var slideOut = isNext ? 'slideOutLeft' : 'slideOutRight';
    var slideIn = isNext ? 'slideInRight' : 'slideInLeft';

    pagesWrapper.style.animation = slideOut + ' 0.3s ease-in forwards';

    setTimeout(function() {
        if (isNext) nextPage(); else prevPage();
        pagesWrapper.style.animation = slideIn + ' 0.35s ease-out forwards';

        setTimeout(function() {
            pagesWrapper.style.animation = '';
        }, 360);
    }, 280);
}

// ===== Sidebar Mobile =====
function addMobileToggle() {
    var btn = document.createElement('button');
    btn.className = 'mobile-toggle';
    btn.id = 'mobileToggle';
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    btn.onclick = function() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('visible');
    };
    document.body.appendChild(btn);
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    document.querySelectorAll('.bottom-nav-btn, .rail-btn, .rail-fab').forEach(function(b) { b.classList.remove('active'); });
}

// ===== Share =====
function shareSite() {
    var url = window.location.href.split('?')[0].split('#')[0];
    if (navigator.share) {
        navigator.share({ title: 'NoteVault | Semester 5 Materials', text: 'Check out these 5th semester study materials!', url: url }).catch(function() { copyToClipboard(url); });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        var btn = document.getElementById('btnShare');
        var orig = btn.innerHTML;
        btn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>';
        setTimeout(function() { btn.innerHTML = orig; }, 2000);
    });
}

function setNavActive(btn) {
    document.querySelectorAll('.bottom-nav-btn, .rail-btn, .rail-fab').forEach(function(b) { b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
}

// ===== Event Listeners =====
function attachEvents() {
    document.getElementById('btnBack').addEventListener('click', goBack);
    document.getElementById('btnZoomIn').addEventListener('click', zoomIn);
    document.getElementById('btnZoomOut').addEventListener('click', zoomOut);
    document.getElementById('btnNextPage').addEventListener('click', nextPage);
    document.getElementById('btnPrevPage').addEventListener('click', prevPage);
    document.getElementById('btnFullscreen').addEventListener('click', toggleFullscreen);
    document.getElementById('btnTwoPage').addEventListener('click', toggleTwoPageMode);
    document.getElementById('btnDownload').addEventListener('click', downloadCurrentPdf);
    document.getElementById('btnNextPageBot').addEventListener('click', nextPage);
    document.getElementById('btnPrevPageBot').addEventListener('click', prevPage);
    document.getElementById('btnShare').addEventListener('click', shareSite);
    document.getElementById('btnShortcuts').addEventListener('click', openShortcutsModal);
    var btnThumbs = document.getElementById('btnThumbs');
    if (btnThumbs) btnThumbs.addEventListener('click', toggleThumbRail);

    if (thumbRailList) {
        thumbRailList.addEventListener('scroll', function() {
            if (thumbRendered < totalPages && thumbRailList.scrollTop + thumbRailList.clientHeight > thumbRailList.scrollHeight - 400) {
                renderThumbBatch();
            }
        });
    }

    // Bottom navigation (mobile)
    var navHome = document.getElementById('navHome');
    if (navHome) navHome.addEventListener('click', function() {
        if (currentPdf) goBack();
        closeSidebar();
        setNavActive(navHome);
    });
    var navSearch = document.getElementById('navSearch');
    if (navSearch) navSearch.addEventListener('click', function() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setTimeout(function() { searchInput.focus(); }, 350);
        setNavActive(navSearch);
    });
    var navSubjects = document.getElementById('navSubjects');
    if (navSubjects) navSubjects.addEventListener('click', function() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setNavActive(navSubjects);
    });

    // Navigation rail (desktop)
    var railHome = document.getElementById('railHome');
    if (railHome) railHome.addEventListener('click', function() {
        if (currentPdf) goBack();
        closeSidebar();
        setNavActive(railHome);
    });
    var railSearch = document.getElementById('railSearch');
    if (railSearch) railSearch.addEventListener('click', function() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setTimeout(function() { searchInput.focus(); }, 350);
        setNavActive(railSearch);
    });
    var railSubjects = document.getElementById('railSubjects');
    if (railSubjects) railSubjects.addEventListener('click', function() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setNavActive(railSubjects);
    });
    var railFab = document.getElementById('railFab');
    if (railFab) railFab.addEventListener('click', function() {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('visible');
        setNavActive(railFab);
    });

    document.getElementById('sidebarToggle').addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('visible');
    });

    searchInput.addEventListener('input', function(e) { filterFiles(e.target.value); });
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close modal on background click
    document.getElementById('shortcutsModal').addEventListener('click', function(e) {
        if (e.target.id === 'shortcutsModal') {
            closeShortcutsModal();
        }
    });

    // ===== Scroll/Pinch Zoom (like Preview.app) =====
    var zoomTimeout = null;
    pdfCanvasContainer.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            if (!pdfDoc) return;
            var delta = -e.deltaY * 0.01;
            var newScale = zoomScale * (1 + delta);
            var rect = pdfCanvasContainer.getBoundingClientRect();
            var originX = e.clientX - rect.left;
            var originY = e.clientY - rect.top;

            clearTimeout(zoomTimeout);
            zoomTimeout = setTimeout(function() { applyZoom(newScale, originX, originY); }, 80);
        }
    }, { passive: false });

    // ===== Swipe / Horizontal Scroll to change pages =====
    var swipeAccumX = 0;
    var swipeCooldown = false;
    var SWIPE_THRESHOLD = 200;
    var swipeAccumTimer = null;

    pdfCanvasContainer.addEventListener('wheel', function(e) {
        if (e.ctrlKey || e.metaKey) return;
        if (!pdfDoc) return;

        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 && Math.abs(e.deltaX) > 5) {
            var container = pdfCanvasContainer;
            var isScrollableH = container.scrollWidth > container.clientWidth + 5;

            if (!isScrollableH) {
                e.preventDefault();
                if (swipeCooldown) return;

                swipeAccumX += e.deltaX;

                if (swipeAccumX > SWIPE_THRESHOLD) {
                    swipeCooldown = true;
                    swipeAccumX = 0;
                    animatePageTurn('left');
                    setTimeout(function() { swipeCooldown = false; }, 800);
                } else if (swipeAccumX < -SWIPE_THRESHOLD) {
                    swipeCooldown = true;
                    swipeAccumX = 0;
                    animatePageTurn('right');
                    setTimeout(function() { swipeCooldown = false; }, 800);
                }

                clearTimeout(swipeAccumTimer);
                swipeAccumTimer = setTimeout(function() { swipeAccumX = 0; }, 300);
            }
        }
    }, { passive: false });

    // ===== Touch swipe for mobile =====
    var touchStartX = 0;
    var touchStartY = 0;
    var touchStartTime = 0;

    pdfCanvasContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }
    }, { passive: true });

    pdfCanvasContainer.addEventListener('touchend', function(e) {
        if (!pdfDoc) return;
        var dx = e.changedTouches[0].clientX - touchStartX;
        var dy = e.changedTouches[0].clientY - touchStartY;
        var dt = Date.now() - touchStartTime;

        if (dt < 500 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx < 0) { animatePageTurn('left'); }
            else { animatePageTurn('right'); }
        }
    }, { passive: true });

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName === 'INPUT') return;
        switch (e.key) {
            case 'ArrowRight': case 'ArrowDown': if (pdfDoc) { e.preventDefault(); nextPage(); } break;
            case 'ArrowLeft': case 'ArrowUp': if (pdfDoc) { e.preventDefault(); prevPage(); } break;
            case '+': case '=': if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomIn(); } break;
            case '-': if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomOut(); } break;
            case 'Escape':
                if (document.getElementById('shortcutsModal').classList.contains('show')) {
                    closeShortcutsModal();
                } else if (currentPdf) {
                    goBack();
                }
                break;
            case '?':
                e.preventDefault();
                openShortcutsModal();
                break;
        }
    });

    // Cmd/Ctrl + scroll for zoom (native browser zoom prevention)
    document.addEventListener('wheel', function(e) {
        if ((e.ctrlKey || e.metaKey) && pdfDoc) {
            e.preventDefault();
        }
    }, { passive: false });

    // Handle window resize / orientation change
    var resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (pdfDoc && currentFileType === 'pdf') {
                renderCurrentView();
            }
        }, 300);
    });

    // Prevent pull-to-refresh on mobile when viewing PDFs
    document.body.addEventListener('touchmove', function(e) {
        if (pdfViewer.style.display === 'flex' && window.scrollY === 0) {
            // Allow scrolling but prevent pull-to-refresh
        }
    }, { passive: true });
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
