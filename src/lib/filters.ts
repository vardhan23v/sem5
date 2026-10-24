import type { Resource, ResourceFilters } from '../types';
import { KIND_LABELS } from './library';

/** Case/whitespace-insensitive normalisation used by search. */
export function normalizeText(value: string | undefined | null): string {
  return (value ?? '').toString().toLowerCase().replace(/\s+/g, ' ').trim();
}

/** One searchable string per resource: name, subject, topic, units, kind. */
export function searchHaystack(resource: Resource): string {
  return normalizeText(
    [
      resource.name,
      resource.subject,
      resource.subjectFull,
      resource.topic,
      resource.units.join(' '),
      KIND_LABELS[resource.kind],
      resource.kind,
      resource.important ? 'important topic' : '',
    ].join(' '),
  );
}

/**
 * Combine every filter. All active conditions must match (AND semantics), and
 * each search term must appear somewhere in the resource (AND across words).
 */
export function filterResources(
  resources: readonly Resource[],
  filters: ResourceFilters,
): Resource[] {
  const words = normalizeText(filters.query).split(' ').filter(Boolean);

  return resources.filter((resource) => {
    if (filters.kind !== 'all' && resource.kind !== filters.kind) return false;
    if (filters.unit && !resource.units.includes(filters.unit)) return false;
    if (filters.subject && resource.subject !== filters.subject) return false;

    if (words.length > 0) {
      const haystack = searchHaystack(resource);
      return words.every((word) => haystack.includes(word));
    }

    return true;
  });
}

export function hasActiveFilters(filters: ResourceFilters): boolean {
  return (
    filters.query.trim() !== '' ||
    filters.kind !== 'all' ||
    filters.unit !== '' ||
    filters.subject !== ''
  );
}
