import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Play, Trash } from 'lucide-react';
import { library, KIND_LABELS } from '../../lib/library';
import { relativeTime } from '../../lib/format';
import { useApp } from '../../hooks/useApp';
import { EmptyState } from '../common/EmptyState';
import { SectionHeader } from '../common/PageHeader';
import styles from './ContinueStudying.module.css';

export const ContinueStudying: React.FC = () => {
  const { history, clearHistory, progress } = useApp();

  // Ignore history entries whose file is no longer part of the library.
  const entries = useMemo(
    () =>
      history
        .map((item) => ({ item, resource: library.byPath.get(item.path) }))
        .filter((entry): entry is { item: (typeof history)[number]; resource: NonNullable<typeof entry.resource> } =>
          Boolean(entry.resource),
        ),
    [history],
  );

  return (
    <section aria-labelledby="continue-heading">
      <SectionHeader
        title="Continue studying"
        description="Pick up where you left off"
        action={
          entries.length > 0 ? (
            <button type="button" className="nv-btn nv-btn--ghost nv-btn--sm" onClick={clearHistory}>
              <Trash size={13} />
              <span>Clear history</span>
            </button>
          ) : null
        }
      />
      <h2 id="continue-heading" className="srOnly">
        Continue studying
      </h2>

      {entries.length === 0 ? (
        <EmptyState
          compact
          icon={<Clock size={18} />}
          title="Nothing in progress yet"
          description="Resources you open appear here with their reading progress, so you can resume in one tap."
          action={
            <Link to="/search" className="nv-btn nv-btn--sm">
              Browse resources
            </Link>
          }
        />
      ) : (
        <div className={styles.grid}>
          {entries.map(({ item, resource }) => {
            const saved = progress[item.path];
            return (
              <Link
                key={item.path}
                to={`/reader?file=${encodeURIComponent(item.path)}`}
                className={styles.card}
              >
                <div className={styles.top}>
                  <span className={`nv-kind nv-kind--${resource.kind}`}>
                    {KIND_LABELS[resource.kind]}
                  </span>
                  <span className={styles.time}>{relativeTime(item.openedAt)}</span>
                </div>

                <h3 className={styles.name}>{resource.name}</h3>

                <div className={styles.bottom}>
                  <span className={styles.subject}>
                    {resource.subject} · {resource.units.join(' · ')}
                  </span>
                  <span className={styles.resume}>
                    {saved && saved.percentage > 0 ? `${saved.percentage}%` : 'Resume'}
                    <Play size={10} fill="currentColor" />
                  </span>
                </div>

                {saved && saved.percentage > 0 ? (
                  <span className={styles.track} aria-hidden="true">
                    <span className={styles.fill} style={{ width: `${saved.percentage}%` }} />
                  </span>
                ) : null}
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};
