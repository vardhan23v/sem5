import React, { useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import {
  Bookmark,
  Files,
  House,
  LibraryBig,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import { SUBJECTS } from '../../lib/library';
import { useApp } from '../../hooks/useApp';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { SubjectIcon } from '../common/SubjectIcon';
import styles from './Sidebar.module.css';

const NAV = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/search', label: 'Search', icon: Search, end: false },
  { to: '/all', label: 'All resources', icon: Files, end: false },
  { to: '/favorites', label: 'Favourites', icon: Bookmark, end: false },
];

export const Sidebar: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, favorites, theme, toggleTheme } = useApp();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isMobile = useMediaQuery('(max-width: 1023px)');

  useEffect(() => {
    if (sidebarOpen) {
      closeRef.current?.focus();
    }
  }, [sidebarOpen]);

  return (
    <>
      <div
        className={`${styles.overlay} ${sidebarOpen ? styles.overlayVisible : ''}`}
        onClick={() => setSidebarOpen(false)}
        aria-hidden="true"
      />

      <aside
        className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}
        aria-label="Main navigation"
        inert={isMobile && !sidebarOpen}
      >
        <div className={styles.header}>
          <Link to="/" className={styles.brand} onClick={() => setSidebarOpen(false)}>
            <span className={styles.logoBox} aria-hidden="true">
              <LibraryBig size={19} strokeWidth={2} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>NoteVault</span>
              <span className={styles.brandMeta}>Semester 5</span>
            </span>
          </Link>
          <button
            ref={closeRef}
            type="button"
            className={styles.closeBtn}
            onClick={() => setSidebarOpen(false)}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>

        <nav className={styles.primaryNav} aria-label="Sections">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `${styles.navItem} ${isActive ? styles.navItemActive : ''}`
              }
            >
              <item.icon size={17} strokeWidth={1.9} />
              <span>{item.label}</span>
              {item.to === '/favorites' && favorites.length > 0 ? (
                <span className={styles.navCount}>{favorites.length}</span>
              ) : null}
            </NavLink>
          ))}
        </nav>

        <div className={styles.subjects}>
          <div className={styles.subjectsHeader}>
            <span className={styles.groupLabel}>Subjects</span>
            <Link to="/subjects" className={styles.groupLink} onClick={() => setSidebarOpen(false)}>
              View all
            </Link>
          </div>
          <ul className={styles.subjectList}>
            {SUBJECTS.map((subject) => (
              <li key={subject.name}>
                <NavLink
                  to={`/subject/${encodeURIComponent(subject.name)}`}
                  className={({ isActive }) =>
                    `${styles.subjectItem} ${isActive ? styles.subjectItemActive : ''}`
                  }
                  onClick={() => setSidebarOpen(false)}
                >
                  <span
                    className={styles.subjectIcon}
                    style={{ color: subject.color }}
                    aria-hidden="true"
                  >
                    <SubjectIcon name={subject.name} size={16} />
                  </span>
                  <span className={styles.subjectName}>{subject.name}</span>
                  <span className={styles.subjectCount}>{subject.resourceCount}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footer}>
          <button type="button" className={styles.themeBtn} onClick={toggleTheme}>
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
            <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>
          </button>
          <a
            className={styles.github}
            href="https://github.com/vardhan23v/sem5"
            target="_blank"
            rel="noreferrer noopener"
          >
            vardhan23v/sem5
          </a>
        </div>
      </aside>
    </>
  );
};
