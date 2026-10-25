import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReadingHistoryItem, ReadingProgress, Resource, Theme } from '../types';
import {
  clearHistory as clearStoredHistory,
  getDone,
  getFavorites,
  getHistory,
  getProgressMap,
  recordHistory,
  saveDone,
  saveFavorites,
  saveProgress as saveStoredProgress,
} from '../lib/storage';
import { useTheme, type ThemePreference } from './useTheme';

export type ToastTone = 'info' | 'success' | 'warning' | 'danger';

export interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

interface AppContextValue {
  /** The resolved theme actually on screen ('light' | 'dark' — never 'system'). */
  theme: Theme;
  /** The stored preference ('light' | 'dark' | 'system'). */
  themePreference: ThemePreference;
  setTheme: (preference: ThemePreference) => void;
  toggleTheme: () => void;

  favorites: string[];
  isFavorite: (path: string) => boolean;
  toggleFavorite: (path: string) => void;

  done: string[];
  isDone: (path: string) => boolean;
  toggleDone: (path: string) => void;

  history: ReadingHistoryItem[];
  recordOpen: (resource: Resource) => void;
  clearHistory: () => void;

  progress: Record<string, ReadingProgress>;
  saveProgress: (path: string, page: number, total: number) => void;

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  toasts: Toast[];
  notify: (message: string, tone?: ToastTone) => void;
  dismissToast: (id: number) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme application (data-theme, metas, OS tracking, persistence) lives in
  // useTheme so the DOM stays in sync even below/outside this provider.
  const { theme: themePreference, resolvedTheme, setTheme: setThemePreference } = useTheme();
  const theme = resolvedTheme;
  const [favorites, setFavorites] = useState<string[]>(() => getFavorites());
  const [done, setDone] = useState<string[]>(() => getDone());
  const [history, setHistory] = useState<ReadingHistoryItem[]>(() => getHistory());
  const [progress, setProgress] = useState<Record<string, ReadingProgress>>(() =>
    getProgressMap(),
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const nextToastId = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => {
      pending.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const notify = useCallback((message: string, tone: ToastTone = 'info') => {
    const id = nextToastId.current++;
    setToasts((current) => [...current.slice(-2), { id, message, tone }]);
    const timer = window.setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id));
    }, 2600);
    timers.current.push(timer);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  /**
   * A toggle deliberately LEAVES system mode: it switches to the opposite of
   * the currently *resolved* theme ('light' ⇄ 'dark'). Returning to live
   * OS-following is an explicit choice made in the ThemeMenu ('System').
   */
  const toggleTheme = useCallback(() => {
    setThemePreference(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setThemePreference]);

  const setTheme = useCallback(
    (preference: ThemePreference) => {
      setThemePreference(preference);
    },
    [setThemePreference],
  );

  const toggleFavorite = useCallback(
    (path: string) => {
      setFavorites((current) => {
        const exists = current.includes(path);
        const next = exists
          ? current.filter((entry) => entry !== path)
          : [...current, path];
        saveFavorites(next);
        notify(exists ? 'Removed from favourites' : 'Added to favourites', exists ? 'info' : 'success');
        return next;
      });
    },
    [notify],
  );

  const toggleDone = useCallback(
    (path: string) => {
      setDone((current) => {
        const exists = current.includes(path);
        const next = exists
          ? current.filter((entry) => entry !== path)
          : [...current, path];
        saveDone(next);
        notify(exists ? 'Marked as not done' : 'Marked as done', exists ? 'info' : 'success');
        return next;
      });
    },
    [notify],
  );

  const recordOpen = useCallback((resource: Resource) => {
    const updated = recordHistory({
      path: resource.path,
      name: resource.name,
      subject: resource.subject,
      kind: resource.kind,
      units: resource.units,
    });
    setHistory(updated);
  }, []);

  const clearHistory = useCallback(() => {
    clearStoredHistory();
    setHistory([]);
    notify('Study history cleared', 'info');
  }, [notify]);

  const saveProgress = useCallback((path: string, page: number, total: number) => {
    const record = saveStoredProgress(path, page, total);
    if (!record) return;
    setProgress((current) => ({ ...current, [path]: record }));
  }, []);

  const isFavorite = useCallback((path: string) => favorites.includes(path), [favorites]);
  const isDone = useCallback((path: string) => done.includes(path), [done]);

  const value = useMemo<AppContextValue>(
    () => ({
      theme,
      themePreference,
      setTheme,
      toggleTheme,
      favorites,
      isFavorite,
      toggleFavorite,
      done,
      isDone,
      toggleDone,
      history,
      recordOpen,
      clearHistory,
      progress,
      saveProgress,
      sidebarOpen,
      setSidebarOpen,
      toasts,
      notify,
      dismissToast,
    }),
    [
      theme,
      themePreference,
      setTheme,
      toggleTheme,
      favorites,
      isFavorite,
      toggleFavorite,
      done,
      isDone,
      toggleDone,
      history,
      recordOpen,
      clearHistory,
      progress,
      saveProgress,
      sidebarOpen,
      toasts,
      notify,
      dismissToast,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export function useApp(): AppContextValue {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside <AppProvider>');
  }
  return context;
}
