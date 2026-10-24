import { describe, expect, it } from 'vitest';
import type { Resource } from '../types';
import {
  addedDateAttr,
  addedTimestamp,
  compareAddedDesc,
  formatAddedDate,
  recentlyAdded,
  RECENT_PREVIEW_COUNT,
  RECENT_RESOURCES,
} from './recent';
import { filterResources } from './filters';
import { ALL_RESOURCES } from './library';

describe('recently added', () => {
  it('dates every indexed resource', () => {
    const undated = ALL_RESOURCES.filter((resource) => resource.addedAt === '');
    expect(undated.map((resource) => resource.path)).toEqual([]);
  });

  it('stores a parseable timestamp for every date', () => {
    for (const resource of ALL_RESOURCES) {
      expect(addedTimestamp(resource)).toBeGreaterThan(0);
    }
  });

  it('sorts newest first with a deterministic tie-break', () => {
    const ordered = [...RECENT_RESOURCES];
    for (let index = 1; index < ordered.length; index += 1) {
      const previous = ordered[index - 1];
      const current = ordered[index];
      const previousTime = addedTimestamp(previous);
      const currentTime = addedTimestamp(current);
      expect([previousTime > currentTime, previousTime === currentTime]).toContain(true);
      if (previousTime === currentTime) {
        expect(previous.name.localeCompare(current.name)).toBeLessThanOrEqual(0);
      }
    }
  });

  it('previews the newest resources on the homepage', () => {
    const preview = recentlyAdded();
    expect(preview).toHaveLength(RECENT_PREVIEW_COUNT);
    expect(preview).toEqual(RECENT_RESOURCES.slice(0, RECENT_PREVIEW_COUNT));

    const newestDays = preview.slice(0, 2).map((resource) => resource.addedAt.slice(0, 10));
    const maxDay = RECENT_RESOURCES
      .map((resource) => resource.addedAt.slice(0, 10))
      .sort()
      .at(-1);
    expect(new Set(newestDays)).toEqual(new Set([maxDay]));
  });

  it('does not confuse reading history with library additions', () => {
    // The list is derived purely from the central index, not from storage.
    expect(RECENT_RESOURCES).toHaveLength(ALL_RESOURCES.length);
  });

  it('keeps ordering meaningful when filters are applied', () => {
    const filtered = filterResources(RECENT_RESOURCES, {
      query: '',
      kind: 'notes',
      unit: '',
      subject: '',
    });
    const sortedDates = filtered.map((resource) => addedTimestamp(resource));
    expect([...sortedDates].sort((a, b) => b - a)).toEqual(sortedDates);
  });

  it('compareAddedDesc is stable for identical entries', () => {
    expect(compareAddedDesc(RECENT_RESOURCES[0], RECENT_RESOURCES[0])).toBe(0);
  });

  it('renders the added date from the UTC part of the timestamp', () => {
    expect(formatAddedDate('2026-10-24T16:41:00.000Z')).toBe('24 Oct 2026');
    expect(formatAddedDate('')).toBe('');
    expect(addedDateAttr('2026-10-24T11:13:26.415Z')).toBe('2026-10-24');
  });

  it('attaches the generated date to a known new resource', () => {
    const resource = ALL_RESOURCES.find((entry) => entry.path === 'TOC/TOC UNIT 2 NOTES.pdf');
    expect(resource?.addedAt).toMatch(/^2026-10-2\dT/);
    expect(resource?.units).toEqual(['Unit 2']);
  });
});

type ResourceArg = Resource;

describe('recent date formatting guards', () => {
  it('ignores nonsense timestamps', () => {
    const bogus = { addedAt: 'not a date' } as unknown as ResourceArg;
    expect(addedTimestamp(bogus)).toBe(0);
    expect(formatAddedDate(bogus.addedAt)).toBe('');
  });
});
