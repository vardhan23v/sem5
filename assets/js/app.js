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
            { name: "CNC Lab Manual.pdf", path: "CNC/CSE_CNC_LAB_MANUAL-20CS502_2023.pdf", size: "767 KB" },
            { name: "Computer Networks — Unit 1", path: "CNC/unit1-computer-networks_1.html", size: "56 KB" }
        ]
    },
    {
        name: "OS",
        fullName: "Operating Systems",
        color: "#3b82f6",
        files: [
            { name: "OS Unit 1.pdf", path: "OS/OS UNIT 1.pdf", size: "10.5 MB" },
            { name: "OS Unit 2.pdf", path: "OS/OS UNIT 2.pdf", size: "16.8 MB" },
            { name: "OS Unit 3.pdf", path: "OS/OS UNIT 3.pdf", size: "8.8 MB" }
        ]
    },
    {
        name: "TOC",
        fullName: "Theory of Computation",
        color: "#a855f7",
        files: [
            { name: "TOC Unit 1 — Automata (Master Notes).pdf", path: "TOC/TOC_Unit1_Automata_Master_Notes.pdf", size: "1.0 MB" },
            { name: "TOC Unit 1 — Automata (HTML)", path: "TOC/unit1-theory-of-computation.html", size: "33 KB" }
        ]
    },
    {
        name: "Data Science",
        fullName: "Introduction to Data Science",
        color: "#10b981",
        files: [
            { name: "Data Science — Master Notes", path: "Data Science/data-science-master-notes.html", size: "57 KB" },
            { name: "Data Analysis — Detailed Notes", path: "Data Science/unit1-detailed-notes.html", size: "52 KB" }
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

// ===== File Type Detection =====
function getFileType(path) {
    var ext = path.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (ext === 'html') return 'html';
    return 'pdf';
}

function getFileLabel(path) {
    var ext = path.split('.').pop().toLowerCase();
    if (ext === 'html') return 'HTML';
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

// ===== Initialize =====
function init() {
    try {
        buildSidebar();
        buildQuickSubjects();
        countPdfs();
        attachEvents();
        addMobileToggle();
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

function countPdfs() {
    var count = 0;
    SUBJECTS.forEach(function(s) { count += s.files.length; });
    totalPdfsEl.textContent = count;
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
    return '<div class="file-item" data-path="' + file.path + '" onclick="openFile(\'' + encodeURIComponent(file.path) + '\', \'' + escapeHtml(file.name) + '\')">' +
        '<div class="file-icon" style="background: ' + color + '22; color: ' + color + '">' + label + '</div>' +
        '<span class="file-name" title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>' +
        '<span class="file-size">' + (file.size || '') + '</span>' +
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

// ===== Open File =====
function openFile(encodedPath, name) {
    var path = decodeURIComponent(encodedPath);
    currentPdf = path;
    currentPage = 1;
    zoomScale = 1.0;
    currentFileType = getFileType(path);

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
    }
}

function hideAllViewers() {
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    noteViewer.style.display = 'none';
    pagesWrapper.style.display = 'none';
    loadingSpinner.classList.remove('visible');
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
    var baseScale = zoomScale * 1.5;
    var viewport = page.getViewport({ scale: baseScale });

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
    document.querySelectorAll('.file-item').forEach(function(el) { el.classList.remove('active'); });
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
    document.getElementById('sidebarToggle').addEventListener('click', function() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('visible');
    });

    searchInput.addEventListener('input', function(e) { filterFiles(e.target.value); });
    sidebarOverlay.addEventListener('click', closeSidebar);

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
            case 'Escape': if (pdfDoc || currentFileType === 'html') goBack(); break;
        }
    });

    // Cmd/Ctrl + scroll for zoom (native browser zoom prevention)
    document.addEventListener('wheel', function(e) {
        if ((e.ctrlKey || e.metaKey) && pdfDoc) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
