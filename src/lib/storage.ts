/**
 * localStorage adapters.
 *
 * These keys and payload shapes match the pre-React (vanilla) app, so existing
 * favourites, completion marks, reading progress and history survive the
 * migration. Nothing here clears storage: malformed data is ignored, never
 * overwritten with an empty value on read.
 */

import type { ReadingHistoryItem, ReadingProgress, ResourceKind, Theme } from '../types';
import { kindFromExtension } from './library';

export const KEYS = {
  favorites: 'notevault_favorites',
  done: 'notevault_done',
  progress: 'notevault_progress',
  history: 'notevault_history',
  theme: 'notevault_theme',
  spread: 'notevault_reader_spread',
} as const;

export const HISTORY_LIMIT = 8;

function readJSON(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private browsing / quota exceeded: keep the app usable.
  }
}

function readStringList(key: string): string[] {
  const value = readJSON(key);
  if (!Array.isArray(value)) return [];
  return value.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
}

/* ---------------------------------- favourites --------------------------------- */

export function getFavorites(): string[] {
  return readStringList(KEYS.favorites);
}

export function saveFavorites(paths: string[]): void {
  writeJSON(KEYS.favorites, paths);
}

/* ------------------------------- completion marks ------------------------------ */

export function getDone(): string[] {
  return readStringList(KEYS.done);
}

export function saveDone(paths: string[]): void {
  writeJSON(KEYS.done, paths);
}

/* ----------------------------------- progress ---------------------------------- */

interface LegacyProgress {
  page?: unknown;
  total?: unknown;
  timestamp?: unknown;
  updatedAt?: unknown;
  percentage?: unknown;
}

/** Accepts both the legacy `{page,total,timestamp,percentage}` and newer shapes. */
export function normalizeProgress(raw: unknown): ReadingProgress | null {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return null;
  const entry = raw as LegacyProgress;
  const page = Number(entry.page);
  const total = Number(entry.total);
  if (!Number.isFinite(page) || page < 1) return null;
  if (!Number.isFinite(total) || total < 1) return null;

  const stamp = Number(entry.updatedAt ?? entry.timestamp);
  const percentage =
    Number.isFinite(Number(entry.percentage)) && entry.percentage !== undefined
      ? Math.min(100, Math.max(0, Math.round(Number(entry.percentage))))
      : Math.min(100, Math.round((page / total) * 100));

  return {
    page: Math.min(page, total),
    total,
    updatedAt: Number.isFinite(stamp) && stamp > 0 ? stamp : 0,
    percentage,
  };
}

export function getProgressMap(): Record<string, ReadingProgress> {
  const raw = readJSON(KEYS.progress);
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return {};

  const out: Record<string, ReadingProgress> = {};
  for (const [path, value] of Object.entries(raw as Record<string, unknown>)) {
    const normalized = normalizeProgress(value);
    if (normalized) out[path] = normalized;
  }
  return out;
}

export function getProgress(path: string): ReadingProgress | null {
  return getProgressMap()[path] ?? null;
}

export function saveProgress(path: string, page: number, total: number): ReadingProgress | null {
  if (!Number.isFinite(page) || !Number.isFinite(total) || total < 1 || page < 1) return null;

  const record: ReadingProgress = {
    page: Math.min(Math.round(page), Math.round(total)),
    total: Math.round(total),
    updatedAt: Date.now(),
    percentage: Math.min(100, Math.round((page / total) * 100)),
  };

  const map = getProgressMap();
  map[path] = record;

  // Keep the legacy fields too, so a rollback to the vanilla build still
  // understands this record.
  writeJSON(KEYS.progress, {
    ...map,
    [path]: {
      ...record,
      timestamp: record.updatedAt,
    },
  });
  return record;
}

/* ----------------------------------- history ----------------------------------- */

function toKind(value: unknown, path: string): ResourceKind {
  const allowed: ResourceKind[] = ['pdf', 'ppt', 'notes', 'question-paper', 'lab-manual'];
  return allowed.includes(value as ResourceKind)
    ? (value as ResourceKind)
    : kindFromExtension(path);
}

/**
 * Coerce stored history into 8 clean, de-duplicated entries.
 * Drops entries without a path or with a non-numeric timestamp.
 */
export function normalizeHistory(raw: unknown): ReadingHistoryItem[] {
  if (!Array.isArray(raw)) return [];

  const seen = new Set<string>();
  const out: ReadingHistoryItem[] = [];

  for (const item of raw) {
    if (!item || typeof item !== 'object') continue;
    const entry = item as Record<string, unknown>;
    const path = typeof entry.path === 'string' ? entry.path : '';
    if (!path || seen.has(path)) continue;
    seen.add(path);

    const openedAt = Number(entry.openedAt);
    out.push({
      path,
      name:
        typeof entry.name === 'string' && entry.name
          ? entry.name
          : (path.split('/').pop() ?? path),
      subject: typeof entry.subject === 'string' ? entry.subject : '',
      kind: toKind(entry.kind, path),
      units: Array.isArray(entry.units)
        ? entry.units.filter((u): u is string => typeof u === 'string')
        : [],
      openedAt: Number.isFinite(openedAt) && openedAt > 0 ? openedAt : Date.now(),
    });
  }

  return out.slice(0, HISTORY_LIMIT);
}

export function getHistory(): ReadingHistoryItem[] {
  return normalizeHistory(readJSON(KEYS.history));
}

export function recordHistory(
  item: Omit<ReadingHistoryItem, 'openedAt'>,
): ReadingHistoryItem[] {
  const existing = getHistory().filter((entry) => entry.path !== item.path);
  const updated: ReadingHistoryItem[] = [{ ...item, openedAt: Date.now() }, ...existing].slice(
    0,
    HISTORY_LIMIT,
  );
  writeJSON(KEYS.history, updated);
  return updated;
}

export function clearHistory(): void {
  try {
    localStorage.removeItem(KEYS.history);
  } catch {
    // ignore
  }
}

/* ------------------------------- reader view ------------------------------- */

/** Two-page (book) view preference for the PDF reader; "1" = spread on. */
export function getSpreadDefault(): boolean {
  try {
    return localStorage.getItem(KEYS.spread) === '1';
  } catch {
    return false;
  }
}

export function saveSpread(on: boolean): void {
  try {
    localStorage.setItem(KEYS.spread, on ? '1' : '0');
  } catch {
    // ignore
  }
}

/* ------------------------------------ theme ------------------------------------ */

export function getTheme(): Theme {
  try {
    const stored = localStorage.getItem(KEYS.theme);
    return stored === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem(KEYS.theme, theme);
  } catch {
    // ignore
  }
}
