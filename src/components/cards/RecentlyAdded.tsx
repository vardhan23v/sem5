import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { recentlyAdded } from '../../lib/recent';
import { SectionHeader } from '../common/PageHeader';
import { RecentResourceRow } from './RecentResource';
import styles from './RecentlyAdded.module.css';

/**
 * Homepage preview of the newest library entries. Rows are static data from
 * the library index, so the slice is computed once per mount.
 */
export const RecentlyAdded: React.FC = () => {
  const items = useMemo(() => recentlyAdded(), []);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recent-section-heading">
      <SectionHeader
        title="Recently added"
        description="The latest study materials added to your library."
        action={
          <Link to="/recent" className="nv-link">
            <span>View all</span>
            <ChevronRight size={14} aria-hidden="true" />
          </Link>
        }
      />
      <h2 id="recent-section-heading" className="srOnly">
        Recently added
      </h2>

      <ul className={`${styles.rows} ${styles.enter}`}>
        {items.map((resource) => (
          <RecentResourceRow key={resource.id} resource={resource} />
        ))}
      </ul>
    </section>
  );
};
