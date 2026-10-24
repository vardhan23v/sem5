import React, { useMemo } from 'react';
import { ListFilter, SearchX, X } from 'lucide-react';
import { RECENT_RESOURCES } from '../lib/recent';
import { filterResources, hasActiveFilters } from '../lib/filters';
import { useResourceFilters } from '../hooks/useResourceFilters';
import { RecentResourceRow } from '../components/cards/RecentResource';
import { ResourceFilterPanel } from '../components/search/ResourceFilterPanel';
import { SearchField } from '../components/search/SearchField';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { PageHeader } from '../components/common/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
import { useMediaQuery } from '../hooks/useMediaQuery';
import styles from './RecentlyAddedPage.module.css';

export const RecentlyAddedPage: React.FC = () => {
  const { filters, setFilter, reset } = useResourceFilters();
  const isMobile = useMediaQuery('(max-width: 767px)');

  const results = useMemo(() => filterResources(RECENT_RESOURCES, filters), [filters]);
  const active = hasActiveFilters(filters);

  const subjectOptions = useMemo(
    () => Array.from(new Set(RECENT_RESOURCES.map((resource) => resource.subject))),
    [],
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Recently added' }]} />

      <PageHeader
        eyebrow="Library"
        title="Recently added"
        description="The newest study materials in the library, newest first. Added dates come from each resource's history in the Git repository."
        meta={<span className="nv-badge">{RECENT_RESOURCES.length} resources</span>}
      />

      <SearchField
        value={filters.query}
        onChange={(value) => setFilter({ query: value })}
        autoFocus={!isMobile}
      />

      <ResourceFilterPanel filters={filters} subjectOptions={subjectOptions} onChange={setFilter} />

      <div className={styles.statusBar}>
        <span className={styles.resultCount} aria-live="polite">
          {results.length === RECENT_RESOURCES.length
            ? `${results.length} resources · newest first`
            : `${results.length} of ${RECENT_RESOURCES.length} resources`}
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
        <ul className={styles.list}>
          {results.map((resource) => (
            <RecentResourceRow key={resource.id} resource={resource} />
          ))}
        </ul>
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
