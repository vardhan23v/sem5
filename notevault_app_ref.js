// ===== File Data Structure =====
const SUBJECTS = [
    {
        name: "DAA",
        fullName: "Design & Analysis of Algorithms",
        color: "#f97316",
        files: [
            { name: "DAA SEE.pdf", path: "DAA/DAA SEE.pdf", size: "15.2 MB" },
            { name: "DAA Study Guide.pdf", path: "DAA/DAA_Study_Guide.pdf", size: "43 KB" }
        ],
        subcategories: [
            {
                name: "MCQ",
                files: [
                    { name: "DAA Unit 1 MCQ Bank.pdf", path: "DAA/mcq/DAA_Unit 1_MCQ BANK.pdf", size: "404 KB" },
                    { name: "DAA Unit 2.pdf", path: "DAA/mcq/DAA_Unit 2.pdf", size: "649 KB" },
                    { name: "DAA Textbook.pdf", path: "DAA/mcq/Design & Analysis of Algorithm  textbook.pdf", size: "2.4 MB" }
                ]
            },
            {
                name: "1,2,3 Units Notes",
                files: [
                    { name: "DAA Unit 1.pdf", path: "DAA/1,2,3 units notes /DAA_Unit 1.pdf", size: "11.6 MB" },
                    { name: "DAA Unit 2.pdf", path: "DAA/1,2,3 units notes /DAA_Unit 2.pdf", size: "10.7 MB" },
                    { name: "DAA Unit 3.pdf", path: "DAA/1,2,3 units notes /DAA_unit3.pdf", size: "5.3 MB" }
                ]
            },

            {
                name: "Slides",
                files: [
                    { name: "DAA Unit 1 Slides.pptx", path: "DAA/sslides/DAA_UNIT_1.pptx", size: "14.5 MB" },
                    { name: "DAA Unit 2 Slides.pptx", path: "DAA/sslides/DAA_UNIT_2.pptx", size: "21.7 MB" },
                    { name: "DAA Unit 3 Slides.pptx", path: "DAA/sslides/DAA_UNIT_3.pptx", size: "38.6 MB" },
                    { name: "DAA Unit 3 Slides (v2).pptx", path: "DAA/sslides/DAA_UNIT_3 (1).pptx", size: "21.3 MB" },
                    { name: "DAA Unit 5 Slides.pptx", path: "DAA/sslides/DAA_UNIT_5.pptx", size: "36.6 MB" },
                    { name: "Bellman Ford Algorithm.pptx", path: "DAA/sslides/BELLMAN FORD ALGORITHM.pptx", size: "33.5 MB" },
                    { name: "Greedy Technique.pptx", path: "DAA/sslides/GREEDY TECHNIQUE.pptx", size: "48.9 MB" }
                ]
            }
        ]
    },
    {
        name: "DBMS",
        fullName: "Database Management Systems",
        color: "#3b82f6",
        files: [
            { name: "DBMS SQL Basics.pdf", path: "DBMS/DBMS-SQL-BASICS-updated.pdf", size: "1.4 MB" },
            { name: "DBMS MSE2 QB.pdf", path: "DBMS/DBMS_MSE2_QB.pdf", size: "4.5 MB" },
            { name: "Database Systems Guide 2.pdf", path: "DBMS/DatabaseSystems_Guide 2.pdf", size: "456 KB" },
            { name: "Database Systems Guide.docx", path: "DBMS/DatabaseSystems_Guide.docx", size: "27 KB" },
            { name: "Neat Notes DBMS.pdf", path: "DBMS/Neat notes DBMS.pdf", size: "9.1 MB" },
            { name: "QB Unit 2 Answers.pdf", path: "DBMS/QB_Unit2_Answers.pdf", size: "44 KB" },
            { name: "Relational Model & Algebra.pdf", path: "DBMS/Relational model and Relational Algebra (1).pdf", size: "3.0 MB" },
            { name: "Database Design.pptx", path: "DBMS/1. Database design (1).pptx", size: "1.1 MB" },
            { name: "SQL Language Slides.pptx", path: "DBMS/Structured Query Lang-update.pptx", size: "1.7 MB" },
            { name: "DBMS Notes Image 1.jpeg", path: "DBMS/WhatsApp Image 2026-04-02 at 21.31.57.jpeg", size: "1.4 MB" },
            { name: "DBMS Notes Image 2.jpeg", path: "DBMS/WhatsApp Image 2026-04-02 at 21.31.58.jpeg", size: "970 KB" }
        ],
        subcategories: [
            {
                name: "Unit 3",
                files: [
                    { name: "Ch8 Storage & Indexing Overview.pdf", path: "DBMS/DBMS-UNIT-3/Ch8_Storage_Indexing_Overview (2).pdf", size: "1.2 MB" },
                    { name: "Ch9 Disks & Files.pdf", path: "DBMS/DBMS-UNIT-3/Ch9_Disks_Files.pdf", size: "1.1 MB" },
                    { name: "Ch10 Tree Index.pdf", path: "DBMS/DBMS-UNIT-3/Ch10_Tree_Index.pdf", size: "1.0 MB" },
                    { name: "Ch12 Overview Query Evaluation.pdf", path: "DBMS/DBMS-UNIT-3/Ch12_Overview_Query_Evaluation.pdf", size: "912 KB" },
                    { name: "Ch17 Concurrency Control.pdf", path: "DBMS/DBMS-UNIT-3/Ch17_CC-95.pdf", size: "2.1 MB" },
                    { name: "Ch16 Transactions.pptx", path: "DBMS/DBMS-UNIT-3/ch16-Transaction.pptx", size: "586 KB" },
                    { name: "DBMS Complete Guide.html", path: "DBMS/DBMS-UNIT-3/dbmsunit3.html", size: "105 KB" }
                ]
            }
        ]
    },
    {
        name: "M4",
        fullName: "Mathematics IV",
        color: "#10b981",
        files: [
            { name: "4th Sem Math 2025.pdf", path: "M4/4TH SEM MATH 2025.pdf", size: "1.4 MB" },
            { name: "Maths Unit 3 (New).pdf", path: "M4/Maths unit 3.pdf", size: "8.5 MB" },
            { name: "Maths Unit 3 (FSEC).pdf", path: "M4/Maths unit 3_fsec.pdf", size: "8.5 MB" },
            { name: "MAT Unit 2.pdf", path: "M4/MAT Unit 2.pdf", size: "22.4 MB" },
            { name: "Maths Sem4 Unit 2.pdf", path: "M4/maths_sem4_unit2 E.pdf", size: "32.7 MB" },
            { name: "MSE 1 Handwritten Notes.pdf", path: "M4/mse 1 hand written.pdf", size: "23.7 MB" },
            { name: "MSE 1 Handwritten Notes 2.pdf", path: "M4/mse 1 hand written 2.pdf", size: "23.7 MB" },
            { name: "M4 MCQ Bank.pdf", path: "M4/MCQ MA2005-1.pdf", size: "294 KB" }
        ],
        subcategories: [
            {
                name: "Images",
                files: [
                    { name: "Math Notes Image 1.jpeg", path: "M4/WhatsApp Image 2026-04-02 at 21.31.55.jpeg", size: "617 KB" },
                    { name: "Math Notes Image 2.jpeg", path: "M4/WhatsApp Image 2026-04-02 at 21.31.56.jpeg", size: "650 KB" },
                    { name: "Math Notes Image 3.jpeg", path: "M4/WhatsApp Image 2026-04-03 at 14.33.19.jpeg", size: "458 KB" },
                    { name: "Math Notes Image 4.jpeg", path: "M4/WhatsApp Image 2026-04-05 at 18.22.19.jpeg", size: "83 KB" }
                ]
            }
        ]
    },
    {
        name: "MP & ES",
        fullName: "Microprocessor & Embedded Systems",
        color: "#ef4444",
        files: [
            { name: "MP SEE.pdf", path: "MP & ES/MP SEE.pdf", size: "15.8 MB" },
            { name: "Unit 2 Complete Guide.pdf", path: "MP & ES/Unit2_Complete_Guide.pdf", size: "46 KB" }
        ],
        subcategories: [
            {
                name: "Unit 1",
                files: [
                    { name: "8086 Detailed 10-Mark Answers.pdf", path: "MP & ES/mp unit 1/8086_Detailed_10Mark_Answers.pdf", size: "97 KB" },
                    { name: "8086 Master Exam Guide.pdf", path: "MP & ES/mp unit 1/8086_Master_Exam_Guide.pdf", size: "57 KB" },
                    { name: "MP Unit 1 QBank.pdf", path: "MP & ES/mp unit 1/MP_UNIT1_QBANK_copy.pdf", size: "299 KB" },
                    { name: "8086 Architecture.ppt", path: "MP & ES/mp unit 1/1_Architecture (1).ppt", size: "1.4 MB" },
                    { name: "8086 Instruction Set.ppt", path: "MP & ES/mp unit 1/3-8086 instruction set-1.ppt", size: "1.5 MB" },
                    { name: "8086 Assembler Directives.pptx", path: "MP & ES/mp unit 1/4-8086 Assembler Directives.pptx", size: "98 KB" },
                    { name: "Addressing Modes.pptx", path: "MP & ES/mp unit 1/Addressing modes.pptx", size: "296 KB" }
                ]
            },
            {
                name: "Unit 2",
                files: [
                    { name: "Modular Programming.pptx", path: "MP & ES/mp unit 2/1-Modular Programming.pptx", size: "84 KB" },
                    { name: "Data Conversions.pptx", path: "MP & ES/mp unit 2/2-Data Conversions.pptx", size: "94 KB" },
                    { name: "Keyboard & Video Display.pptx", path: "MP & ES/mp unit 2/3-Using the Key Board and Video Display modified.pptx", size: "124 KB" },
                    { name: "ARM Processor & Embedded Systems.pptx", path: "MP & ES/mp unit 2/4.ARM processor and embeded system.pptx", size: "539 KB" },
                    { name: "Embedded C Programming.ppt", path: "MP & ES/mp unit 2/5.Embedded C Programming - modified.ppt", size: "3.9 MB" },
                    { name: "MP Unit 2 Notes Image.jpeg", path: "MP & ES/mp unit 2/WhatsApp Image 2026-04-02 at 21.31.57.jpeg", size: "980 KB" }
                ]
            },
            {
                name: "Unit 3",
                files: [
                    { name: "Instruction Formats.ppt", path: "MP & ES/mp unit 3/1-Instruction Formats.ppt", size: "3.7 MB" },
                    { name: "8086 Interrupts & 8259A.ppt", path: "MP & ES/mp unit 3/3-8086Interrupts and 8259A.ppt", size: "461 KB" },
                    { name: "Hardware Specifications 8086.ppt", path: "MP & ES/mp unit 3/hardware specifications-8086.ppt", size: "3.3 MB" }
                ]
            },
            {
                name: "Question Banks & PYQP",
                files: [
                    { name: "MP SEE PYQP.pdf", path: "MP & ES/MP_QB_AND_PYQP/MP SEE_pyqp.pdf", size: "16.5 MB" },
                    { name: "MP Unit 1 QBank.docx", path: "MP & ES/MP_QB_AND_PYQP/MP_UNIT1_QBANK.docx", size: "18 KB" },
                    { name: "MP Unit 2 QBank.docx", path: "MP & ES/MP_QB_AND_PYQP/MP_UNIT2_QBANK.docx", size: "19 KB" },
                    { name: "MP Unit 3 QBank.docx", path: "MP & ES/MP_QB_AND_PYQP/MP_UNIT3_QBANK.docx", size: "17 KB" },
                    { name: "MP MSE1 QB.pdf", path: "MP & ES/MP_QB_AND_PYQP/mp_mse1_qb.pdf", size: "248 KB" }
                ]
            }
        ]
    },
    {
        name: "SEPM",
        fullName: "Software Engineering & Project Management",
        color: "#a855f7",
        files: [
            { name: "Essential Attributes of Good Software.pdf", path: "SEPM/Essential attributes of good software.pdf", size: "241 KB" },
            { name: "SEPM Notes.pdf", path: "SEPM/SEPM Notes.pdf", size: "12.8 MB" },
            { name: "SEPM SEE.pdf", path: "SEPM/SEPM SEE.pdf", size: "25.0 MB" },
            { name: "SEPM Unit 1.pdf", path: "SEPM/SEPM UNIT 1.pdf", size: "4.8 MB" },
            { name: "SEPM Unit 2.pdf", path: "SEPM/SEPM UNIT 2.pdf", size: "3.3 MB" },
            { name: "What is a Context Model.pdf", path: "SEPM/What is a Context Model.pdf", size: "1.3 MB" },
            { name: "SEE Preparation.pdf", path: "SEPM/see.pdf", size: "16.8 MB" },
            { name: "SEPM 10-Mark Answers.pdf", path: "SEPM/sepm_10mark_answers.pdf", size: "3.1 MB" },
            { name: "Unit 2.pdf", path: "SEPM/unit 2 .pdf", size: "317 KB" }
        ],
        subcategories: [
            {
                name: "Photos",
                files: [
                    { name: "SEPM Notes Photo 1.jpg", path: "SEPM/PHOTO-2026-05-07-21-16-20.jpg", size: "115 KB" },
                    { name: "SEPM Notes Photo 2.jpg", path: "SEPM/PHOTO-2026-05-07-21-16-52.jpg", size: "133 KB" },
                    { name: "SEPM Notes Photo 3.jpg", path: "SEPM/PHOTO-2026-05-07-21-17-26.jpg", size: "175 KB" },
                    { name: "SEPM Notes Photo 4.jpg", path: "SEPM/PHOTO-2026-05-07-21-17-26 2.jpg", size: "129 KB" },
                    { name: "SEPM Notes Photo 5.jpg", path: "SEPM/PHOTO-2026-05-07-21-17-27.jpg", size: "165 KB" },
                    { name: "SEPM Notes Photo 6.jpg", path: "SEPM/PHOTO-2026-05-07-21-17-27 2.jpg", size: "185 KB" }
                ]
            }
        ]
    }
];

const ROOT_PDFS = [
    { name: "4th Sem 2025 QP.pdf", path: "4TH SEM 2025 QP.pdf", size: "5.6 MB" },
    { name: "Complete Question Bank.pdf", path: "COMPLETE_QUESTION_BANK.pdf", size: "12.6 MB" }
];

// ===== State =====
let currentPdf = null;
let pdfDoc = null;
let currentPage = 1;
let totalPages = 0;
let zoomScale = 1.0;
let rendering = false;
let pendingRender = null;
let twoPageMode = false;
let currentFileType = 'pdf'; // 'pdf', 'ppt', 'image'

// ===== File Type Detection =====
function getFileType(path) {
    const ext = path.split('.').pop().toLowerCase();
    if (ext === 'pdf') return 'pdf';
    if (['ppt', 'pptx', 'doc', 'docx', 'html'].includes(ext)) return 'ppt';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp'].includes(ext)) return 'image';
    return 'pdf';
}

function getFileLabel(path) {
    const ext = path.split('.').pop().toLowerCase();
    if (['doc', 'docx'].includes(ext)) return 'DOC';
    
    const t = getFileType(path);
    if (t === 'ppt') return 'PPT';
    if (t === 'image') return 'IMG';
    return 'PDF';
}

function getFileIconClass(path) {
    const ext = path.split('.').pop().toLowerCase();
    if (['doc', 'docx'].includes(ext)) return 'doc';
    
    const t = getFileType(path);
    if (t === 'ppt') return 'ppt';
    if (t === 'image') return 'img';
    return '';
}

// ===== DOM Elements =====
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
const subjectList = document.getElementById('subjectList');
const searchInput = document.getElementById('searchInput');
const totalPdfsEl = document.getElementById('totalPdfs');
const welcomeScreen = document.getElementById('welcomeScreen');
const pdfViewer = document.getElementById('pdfViewer');
const viewerTitle = document.getElementById('viewerTitle');
const pdfCanvas = document.getElementById('pdfCanvas');
const pdfCanvas2 = document.getElementById('pdfCanvas2');
const pagesWrapper = document.getElementById('pagesWrapper');
const pdfCanvasContainer = document.getElementById('pdfCanvasContainer');
const loadingSpinner = document.getElementById('loadingSpinner');
const pageInfo = document.getElementById('pageInfo');
const pageInfoBot = document.getElementById('pageInfoBot');
const zoomLevelEl = document.getElementById('zoomLevel');
const quickSubjects = document.getElementById('quickSubjects');

// ===== Initialize =====
function init() {
    try {
        buildSidebar();
        buildQuickSubjects();
        countPdfs();
        attachEvents();
        addMobileToggle();
        console.log("NoteVault initialized successfully.");
    } catch (err) {
        console.error("Initialization failed:", err);
    }
}

function countPdfs() {
    let count = ROOT_PDFS.length;
    SUBJECTS.forEach(s => {
        count += s.files.length;
        s.subcategories.forEach(sc => { count += sc.files.length; });
    });
    totalPdfsEl.textContent = count;
}

// ===== Build Sidebar =====
function buildSidebar() {
    let html = '';
    if (ROOT_PDFS.length > 0) {
        html += `
        <div class="subject-group expanded" data-subject="general">
            <div class="subject-header" onclick="toggleSubject(this)">
                <span class="subject-dot" style="color: var(--clr-general); background: var(--clr-general)"></span>
                <span class="subject-name">General</span>
                <span class="subject-count">${ROOT_PDFS.length}</span>
                <svg class="subject-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <div class="subject-files">
                ${ROOT_PDFS.map(f => fileItemHTML(f, 'var(--clr-general)')).join('')}
            </div>
        </div>`;
    }
    SUBJECTS.forEach(subject => {
        const totalFiles = subject.files.length + subject.subcategories.reduce((a, sc) => a + sc.files.length, 0);
        html += `
        <div class="subject-group" data-subject="${subject.name}">
            <div class="subject-header" onclick="toggleSubject(this)">
                <span class="subject-dot" style="color: ${subject.color}; background: ${subject.color}"></span>
                <span class="subject-name">${subject.name}</span>
                <span class="subject-count">${totalFiles}</span>
                <svg class="subject-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            </div>
            <div class="subject-files">
                ${subject.files.map(f => fileItemHTML(f, subject.color)).join('')}
                ${subject.subcategories.map(sc => subcategoryHTML(sc, subject.color)).join('')}
            </div>
        </div>`;
    });
    subjectList.innerHTML = html;
}

function fileItemHTML(file, color, isSub = false) {
    const label = getFileLabel(file.path);
    const iconCls = getFileIconClass(file.path);
    return `
    <div class="file-item ${isSub ? 'sub-file' : ''}" data-path="${file.path}" onclick="openFile('${encodeURIComponent(file.path)}', '${escapeHtml(file.name)}')">
        <div class="file-icon ${iconCls}" style="background: ${color}22; color: ${color}">${label}</div>
        <span class="file-name" title="${escapeHtml(file.name)}">${escapeHtml(file.name)}</span>
        <span class="file-size">${file.size}</span>
        <button class="btn-dl" onclick="event.stopPropagation(); downloadPdf('${encodeURIComponent(file.path)}', '${escapeHtml(file.name)}')" title="Download">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        </button>
    </div>`;
}

function subcategoryHTML(sc, color) {
    return `
    <div class="subcategory">
        <div class="subcategory-header" onclick="toggleSubcategory(this)">
            <svg class="subcategory-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <span class="subcategory-name">${escapeHtml(sc.name)}</span>
            <span class="subject-count">${sc.files.length}</span>
        </div>
        <div class="subcategory-files">
            ${sc.files.map(f => fileItemHTML(f, color, true)).join('')}
        </div>
    </div>`;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function buildQuickSubjects() {
    quickSubjects.innerHTML = SUBJECTS.map(s =>
        `<button class="quick-btn" onclick="expandSubject('${s.name}')" style="border-color: ${s.color}30; color: ${s.color}">${s.name}</button>`
    ).join('');
}

// ===== Toggle Subject =====
function toggleSubject(header) { header.parentElement.classList.toggle('expanded'); }
function toggleSubcategory(header) { header.parentElement.classList.toggle('expanded'); }

function expandSubject(name) {
    const group = document.querySelector(`.subject-group[data-subject="${name}"]`);
    if (group) {
        document.querySelectorAll('.subject-group').forEach(g => g.classList.remove('expanded'));
        group.classList.add('expanded');
        group.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

// ===== Open File (multi-format) =====
function openFile(encodedPath, name) {
    const path = decodeURIComponent(encodedPath);
    currentPdf = path;
    currentPage = 1;
    zoomScale = 1.0;
    currentFileType = getFileType(path);

    document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
    const activeItem = document.querySelector(`.file-item[data-path="${CSS.escape(path)}"]`);
    if (activeItem) activeItem.classList.add('active');

    welcomeScreen.style.display = 'none';
    pdfViewer.style.display = 'flex';
    viewerTitle.textContent = name;
    zoomLevelEl.textContent = '100%';
    closeSidebar();

    // Hide all viewer types first
    hideAllViewers();

    // Show/hide controls based on type
    const pageControls = [document.getElementById('btnPrevPage'), document.getElementById('btnNextPage'), document.getElementById('btnTwoPage')];
    const pageInfoEls = [pageInfo, pageInfoBot];
    const bottomBar = document.getElementById('viewerBottombar');
    const zoomControls = [document.getElementById('btnZoomIn'), document.getElementById('btnZoomOut'), zoomLevelEl];

    if (currentFileType === 'pdf') {
        pageControls.forEach(b => b.style.display = '');
        pageInfoEls.forEach(e => e.style.display = '');
        bottomBar.style.display = '';
        zoomControls.forEach(e => e.style.display = '');
        openPdfFile(path);
    } else if (currentFileType === 'image') {
        pageControls.forEach(b => b.style.display = 'none');
        pageInfoEls.forEach(e => e.style.display = 'none');
        bottomBar.style.display = 'none';
        zoomControls.forEach(e => e.style.display = '');
        openImageFile(path);
    } else if (currentFileType === 'ppt') {
        pageControls.forEach(b => b.style.display = 'none');
        pageInfoEls.forEach(e => e.style.display = 'none');
        bottomBar.style.display = 'none';
        zoomControls.forEach(e => e.style.display = 'none');
        openPptFile(path, name);
    }
}

function hideAllViewers() {
    pdfCanvas.style.display = 'none';
    pdfCanvas2.style.display = 'none';
    document.getElementById('imageViewer').style.display = 'none';
    document.getElementById('pptViewer').style.display = 'none';
    document.getElementById('pptFallback').style.display = 'none';
    pagesWrapper.style.display = 'none';
    loadingSpinner.classList.remove('visible');
}

async function openPdfFile(path) {
    loadingSpinner.classList.add('visible');
    pagesWrapper.style.display = 'none';
    try {
        const loadingTask = pdfjsLib.getDocument(path);
        pdfDoc = await loadingTask.promise;
        totalPages = pdfDoc.numPages;
        updatePageInfo();
        await renderCurrentView();
    } catch (err) {
        console.error('Error loading PDF:', err);
        loadingSpinner.innerHTML = `
            <div style="color: var(--text-secondary); text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                <p style="margin-top: 12px; font-size: 0.9rem; color: #ef4444;">Failed to load PDF</p>
                <p style="margin-top: 6px; font-size: 0.8rem;">Make sure the file exists and try again.</p>
            </div>`;
    }
}

function openImageFile(path) {
    const img = document.getElementById('imageViewer');
    img.onload = () => {
        loadingSpinner.classList.remove('visible');
        pagesWrapper.style.display = 'flex';
        img.style.display = 'block';
        pdfCanvas.style.display = 'none';
        pdfCanvas2.style.display = 'none';
    };
    img.onerror = () => {
        loadingSpinner.innerHTML = `
            <div style="color: var(--text-secondary); text-align: center;">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                <p style="margin-top: 12px; font-size: 0.9rem; color: #ef4444;">Failed to load image</p>
            </div>`;
    };
    loadingSpinner.classList.add('visible');
    img.src = path;
}

function openPptFile(path, name) {
    const pptViewer = document.getElementById('pptViewer');
    const pptFallback = document.getElementById('pptFallback');

    if (window.location.protocol === 'file:') {
        // Local — can't use Google Docs Viewer
        pptFallback.style.display = 'flex';
        document.getElementById('pptFallbackName').textContent = name || path.split('/').pop();
        document.getElementById('btnOpenPpt').onclick = () => downloadPdf(encodeURIComponent(path), name);
    } else {
        // Online — use Google Docs Viewer
        const baseUrl = window.location.href.replace(/\/[^\/]*$/, '/');
        const fullUrl = new URL(path, baseUrl).href;
        pptViewer.src = `https://docs.google.com/gview?url=${encodeURIComponent(fullUrl)}&embedded=true`;
        pptViewer.style.display = 'block';
    }
}

// Keep backward compatibility
function openPdf(encodedPath, name) { openFile(encodedPath, name); }

// ===== HiDPI Canvas Rendering =====
async function renderPageToCanvas(canvas, pageNum) {
    const page = await pdfDoc.getPage(pageNum);
    const dpr = window.devicePixelRatio || 1;
    const baseScale = zoomScale * 1.5;
    const viewport = page.getViewport({ scale: baseScale });

    // Set canvas internal resolution to DPR for crisp rendering
    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);

    // Set CSS display size
    canvas.style.width = Math.floor(viewport.width) + 'px';
    canvas.style.height = Math.floor(viewport.height) + 'px';

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // High quality rendering settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    await page.render({ canvasContext: ctx, viewport: viewport }).promise;
}

// ===== Render Current View =====
async function renderCurrentView() {
    if (rendering) {
        pendingRender = true;
        return;
    }
    rendering = true;

    try {
        // Render first page
        await renderPageToCanvas(pdfCanvas, currentPage);
        pdfCanvas.style.display = 'block';

        // Render second page if two-page mode
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

    if (pendingRender) {
        pendingRender = false;
        await renderCurrentView();
    }
}

// ===== Navigation =====
function nextPage() {
    const step = twoPageMode ? 2 : 1;
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
    const step = twoPageMode ? 2 : 1;
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
    let text;
    if (twoPageMode && currentPage + 1 <= totalPages) {
        text = `${currentPage}-${currentPage + 1} / ${totalPages}`;
    } else {
        text = `${currentPage} / ${totalPages}`;
    }
    pageInfo.textContent = text;
    pageInfoBot.textContent = text;
}

// ===== Zoom (cursor-centered via scroll/pinch) =====
function applyZoom(newScale, originX, originY) {
    const container = pdfCanvasContainer;
    const oldScale = zoomScale;
    newScale = Math.max(0.25, Math.min(5.0, newScale));
    if (newScale === oldScale) return;

    // Calculate scroll position to keep zoom centered on cursor
    const scrollLeft = container.scrollLeft;
    const scrollTop = container.scrollTop;
    const ratio = newScale / oldScale;

    zoomScale = newScale;
    zoomLevelEl.textContent = Math.round(zoomScale * 100) + '%';

    renderCurrentView().then(() => {
        // Adjust scroll to keep the point under cursor stable
        container.scrollLeft = (scrollLeft + originX) * ratio - originX;
        container.scrollTop = (scrollTop + originY) * ratio - originY;
    });
}

function zoomIn() {
    const container = pdfCanvasContainer;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;
    applyZoom(zoomScale + 0.25, cx, cy);
}

function zoomOut() {
    const container = pdfCanvasContainer;
    const cx = container.clientWidth / 2;
    const cy = container.clientHeight / 2;
    applyZoom(zoomScale - 0.25, cx, cy);
}

// ===== Two-Page Mode =====
function toggleTwoPageMode() {
    twoPageMode = !twoPageMode;
    const btn = document.getElementById('btnTwoPage');
    btn.classList.toggle('active', twoPageMode);

    if (twoPageMode && currentPage % 2 === 0) {
        currentPage = Math.max(1, currentPage - 1);
    }

    updatePageInfo();
    renderCurrentView();
}

// ===== Download =====
function downloadPdf(encodedPath, name) {
    const path = decodeURIComponent(encodedPath);
    const a = document.createElement('a');
    a.href = path;
    a.download = name || path.split('/').pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function downloadCurrentPdf() {
    if (currentPdf) {
        downloadPdf(encodeURIComponent(currentPdf), viewerTitle.textContent);
    }
}

// ===== Fullscreen =====
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

// ===== Go Back =====
function goBack() {
    pdfViewer.style.display = 'none';
    welcomeScreen.style.display = 'flex';
    pdfDoc = null;
    currentPdf = null;
    currentFileType = 'pdf';
    hideAllViewers();
    loadingSpinner.innerHTML = `<div class="spinner"></div><p>Loading document...</p>`;
    loadingSpinner.classList.remove('visible');
    document.getElementById('pptViewer').src = '';
    document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
}

// ===== Search =====
function filterFiles(query) {
    const q = query.toLowerCase().trim();
    const items = document.querySelectorAll('.file-item');
    const groups = document.querySelectorAll('.subject-group');
    const subcategories = document.querySelectorAll('.subcategory');

    if (!q) {
        items.forEach(el => el.style.display = '');
        groups.forEach(g => g.style.display = '');
        subcategories.forEach(sc => { sc.style.display = ''; });
        return;
    }

    items.forEach(el => {
        const name = el.querySelector('.file-name').textContent.toLowerCase();
        el.style.display = name.includes(q) ? '' : 'none';
    });

    subcategories.forEach(sc => {
        const vis = sc.querySelectorAll('.file-item:not([style*="display: none"])');
        sc.style.display = vis.length > 0 ? '' : 'none';
        if (vis.length > 0) sc.classList.add('expanded');
    });

    groups.forEach(g => {
        const vis = g.querySelectorAll('.file-item:not([style*="display: none"])');
        g.style.display = vis.length > 0 ? '' : 'none';
        if (vis.length > 0) g.classList.add('expanded');
    });
}

// ===== Sidebar Mobile =====
function addMobileToggle() {
    const btn = document.createElement('button');
    btn.className = 'mobile-toggle';
    btn.id = 'mobileToggle';
    btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;
    btn.onclick = () => {
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

    searchInput.addEventListener('input', (e) => filterFiles(e.target.value));
    sidebarOverlay.addEventListener('click', closeSidebar);

    // ===== Scroll/Pinch Zoom (like Preview.app) =====
    let zoomTimeout = null;
    pdfCanvasContainer.addEventListener('wheel', (e) => {
        // Ctrl+scroll or pinch-to-zoom (trackpad sends ctrlKey with pinch)
        if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            const delta = -e.deltaY * 0.01;
            const newScale = zoomScale * (1 + delta);
            const rect = pdfCanvasContainer.getBoundingClientRect();
            const originX = e.clientX - rect.left;
            const originY = e.clientY - rect.top;

            // Debounce rendering for smooth zoom
            zoomScale = Math.max(0.25, Math.min(5.0, newScale));
            zoomLevelEl.textContent = Math.round(zoomScale * 100) + '%';

            clearTimeout(zoomTimeout);
            zoomTimeout = setTimeout(() => {
                const container = pdfCanvasContainer;
                const scrollLeft = container.scrollLeft;
                const scrollTop = container.scrollTop;
                renderCurrentView().then(() => {
                    // Keep cursor-position stable after re-render
                });
            }, 80);
        }
    }, { passive: false });

    // ===== Swipe / Horizontal Scroll to change pages =====
    let swipeAccumX = 0;
    let swipeAccumY = 0;
    let swipeCooldown = false;
    const SWIPE_THRESHOLD = 200; // pixels of horizontal scroll needed to trigger page turn

    pdfCanvasContainer.addEventListener('wheel', (e) => {
        // Skip if zooming
        if (e.ctrlKey || e.metaKey) return;
        if (!pdfDoc) return;

        // Only trigger on dominant horizontal scroll (trackpad two-finger swipe)
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 && Math.abs(e.deltaX) > 5) {
            // If content is not scrollable horizontally (not zoomed wider than container), use swipe for pages
            const container = pdfCanvasContainer;
            const isScrollableH = container.scrollWidth > container.clientWidth + 5;

            if (!isScrollableH) {
                e.preventDefault();
                if (swipeCooldown) return;

                swipeAccumX += e.deltaX;

                if (swipeAccumX > SWIPE_THRESHOLD) {
                    swipeCooldown = true;
                    swipeAccumX = 0;
                    animatePageTurn('left');
                    setTimeout(() => { swipeCooldown = false; }, 800);
                } else if (swipeAccumX < -SWIPE_THRESHOLD) {
                    swipeCooldown = true;
                    swipeAccumX = 0;
                    animatePageTurn('right');
                    setTimeout(() => { swipeCooldown = false; }, 800);
                }

                // Decay accumulator
                clearTimeout(swipeAccumTimer);
                swipeAccumTimer = setTimeout(() => { swipeAccumX = 0; }, 300);
            }
        }
    }, { passive: false });

    let swipeAccumTimer = null;

    // ===== Touch swipe for mobile =====
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    pdfCanvasContainer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
            touchStartTime = Date.now();
        }
    }, { passive: true });

    pdfCanvasContainer.addEventListener('touchend', (e) => {
        if (!pdfDoc) return;
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;
        const dt = Date.now() - touchStartTime;

        // Must be a quick horizontal swipe
        if (dt < 500 && Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) {
            if (dx < 0) {
                animatePageTurn('left'); // swipe left → next page
            } else {
                animatePageTurn('right'); // swipe right → prev page
            }
        }
    }, { passive: true });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT') return;
        switch (e.key) {
            case 'ArrowRight': case 'ArrowDown':
                if (pdfDoc) { e.preventDefault(); nextPage(); } break;
            case 'ArrowLeft': case 'ArrowUp':
                if (pdfDoc) { e.preventDefault(); prevPage(); } break;
            case '+': case '=':
                if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomIn(); } break;
            case '-':
                if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomOut(); } break;
            case 'Escape':
                if (pdfDoc) goBack(); break;
        }
    });

    // Cmd/Ctrl + scroll for zoom (native browser zoom prevention)
    document.addEventListener('wheel', (e) => {
        if ((e.ctrlKey || e.metaKey) && pdfDoc) {
            e.preventDefault();
        }
    }, { passive: false });
}

// ===== Page Turn Animation =====
function animatePageTurn(direction) {
    if (!pdfDoc) return;

    const isNext = direction === 'left';
    if (isNext && currentPage >= totalPages) return;
    if (!isNext && currentPage <= 1) return;

    const slideOut = isNext ? 'slideOutLeft' : 'slideOutRight';
    const slideIn = isNext ? 'slideInRight' : 'slideInLeft';

    pagesWrapper.style.animation = `${slideOut} 0.3s ease-in forwards`;

    setTimeout(() => {
        if (isNext) nextPage(); else prevPage();
        pagesWrapper.style.animation = `${slideIn} 0.35s ease-out forwards`;

        setTimeout(() => {
            pagesWrapper.style.animation = '';
        }, 360);
    }, 280);
}

// ===== Share Site =====
function shareSite() {
    const url = window.location.href.split('?')[0].split('#')[0];
    if (navigator.share) {
        navigator.share({
            title: 'NoteVault | 4th Semester Materials',
            text: 'Check out these 4th semester study materials!',
            url: url
        }).catch(err => {
            copyToClipboard(url);
        });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('btnShare');
        const originalContent = btn.innerHTML;
        btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`;
        setTimeout(() => { btn.innerHTML = originalContent; }, 2000);
    }).catch(err => {
        alert("Link: " + text);
    });
}

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);
