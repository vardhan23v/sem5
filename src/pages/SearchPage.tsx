import React, { useMemo } from 'react';
import { ListFilter, SearchX, X } from 'lucide-react';
import { ALL_RESOURCES } from '../lib/library';
import { filterResources, hasActiveFilters } from '../lib/filters';
import { ResourceCard } from '../components/cards/ResourceCard';
import { SearchField } from '../components/search/SearchField';
import { ResourceFilterPanel } from '../components/search/ResourceFilterPanel';
import { EmptyState } from '../components/common/EmptyState';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { useResourceFilters } from '../hooks/useResourceFilters';
import styles from './SearchPage.module.css';

export const SearchPage: React.FC = () => {
  const { filters, setFilter, reset } = useResourceFilters();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const results = useMemo(() => filterResources(ALL_RESOURCES, filters), [filters]);
  const active = hasActiveFilters(filters);

  const subjectOptions = useMemo(
    () => Array.from(new Set(ALL_RESOURCES.map((resource) => resource.subject))),
    [],
  );

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
        value={filters.query}
        onChange={(value) => setFilter({ query: value })}
        autoFocus={!isMobile}
      />

      <ResourceFilterPanel filters={filters} subjectOptions={subjectOptions} onChange={setFilter} />

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
