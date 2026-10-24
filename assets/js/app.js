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
            { name: "Important Topic 1", path: "CNC/important/IMG-20250913-WA0002.jpg", kind: "notes" },
            { name: "Important Topic 2", path: "CNC/important/IMG-20250913-WA0008.jpg", kind: "notes" },
            { name: "Important Topic 3", path: "CNC/important/IMG-20250913-WA0012.jpg", kind: "notes" },
            { name: "Important Topic 4", path: "CNC/important/IMG-20250913-WA0016.jpg", kind: "notes" },
            { name: "Important Topic 5", path: "CNC/important/WhatsApp Image 2026-09-16 at 09.55.14.jpeg", kind: "notes" },
            { name: "Important Topic 6", path: "CNC/important/WhatsApp Image 2026-09-16 at 09.55.36.jpeg", kind: "notes" }
        ],
        files: [
            { name: "CNC Unit 1.pdf", path: "CNC/CNC UNIT 1.pdf", size: "27.0 MB", units: ["Unit 1"], kind: "pdf", topic: "Introduction · Network Models · Physical & Data-Link Layer · MAC" },
            { name: "CNC Unit 2.pdf", path: "CNC/CNC UNIT 2.pdf", size: "23.1 MB", units: ["Unit 2"], kind: "pdf", topic: "Ethernet · Network Layer · IPv4 · Routing" },
            { name: "CNC Unit 2 — Handwritten Notes.pdf", path: "CNC/CNC_Unit 2.pdf", size: "4.8 MB", units: ["Unit 2"], kind: "notes", topic: "Routing Algorithms · Dijkstra · Distance Vector · Link State · Traffic Shaping" },
            { name: "CNC Problems.pdf", path: "CNC/CNC PROBLEMS.pdf", size: "6.5 MB", units: ["General"], kind: "pdf", topic: "Practice problems" },
            { name: "Unit 1 — Important Questions & Answers.pdf", path: "CNC/Computer_Network_Unit_1_Important_Questions_Answers.pdf", size: "2.7 MB", units: ["Unit 1"], kind: "question-paper", topic: "Unit I exam-ready answers" },
            { name: "Computer Networks — Unit 1 (HTML)", path: "CNC/unit1-computer-networks_1.html", size: "56 KB", units: ["Unit 1"], kind: "notes", topic: "Unit I — Computer Network & Communication" },
            { name: "Unit 1 — Mastery Notes (HTML)", path: "CNC/CS3001-1_Unit1_Notes.html", size: "76 KB", units: ["Unit 1"], kind: "notes", topic: "Unit I — Introduction, Network Models, Physical & Data-Link Layer" },
            { name: "Unit 1 — MCQ Bank with Answers.pdf", path: "CNC/mcqs/CNC_Unit1_MCQ_Bank_with_Answers.pdf", size: "54 KB", units: ["Unit 1"], kind: "question-paper", topic: "Unit 1 MCQs — network basics, topologies, models" }
        ]
    },
    {
        name: "OS",
        fullName: "Operating Systems",
        color: "#3b82f6",
        important: [
            { name: "Important Topic 1", path: "OS/important/IMG-20250913-WA0006.jpg", kind: "notes" },
            { name: "Important Topic 2", path: "OS/important/IMG-20250913-WA0020.jpg", kind: "notes" },
            { name: "Important Topic 3", path: "OS/important/WhatsApp Image 2026-09-11 at 13.05.24 (1).jpeg", kind: "notes" },
            { name: "Important Topic 4", path: "OS/important/WhatsApp Image 2026-09-11 at 13.05.24.jpeg", kind: "notes" }
        ],
        files: [
            { name: "OS Unit 1.pdf", path: "OS/OS UNIT 1.pdf", size: "10.5 MB", units: ["Unit 1"], kind: "pdf", topic: "OS Structure · Processes · Threads · CPU Scheduling" },
            { name: "OS Unit 2.pdf", path: "OS/OS UNIT 2.pdf", size: "16.8 MB", units: ["Unit 2"], kind: "pdf", topic: "Process Synchronization · Deadlocks · Main Memory" },
            { name: "OS Unit 3.pdf", path: "OS/OS UNIT 3.pdf", size: "8.8 MB", units: ["Unit 3"], kind: "pdf", topic: "Virtual Memory · File System · Disk Scheduling" },
            { name: "Unit 1 — OS Structure & Scheduling (HTML)", path: "OS/CS2004-1_Unit1_OS_Notes.html", size: "56 KB", units: ["Unit 1"], kind: "notes", topic: "OS Structure · Processes · Threads · CPU Scheduling" },
            { name: "Unit 1 — MCQ Bank with Answers.pdf", path: "OS/OS_Unit1_MCQ_Bank_with_Answers.pdf", size: "56 KB", units: ["Unit 1"], kind: "question-paper", topic: "OS services, system calls, linkers and loaders" },
            { name: "Notes — Page 1 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.09.28.jpeg", size: "96 KB", units: ["General"], kind: "notes", topic: "Handwritten note page" },
            { name: "Notes — Page 2 (Image)", path: "OS/WhatsApp Image 2026-08-20 at 19.10.26.jpeg", size: "339 KB", units: ["General"], kind: "notes", topic: "Handwritten note page" },
            { name: "OS Syllabus.pdf", path: "OS/ppts/OS syllabus.pdf", size: "166 KB", units: ["General"], kind: "pdf", topic: "CS2004-1 syllabus & course outcomes" },
            { name: "Unit 2 — Ch 5 Process Synchronization.pdf", path: "OS/Unit-2/CH5_PROCESS SYNCHRONIZATION.pdf", size: "685 KB", units: ["Unit 2"], kind: "pdf", topic: "Critical-section · Peterson's solution · Semaphores" },
            { name: "Unit 2 — Ch 6 Deadlocks.pdf", path: "OS/Unit-2/CH6_DEADLOCKS.pdf", size: "426 KB", units: ["Unit 2"], kind: "pdf", topic: "Deadlock characterization, avoidance, detection" },
            { name: "Unit 2 — Ch 7 Main Memory.pdf", path: "OS/Unit-2/CH7_MAIN MEMORY.pdf", size: "1.9 MB", units: ["Unit 2"], kind: "pdf", topic: "Paging · Page table structure · Swapping" },
            { name: "Unit 2 — MCQs.pdf", path: "OS/Unit-2/OS_MCQS_UNIT2 .pdf", size: "138 KB", units: ["Unit 2"], kind: "question-paper", topic: "Process synchronization & deadlocks MCQs" },
            { name: "Unit 3 — Ch 9 File System Concept.pdf", path: "OS/Unit-3/CH9_FILE SYSTEM CONCEPT.pdf", size: "110 KB", units: ["Unit 3"], kind: "pdf", topic: "File concept · File-system interface" },
            { name: "Unit 3 — Ch 10 File System Structure.pdf", path: "OS/Unit-3/CH10_FILE SYSTEM STRUCTURE.pdf", size: "534 KB", units: ["Unit 3"], kind: "pdf", topic: "File-system structure, operations, directories" },
            { name: "Unit 3 — Ch 11 Disk Scheduling.pdf", path: "OS/Unit-3/CH11_DISK SCHEDULING.pdf", size: "645 KB", units: ["Unit 3"], kind: "pdf", topic: "Disk scheduling algorithms" },
            { name: "Unit 3 — MCQs.pdf", path: "OS/Unit-3/OS_MCQ_UNIT3.pdf", size: "133 KB", units: ["Unit 3"], kind: "question-paper", topic: "Demand paging, page replacement MCQs" }
        ]
    },
    {
        name: "PPTs",
        fullName: "Lecture Presentations",
        color: "#f43f5e",
        files: [
            { name: "CNC — Unit 1 Chapter 1", path: "CNC/ppts/UNIT-1 Chap-1.pptx", size: "7.6 MB", units: ["Unit 1"], kind: "ppt", topic: "Introduction to computer networks" },
            { name: "CNC — Unit 1 Chapter 2", path: "CNC/ppts/UNIT-1 Chap-2.pptx", size: "3.4 MB", units: ["Unit 1"], kind: "ppt", topic: "Network models and physical layer" },
            { name: "OS — Ch 1 Operating System Structure", path: "OS/ppts/CH_1_OPERATING SYSTEM STRUCTURE.pptx", size: "2.2 MB", units: ["Unit 1"], kind: "ppt", topic: "OS services and system calls" },
            { name: "OS — Ch 2 Process Management", path: "OS/ppts/CH_2_PROCESS MANAGEMENT.pptx", size: "2.6 MB", units: ["Unit 1"], kind: "ppt", topic: "Process concept, scheduling, IPC" },
            { name: "OS — Ch 3 Threads", path: "OS/ppts/CH3_THREADS.pptx", size: "1.9 MB", units: ["Unit 1"], kind: "ppt", topic: "Multithreading models" },
            { name: "OS — Ch 4 CPU Scheduling", path: "OS/ppts/CH4_CPU SCHEDULING.pptx", size: "2.4 MB", units: ["Unit 1"], kind: "ppt", topic: "Scheduling criteria and algorithms" },
            { name: "Data Science — IDS Unit 1", path: "Data Science/ppts/IDS Unit-1(1).pptx", size: "2.6 MB", units: ["Unit 1"], kind: "ppt", topic: "Data analysis with Excel" }
        ]
    },
    {
        name: "TOC",
        fullName: "Theory of Computation",
        color: "#a855f7",
        important: [
            { name: "Important Topic 1", path: "TOC/important/IMG-20250913-WA0010.jpg", kind: "notes" },
            { name: "Important Topic 2", path: "TOC/important/IMG-20250913-WA0018.jpg", kind: "notes" }
        ],
        files: [
            { name: "TOC Unit 1 — Automata (Master Notes).pdf", path: "TOC/TOC_Unit1_Automata_Master_Notes.pdf", size: "1.0 MB", units: ["Unit 1"], kind: "notes", topic: "Finite Automata · Regular Expressions · Non-Regularity" },
            { name: "TOC Unit 1 — Automata (HTML)", path: "TOC/unit1-theory-of-computation.html", size: "33 KB", units: ["Unit 1"], kind: "notes", topic: "Unit I — Automata" },
            { name: "Unit 1 — Automata Solved & Animated (HTML)", path: "TOC/CS3103-1_Unit1_TOC_Notes.html", size: "48 KB", units: ["Unit 1"], kind: "notes", topic: "DFA · NFA · ε-NFA · Regular Expressions" },
            { name: "DFA Mastery — Live Machines (HTML)", path: "TOC/CS3103-1_DFA_Mastery.html", size: "44 KB", units: ["Unit 1"], kind: "notes", topic: "Interactive DFA design and solved problems" },
            { name: "TOC — MSE 1 Question Paper.pdf", path: "TOC/TOC MSE1.pdf", size: "18.8 MB", units: ["Unit 1", "Unit 2", "Unit 3"], kind: "question-paper", topic: "Mid-semester question paper (all units)" },
            { name: "TOC — MSE 2 Notes.pdf", path: "TOC/TOC MSE-2 notes.pdf", size: "23.2 MB", units: ["Unit 2", "Unit 3"], kind: "notes", topic: "DFA minimization · Grammars · Pushdown Automata" },
            { name: "TOC — MCQs with Answers.pdf", path: "TOC/TOC_MCQs_with_Answers-1.pdf", size: "185 KB", units: ["Unit 1", "Unit 2", "Unit 3"], kind: "question-paper", topic: "Automata, regular languages, grammars, PDA, Turing machines" }
        ]
    },
    {
        name: "ESD",
        fullName: "Employability & Social Development",
        color: "#14b8a6",
        files: [
            { name: "ESD — Unit 1.pdf", path: "ESD/ESD Unit 1.pdf", size: "139 KB", units: ["Unit 1"], kind: "pdf", topic: "Quantitative aptitude — numbers" },
            { name: "ESD — Unit 1 MCQ Bank with Answers.pdf", path: "ESD/ESD_Unit1_MCQ_Bank_with_Answers.pdf", size: "88 KB", units: ["Unit 1"], kind: "question-paper", topic: "Unit 1 MCQs with answers" }
        ]
    },
    {
        name: "SCR",
        fullName: "Social Connect Responsibility",
        color: "#f59e0b",
        files: [
            { name: "SCR — Unit I.pdf", path: "SCR/SCR_Unit I.pdf", size: "838 KB", units: ["Unit 1"], kind: "question-paper", topic: "Village, diversity and society — MCQs" },
            { name: "SCR — Unit II.pdf", path: "SCR/SCR_Unit II.pdf", size: "605 KB", units: ["Unit 2"], kind: "question-paper", topic: "Social schemes and responsibility — MCQs" },
            { name: "SCR — Unit III.pdf", path: "SCR/SCR_Unit III.pdf", size: "297 KB", units: ["Unit 3"], kind: "question-paper", topic: "Regulation and business responsibility — MCQs" }
        ]
    },
    {
        name: "Data Science",
        fullName: "Introduction to Data Science",
        color: "#10b981",
        files: [
            { name: "IDS Unit 1.pdf", path: "Data Science/IDS UNIT 1.pdf", size: "8.1 MB", units: ["Unit 1"], kind: "pdf", topic: "Data Analysis using Excel" },
            { name: "Data Science — Master Notes (HTML)", path: "Data Science/data-science-master-notes.html", size: "57 KB", units: ["Unit 1"], kind: "notes", topic: "Introduction to Data Science" },
            { name: "Data Analysis — Detailed Notes (HTML)", path: "Data Science/unit1-detailed-notes.html", size: "52 KB", units: ["Unit 1"], kind: "notes", topic: "Data Analysis using Excel — detailed" },
            { name: "Unit 1 — Data Analysis with Excel (HTML)", path: "Data Science/CS1231-1_Unit1_DataScience_Notes.html", size: "56 KB", units: ["Unit 1"], kind: "notes", topic: "Types, process, cleaning, sorting and filtering" }
        ]
    },
    {
        name: "UHV",
        fullName: "Universal Human Values",
        color: "#ec4899",
        files: [
            { name: "MCQ — Unit 1 Questions.pdf", path: "UHV/MCQ_UHV_1.pdf", size: "46 KB", units: ["Unit 1"], kind: "question-paper", topic: "Value education — MCQs" },
            { name: "Unit 1 — Descriptive Q&A.pdf", path: "UHV/Unit 1 — Descriptive Q&A.pdf", size: "801 KB", units: ["Unit 1"], kind: "notes", topic: "Human values — descriptive questions and answers" }
        ]
    },
    {
        name: "Lab Manuals",
        fullName: "Lab Manuals & Syllabus",
        color: "#eab308",
        files: [
            { name: "PC++ Syllabus.pdf", path: "PC++_SYLLABUS.pdf", size: "107 KB", units: ["Lab Manuals"], kind: "lab-manual", topic: "Programming with C++ — CS3651-1 syllabus" },
            { name: "CNC Lab Manual.pdf", path: "Lab Manuals/CSE_CNC_LAB_MANUAL-20CS502_2023.pdf", size: "767 KB", units: ["Lab Manuals"], kind: "lab-manual", topic: "21CS502 Computer Network and Communication lab" },
            { name: "OS Lab Manual.pdf", path: "Lab Manuals/OS_LAB_MANUAL.pdf", size: "959 KB", units: ["Lab Manuals"], kind: "lab-manual", topic: "Operating Systems lab programs" },
            { name: "C++ Lab Manual.pdf", path: "Lab Manuals/C++_LAB_MANUAL.pdf", size: "313 KB", units: ["Lab Manuals"], kind: "lab-manual", topic: "C++ programming lab experiments" },
            { name: "Java Spring Lab Manual.pdf", path: "Lab Manuals/Java_Spring_Lab_Manual.pdf", size: "513 KB", units: ["Lab Manuals"], kind: "lab-manual", topic: "CS3603-1 Java and Spring Framework lab" }
        ]
    }
];

// ===== Taxonomy & helpers =====
// Homepage categories. There is deliberately no "Unit 4" — this semester has
// only three units, and Unit 4 is never rendered as a navigation option.
var UNITS = ['Unit 1', 'Unit 2', 'Unit 3', 'Lab Manuals'];
var GENERAL = 'General';

// Resource types. Order matches the filter chips in index.html.
var KINDS = ['pdf', 'ppt', 'notes', 'question-paper', 'lab-manual'];

var KIND_LABEL = {
    'pdf': 'PDF',
    'ppt': 'PPT',
    'notes': 'Notes',
    'question-paper': 'Question paper',
    'lab-manual': 'Lab manual'
};

// Flat, de-duplicated index of every resource in the library.
// Built once at startup; every view and search runs off this.
var ALL_FILES = [];
(function buildIndex() {
    SUBJECTS.forEach(function (subject) {
        (subject.files || []).forEach(function (f) {
            ALL_FILES.push({
                name: f.name,
                path: f.path,
                size: f.size || '',
                units: f.units && f.units.length ? f.units.slice() : [GENERAL],
                kind: f.kind || kindFromExtension(f.path),
                topic: f.topic || '',
                subject: subject.name,
                subjectFull: subject.fullName || subject.name,
                color: subject.color || '#6b5ae0'
            });
        });
        (subject.important || []).forEach(function (imp) {
            ALL_FILES.push({
                name: imp.name,
                path: imp.path,
                size: '',
                units: imp.units && imp.units.length ? imp.units.slice() : [GENERAL],
                kind: imp.kind || 'notes',
                topic: '',
                subject: subject.name,
                subjectFull: subject.fullName || subject.name,
                color: subject.color || '#6b5ae0',
                important: true
            });
        });
    });
})();

var jpg = /\.(jpe?g|png|webp|gif|svg)$/i;

function kindFromExtension(path) {
    var ext = (path.split('.').pop() || '').toLowerCase();
    if (ext === 'pptx' || ext === 'ppt') return 'ppt';
    if (ext === 'html') return 'notes';
    if (jpg.test(ext)) return 'notes';
    return 'pdf';
}

function kindLabel(kind) {
    return KIND_LABEL[kind] || KIND_LABEL.pdf;
}

function unitLabel(unit) {
    return unit === 'Lab Manuals' ? 'Lab Manuals' : unit;
}

// Case/whitespace-insensitive haystack used by search.
function normalize(s) {
    return (s || '').toString().toLowerCase().replace(/\s+/g, ' ').trim();
}

// Every searchable field of a resource, as one normalized string.
function searchText(entry) {
    return normalize([
        entry.name, entry.subject, entry.subjectFull, entry.topic,
        entry.units.join(' '), kindLabel(entry.kind), entry.kind,
        entry.important ? 'important topic' : ''
    ].join(' '));
}

function unitHasResources(unit) {
    return ALL_FILES.some(function (f) { return f.units.indexOf(unit) !== -1; });
}

// Files for a subject, optionally restricted to one unit.
function filesFor(subjectName, unit) {
    return ALL_FILES.filter(function (f) {
        if (f.subject !== subjectName) return false;
        return !unit || f.units.indexOf(unit) !== -1;
    });
}

// Subjects that actually have resources in a unit, with accurate counts.
function subjectsInUnit(unit) {
    var out = [];
    SUBJECTS.forEach(function (s) {
        var files = filesFor(s.name, unit);
        if (files.length) {
            out.push({ subject: s, files: files, count: files.length });
        }
    });
    return out;
}

function countInUnit(unit) {
    return ALL_FILES.filter(function (f) { return f.units.indexOf(unit) !== -1; }).length;
}

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
var studyHistory = [];       // Continue Studying — most recent first, max 8
var readingProgress = {};
var completed = [];          // paths marked as done
var activeFilter = 'all';    // resource-type filter chip
var activeUnit = '';         // '' = all units
var activeSubject = '';      // '' = all subjects
var currentTheme = 'light';

// Find-in-document state (per open PDF)
var pageTexts = null;        // cached text per page, filled lazily
var findHits = [];           // [{ page, count }]
var findIndex = -1;
var findQuery = '';

// Load saved data from localStorage
function loadUserData() {
    try {
        favorites = JSON.parse(localStorage.getItem('notevault_favorites') || '[]');
        studyHistory = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');
        readingProgress = JSON.parse(localStorage.getItem('notevault_progress') || '{}');
        completed = JSON.parse(localStorage.getItem('notevault_done') || '[]');
        currentTheme = localStorage.getItem('notevault_theme') || 'light';
        applyTheme(currentTheme);
    } catch (e) {
        console.error('Error loading user data:', e);
    }
    // Guard against corrupted payloads, an older schema, or a browser that
    // hands back something other than what we stored.
    if (!Array.isArray(favorites)) favorites = [];
    if (!Array.isArray(completed)) completed = [];
    if (!readingProgress || typeof readingProgress !== 'object' || Array.isArray(readingProgress)) {
        readingProgress = {};
    }
    studyHistory = sanitizeHistory(studyHistory);
}

// Save data to localStorage
function saveUserData() {
    try {
        localStorage.setItem('notevault_favorites', JSON.stringify(favorites));
        localStorage.setItem(HISTORY_KEY, JSON.stringify(studyHistory));
        localStorage.setItem('notevault_progress', JSON.stringify(readingProgress));
        localStorage.setItem('notevault_done', JSON.stringify(completed));
        localStorage.setItem('notevault_theme', currentTheme);
    } catch (e) {
        // Quota exceeded or storage blocked (private browsing) — keep running.
        console.error('Error saving user data:', e);
    }
}

// Theme toggle functionality
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    saveUserData();
    showNotification('Switched to ' + (currentTheme === 'dark' ? 'Dark' : 'Light') + ' mode', 'info');
}

function applyTheme(theme) {
    var metaTheme = document.querySelector('meta[name="theme-color"]');
    if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        if (metaTheme) metaTheme.setAttribute('content', '#131218');
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (metaTheme) metaTheme.setAttribute('content', '#faf9ff');
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
var searchInput = null;
var totalPdfsEl = document.getElementById('totalPdfs');
var welcomeScreen = null;
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
        updateFavoritesRow();
        renderContinueStudying();
        buildUnitCards();
        buildSubjectFilterChips();
        renderView();
        var navHome = document.getElementById('navHome');
        if (navHome) navHome.classList.add('active');
        applyRoute(parseRoute(), true);
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

// ===== Navigation views =====
// Homepage → Unit → Subject → Files. Hash-based so every view has a shareable
// URL and the browser Back button behaves correctly.
var currentView = { name: 'home' };
// Where we were before a reader was opened, so Back returns to it.
var previousView = { name: 'home' };

function buildUnitCards() {
    var wrap = document.getElementById('unitCards');
    if (!wrap) return;
    var html = UNITS.map(function (unit, i) {
        var count = countInUnit(unit);
        var subs = subjectsInUnit(unit).length;
        var meta = count + (count === 1 ? ' resource' : ' resources') +
                   ' · ' + subs + (subs === 1 ? ' subject' : ' subjects');
        return '<button class="unit-card" type="button" style="animation-delay:' + (i * 70) + 'ms" ' +
            'onclick="navigateCategory(\'' + unit + '\')" aria-label="Open ' + escapeHtml(unit) + '">' +
            '<span class="unit-card-head">' +
                '<span class="unit-card-name">' + escapeHtml(unit) + '</span>' +
                '<svg class="unit-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
            '</span>' +
            '<span class="unit-card-meta">' + escapeHtml(meta) + '</span>' +
            '</button>';
    }).join('');

    // Secondary entry point. Deliberately not a unit, so it can never be
    // mistaken for one.
    html += '<button class="unit-card unit-card--all" type="button" onclick="navigateAll()" ' +
        'aria-label="Browse all resources">' +
        '<span class="unit-card-head">' +
            '<span class="unit-card-name">All Resources</span>' +
            '<svg class="unit-card-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' +
        '</span>' +
        '<span class="unit-card-meta">' + ALL_FILES.length + ' resources · ' + SUBJECTS.length + ' subjects</span>' +
        '</button>';

    wrap.innerHTML = html;
}

// Subject filter chips, generated from the real subject list.
function buildSubjectFilterChips() {
    var wrap = document.getElementById('subjectFilterChips');
    if (!wrap) return;
    var html = '<button class="subject-filter-chip active" data-subject-filter="">All subjects</button>';
    SUBJECTS.forEach(function (s) {
        html += '<button class="subject-filter-chip" data-subject-filter="' + escapeHtml(s.name) + '">' +
            escapeHtml(s.name) + '</button>';
    });
    wrap.innerHTML = html;
}

function navigateHome(replace) {
    currentView = { name: 'home' };
    setRoute('#', replace);
    renderView();
}

function navigateCategory(unit, replace) {
    if (UNITS.indexOf(unit) === -1) { navigateHome(replace); return; }
    currentView = { name: 'category', unit: unit };
    setRoute('#unit=' + encodeURIComponent(unit), replace);
    renderView();
}

function navigateAll(replace) {
    currentView = { name: 'category', unit: '' };
    setRoute('#all', replace);
    renderView();
}

function navigateSubject(unit, subject, replace) {
    currentView = { name: 'subject', unit: unit || '', subject: subject };
    var route = unit
        ? '#subject=' + encodeURIComponent(unit) + '/' + encodeURIComponent(subject)
        : '#subject=/' + encodeURIComponent(subject);
    setRoute(route, replace);
    renderView();
}

function setRoute(hash, replace) {
    var url = window.location.pathname + window.location.search + hash;
    if (replace) { try { history.replaceState({}, '', url); } catch (e) { window.location.hash = hash; } }
    else { try { history.pushState({}, '', url); } catch (e) { window.location.hash = hash; } }
}

function renderView() {
    var home = null;
    var cat = document.getElementById('viewCategory');
    var sub = document.getElementById('viewSubject');
    var sea = document.getElementById('viewSearch');
    var bar = document.getElementById('viewBar');
    var count = null;

    if (count) count.style.display = currentView.name === 'search' ? '' : 'none';

    [cat, sub, sea].forEach(function (el) { if (el) el.style.display = 'none'; });

    if (currentView.name === 'home') {
        if (home) home.style.display = 'flex';
        if (bar) bar.style.display = 'none';
        return;
    }

    if (home) home.style.display = 'none';
    if (bar) bar.style.display = 'flex';

    if (currentView.name === 'category') {
        if (cat) cat.style.display = 'flex';
        renderCategoryView();
    } else if (currentView.name === 'subject') {
        if (sub) sub.style.display = 'flex';
        renderSubjectView();
    } else if (currentView.name === 'search') {
        if (sea) sea.style.display = 'flex';
        renderSearchResults();
    }
}

function renderBreadcrumb(trail) {
    var bar = document.getElementById('viewBar');
    if (!bar) return;
    var titleEl = document.getElementById('viewTitle');
    if (titleEl) titleEl.textContent = trail[trail.length - 1].label;

    var html = '<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>';
    trail.forEach(function (node, i) {
        var last = i === trail.length - 1;
        html += '<li>' + (last || !node.href
            ? '<span aria-current="page">' + escapeHtml(node.label) + '</span>'
            : '<a href="' + node.href + '">' + escapeHtml(node.label) + '</a>') + '</li>';
        if (!last) html += '<li class="crumb-sep" aria-hidden="true">/</li>';
    });
    html += '</ol></nav>';

    bar.innerHTML = html +
        '<button class="btn-back-text" type="button" onclick="history.back()">Back</button>';
}

function renderCategoryView() {
    var unit = currentView.unit;
    var host = document.getElementById('viewCategory');
    if (!host) return;

    if (!unit) {
        renderBreadcrumb([{ label: 'Home', href: '#' }, { label: 'All Resources' }]);
        var all = ALL_FILES.slice().sort(function (a, b) { return a.subject.localeCompare(b.subject); });
        host.innerHTML =
            '<p class="view-lede">Every resource in the library, across all units and subjects.</p>' +
            '<div class="result-grid">' + all.map(resourceCardHTML).join('') + '</div>';
        return;
    }

    var groups = subjectsInUnit(unit);
    renderBreadcrumb([
        { label: 'Home', href: '#' },
        { label: unit }
    ]);

    if (!groups.length) {
        host.innerHTML = '<p class="view-lede">No resources are filed under ' + escapeHtml(unit) + ' yet.</p>' +
            '<div class="empty-state"><p>Nothing here yet.</p>' +
            '<button class="btn-clear-search" type="button" onclick="navigateAll()">Browse all resources</button></div>';
        return;
    }

    var html = '<p class="view-lede">' + countInUnit(unit) +
        (countInUnit(unit) === 1 ? ' resource' : ' resources') +
        ' across ' + groups.length + (groups.length === 1 ? ' subject.' : ' subjects.') + '</p>';
    html += '<div class="subject-grid">';
    groups.forEach(function (g, i) {
        var s = g.subject;
        var tone = subjectTone(s.name);
        html += '<button class="subject-card" type="button" style="--subject-fill:' + tone.fill +
            '; --subject-tint:' + tone.tint + '; animation-delay:' + (i * 60) + 'ms" ' +
            'onclick="navigateSubject(\'' + unit + '\', \'' + s.name + '\')">' +
            '<span class="subject-card-icon">' + (SUBJECT_ICONS[s.name] || SUBJECT_ICONS['default']) + '</span>' +
            '<span class="subject-card-info">' +
                '<span class="subject-card-name">' + escapeHtml(s.name) + '</span>' +
                '<span class="subject-card-full">' + escapeHtml(s.fullName) + '</span>' +
                '<span class="subject-card-meta">' + g.count + (g.count === 1 ? ' resource' : ' resources') + '</span>' +
            '</span>' +
            '<span class="subject-card-count">' + g.count + '</span>' +
            '<svg class="card-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>' +
            '</button>';
    });
    html += '</div>';
    host.innerHTML = html;
}

function renderSubjectView() {
    var unit = currentView.unit;
    var subjectName = currentView.subject;
    var host = document.getElementById('viewSubject');
    if (!host) return;

    var subject = null;
    SUBJECTS.forEach(function (s) { if (s.name === subjectName) subject = s; });
    if (!subject) {
        renderBreadcrumb([{ label: 'Home', href: '#' }, { label: 'Not found' }]);
        host.innerHTML = '<div class="empty-state"><p>That subject is not in the library.</p>' +
            '<button class="btn-clear-search" type="button" onclick="navigateHome()">Back to home</button></div>';
        return;
    }

    var files = filesFor(subjectName, unit || null);
    var trail = [{ label: 'Home', href: '#' }];
    if (unit) trail.push({ label: unit, href: '#unit=' + encodeURIComponent(unit) });
    trail.push({ label: subjectName });
    renderBreadcrumb(trail);

    if (!files.length) {
        host.innerHTML = '<div class="empty-state"><p>No ' + escapeHtml(unit || '') +
            ' resources for ' + escapeHtml(subjectName) + '.</p>' +
            '<button class="btn-clear-search" type="button" onclick="navigateSubject(\'\', \'' + subjectName + '\')">See all ' +
            escapeHtml(subjectName) + ' resources</button></div>';
        return;
    }

    var html = '<p class="view-lede">' + files.length +
        (files.length === 1 ? ' resource' : ' resources') + ' in ' + escapeHtml(subjectName) +
        (unit ? ' · ' + escapeHtml(unit) : '') + '.</p>';
    html += '<div class="result-grid">' + files.map(resourceCardHTML).join('') + '</div>';
    host.innerHTML = html;
}

// ===== Resource cards =====
function resourceCardHTML(f) {
    var unitText = f.units.join(', ');
    return '<button class="resource-card" type="button" ' +
        'onclick="openFile(\'' + encodeURIComponent(f.path) + '\', \'' + encodeURIComponent(f.name) + '\')" ' +
        'title="' + escapeHtml(f.name) + '">' +
        '<span class="resource-kind kind-' + escapeHtml(f.kind) + '">' + escapeHtml(kindLabel(f.kind)) + '</span>' +
        '<span class="resource-name">' + escapeHtml(f.name) + '</span>' +
        '<span class="resource-meta">' +
            '<span class="resource-subject">' + escapeHtml(f.subject) + '</span>' +
            '<span class="resource-unit">' + escapeHtml(unitText) + '</span>' +
        '</span>' +
        '<span class="resource-topic">' + escapeHtml(f.topic || '') + '</span>' +
        (f.size ? '<span class="resource-size">' + escapeHtml(f.size) + '</span>' : '') +
        '</button>';
}

// ===== Smart search & filters =====
function matchesQuery(entry, q) {
    if (!q) return true;
    var hay = searchText(entry);
    return q.split(' ').every(function (term) {
        return term && hay.indexOf(term) !== -1;
    });
}

function applyFilters() {
    var q = normalize(searchInput.value);
    return ALL_FILES.filter(function (f) {
        if (activeFilter !== 'all' && f.kind !== activeFilter) return false;
        if (activeUnit && f.units.indexOf(activeUnit) === -1) return false;
        if (activeSubject && f.subject !== activeSubject) return false;
        return matchesQuery(f, q);
    });
}

function renderSearchResults() {
    var host = document.getElementById('viewSearch');
    if (!host) return;
    var q = normalize(searchInput.value);
    var results = applyFilters();

    renderBreadcrumb([{ label: 'Home', href: '#' }, { label: 'Search' }]);

    var summary = null;
    if (summary) {
        summary.textContent = results.length +
            (results.length === 1 ? ' result' : ' results') +
            (q ? ' for “' + searchInput.value.trim() + '”' : '') +
            (activeFilter !== 'all' ? ' · ' + escapeHtml(kindLabel(activeFilter)) : '') +
            (activeUnit ? ' · ' + escapeHtml(activeUnit) : '') +
            (activeSubject ? ' · ' + escapeHtml(activeSubject) : '');
    }

    if (!results.length) {
        host.innerHTML =
            '<div class="empty-state">' +
            '<h3>No matches</h3>' +
            '<p>Nothing matches the current search and filters.</p>' +
            '<button class="btn-clear-search" type="button" onclick="clearAllFilters()">Clear search &amp; filters</button>' +
            '</div>';
        return;
    }

    host.innerHTML = '<div class="result-grid">' + results.map(resourceCardHTML).join('') + '</div>';
}

function clearAllFilters() {
    searchInput.value = '';
    activeFilter = 'all';
    activeUnit = '';
    activeSubject = '';
    document.querySelectorAll('.filter-chip, .unit-filter-chip, .subject-filter-chip').forEach(function (c) {
        c.classList.remove('active');
    });
    var all = document.querySelector('.filter-chip[data-filter="all"]');
    if (all) all.classList.add('active');
    var allUnits = document.querySelector('.unit-filter-chip[data-unit=""]');
    if (allUnits) allUnits.classList.add('active');
    var allSubs = document.querySelector('.subject-filter-chip[data-subject-filter=""]');
    if (allSubs) allSubs.classList.add('active');
    renderSearchResults();
    updateClearFiltersVisibility();
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
    var isDone = completed.indexOf(file.path) !== -1;
    var starIcon = isFavorite ? '★' : '☆';
    var starColor = isFavorite ? tone.tint : 'var(--md-on-surface-variant)';
    var prog = readingProgress[file.path];
    var progBar = (prog && prog.total > 0) ?
        '<span class="file-progress"><span class="file-progress-fill" style="width:' + Math.min(100, Math.max(3, prog.percentage || 0)) + '%"></span></span>' : '';

    return '<div class="file-item' + (isDone ? ' done' : '') + '" data-path="' + escapeHtml(file.path) + '" data-type="' + getFileType(file.path) + '" onclick="openFile(\'' + encodeURIComponent(file.path) + '\', \'' + encodeURIComponent(file.name) + '\')">' +
        '<div class="file-icon" style="--subject-fill: ' + tone.fill + '; --subject-tint: ' + tone.tint + '">' + label + '</div>' +
        '<span class="file-name" title="' + escapeHtml(file.name) + '">' + escapeHtml(file.name) + '</span>' +
        '<span class="file-meta"><span class="file-type-badge" style="color: ' + tone.tint + '; background: ' + tone.fill + '">' + label + '</span>' + (file.size ? '<span class="file-size">' + file.size + '</span>' : '') + '</span>' +
        '<button class="btn-done" onclick="event.stopPropagation(); toggleDone(\'' + encodeURIComponent(file.path) + '\')" title="' + (isDone ? 'Mark as not done' : 'Mark as done') + '" aria-pressed="' + (isDone ? 'true' : 'false') + '">' +
        '  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' +
        '</button>' +
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
        var done = subjectDoneCount(s);
        var pct = s.files.length ? Math.round(done / s.files.length * 100) : 0;
        var meta = done > 0
            ? done + ' / ' + s.files.length + ' done'
            : s.files.length + ' files' + (s.important && s.important.length ? ' · ' + s.important.length + ' important topics' : '');
        return '<button class="subject-card' + (pct === 100 ? ' complete' : '') + '" data-subject="' + escapeHtml(s.name) + '" style="--subject-fill:' + tone.fill + '; --subject-tint:' + tone.tint + '; animation-delay:' + (i * 60) + 'ms" onclick="expandSubject(\'' + s.name + '\')">' +
            '<span class="subject-card-icon">' + icon + '</span>' +
            '<span class="subject-card-info">' +
            '<span class="subject-card-name">' + escapeHtml(s.name) + '</span>' +
            '<span class="subject-card-full">' + escapeHtml(s.fullName) + '</span>' +
            '<span class="subject-card-meta">' + meta + '</span>' +
            '<span class="subject-card-progress" aria-hidden="true"><span class="subject-card-progress-fill" style="width:' + pct + '%"></span></span>' +
            '</span>' +
            '<span class="subject-card-count">' + s.files.length + '</span>' +
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
    updateFavoritesUI();
    updateFavoritesRow();
}

function updateFavoritesUI() {
    // Update favorite stars in sidebar without rebuilding DOM or resetting search
    document.querySelectorAll('.file-item').forEach(function(item) {
        var path = item.getAttribute('data-path');
        var btn = item.querySelector('.btn-favorite');
        if (btn) {
            var isFavorite = favorites.indexOf(path) !== -1;
            btn.textContent = isFavorite ? '★' : '☆';
            btn.title = isFavorite ? 'Remove from favorites' : 'Add to favorites';
            var parentGroup = item.closest('.subject-group');
            var tone = parentGroup ? subjectTone(parentGroup.getAttribute('data-subject')) : null;
            btn.style.color = isFavorite ? (tone ? tone.tint : 'var(--md-primary)') : 'var(--md-on-surface-variant)';
        }
    });
}

// ===== Done / completion tracking =====
function subjectDoneCount(subject) {
    return subject.files.filter(function(f) { return completed.indexOf(f.path) !== -1; }).length;
}

function toggleDone(encodedPath, silent) {
    var path = decodeURIComponent(encodedPath);
    var index = completed.indexOf(path);
    if (index === -1) {
        completed.push(path);
        if (!silent) showNotification('Marked as done', 'success');
    } else {
        completed.splice(index, 1);
        if (!silent) showNotification('Marked as not done', 'info');
    }
    saveUserData();
    updateDoneUI();
}

function markDone(path) {
    if (completed.indexOf(path) !== -1) return;
    completed.push(path);
    saveUserData();
    updateDoneUI();
    showNotification('Finished — marked as done', 'success');
}

function updateDoneUI() {
    document.querySelectorAll('.file-item').forEach(function(item) {
        var path = item.getAttribute('data-path');
        var isDone = completed.indexOf(path) !== -1;
        item.classList.toggle('done', isDone);
        var btn = item.querySelector('.btn-done');
        if (btn) {
            btn.title = isDone ? 'Mark as not done' : 'Mark as done';
            btn.setAttribute('aria-pressed', isDone ? 'true' : 'false');
        }
    });
    buildSubjectCards();
}

// Look up a file entry (name + subject) by path across all subjects
function findFileByPath(path) {
    for (var i = 0; i < SUBJECTS.length; i++) {
        var files = SUBJECTS[i].files;
        for (var j = 0; j < files.length; j++) {
            if (files[j].path === path) return { file: files[j], subject: SUBJECTS[i] };
        }
    }
    return null;
}

function fileChipHTML(path, name) {
    return '<button class="recent-chip" onclick="openFile(\'' + encodeURIComponent(path) + '\', \'' + encodeURIComponent(name) + '\')" title="' + escapeHtml(name) + '">' +
        '<span class="recent-chip-icon">' + getFileLabel(path) + '</span>' +
        '<span class="recent-chip-name">' + escapeHtml(name) + '</span>' +
        '</button>';
}

// Favorites row on the welcome screen
function updateFavoritesRow() {
    var section = document.getElementById('favoritesSection');
    var row = document.getElementById('favoritesRow');
    if (!section || !row) return;

    // Drop favorites whose files no longer exist in the index
    var entries = favorites.map(findFileByPath).filter(Boolean);
    if (!entries.length) {
        section.style.display = 'none';
        row.innerHTML = '';
        return;
    }

    section.style.display = 'block';
    row.innerHTML = entries.map(function(e) { return fileChipHTML(e.file.path, e.file.name); }).join('');
}

// ===== Continue Studying =====
// Persisted in localStorage only. No account, backend or network call.
var HISTORY_KEY = 'notevault_history';
var HISTORY_LIMIT = 8;

// Coerce whatever is in storage into a clean, de-duplicated list.
function sanitizeHistory(list) {
    if (!Array.isArray(list)) return [];
    var seen = {};
    var out = [];
    list.forEach(function (item) {
        if (!item || typeof item.path !== 'string' || !item.path) return;
        if (seen[item.path]) return;                 // one entry per resource
        seen[item.path] = true;
        out.push({
            path: item.path,
            name: typeof item.name === 'string' ? item.name : item.path.split('/').pop(),
            subject: typeof item.subject === 'string' ? item.subject : '',
            units: Array.isArray(item.units) ? item.units.slice() : [],
            kind: typeof item.kind === 'string' ? item.kind : kindFromExtension(item.path),
            openedAt: (typeof item.openedAt === 'number' && isFinite(item.openedAt))
                ? item.openedAt : Date.now()
        });
    });
    return out.slice(0, HISTORY_LIMIT);
}

// Build a history record from a library resource.
function studyEntryFor(entry) {
    return {
        path: entry.path,
        name: entry.name,
        subject: entry.subject,
        units: entry.units.slice(),
        kind: entry.kind,
        openedAt: Date.now()
    };
}

// Record a resource as opened. Reopening updates the existing entry rather
// than appending a duplicate, and moves it to the top.
function recordStudy(entry) {
    studyHistory = studyHistory.filter(function (h) { return h.path !== entry.path; });
    studyHistory.unshift(entry);
    studyHistory = studyHistory.slice(0, HISTORY_LIMIT);
    saveUserData();
    renderContinueStudying();
}

function clearStudyHistory() {
    studyHistory = [];
    saveUserData();
    renderContinueStudying();
    showNotification('Study history cleared', 'info');
}

// "3m ago" / "2h ago" / "4d ago" — falls back to a date for anything old.
function relativeTime(ts) {
    if (!ts || !isFinite(ts)) return '';
    var s = Math.max(0, Math.floor((Date.now() - ts) / 1000));
    if (s < 60) return 'just now';
    var m = Math.floor(s / 60);
    if (m < 60) return m + 'm ago';
    var h = Math.floor(m / 60);
    if (h < 24) return h + 'h ago';
    var d = Math.floor(h / 24);
    if (d < 7) return d + 'd ago';
    var w = Math.floor(d / 7);
    if (w < 5) return w + 'w ago';
    try { return new Date(ts).toLocaleDateString(); } catch (e) { return ''; }
}

// Compact history card. Long filenames are clamped with ellipsis by CSS.
function historyCardHTML(item) {
    var unitText = item.units && item.units.length
        ? item.units.join(', ')
        : 'General';
    return '<button class="history-card" type="button" ' +
        'onclick="openFromHistory(\'' + encodeURIComponent(item.path) + '\')" ' +
        'title="' + escapeHtml(item.name) + '">' +
        '<span class="history-kind kind-' + escapeHtml(item.kind) + '">' + escapeHtml(kindLabel(item.kind)) + '</span>' +
        '<span class="history-name">' + escapeHtml(item.name) + '</span>' +
        '<span class="history-meta">' +
            '<span class="history-subject">' + escapeHtml(item.subject || '—') + '</span>' +
            '<span class="history-unit">' + escapeHtml(unitText) + '</span>' +
        '</span>' +
        '<span class="history-time">' + escapeHtml(relativeTime(item.openedAt)) + '</span>' +
        '</button>';
}

function renderContinueStudying() {
    var section = document.getElementById('continueSection');
    if (!section) return;
    var grid = document.getElementById('continueGrid');
    var empty = document.getElementById('continueEmpty');
    var clearBtn = document.getElementById('continueClear');

    // Drop history entries whose resource is no longer in the library.
    var before = studyHistory.length;
    studyHistory = sanitizeHistory(studyHistory.filter(function (h) {
        return findFileByPath(h.path) || SUBJECTS.some(function (s) {
            return (s.important || []).some(function (i) { return i.path === h.path; });
        });
    }));
    if (studyHistory.length !== before) saveUserData();

    if (!studyHistory.length) {
        section.style.display = 'none';
        if (grid) grid.innerHTML = '';
        return;
    }

    section.style.display = 'block';
    if (empty) empty.style.display = 'none';
    if (grid) {
        grid.innerHTML = studyHistory.map(historyCardHTML).join('');
    }
    if (clearBtn) clearBtn.disabled = false;
}

// Clicking a history card reopens the original working resource URL.
function openFromHistory(encodedPath) {
    var path = decodeURIComponent(encodedPath);
    var entry = findFileByPath(path);
    var name = entry ? entry.name : path.split('/').pop();
    openFile(encodeURIComponent(path), encodeURIComponent(name));
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

// ===== Deep links (#file=<path>&page=<n>) =====
function fileHash(path, page) {
    return '#file=' + encodeURIComponent(path) + (page && page > 1 ? '&page=' + page : '');
}

function parseHash() {
    var h = window.location.hash;
    if (h.indexOf('#file=') !== 0) return null;
    var params = {};
    h.slice(1).split('&').forEach(function(part) {
        var kv = part.split('=');
        try { params[kv[0]] = decodeURIComponent(kv.slice(1).join('=')); } catch (e) { /* ignore bad escapes */ }
    });
    if (!params.file) return null;
    return { path: params.file, page: parseInt(params.page, 10) || 0 };
}

// Parse any hash into a route object: file deep links, navigation views,
// or a search query. The legacy `#file=` format is unchanged.
function parseRoute() {
    var h = window.location.hash;
    if (!h || h === '#') return { type: 'home' };
    if (h.indexOf('#file=') === 0) {
        var file = parseHash();
        if (!file) return { type: 'home' };
        return { type: 'file', path: file.path, page: file.page };
    }
    if (h.indexOf('#unit=') === 0) {
        var u = decodeURIComponent(h.slice(6).split('&')[0]);
        return { type: 'unit', unit: u };
    }
    if (h.indexOf('#all') === 0) return { type: 'all' };
    if (h.indexOf('#subject=') === 0) {
        var parts = decodeURIComponent(h.slice(9).split('&')[0]).split('/');
        return { type: 'subject', unit: parts[0] || '', subject: parts[1] || '' };
    }
    if (h.indexOf('#search') === 0) {
        var q = h.indexOf('#search=') === 0 ? decodeURIComponent(h.slice(8).split('&')[0]) : '';
        return { type: 'search', query: q };
    }
    return { type: 'home' };
}

// Apply a parsed route to the UI. File routes open the reader.
function applyRoute(route, replace) {
    if (route.type === 'file') {
        var entry = findFileByPath(route.path);
        var name = entry ? entry.file.name : route.path.split('/').pop();
        if (!entry) {
            var known = SUBJECTS.some(function(s) {
                return (s.important || []).some(function(imp) { return imp.path === route.path; });
            });
            if (!known) {
                renderView();
                showNotification('That file is not in the library', 'warning');
                return;
            }
        }
        openFile(encodeURIComponent(route.path), encodeURIComponent(name),
                 { fromHistory: true, page: route.page, replace: replace });
        return;
    }

    if (currentPdf) goBack(true);

    if (route.type === 'unit') { navigateCategory(route.unit, replace); return; }
    if (route.type === 'all') { navigateAll(replace); return; }
    if (route.type === 'subject') {
        searchInput.value = '';
        navigateSubject(route.unit, route.subject, replace);
        return;
    }
    if (route.type === 'search') {
        searchInput.value = route.query || '';
        currentView = { name: 'search', query: normalize(route.query || '') };
        renderView();
        return;
    }
    navigateHome(replace);
}

function openFromHash(replace) {
    var target = parseHash();
    if (!target) return false;
    var entry = findFileByPath(target.path);
    var name = entry ? entry.file.name : target.path.split('/').pop();
    if (!entry) {
        // Allow "important topic" images too
        var known = SUBJECTS.some(function(s) {
            return (s.important || []).some(function(imp) { return imp.path === target.path; });
        });
        if (!known) { showNotification('That file is not in the library', 'warning'); return false; }
    }
    openFile(encodeURIComponent(target.path), encodeURIComponent(name), { fromHistory: true, page: target.page, replace: replace });
    return true;
}

// ===== Open File =====
function openFile(encodedPath, encodedName, opts) {
    opts = opts || {};
    var path = decodeURIComponent(encodedPath);
    var name = decodeURIComponent(encodedName);
    var prevPdf = currentPdf;
    currentPdf = path;
    currentPage = 1;
    // Remember where we came from so Back returns to this view.
    if (prevPdf !== path) previousView = currentView;
    zoomScale = 1.0;
    currentFileType = getFileType(path);
    thumbRendered = 0;
    pageTexts = null;
    closeFindBar(true);

    // Record in Continue Studying (localStorage only, no network)
    var found = findFileByPath(path);
    if (!found) {
        // "Important topic" images live outside the subject file lists
        SUBJECTS.forEach(function (s) {
            if (found) return;
            (s.important || []).forEach(function (imp) {
                if (found || imp.path !== path) return;
                found = { file: imp, subject: s };
            });
        });
    }
    var libFile = found ? found.file : null;
    recordStudy({
        path: path,
        name: name,
        subject: found ? found.subject.name : '',
        units: libFile && libFile.units ? libFile.units.slice() : [GENERAL],
        kind: libFile && libFile.kind ? libFile.kind : kindFromExtension(path),
        openedAt: Date.now()
    });

    // Check for saved progress
    var progress = getReadingProgress(path);
    if (progress && currentFileType === 'pdf') {
        currentPage = progress.page;
    }
    if (opts.page && currentFileType === 'pdf') {
        currentPage = opts.page;
        progress = null; // explicit page in the link wins over saved progress
    }

    // Keep the URL shareable and the browser Back button meaningful
    var state = { file: path };
    if (opts.replace) {
        history.replaceState(state, '', fileHash(path, currentPage));
    } else if (!opts.fromHistory) {
        history.pushState(state, '', fileHash(path, currentPage));
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
        // Word documents have no in-browser viewer — download them instead
        downloadPdf(encodedPath, encodedName);
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
    showViewerChip('Resumed at page ' + page);
}

function showViewerChip(text, ms) {
    var old = document.getElementById('resumeChip');
    if (old) old.remove();
    var chip = document.createElement('div');
    chip.className = 'resume-chip';
    chip.id = 'resumeChip';
    chip.innerHTML = '<span>' + escapeHtml(text) + '</span>' +
        '<button class="resume-chip-go" aria-label="Dismiss" title="Dismiss" onclick="var c=document.getElementById(\'resumeChip\'); if(c) c.remove();">✕</button>';
    pdfCanvasContainer.appendChild(chip);
    setTimeout(function() {
        if (chip.parentNode) chip.parentNode.removeChild(chip);
    }, ms || 5000);
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
        noteViewer.onload = function() {
            noteViewer.onload = null;
            focusSlides();
        };
        showViewerChip('Use ← → to change slides', 4000);
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

var pdfLibPromise = null;

// Lazy-load pdf.js only when a PDF is first opened (saves ~450 KB on initial load)
function loadPdfLib() {
    if (window.pdfjsLib) return Promise.resolve();
    if (pdfLibPromise) return pdfLibPromise;

    pdfLibPromise = new Promise(function(resolve, reject) {
        var script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.async = true;
        script.onload = function() {
            pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
            resolve();
        };
        script.onerror = function() {
            pdfLibPromise = null;
            reject(new Error('Failed to load PDF library'));
        };
        document.head.appendChild(script);
    });
    return pdfLibPromise;
}

async function openPdfFile(path) {
    loadingSpinner.classList.add('visible');
    pagesWrapper.style.display = 'none';
    noteViewer.style.display = 'none';
    try {
        await loadPdfLib();
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
        if (window.location.hash.indexOf('#file=') === 0) {
            history.replaceState({ file: currentPdf }, '', fileHash(currentPdf, currentPage));
        }
        var lastVisible = twoPageMode ? currentPage + 1 : currentPage;
        if (lastVisible >= totalPages && completed.indexOf(currentPdf) === -1) markDone(currentPdf);
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
function goBack(fromHistory) {
    if (!fromHistory && window.location.hash && window.location.hash !== '#') {
        // Let popstate call us back so the Back button and this stay in sync
        history.back();
        return;
    }
    pdfViewer.style.display = 'none';
    renderView();
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
    pageTexts = null;
    closeFindBar(true);
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
// Typing switches to the results view and re-renders it. The sidebar still
// holds the input, so the handler stays attached to the same element id.
function filterFiles(query) {
    searchInput.value = query;
    var q = normalize(query);
    var filtersOn = activeFilter !== 'all' || activeUnit || activeSubject;

    if (!q && !filtersOn) {
        if (currentView.name === 'search') navigateHome(true);
        return;
    }

    currentView = { name: 'search', query: q };
    var route = q ? '#search=' + encodeURIComponent(q) : '#search';
    setRoute(route, currentView.name === 'search' && !filtersOn);
    renderView();
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
    var topbar = document.querySelector('.mobile-topbar');
    if (!topbar) return;
    var btn = document.createElement('button');
    btn.className = 'mobile-toggle';
    btn.id = 'mobileToggle';
    btn.setAttribute('aria-label', 'Menu');
    btn.setAttribute('title', 'Menu');
    btn.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    btn.onclick = function() {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('visible');
    };
    topbar.appendChild(btn);
}

function closeSidebar() {
    sidebar.classList.remove('open');
    sidebarOverlay.classList.remove('visible');
    document.querySelectorAll('.bottom-nav-btn, .rail-btn, .rail-fab').forEach(function(b) { b.classList.remove('active'); });
}

// ===== Share =====
function shareSite() {
    var url = window.location.href.split('?')[0].split('#')[0];
    var text = 'Check out these 5th semester study materials!';
    if (currentPdf) {
        url += fileHash(currentPdf, currentFileType === 'pdf' ? currentPage : 0);
        text = viewerTitle.textContent + ' — NoteVault';
    }
    if (navigator.share) {
        navigator.share({ title: 'NoteVault | Semester 5 Materials', text: text, url: url }).catch(function() { copyToClipboard(url); });
    } else {
        copyToClipboard(url);
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(function() {
        showNotification(currentPdf ? 'Link to this file copied' : 'Link copied', 'success');
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

// ===== Find in document (PDF text search) =====
function openFindBar() {
    if (!pdfDoc || currentFileType !== 'pdf') return;
    var bar = document.getElementById('findBar');
    var input = document.getElementById('findInput');
    var btn = document.getElementById('btnFind');
    if (!bar || !input) return;
    bar.style.display = 'flex';
    if (btn) btn.classList.add('active');
    input.focus();
    input.select();
}

function closeFindBar(silent) {
    var bar = document.getElementById('findBar');
    var btn = document.getElementById('btnFind');
    var status = document.getElementById('findStatus');
    if (bar) bar.style.display = 'none';
    if (btn) btn.classList.remove('active');
    if (status) status.textContent = '';
    findHits = [];
    findIndex = -1;
    findQuery = '';
    if (silent) {
        var input = document.getElementById('findInput');
        if (input) input.value = '';
    }
}

function toggleFindBar() {
    var bar = document.getElementById('findBar');
    if (bar && bar.style.display !== 'none') closeFindBar(); else openFindBar();
}

// Extract and cache the text of every page (done once per document)
async function ensurePageTexts() {
    if (pageTexts) return pageTexts;
    var doc = pdfDoc;
    var texts = [];
    for (var p = 1; p <= doc.numPages; p++) {
        if (pdfDoc !== doc) return null; // document changed while extracting
        try {
            var page = await doc.getPage(p);
            var content = await page.getTextContent();
            texts.push(content.items.map(function(it) { return it.str; }).join(' ').toLowerCase());
        } catch (e) {
            texts.push('');
        }
    }
    if (pdfDoc === doc) pageTexts = texts;
    return pageTexts;
}

function countOccurrences(haystack, needle) {
    var n = 0, i = 0;
    while ((i = haystack.indexOf(needle, i)) !== -1) { n++; i += needle.length; }
    return n;
}

async function runFind(query, direction) {
    var status = document.getElementById('findStatus');
    var q = (query || '').trim().toLowerCase();
    if (!pdfDoc || !q) { if (status) status.textContent = ''; findHits = []; findIndex = -1; return; }

    if (q !== findQuery) {
        if (status) status.textContent = 'Searching…';
        var texts = await ensurePageTexts();
        if (!texts) return;
        findQuery = q;
        findHits = [];
        texts.forEach(function(t, i) {
            var c = countOccurrences(t, q);
            if (c > 0) findHits.push({ page: i + 1, count: c });
        });
        // Start from the first hit at or after the current page
        findIndex = -1;
        for (var i = 0; i < findHits.length; i++) {
            if (findHits[i].page >= currentPage) { findIndex = i; break; }
        }
        if (findIndex === -1 && findHits.length) findIndex = 0;
    } else if (findHits.length) {
        findIndex = (findIndex + (direction < 0 ? -1 : 1) + findHits.length) % findHits.length;
    }

    if (!findHits.length) {
        if (status) status.textContent = 'No matches';
        return;
    }

    var hit = findHits[findIndex];
    var total = findHits.reduce(function(a, h) { return a + h.count; }, 0);
    if (status) status.textContent = 'Page ' + hit.page + ' · ' + (findIndex + 1) + '/' + findHits.length + ' pages · ' + total + ' match' + (total === 1 ? '' : 'es');
    if (hit.page !== currentPage) {
        currentPage = hit.page;
        updatePageInfo();
        renderCurrentView();
        pdfCanvasContainer.scrollTop = 0;
    }
}

// ===== Jump to page =====
function showPageJump() {
    if (!pdfDoc || currentFileType !== 'pdf') return;
    var input = document.getElementById('pageJump');
    if (!input) return;
    input.max = totalPages;
    input.value = currentPage;
    pageInfo.style.display = 'none';
    input.style.display = '';
    input.focus();
    input.select();
}

function hidePageJump(apply) {
    var input = document.getElementById('pageJump');
    if (!input) return;
    if (apply) {
        var n = parseInt(input.value, 10);
        if (n >= 1 && n <= totalPages && n !== currentPage) {
            currentPage = n;
            updatePageInfo();
            renderCurrentView();
            pdfCanvasContainer.scrollTop = 0;
        }
    }
    input.style.display = 'none';
    pageInfo.style.display = '';
}

function clearSearch() {
    clearAllFilters();
    searchInput.value = '';
    if (currentView.name === 'search') {
        currentView = { name: 'home' };
        setRoute('#', true);
        renderView();
    }
    searchInput.focus();
}

function setFilter(name) {
    activeFilter = name;
    document.querySelectorAll('.filter-chip').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-filter') === name);
    });
    // A filter on the homepage jumps straight to results rather than
    // silently filtering nothing.
    if (currentView.name !== 'search') {
        currentView = { name: 'search', query: normalize(searchInput.value) };
        setRoute('#search', true);
        renderView();
    } else {
        renderSearchResults();
    }
    updateClearFiltersVisibility();
}

function setUnitFilter(unit) {
    activeUnit = unit;
    document.querySelectorAll('.unit-filter-chip').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-unit') === unit);
    });
    if (currentView.name !== 'search') {
        currentView = { name: 'search', query: normalize(searchInput.value) };
        setRoute('#search', true);
        renderView();
    } else {
        renderSearchResults();
    }
    updateClearFiltersVisibility();
}

function setSubjectFilter(subject) {
    activeSubject = subject;
    document.querySelectorAll('.subject-filter-chip').forEach(function(c) {
        c.classList.toggle('active', c.getAttribute('data-subject-filter') === subject);
    });
    if (currentView.name !== 'search') {
        currentView = { name: 'search', query: normalize(searchInput.value) };
        setRoute('#search', true);
        renderView();
    } else {
        renderSearchResults();
    }
    updateClearFiltersVisibility();
}

function updateClearFiltersVisibility() {
    var btn = null;
    if (!btn) return;
    var hasActiveFilters = 
        activeFilter !== 'all' || 
        activeUnit !== '' || 
        activeSubject !== '' || 
        (searchInput && searchInput.value.trim() !== '');
    btn.style.display = hasActiveFilters ? 'inline-flex' : 'none';
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
    document.getElementById('btnTheme').addEventListener('click', toggleTheme);
    var btnThemeMobile = document.getElementById('btnThemeMobile');
    if (btnThemeMobile) btnThemeMobile.addEventListener('click', toggleTheme);
    var themeToggleViewer = document.getElementById('themeToggleViewer');
    if (themeToggleViewer) themeToggleViewer.addEventListener('click', toggleTheme);
    document.getElementById('btnShortcuts').addEventListener('click', openShortcutsModal);
    var btnThumbs = document.getElementById('btnThumbs');
    if (btnThumbs) btnThumbs.addEventListener('click', toggleThumbRail);

    // Filter chips
    document.querySelectorAll('.filter-chip').forEach(function(chip) {
        chip.addEventListener('click', function() { setFilter(chip.getAttribute('data-filter')); });
    });

    // Unit / subject filter chips
    document.querySelectorAll('.unit-filter-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            var u = chip.getAttribute('data-unit') || '';
            setUnitFilter(activeUnit === u ? '' : u);
        });
    });
    document.querySelectorAll('.subject-filter-chip').forEach(function(chip) {
        chip.addEventListener('click', function() {
            var s = chip.getAttribute('data-subject-filter') || '';
            setSubjectFilter(activeSubject === s ? '' : s);
        });
    });

    // Clear filters button
    var clearFiltersBtn = null;
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', clearAllFilters);
    }

    // Continue Studying — clear history needs an explicit confirmation step
    var btnClearHistory = document.getElementById('continueClear');
    if (btnClearHistory) {
        btnClearHistory.addEventListener('click', function() {
            if (btnClearHistory.dataset.confirm === '1') {
                delete btnClearHistory.dataset.confirm;
                btnClearHistory.textContent = 'Clear history';
                clearStudyHistory();
                return;
            }
            btnClearHistory.dataset.confirm = '1';
            btnClearHistory.textContent = 'Tap again to confirm';
            setTimeout(function() {
                if (btnClearHistory.dataset.confirm === '1') {
                    delete btnClearHistory.dataset.confirm;
                    btnClearHistory.textContent = 'Clear history';
                }
            }, 3000);
        });
    }

    // Find in document
    var btnFind = document.getElementById('btnFind');
    if (btnFind) btnFind.addEventListener('click', toggleFindBar);
    var findInput = document.getElementById('findInput');
    if (findInput) {
        findInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); runFind(findInput.value, e.shiftKey ? -1 : 1); }
            else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); closeFindBar(); }
        });
        // Live search as you type (debounced); Enter/Shift+Enter step through hits
        var findTimer = null;
        findInput.addEventListener('input', function() {
            clearTimeout(findTimer);
            findTimer = setTimeout(function() { runFind(findInput.value, 1); }, 350);
        });
    }
    var findNext = document.getElementById('findNext');
    if (findNext) findNext.addEventListener('click', function() { runFind(findInput.value, 1); });
    var findPrev = document.getElementById('findPrev');
    if (findPrev) findPrev.addEventListener('click', function() { runFind(findInput.value, -1); });
    var findClose = document.getElementById('findClose');
    if (findClose) findClose.addEventListener('click', function() { closeFindBar(); });

    // Jump to page: click the page counter
    pageInfo.addEventListener('click', showPageJump);
    pageInfo.addEventListener('keydown', function(e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showPageJump(); } });
    var pageJump = document.getElementById('pageJump');
    if (pageJump) {
        pageJump.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') { e.preventDefault(); hidePageJump(true); }
            else if (e.key === 'Escape') { e.preventDefault(); e.stopPropagation(); hidePageJump(false); }
        });
        pageJump.addEventListener('blur', function() { hidePageJump(true); });
    }

    // Browser Back/Forward: mirror whatever the hash points at.
    window.addEventListener('popstate', function() {
        var route = parseRoute();
        if (route.type === 'file') { openFromHash(true); return; }
        if (currentPdf) goBack(true);
        applyRoute(route, true);
    });

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

    searchInput.addEventListener('input', function(e) { 
        filterFiles(e.target.value);
        updateClearFiltersVisibility();
    });
    sidebarOverlay.addEventListener('click', closeSidebar);

    // Close modal on background click
    document.getElementById('shortcutsModal').addEventListener('click', function(e) {
        if (e.target.id === 'shortcutsModal') {
            closeShortcutsModal();
        }
    });

    // Close sheet/overlay with Escape
    document.addEventListener('keydown', function(e) {
        if (e.key !== 'Escape') return;
        if (sidebar.classList.contains('open')) {
            closeSidebar();
        }
        var modal = document.getElementById('shortcutsModal');
        if (modal && modal.classList.contains('show')) {
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
        if ((e.metaKey || e.ctrlKey) && (e.key === 'f' || e.key === 'F') && pdfDoc && currentFileType === 'pdf') {
            e.preventDefault();
            openFindBar();
            return;
        }
        if (currentFileType === 'ppt' && (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === ' ')) {
            focusSlides();
            return;
        }
        if (e.target.tagName === 'INPUT') return;
        switch (e.key) {
            case 'ArrowRight': case 'ArrowDown': if (pdfDoc) { e.preventDefault(); nextPage(); } break;
            case 'ArrowLeft': case 'ArrowUp': if (pdfDoc) { e.preventDefault(); prevPage(); } break;
            case '+': case '=': if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomIn(); } break;
            case '-': if (pdfDoc && !e.metaKey) { e.preventDefault(); zoomOut(); } break;
            case 'f': case 'F':
                if (currentPdf && !e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    toggleFullscreen();
                }
                break;
            case 't': case 'T':
                if (pdfDoc && !e.metaKey && !e.ctrlKey) {
                    e.preventDefault();
                    toggleThumbRail();
                }
                break;
            case 'Home': if (pdfDoc && currentPage !== 1) { e.preventDefault(); goToThumbPage(1); } break;
            case 'End': if (pdfDoc && currentPage !== totalPages) { e.preventDefault(); goToThumbPage(twoPageMode ? Math.max(1, totalPages - 1) : totalPages); } break;
            case 'd': case 'D':
                if (currentPdf && !e.metaKey && !e.ctrlKey) { e.preventDefault(); toggleDone(encodeURIComponent(currentPdf)); }
                break;
            case 'Escape':
                if (document.getElementById('shortcutsModal').classList.contains('show')) {
                    closeShortcutsModal();
                } else if (document.getElementById('findBar').style.display !== 'none') {
                    closeFindBar();
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

    }

// ===== Start =====
document.addEventListener('DOMContentLoaded', init);

// The Office Online embed only reacts to arrow keys when its frame has focus
function focusSlides() {
    if (currentFileType !== 'ppt' || noteViewer.style.display === 'none') return;
    try { noteViewer.focus(); } catch (e) { /* cross-origin frames may refuse focus */ }
}
