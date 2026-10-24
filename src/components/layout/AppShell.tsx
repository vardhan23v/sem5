import React, { useEffect, useLayoutEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toasts } from '../common/Toasts';
import { useApp } from '../../hooks/useApp';
import styles from './AppShell.module.css';

export const AppShell: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  // Global shortcut advertised in the top bar: ⌘K / Ctrl+K opens search.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        navigate('/search');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [navigate]);

  // The drawer is a transient overlay: close it on navigation and on Escape.
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, location.search, setSidebarOpen]);

  // A new page should start at the top; filter changes (same path) keep their
  // position so results do not jump around while typing.
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSidebarOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [sidebarOpen, setSidebarOpen]);

  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#main-content">
        Skip to content
      </a>
      <Sidebar />
      <div className={styles.column}>
        <Topbar />
        <main id="main-content" className={styles.main}>
          <div className={styles.container}>
            <div key={location.pathname} className={`${styles.route} nv-page-in`}>
              <Outlet />
            </div>
          </div>
          <footer className={styles.footer}>
            <span>NoteVault · Semester 5</span>
            <a
              href="https://github.com/vardhan23v/sem5"
              target="_blank"
              rel="noreferrer noopener"
            >
              vardhan23v/sem5
            </a>
          </footer>
        </main>
      </div>
      <Toasts />
    </div>
  );
};
