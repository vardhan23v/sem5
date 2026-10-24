import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bookmark, Command, Menu, Moon, Search, Sun } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import styles from './Topbar.module.css';

const SEARCH_ROUTES = ['/search'];

export const Topbar: React.FC = () => {
  const { setSidebarOpen, favorites, theme, toggleTheme } = useApp();
  const location = useLocation();
  const onSearch = SEARCH_ROUTES.includes(location.pathname);

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button
          type="button"
          className={styles.iconBtn}
          onClick={() => setSidebarOpen(true)}
          aria-label="Open navigation"
        >
          <Menu size={19} />
        </button>
        <Link to="/" className={styles.brand}>
          <span className={styles.brandName}>NoteVault</span>
          <span className={styles.brandDivider} aria-hidden="true">
            /
          </span>
          <span className={styles.brandSection}>Semester 5</span>
        </Link>
      </div>

      <div className={styles.right}>
        <Link
          to="/search"
          className={`${styles.searchBtn} ${onSearch ? styles.searchBtnActive : ''}`}
          aria-label="Open search"
        >
          <Search size={16} />
          <span className={styles.searchLabel}>Search</span>
          <kbd className={styles.kbd}>
            <Command size={10} />
            K
          </kbd>
        </Link>

        <Link to="/favorites" className={styles.iconBtn} aria-label="Favourites" title="Favourites">
          <Bookmark size={17} />
          {favorites.length > 0 ? (
            <span className={styles.badge}>{favorites.length}</span>
          ) : null}
        </Link>

        <button
          type="button"
          className={styles.iconBtn}
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
        >
          {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </div>
    </header>
  );
};
