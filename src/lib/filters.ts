import type { Resource, ResourceFilters } from '../types';
import { KIND_LABELS, isUnit } from './library';

/** Type-filter options shared by the Search and Recently Added views. */
export const KIND_OPTIONS: Array<{ value: ResourceFilters['kind']; label: string }> = [
  { value: 'all', label: 'All types' },
  ...(Object.keys(KIND_LABELS) as Array<keyof typeof KIND_LABELS>).map((kind) => ({
    value: kind,
    label: KIND_LABELS[kind],
  })),
];

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

/** Parse the shared `?q&kind&unit&subject` params, ignoring unknown values. */
export function readFilters(params: URLSearchParams): ResourceFilters {
  const kindParam = params.get('kind');
  const unit = params.get('unit') ?? '';
  const subject = params.get('subject') ?? '';
  return {
    query: params.get('q') ?? '',
    kind: KIND_OPTIONS.find((option) => option.value === kindParam)?.value ?? 'all',
    unit: isUnit(unit) ? unit : '',
    subject,
  };
}

/** Serialise filters back into URL params (empty values are dropped). */
export function filtersToParams(filters: ResourceFilters): URLSearchParams {
  const search = new URLSearchParams();
  if (filters.query) search.set('q', filters.query);
  if (filters.kind !== 'all') search.set('kind', filters.kind);
  if (filters.unit) search.set('unit', filters.unit);
  if (filters.subject) search.set('subject', filters.subject);
  return search;
}
