import React, { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ListFilter, SearchX, X } from 'lucide-react';
import { ALL_RESOURCES, KINDS, KIND_LABELS, isUnit } from '../lib/library';
import { UNITS } from '../data/units';
import { filterResources, hasActiveFilters } from '../lib/filters';
import type { ResourceFilters, ResourceKind } from '../types';
import { ResourceCard } from '../components/cards/ResourceCard';
import { SearchField } from '../components/search/SearchField';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { useMediaQuery } from '../hooks/useMediaQuery';
import styles from './SearchPage.module.css';

const KIND_OPTIONS: Array<{ value: ResourceKind | 'all'; label: string }> = [
  { value: 'all', label: 'All types' },
  ...KINDS.map((kind) => ({ value: kind, label: KIND_LABELS[kind] })),
];

function readFilters(params: URLSearchParams): ResourceFilters {
  const kind = params.get('kind');
  const unit = params.get('unit') ?? '';
  const subject = params.get('subject') ?? '';
  return {
    query: params.get('q') ?? '',
    kind: KIND_OPTIONS.some((option) => option.value === kind)
      ? (kind as ResourceKind)
      : 'all',
    unit: isUnit(unit) ? unit : '',
    subject,
  };
}

export const SearchPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const initial = useMemo(() => readFilters(params), []);
  const [query, setQuery] = useState(initial.query);
  const [kind, setKind] = useState<ResourceKind | 'all'>(initial.kind);
  const [unit, setUnit] = useState(initial.unit);
  const [subject, setSubject] = useState(initial.subject);
  const isMobile = useMediaQuery('(max-width: 767px)');

  const filters: ResourceFilters = { query, kind, unit, subject };
  const results = useMemo(() => filterResources(ALL_RESOURCES, filters), [query, kind, unit, subject]);
  const active = hasActiveFilters(filters);

  const subjectOptions = useMemo(
    () => Array.from(new Set(ALL_RESOURCES.map((resource) => resource.subject))),
    [],
  );

  /** Mirror state into the URL so the view is shareable and reload-safe. */
  const syncUrl = (next: Partial<ResourceFilters>) => {
    const merged = { query, kind, unit, subject, ...next };
    const search = new URLSearchParams();
    if (merged.query) search.set('q', merged.query);
    if (merged.kind !== 'all') search.set('kind', merged.kind);
    if (merged.unit) search.set('unit', merged.unit);
    if (merged.subject) search.set('subject', merged.subject);
    setParams(search, { replace: true });
  };

  const reset = () => {
    setQuery('');
    setKind('all');
    setUnit('');
    setSubject('');
    setParams(new URLSearchParams(), { replace: true });
  };

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />

      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Search library</h1>
          <p className={styles.description}>
            Search across all {ALL_RESOURCES.length} indexed resources, then narrow by file type,
            unit and subject.
          </p>
        </div>
        <span className={styles.totalBadge}>{ALL_RESOURCES.length} indexed</span>
      </header>

      <SearchField
        value={query}
        onChange={(value) => {
          setQuery(value);
          syncUrl({ query: value });
        }}
        autoFocus={!isMobile}
      />

      <section className={styles.filters} aria-label="Filters">
        <div className={styles.filterRow}>
          <span className={styles.filterLabel} id="filter-type">
            Type
          </span>
          <div className={styles.chips} role="group" aria-labelledby="filter-type">
            {KIND_OPTIONS.map((option) => (
              <button
                key={option.value}
                type="button"
                className="nv-chip"
                aria-pressed={kind === option.value}
                onClick={() => {
                  setKind(option.value);
                  syncUrl({ kind: option.value });
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterRow}>
          <span className={styles.filterLabel} id="filter-unit">
            Unit
          </span>
          <div className={styles.chips} role="group" aria-labelledby="filter-unit">
            <button
              type="button"
              className="nv-chip"
              aria-pressed={unit === ''}
              onClick={() => {
                setUnit('');
                syncUrl({ unit: '' });
              }}
            >
              All units
            </button>
            {UNITS.map((option) => (
              <button
                key={option}
                type="button"
                className="nv-chip"
                aria-pressed={unit === option}
                onClick={() => {
                  setUnit(option);
                  syncUrl({ unit: option });
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.filterRow}>
          <span className={styles.filterLabel} id="filter-subject">
            Subject
          </span>
          <div className={styles.chips} role="group" aria-labelledby="filter-subject">
            <button
              type="button"
              className="nv-chip"
              aria-pressed={subject === ''}
              onClick={() => {
                setSubject('');
                syncUrl({ subject: '' });
              }}
            >
              All subjects
            </button>
            {subjectOptions.map((option) => (
              <button
                key={option}
                type="button"
                className="nv-chip"
                aria-pressed={subject === option}
                onClick={() => {
                  setSubject(option);
                  syncUrl({ subject: option });
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className={styles.statusBar}>
        <span className={styles.resultCount} aria-live="polite">
          {results.length === ALL_RESOURCES.length
            ? `${results.length} resources`
            : `${results.length} of ${ALL_RESOURCES.length} resources`}
        </span>
        {active ? (
          <button type="button" className="nv-btn nv-btn--ghost nv-btn--sm" onClick={reset}>
            <X size={13} />
            <span>Reset filters</span>
          </button>
        ) : (
          <span className={styles.hint}>
            <ListFilter size={13} />
            Filters combine — type, unit and subject must all match
          </span>
        )}
      </div>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchX size={18} />}
          title="No resources match those filters"
          description="Try a shorter keyword, or clear the unit and subject filters to widen the results."
          action={
            <button type="button" className="nv-btn nv-btn--primary nv-btn--sm" onClick={reset}>
              Clear all filters
            </button>
          }
        />
      )}
    </div>
  );
};
