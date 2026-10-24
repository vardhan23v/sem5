import React, { useMemo, useState } from 'react';
import { Files, ListFilter } from 'lucide-react';
import { ALL_RESOURCES, KINDS, KIND_LABELS, library } from '../lib/library';
import type { ResourceKind } from '../types';
import { ResourceCard } from '../components/cards/ResourceCard';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { PageHeader } from '../components/common/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
import styles from './collection.module.css';

export const AllResourcesPage: React.FC = () => {
  const [kind, setKind] = useState<ResourceKind | 'all'>('all');
  const [importantOnly, setImportantOnly] = useState(false);

  const results = useMemo(
    () =>
      ALL_RESOURCES.filter(
        (resource) =>
          (kind === 'all' || resource.kind === kind) &&
          (!importantOnly || resource.important),
      ),
    [kind, importantOnly],
  );

  const active = kind !== 'all' || importantOnly;

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'All resources' }]} />

      <PageHeader
        eyebrow="Library"
        title="All resources"
        description={`The complete index — ${library.totalFiles} files and ${library.totalImportant} important-topic scans across ${library.subjects.length} subjects.`}
        meta={
          <>
            <span className="nv-badge nv-badge--accent">{ALL_RESOURCES.length} resources</span>
            <span className="nv-badge">Unit 1 · Unit 2 · Unit 3 · Lab Manuals</span>
          </>
        }
      />

      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label="Filter by file type">
          <button
            type="button"
            className="nv-chip"
            aria-pressed={kind === 'all' && !importantOnly}
            onClick={() => {
              setKind('all');
              setImportantOnly(false);
            }}
          >
            All
          </button>
          {KINDS.map((option) => (
            <button
              key={option}
              type="button"
              className="nv-chip"
              aria-pressed={kind === option}
              onClick={() => {
                setKind(option);
                setImportantOnly(false);
              }}
            >
              {KIND_LABELS[option]}
            </button>
          ))}
          <button
            type="button"
            className="nv-chip"
            aria-pressed={importantOnly}
            onClick={() => {
              setImportantOnly(true);
              setKind('all');
            }}
          >
            Important topics
          </button>
        </div>
        <span className={styles.resultCount}>
          <ListFilter size={12} style={{ display: 'inline', marginRight: 4 }} />
          {results.length} of {ALL_RESOURCES.length}
        </span>
      </div>

      {results.length > 0 ? (
        <div className={styles.grid}>
          {results.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Files size={18} />}
          title="No resources of that type"
          description="Clear the filter to see the complete library."
          action={
            active ? (
              <button
                type="button"
                className="nv-btn nv-btn--sm"
                onClick={() => {
                  setKind('all');
                  setImportantOnly(false);
                }}
              >
                Show everything
              </button>
            ) : undefined
          }
        />
      )}
    </div>
  );
};
