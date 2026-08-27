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
        files: [
            { name: "CNC Unit 1.pdf", path: "CNC/CNC UNIT 1.pdf", size: "27.0 MB" },
            { name: "CNC Unit 2.pdf", path: "CNC/CNC UNIT 2.pdf", size: "23.1 MB" },
            { name: "Computer Networks — Unit 1 (HTML)", path: "CNC/unit1-computer-networks_1.html", size: "56 KB" },
            { name: "Unit 1 — Mastery Notes (HTML)", path: "CNC/CS3001-1_Unit1_Notes.html", size: "76 KB" },
            { name: "Unit 1 Chapter 1 (PPT)", path: "CNC/ppts/UNIT-1 Chap-1.pptx", size: "7.6 MB" },
            { name: "Unit 1 Chapter 2 (PPT)", path: "CNC/ppts/UNIT-1 Chap-2.pptx", size: "3.4 MB" }
        ]
    },
    {
        name: "OS",
        fullName: "Operating Systems",
        color: "#3b82f6",
        files: [
            { name: "OS Unit 1.pdf", path: "OS/OS UNIT 1.pdf", size: "10.5 MB" },
            { name: "OS Unit 2.pdf", path: "OS/OS UNIT 2.pdf", size: "16.8 MB" },
            { name: "OS Unit 3.pdf", path: "OS/OS UNIT 3.pdf", size: "8.8 MB" },
            { name: "Unit 1 — OS Structure & Scheduling (HTML)", path: "OS/CS2004-1_Unit1_OS_Notes.html", size: "56 KB" },
            { name: "Notes — Page 1 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.09.28.jpeg", size: "96 KB" },
            { name: "Notes — Page 2 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.10.26.jpeg", size: "339 KB" },
            { name: "Ch 1 — Operating System Structure (PPT)", path: "OS/ppts/CH_1_OPERATING SYSTEM STRUCTURE.pptx", size: "2.2 MB" },
            { name: "Ch 2 — Process Management (PPT)", path: "OS/ppts/CH_2_PROCESS MANAGEMENT.pptx", size: "2.6 MB" },
            { name: "Ch 3 — Threads (PPT)", path: "OS/ppts/CH3_THREADS.pptx", size: "1.9 MB" },
            { name: "Ch 4 — CPU Scheduling (PPT)", path: "OS/ppts/CH4_CPU SCHEDULING.pptx", size: "2.4 MB" },
            { name: "OS Syllabus.pdf", path: "OS/ppts/OS syllabus.pdf", size: "166 KB" },
            { name: "Assignment Document", path: "OS/ppts/nnm24cs251.docx", size: "8.7 KB" }
        ]
    },
    {
        name: "TOC",
        fullName: "Theory of Computation",
        color: "#a855f7",
        files: [
            { name: "TOC Unit 1 — Automata (Master Notes).pdf", path: "TOC/TOC_Unit1_Automata_Master_Notes.pdf", size: "1.0 MB" },
            { name: "TOC Unit 1 — Automata (HTML)", path: "TOC/unit1-theory-of-computation.html", size: "33 KB" },
            { name: "Unit 1 — Automata Solved & Animated (HTML)", path: "TOC/CS3103-1_Unit1_TOC_Notes.html", size: "48 KB" },
            { name: "DFA Mastery — Live Machines (HTML)", path: "TOC/CS3103-1_DFA_Mastery.html", size: "44 KB" }
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
    if (ext === 'pptx' || ext === 'ppt') return 'download';
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
var quickSubjects = document.getElementById('quickSubjects');
var noteViewer = document.getElementById('noteViewer');
var imageViewer = document.getElementById('imageViewer');

// ===== Initialize =====
function init() {
    try {
        loadUserData();
        buildSidebar();
        buildQuickSubjects();
        countPdfs();
        attachEvents();
        addMobileToggle();
        updateFavoritesUI();
        updateRecentFilesUI();
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
}

// ===== Build Sidebar =====
function buildSidebar() {
    var html = '';
    SUBJECTS.forEach(function(subject, idx) {
        var totalFiles = subject.files.length;
        var expandedClass = idx === 0 ? ' expanded' : '';
        html += '<div class="subject-group' + expandedClass + '" data-subject="' + subject.name + '">';
        html += '  <div class="subject-header" onclick="toggleSubject(this)">';
        html += '    <span class="subject-dot" style="color: ' + subject.color + '; background: ' + subject.color + '"></span>';
        html += '    <span class="subject-name">' + subject.name + '</span>';
        html += '    <span class="subject-count">' + totalFiles + '</span>';
        html += '    <svg class="subject-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>';
        html += '  </div>';
        html += '  <div class="subject-files">';
        html += subject.files.map(function(f) { return fileItemHTML(f, subject.color); }).join('');
        html += '  </div>';
        html += '</div>';
    });
    subjectList.innerHTML = html;
}

function fileItemHTML(file, color) {
    var label = getFileLabel(file.path);
    var isFavorite = favorites.indexOf(file.path) !== -1;
    var starIcon = isFavorite ? '★' : '☆';
    var starColor = isFavorite ? color : 'var(--text-muted)';
    
    return '<div class="file-item" data-path="' + file.path + '" onclick="openFile(\'' + encodeURIComponent(file.path) + '\', \'' + escapeHtml(file.name) + '\')">' +
        '<div class="file-icon" style="background: ' + color + '22; color: ' + color + '">' + label + '</div>' +
        '<span class="file-name" title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>' +
        '<span class="file-size">' + (file.size || '') + '</span>' +
        '<button class="btn-favorite" onclick="event.stopPropagation(); toggleFavorite(\'' + encodeURIComponent(file.path) + '\')" title="' + (isFavorite ? 'Remove from favorites' : 'Add to favorites') + '" style="color: ' + starColor + '">' + starIcon + '</button>' +
        '<button class="btn-dl" onclick="event.stopPropagation(); downloadPdf(\'' + encodeURIComponent(file.path) + '\', \'' + escapeHtml(file.name) + '\')" title="Download">' +
        '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>' +
        '</button>' +
        '</div>';
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildQuickSubjects() {
    quickSubjects.innerHTML = SUBJECTS.map(function(s) {
        return '<button class="quick-btn" onclick="expandSubject(\'' + s.name + '\')" style="border-color: ' + s.color + '30; color: ' + s.color + '">' + s.name + '</button>';
    }).join('');
}

// ===== Toggle Subject =====
function toggleSubject(header) { header.parentElement.classList.toggle('expanded'); }

function expandSubject(name) {
    var group = document.querySelector('.subject-group[data-subject="' + name + '"]');
    if (group) {
        document.querySelectorAll('.subject-group').forEach(function(g) { g.classList.remove('expanded'); });
        group.classList.add('expanded');
        group.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
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
function openFile(encodedPath, name) {
    var path = decodeURIComponent(encodedPath);
    currentPdf = path;
    currentPage = 1;
    zoomScale = 1.0;
    currentFileType = getFileType(path);

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
    viewerTitle.textContent = name;
    zoomLevelEl.textContent = '100%';
    closeSidebar();

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

async function openPdfFile(path) {
    loadingSpinner.classList.add('visible');
    pagesWrapper.style.display = 'none';
    noteViewer.style.display = 'none';
    try {
        var loadingTask = pdfjsLib.getDocument(path);
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
    var dpr = window.devicePixelRatio || 1;
    
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
function downloadPdf(encodedPath, name) {
    var path = decodeURIComponent(encodedPath);
    var a = document.createElement('a');
    a.href = path;
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
    pdfDoc = null;
    currentPdf = null;
    currentFileType = 'pdf';
    hideAllViewers();
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
    if (window.innerWidth <= 768) {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('visible');
    }
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
            var delta = -e.deltaY * 0.01;
            var newScale = zoomScale * (1 + delta);
            var rect = pdfCanvasContainer.getBoundingClientRect();
            var originX = e.clientX - rect.left;
            var originY = e.clientY - rect.top;

            zoomScale = Math.max(0.25, Math.min(5.0, newScale));
            zoomLevelEl.textContent = Math.round(zoomScale * 100) + '%';

            clearTimeout(zoomTimeout);
            zoomTimeout = setTimeout(function() { renderCurrentView(); }, 80);
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
                } else if (pdfDoc || currentFileType === 'html') {
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
