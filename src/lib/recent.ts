import type { Resource } from '../types';
import { ALL_RESOURCES } from './library';

/** How many items the homepage Recently Added section previews. */
export const RECENT_PREVIEW_COUNT = 5;

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const;

/** Parsing cost is irrelevant here (66 entries) and Date.parse is timezone-safe. */
export function addedTimestamp(resource: Pick<Resource, 'addedAt'>): number {
  const parsed = Date.parse(resource.addedAt);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/** Newest first; ties fall back to name/path so the order never changes between renders. */
export function compareAddedDesc(a: Resource, b: Resource): number {
  const byDate = addedTimestamp(b) - addedTimestamp(a);
  if (byDate !== 0) return byDate;
  return a.name.localeCompare(b.name) || a.path.localeCompare(b.path);
}

/**
 * Every dated resource, newest first. Resources are read straight from the
 * central library index, so adding an entry to `src/data/subjects.ts` (and
 * committing it, or letting the build-time index script date it) is all that
 * is needed to surface it here.
 */
export const RECENT_RESOURCES: readonly Resource[] = ALL_RESOURCES.filter(
  (resource) => resource.addedAt !== '',
).sort(compareAddedDesc);

/** Newest-first slice of the library, as displayed on the homepage. */
export function recentlyAdded(limit: number = RECENT_PREVIEW_COUNT): Resource[] {
  return [...RECENT_RESOURCES.slice(0, limit)];
}

/** "24 Oct 2026" — rendered from the UTC date part so it matches the stored date. */
export function formatAddedDate(addedAt: string): string {
  if (!addedAt) return '';
  const parsed = new Date(addedAt);
  if (Number.isNaN(parsed.getTime())) return '';
  return `${parsed.getUTCDate()} ${MONTHS[parsed.getUTCMonth()]} ${parsed.getUTCFullYear()}`;
}

/** Machine-readable date for `<time dateTime>` attributes. */
export function addedDateAttr(addedAt: string): string {
  return addedAt ? addedAt.slice(0, 10) : '';
}

/** Resources added this recently are highlighted as new on rows and pages. */
export const FRESH_WINDOW_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * True when the resource joined the library inside the fresh window. The
 * comparison is against the Git-derived added date, never reading history.
 * `now` is injectable so tests stay deterministic.
 */
export function isFreshAdded(
  resource: Pick<Resource, 'addedAt'>,
  now: number = Date.now(),
): boolean {
  const timestamp = addedTimestamp(resource);
  return timestamp > 0 && now - timestamp < FRESH_WINDOW_DAYS * DAY_MS;
}
