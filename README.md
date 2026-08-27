# 📚 NoteVault — Semester 5

> A beautiful, feature-rich web application for organizing and viewing your 5th semester study materials with glassmorphism design, dark theme, and powerful productivity features.

## ✨ Features

### 🎯 Core Functionality
- **Multi-Format Support**: View PDFs, HTML notes, images, and download presentations (PPTX/DOCX)
- **Smart Organization**: Files organized by subjects with collapsible sections
- **Powerful Search**: Real-time search across all files and subjects
- **Glassmorphism UI**: Modern dark theme with blur effects and ambient animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### ⭐ NEW Productivity Features
- **Favorites System**: Star your most-used files for quick access
- **Reading Progress**: Automatically saves your position in PDFs
- **Recently Viewed**: Quick access to your last 10 opened files
- **Smart Notifications**: Beautiful toast alerts for all actions
- **Keyboard Shortcuts**: Power user shortcuts with `?` help modal
- **Local Storage**: All preferences persist across sessions

### � PDF Viewer Features
- High-DPI rendering for crisp text
- Zoom in/out with smooth controls
- Page navigation (next/prev)
- Two-page spread view (desktop only)
- Swipe gestures for page turns
- Pinch-to-zoom support
- Fullscreen mode
- Download functionality
- Reading progress auto-save

### ⌨️ Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `→` `↓` | Next page |
| `←` `↑` | Previous page |
| `+` `=` | Zoom in |
| `-` | Zoom out |
| `Esc` | Go back / Close modal |
| `?` | Show keyboard shortcuts |

### 📱 Mobile Optimizations
- Touch-friendly interface with 44px+ touch targets
- Swipe gestures for page navigation
- Responsive sidebar with smooth animations
- Auto-scaling PDFs to fit screen
- Optimized font sizes and spacing
- Full-width notifications
- Bottom navigation bar for page controls

## 🚀 Getting Started

1. **Clone or download** this repository
2. **Open `index.html`** in a modern web browser
3. **No installation required** — it's a static web app!

```bash
# Optional: Serve with a local server
python3 -m http.server 8000
# Then open http://localhost:8000
```

## 📁 Project Structure

```
sem 5/
├── index.html              # Main application file
├── assets/
│   ├── css/
│   │   └── style.css      # Complete styling with glassmorphism
│   └── js/
│       └── app.js         # Application logic & features
├── CNC/                   # Computer Networks materials
├── OS/                    # Operating Systems materials  
├── TOC/                   # Theory of Computation materials
├── Data Science/          # Data Science materials
├── Lab Manuals/          # Lab manuals and guides
├── FEATURES.md           # Detailed feature documentation
└── README.md             # This file
```

## 🎨 Subjects Included

| Subject | Full Name | Materials |
|---------|-----------|-----------|
| **CNC** | Computer Networks & Communication | PDFs, HTML notes, PPTs |
| **OS** | Operating Systems | PDFs, HTML notes, PPTs, Images |
| **TOC** | Theory of Computation | PDFs, HTML notes with animations |
| **Data Science** | Introduction to Data Science | HTML interactive notes |
| **Lab Manuals** | Various Lab Manuals | C++, Java Spring, CNC, OS |

## 💾 Data Persistence

All user data is stored locally in your browser using `localStorage`:

### Stored Data
- **Favorites**: Your starred files
- **Recent Files**: Last 10 viewed files with timestamps
- **Reading Progress**: Current page for each PDF (page number, total pages, percentage)
- **Theme Preference**: Dark/Light mode (future feature)

### Privacy
- ✅ All data stays on your device
- ✅ No external servers or tracking
- ✅ Works completely offline
- ✅ Clear browser data to reset

## 🛠️ Technologies Used

- **Frontend**: Vanilla JavaScript (ES5 compatible)
- **PDF Rendering**: PDF.js by Mozilla
- **Styling**: Pure CSS with CSS Variables
- **Fonts**: Inter (Google Fonts)
- **Icons**: Feather Icons (SVG)
- **Storage**: Web Storage API (localStorage)

## � Browser Compatibility

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Usage Tips

### For Best Experience
1. **Use keyboard shortcuts** for faster navigation (`?` to see all)
2. **Star important files** for quick access later
3. **Let progress auto-save** — just close and reopen
4. **Use search** to find files quickly across all subjects
5. **Zoom with Ctrl/Cmd + scroll** for precise control

### Mobile Usage
- Tap the hamburger menu to open sidebar
- Swipe left/right to change pages
- Pinch to zoom on PDFs
- All features work on mobile!

## 🔮 Upcoming Features

- [ ] Dark/Light theme toggle
- [ ] Export favorites list
- [ ] Study timer and session tracking
- [ ] PDF annotations and highlights
- [ ] Search within PDF content
- [ ] Custom file tags
- [ ] Statistics dashboard
- [ ] Cloud sync (optional)

## 📝 License

MIT License - Feel free to use this project for your own studies!

## 🤝 Contributing

Suggestions and improvements are welcome! This is a personal study tool but can be adapted for any course materials.

---

**Made with � for efficient studying**  
*Version 2.0 — Now with productivity superpowers!*
