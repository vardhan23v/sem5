import React, { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, FileQuestionMark, Star } from 'lucide-react';
import { getSubject } from '../lib/library';
import { GENERAL_UNIT } from '../types';
import { UNITS } from '../data/units';
import { countLabel } from '../lib/format';
import { ResourceCard } from '../components/cards/ResourceCard';
import { SubjectIcon } from '../components/common/SubjectIcon';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import styles from './collection.module.css';

const UNIT_ORDER = [...UNITS, GENERAL_UNIT];

function safeDecode(value: string | undefined): string {
  if (!value) return '';
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export const SubjectPage: React.FC = () => {
  const { subjectName } = useParams<{ subjectName: string }>();
  const subject = getSubject(safeDecode(subjectName));
  const [unit, setUnit] = useState<string>('all');

  const unitGroups = useMemo(() => {
    if (!subject) return [];
    const present = UNIT_ORDER.filter((unitName) =>
      subject.files.some((file) => file.units.includes(unitName)),
    );
    return present.map((unitName) => ({
      unit: unitName,
      files: subject.files.filter((file) => file.units.includes(unitName)),
    }));
  }, [subject]);

  if (!subject) {
    return (
      <div className={styles.page}>
        <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Subject not found' }]} />
        <EmptyState
          icon={<FileQuestionMark size={18} />}
          title="That subject isn't in the library"
          description="It may have been renamed. Browse the full subject list instead."
          action={
            <Link to="/subjects" className="nv-btn nv-btn--primary nv-btn--sm">
              All subjects
            </Link>
          }
        />
      </div>
    );
  }

  const visibleGroups =
    unit === 'all' ? unitGroups : unitGroups.filter((group) => group.unit === unit);
  const visibleCount =
    visibleGroups.reduce((total, group) => total + group.files.length, 0) +
    (unit === 'all' ? subject.important.length : 0);

  return (
    <div className={styles.page}>
      <Breadcrumbs
        items={[
          { label: 'Home', to: '/' },
          { label: 'Subjects', to: '/subjects' },
          { label: subject.name },
        ]}
      />

      <header className={styles.headerRow}>
        <div className={styles.headerMain}>
          <span
            className={styles.iconBox}
            style={{
              color: subject.color,
              borderColor: `color-mix(in srgb, ${subject.color} 34%, transparent)`,
              backgroundColor: `color-mix(in srgb, ${subject.color} 12%, transparent)`,
            }}
            aria-hidden="true"
          >
            <SubjectIcon name={subject.name} size={21} />
          </span>
          <div className={styles.headerText}>
            <h1 className={styles.title}>{subject.name}</h1>
            <p className={styles.subtitle}>
              {subject.fullName} · {countLabel(subject.resourceCount, 'resource')}
            </p>
          </div>
        </div>

        <div className={styles.headerAside}>
          <span className={styles.statPill}>
            <span className={styles.statValue}>{subject.files.length}</span>
            <span className={styles.statLabel}>Files</span>
          </span>
          <span className={styles.statPill}>
            <span className={styles.statValue}>{subject.important.length}</span>
            <span className={styles.statLabel}>Scans</span>
          </span>
          <Link to="/subjects" className="nv-btn nv-btn--sm">
            <ArrowLeft size={14} />
            <span>Subjects</span>
          </Link>
        </div>
      </header>

      <div className={styles.toolbar}>
        <div className={styles.chips} role="group" aria-label="Filter by unit">
          <button
            type="button"
            className="nv-chip"
            aria-pressed={unit === 'all'}
            onClick={() => setUnit('all')}
          >
            All units
          </button>
          {unitGroups.map((group) => (
            <button
              key={group.unit}
              type="button"
              className="nv-chip"
              aria-pressed={unit === group.unit}
              onClick={() => setUnit(group.unit)}
            >
              {group.unit}
              <span className={styles.groupCount}>{group.files.length}</span>
            </button>
          ))}
        </div>
        <span className={styles.resultCount}>{countLabel(visibleCount, 'resource')}</span>
      </div>

      {visibleGroups.length === 0 ? (
        <EmptyState
          compact
          icon={<FileQuestionMark size={18} />}
          title="No files in this unit yet"
          description="Choose another unit to see this subject's resources."
        />
      ) : (
        <div className={styles.groups}>
          {visibleGroups.map((group) => (
            <section key={group.unit} aria-labelledby={`group-${group.unit}`}>
              <div className={styles.groupHeader}>
                <h2 id={`group-${group.unit}`} className={styles.groupTitle}>
                  {group.unit}
                </h2>
                <span className={styles.groupCount}>{group.files.length} files</span>
              </div>
              <div className={styles.grid} style={{ marginTop: 'var(--space-3)' }}>
                {group.files.map((file) => (
                  <ResourceCard key={file.id} resource={file} showSubject={false} />
                ))}
              </div>
            </section>
          ))}

          {unit === 'all' && subject.important.length > 0 ? (
            <section aria-labelledby="group-important">
              <div className={styles.groupHeader}>
                <h2 id="group-important" className={styles.groupTitle}>
                  <Star size={14} style={{ display: 'inline', marginRight: 6 }} />
                  Important topics
                </h2>
                <span className={styles.groupCount}>{subject.important.length} scans</span>
              </div>
              <div className={styles.grid} style={{ marginTop: 'var(--space-3)' }}>
                {subject.important.map((file) => (
                  <ResourceCard key={file.id} resource={file} showSubject={false} />
                ))}
              </div>
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
};
