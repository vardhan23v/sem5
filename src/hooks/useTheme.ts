import { useCallback, useEffect, useRef, useState } from 'react';
import type { Theme } from '../types';

/**
 * Theme preference engine: light | dark | system, persisted under the same
 * `notevault_theme` key the pre-React app used. Owns every side effect that
 * must follow the resolved theme:
 *
 * - `data-theme` on <html> (the token switch),
 * - the dual `theme-color` metas (browser/PWA chrome), which follow the OS by
 *   default and are re-aligned when a stored preference overrides it,
 * - `notevault_theme` in localStorage (a bare value; `system` is only stored,
 *   never resolved straight to light/dark),
 * - OS colour-scheme changes while in system mode, and cross-tab changes via
 *   the `storage` event.
 *
 * The inline script in index.html has already applied the same resolution
 * before first paint, so the first effect run is a no-op write — no flash.
 */
export type ThemePreference = Theme | 'system';

const STORAGE_KEY = 'notevault_theme';
const DARK_QUERY = '(prefers-color-scheme: dark)';
const LIGHT_CANVAS = '#FBEFF1';
const DARK_CANVAS = '#100A0E';

/**
 * OS-level dark preference. `matches` is treated as dark only when matchMedia
 * itself is unavailable/errors (mirrors the index.html bootstrap).
 */
function systemPrefersDark(): boolean {
  try {
    return window.matchMedia(DARK_QUERY).matches;
  } catch {
    return true;
  }
}

function resolveTheme(preference: ThemePreference): Theme {
  return preference === 'system' ? (systemPrefersDark() ? 'dark' : 'light') : preference;
}

/**
 * Reads the stored preference, seating 'system' the first time the app runs.
 * Anything other than 'light'|'dark'|'system' is ignored (never overwritten).
 */
function readStoredPreference(): ThemePreference {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
    if (stored === null) {
      try {
        localStorage.setItem(STORAGE_KEY, 'system');
      } catch {
        // Private browsing: keep the in-memory default instead.
      }
    }
  } catch {
    // localStorage blocked; fall through to system.
  }
  return 'system';
}

/**
 * Keeps the dual theme-color metas in agreement with the resolved theme. The
 * meta matched by the OS colour scheme is the one the browser actually
 * applies, so its content gets the resolved canvas colour (both are left at
 * their defaults whenever the two agree — the common case).
 */
function syncChromeColor(resolved: Theme): void {
  try {
    const lightMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][media*="light" i]',
    );
    const darkMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"][media*="dark" i]',
    );
    if (lightMeta && darkMeta) {
      lightMeta.setAttribute('content', LIGHT_CANVAS);
      darkMeta.setAttribute('content', DARK_CANVAS);
      const activeMeta = systemPrefersDark() ? darkMeta : lightMeta;
      activeMeta.setAttribute('content', resolved === 'dark' ? DARK_CANVAS : LIGHT_CANVAS);
      return;
    }
    const single = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (single) single.setAttribute('content', resolved === 'dark' ? DARK_CANVAS : LIGHT_CANVAS);
  } catch {
    // Meta sync is cosmetic; never let it break the theme switch.
  }
}

export interface UseThemeApi {
  /** Stored preference; the raw 'light' | 'dark' | 'system' value. */
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  /** What is actually on screen right now ('light' | 'dark'). */
  resolvedTheme: Theme;
}

export function useTheme(): UseThemeApi {
  const [state, setState] = useState<{ preference: ThemePreference; resolved: Theme }>(() => {
    const preference = readStoredPreference();
    return { preference, resolved: resolveTheme(preference) };
  });

  // Latest values for event handlers that must not re-subscribe.
  const preferenceRef = useRef(state.preference);
  const resolvedRef = useRef(state.resolved);
  preferenceRef.current = state.preference;
  resolvedRef.current = state.resolved;

  // 1) Push the current pair into the DOM, storage and browser chrome.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.resolved);
    try {
      localStorage.setItem(STORAGE_KEY, state.preference);
    } catch {
      // Private browsing: the choice survives until reload from code state.
    }
    syncChromeColor(state.resolved);
  }, [state]);

  // 2) Follow the OS while in system mode, and re-read localStorage on
  //    'systemchange'-style events: OS switches (matchMedia) and cross-tab
  //    changes (storage). A pinned preference only re-syncs the chrome metas.
  useEffect(() => {
    const onMediaChange = (): void => {
      const next = resolveTheme(preferenceRef.current);
      syncChromeColor(next);
      setState((current) =>
        current.resolved === next ? current : { ...current, resolved: next },
      );
    };

    const onStorage = (event: StorageEvent): void => {
      if (event.storageArea !== localStorage) return;
      if (event.key && event.key !== STORAGE_KEY) return;
      const preference = readStoredPreference();
      const resolved = resolveTheme(preference);
      setState({ preference, resolved });
    };

    const mql = window.matchMedia(DARK_QUERY);
    mql.addEventListener('change', onMediaChange);
    window.addEventListener('storage', onStorage);
    return () => {
      mql.removeEventListener('change', onMediaChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const setTheme = useCallback((next: ThemePreference): void => {
    setState({ preference: next, resolved: resolveTheme(next) });
  }, []);

  return { theme: state.preference, setTheme, resolvedTheme: state.resolved };
}
