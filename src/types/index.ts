/**
 * Core domain types.
 *
 * The library data has exactly one source of truth: `src/data/subjects.ts`.
 * Everything else (counts, filters, search, navigation) derives from it.
 */

export type ResourceKind = 'pdf' | 'ppt' | 'notes' | 'question-paper' | 'lab-manual';

/** Units that navigation exposes. There is deliberately no Unit 4. */
export type Unit = 'Unit 1' | 'Unit 2' | 'Unit 3' | 'Lab Manuals';

/** Internal bucket for files that are not tied to a teaching unit. */
export const GENERAL_UNIT = 'General';

export interface RawFile {
  name: string;
  path: string;
  size?: string;
  units?: string[];
  kind?: ResourceKind;
  topic?: string;
}

export interface RawImportant {
  name: string;
  path: string;
  units?: string[];
  kind?: ResourceKind;
}

export interface SubjectRaw {
  name: string;
  fullName: string;
  color: string;
  files?: RawFile[];
  important?: RawImportant[];
}

/** A single, de-duplicated library entry used by every view. */
export interface Resource {
  /** Stable identifier: `<subject>:<path>` — safe for history/bookmarks. */
  id: string;
  name: string;
  path: string;
  size: string;
  units: string[];
  kind: ResourceKind;
  topic: string;
  subject: string;
  subjectFull: string;
  color: string;
  /** True for the "important topic" photo scans. */
  important: boolean;
  /**
   * When the resource joined the library — ISO timestamp, newest-first key for
   * Recently Added. Generated from Git history by `scripts/index-added.mjs`;
   * empty only when the resource has never been committed and the file has no
   * readable creation time.
   */
  addedAt: string;
}

export interface Subject {
  name: string;
  fullName: string;
  color: string;
  /** Teaching resources (PDFs, notes, PPTs, papers, manuals). */
  files: Resource[];
  /** Important-topic scans, shown in their own group. */
  important: Resource[];
  /** files + important — what every subject card displays. */
  resourceCount: number;
}

export interface UnitSummary {
  unit: Unit;
  resourceCount: number;
  subjectCount: number;
}

export interface ReadingProgress {
  page: number;
  total: number;
  /** Milliseconds since epoch. Legacy records use `timestamp`; normalised on read. */
  updatedAt: number;
  /** 0–100, derived from page/total. */
  percentage: number;
}

export interface ReadingHistoryItem {
  path: string;
  name: string;
  subject: string;
  kind: ResourceKind;
  units: string[];
  openedAt: number;
}

export type Theme = 'dark' | 'light';

export interface ResourceFilters {
  query: string;
  kind: ResourceKind | 'all';
  unit: string;
  subject: string;
}
