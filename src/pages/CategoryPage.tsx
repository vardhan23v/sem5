import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Layers } from 'lucide-react';
import { isUnit, resourcesInUnit, subjectsInUnit } from '../lib/library';
import { UNIT_DESCRIPTIONS } from '../data/units';
import { countLabel } from '../lib/format';
import { ResourceCard } from '../components/cards/ResourceCard';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import styles from './collection.module.css';

function safeDecode(value: string | undefined): string {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export const CategoryPage: React.FC = () => {
  const { unitId } = useParams<{ unitId: string }>();
  const unitName = safeDecode(unitId);
  const [subject, setSubject] = useState('all');

  const unit = isUnit(unitName) ? unitName : null;
  const resources = useMemo(() => (unit ? resourcesInUnit(unit) : []), [unit]);
  const subjectEntries = useMemo(() => (unit ? subjectsInUnit(unit) : []), [unit]);
  const visible = subject === 'all' ? resources : resources.filter((r) => r.subject === subject);

  if (!unit) {
    return (
      <div className={styles.page}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Unknown unit' }]} />
        <EmptyState
          icon={<Layers size={18} />}
          title="That unit doesn't exist"
          description="Semester 5 has Unit 1, Unit 2, Unit 3 and Lab Manuals only."
          action={
            <Link to="/" className="nv-btn nv-btn--primary nv-btn--sm">
              Back to units
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: unit }]} />

      <header className={styles.headerRow}>
        <div className={styles.headerMain}>
          <span className={styles.iconBox} aria-hidden="true">
            <Layers size={21} />
          </span>
          <div className={styles.headerText}>
            <h1 className={styles.title}>{unit}</h1>
            <p className={styles.subtitle}>
              {UNIT_DESCRIPTIONS[unit]} · {countLabel(resources.length, 'resource')}
            </p>
          </div>
        </div>

        <div className={styles.headerAside}>
          <span className={styles.statPill}>
            <span className={styles.statValue}>{subjectEntries.length}</span>
            <span className={styles.statLabel}>Subjects</span>
          </span>
          <Link to="/" className="nv-btn nv-btn--sm">
            <ArrowLeft size={14} />
            <span>Home</span>
          </Link>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label="Filter by subject">
          <button
            type="button"
            className="nv-chip"
            aria-pressed={subject === 'all'}
            onClick={() => setSubject('all')}
          >
            All subjects
          </button>
          {subjectEntries.map((entry) => (
            <button
              key={entry.subject.name}
              type="button"
              className="nv-chip"
              aria-pressed={subject === entry.subject.name}
              onClick={() => setSubject(entry.subject.name)}
            >
              {entry.subject.name}
              <span className={styles.groupCount}>{entry.count}</span>
            </button>
          ))}
        </div>
        <span className={styles.resultCount}>{countLabel(visible.length, 'resource')}</span>
      </div>

      {visible.length > 0 ? (
        <div className={styles.grid}>
          {visible.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Layers size={18} />}
          title="Nothing here yet"
          description="No resources are linked to this combination."
        />
      )}
    </div>
  );
};
