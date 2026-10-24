import { beforeEach, describe, expect, it } from 'vitest';
import {
  HISTORY_LIMIT,
  KEYS,
  clearHistory,
  getDone,
  getFavorites,
  getHistory,
  getProgress,
  getProgressMap,
  getTheme,
  normalizeHistory,
  normalizeProgress,
  recordHistory,
  saveDone,
  saveFavorites,
  saveProgress,
  saveTheme,
} from './storage';

beforeEach(() => {
  localStorage.clear();
});

describe('progress migration', () => {
  it('reads the legacy {page,total,timestamp,percentage} shape', () => {
    const record = normalizeProgress({ page: 4, total: 10, timestamp: 1700000000000, percentage: 40 });
    expect(record).toEqual({ page: 4, total: 10, updatedAt: 1700000000000, percentage: 40 });
  });

  it('derives a percentage when the legacy field is missing', () => {
    expect(normalizeProgress({ page: 3, total: 12, timestamp: 1 })?.percentage).toBe(25);
  });

  it('rejects malformed records instead of throwing', () => {
    expect(normalizeProgress(null)).toBeNull();
    expect(normalizeProgress([])).toBeNull();
    expect(normalizeProgress({ page: 0, total: 10 })).toBeNull();
    expect(normalizeProgress({ page: 2, total: 0 })).toBeNull();
    expect(normalizeProgress({ page: 'x', total: 'y' })).toBeNull();
  });

  it('keeps valid entries when the stored map is partially corrupt', () => {
    localStorage.setItem(
      KEYS.progress,
      JSON.stringify({
        'OS/OS UNIT 1.pdf': { page: 5, total: 20, timestamp: 123 },
        broken: { page: 'nope', total: 4 },
      }),
    );

    expect(Object.keys(getProgressMap())).toEqual(['OS/OS UNIT 1.pdf']);
    expect(getProgress('OS/OS UNIT 1.pdf')?.page).toBe(5);
  });

  it('survives invalid JSON without clearing storage', () => {
    localStorage.setItem(KEYS.progress, '{not json');
    expect(getProgressMap()).toEqual({});
    expect(localStorage.getItem(KEYS.progress)).toBe('{not json');
  });

  it('writes both new and legacy timestamp fields', () => {
    const saved = saveProgress('CNC/CNC UNIT 1.pdf', 3, 9);
    expect(saved?.percentage).toBe(33);

    const raw = JSON.parse(localStorage.getItem(KEYS.progress) ?? '{}');
    expect(raw['CNC/CNC UNIT 1.pdf'].page).toBe(3);
    expect(raw['CNC/CNC UNIT 1.pdf'].updatedAt).toBe(saved?.updatedAt);
    expect(raw['CNC/CNC UNIT 1.pdf'].timestamp).toBe(saved?.updatedAt);
  });

  it('ignores invalid pages when saving', () => {
    expect(saveProgress('x.pdf', 0, 10)).toBeNull();
    expect(localStorage.getItem(KEYS.progress)).toBeNull();
  });
});

describe('history migration', () => {
  it('normalises legacy entries and fills missing fields', () => {
    const history = normalizeHistory([
      { path: 'OS/OS UNIT 1.pdf', openedAt: 5000 },
      { path: 'OS/OS UNIT 1.pdf', openedAt: 9000 },
      { name: 'no path' },
      null,
    ]);

    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({
      path: 'OS/OS UNIT 1.pdf',
      name: 'OS UNIT 1.pdf',
      subject: '',
      kind: 'pdf',
      openedAt: 5000,
    });
  });

  it('caps history at the documented limit', () => {
    const raw = Array.from({ length: 20 }, (_, index) => ({
      path: `file-${index}.pdf`,
      openedAt: index + 1,
    }));
    expect(normalizeHistory(raw)).toHaveLength(HISTORY_LIMIT);
  });

  it('handles corrupt storage and non-array payloads safely', () => {
    localStorage.setItem(KEYS.history, '{"nope":true}');
    expect(getHistory()).toEqual([]);
    localStorage.setItem(KEYS.history, '[[[');
    expect(getHistory()).toEqual([]);
  });

  it('records an open once, newest first', () => {
    recordHistory({ path: 'a.pdf', name: 'A', subject: 'OS', kind: 'pdf', units: ['Unit 1'] });
    const updated = recordHistory({
      path: 'b.pdf',
      name: 'B',
      subject: 'OS',
      kind: 'pdf',
      units: ['Unit 2'],
    });

    expect(updated.map((entry) => entry.path)).toEqual(['b.pdf', 'a.pdf']);

    const reopened = recordHistory({
      path: 'a.pdf',
      name: 'A',
      subject: 'OS',
      kind: 'pdf',
      units: ['Unit 1'],
    });
    expect(reopened.map((entry) => entry.path)).toEqual(['a.pdf', 'b.pdf']);
  });

  it('clears only the history key', () => {
    saveFavorites(['a.pdf']);
    recordHistory({ path: 'a.pdf', name: 'A', subject: 'OS', kind: 'pdf', units: [] });
    clearHistory();

    expect(getHistory()).toEqual([]);
    expect(getFavorites()).toEqual(['a.pdf']);
  });
});

describe('favourites, completion and theme', () => {
  it('round-trips string lists and drops non-strings', () => {
    saveFavorites(['a.pdf', 'b.pdf']);
    expect(getFavorites()).toEqual(['a.pdf', 'b.pdf']);

    localStorage.setItem(KEYS.favorites, JSON.stringify(['a.pdf', 3, null, '']));
    expect(getFavorites()).toEqual(['a.pdf']);
  });

  it('survives malformed list payloads', () => {
    localStorage.setItem(KEYS.done, '"not-a-list"');
    expect(getDone()).toEqual([]);
  });

  it('stores completion marks under the legacy key', () => {
    saveDone(['a.pdf']);
    expect(JSON.parse(localStorage.getItem('notevault_done') ?? '[]')).toEqual(['a.pdf']);
  });

  it('defaults to dark and respects a stored light theme', () => {
    expect(getTheme()).toBe('dark');
    saveTheme('light');
    expect(getTheme()).toBe('light');
    localStorage.setItem(KEYS.theme, 'purple');
    expect(getTheme()).toBe('dark');
  });
});
