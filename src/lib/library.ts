import { RAW_SUBJECTS } from '../data/subjects';
import { UNITS } from '../data/units';
import {
  GENERAL_UNIT,
  type Resource,
  type ResourceKind,
  type Subject,
  type Unit,
  type UnitSummary,
} from '../types';

export const KIND_LABELS: Record<ResourceKind, string> = {
  pdf: 'PDF',
  ppt: 'PPT',
  notes: 'Notes',
  'question-paper': 'Question paper',
  'lab-manual': 'Lab manual',
};

export const KINDS: readonly ResourceKind[] = [
  'pdf',
  'ppt',
  'notes',
  'question-paper',
  'lab-manual',
] as const;

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;

/** Derive a resource kind from its file extension when metadata omits it. */
export function kindFromExtension(path: string): ResourceKind {
  const ext = (path.split('.').pop() || '').toLowerCase();
  if (ext === 'pptx' || ext === 'ppt') return 'ppt';
  if (ext === 'html') return 'notes';
  if (IMAGE_EXT.test(ext)) return 'notes';
  return 'pdf';
}

function normaliseUnits(units: string[] | undefined): string[] {
  return units && units.length > 0 ? [...units] : [GENERAL_UNIT];
}

function toResource(
  raw: { name: string; path: string; size?: string; units?: string[]; kind?: ResourceKind; topic?: string },
  subject: { name: string; fullName: string; color: string },
  important: boolean,
): Resource {
  return {
    id: `${subject.name}:${important ? 'important:' : ''}${raw.path}`,
    name: raw.name,
    path: raw.path,
    size: raw.size ?? '',
    units: normaliseUnits(raw.units),
    kind: raw.kind ?? (important ? 'notes' : kindFromExtension(raw.path)),
    topic: raw.topic ?? (important ? 'Important topic scan' : ''),
    subject: subject.name,
    subjectFull: subject.fullName,
    color: subject.color,
    important,
  };
}

export interface Library {
  subjects: Subject[];
  resources: Resource[];
  byPath: Map<string, Resource>;
  byId: Map<string, Resource>;
  bySubject: Map<string, Subject>;
  totalResources: number;
  /** Real files only — excludes the 12 important-topic scans. */
  totalFiles: number;
  totalImportant: number;
  units: UnitSummary[];
}

/**
 * Build the single index that every page, count and search result reads from.
 * Pure and side-effect free so it can be unit tested directly.
 */
export function buildLibrary(): Library {
  const subjects: Subject[] = [];
  const resources: Resource[] = [];

  for (const raw of RAW_SUBJECTS) {
    const meta = { name: raw.name, fullName: raw.fullName, color: raw.color };
    const files = (raw.files ?? []).map((f) => toResource(f, meta, false));
    const important = (raw.important ?? []).map((i) => toResource(i, meta, true));

    const subject: Subject = {
      name: raw.name,
      fullName: raw.fullName,
      color: raw.color,
      files,
      important,
      resourceCount: files.length + important.length,
    };

    subjects.push(subject);
    resources.push(...files, ...important);
  }

  const byPath = new Map<string, Resource>();
  const byId = new Map<string, Resource>();
  for (const resource of resources) {
    if (byPath.has(resource.path)) {
      // Paths are the deep-link key, so they must stay unique. Surface the
      // problem in development rather than silently dropping a resource.
      if (import.meta.env.DEV) {
        console.warn(`[NoteVault] Duplicate resource path: ${resource.path}`);
      }
      continue;
    }
    byPath.set(resource.path, resource);
    byId.set(resource.id, resource);
  }

  const bySubject = new Map(subjects.map((s) => [s.name, s]));

  const units: UnitSummary[] = UNITS.map((unit) => {
    const inUnit = resources.filter((r) => r.units.includes(unit));
    return {
      unit,
      resourceCount: inUnit.length,
      subjectCount: new Set(inUnit.map((r) => r.subject)).size,
    };
  });

  return {
    subjects,
    resources,
    byPath,
    byId,
    bySubject,
    totalResources: resources.length,
    totalFiles: resources.filter((r) => !r.important).length,
    totalImportant: resources.filter((r) => r.important).length,
    units,
  };
}

export const library: Library = buildLibrary();

/** Convenience exports used by pages. */
export const ALL_RESOURCES = library.resources;
export const SUBJECTS = library.subjects;
export const UNIT_SUMMARIES = library.units;

export function getResourceByPath(path: string): Resource | undefined {
  return library.byPath.get(path);
}

export function getSubject(name: string): Subject | undefined {
  return library.bySubject.get(name);
}

/** Resources linked to a unit, optionally narrowed to one subject. */
export function resourcesInUnit(unit: Unit, subject?: string): Resource[] {
  return ALL_RESOURCES.filter(
    (r) => r.units.includes(unit) && (!subject || r.subject === subject),
  );
}

/** Subjects that actually have resources in a unit, with their unit counts. */
export function subjectsInUnit(unit: Unit): Array<{ subject: Subject; count: number }> {
  return SUBJECTS.map((subject) => ({
    subject,
    count: resourcesInUnit(unit, subject.name).length,
  })).filter((entry) => entry.count > 0);
}

export function isUnit(value: string): value is Unit {
  return (UNITS as readonly string[]).includes(value);
}
