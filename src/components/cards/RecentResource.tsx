import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CalendarDays,
  FileQuestion,
  FileText,
  FlaskConical,
  NotebookPen,
  Presentation,
} from 'lucide-react';
import type { Resource } from '../../types';
import { addedDateAttr, formatAddedDate, isFreshAdded } from '../../lib/recent';
import styles from './RecentResource.module.css';

interface RecentResourceRowProps {
  resource: Resource;
}

/** Per-kind glyph; colour comes from the shared `.nv-kind--*` palette (ui.css). */
const KIND_ICONS: Record<Resource['kind'], React.ReactNode> = {
  pdf: <FileText size={16} strokeWidth={1.9} />,
  ppt: <Presentation size={16} strokeWidth={1.9} />,
  notes: <NotebookPen size={16} strokeWidth={1.9} />,
  'question-paper': <FileQuestion size={16} strokeWidth={1.9} />,
  'lab-manual': <FlaskConical size={16} strokeWidth={1.9} />,
};

/**
 * Single "recently added" list row. Renders an <li>; the parent section owns
 * the <ul>, the staggered entrance and any empty state.
 */
export const RecentResourceRow: React.FC<RecentResourceRowProps> = ({ resource }) => {
  const date = formatAddedDate(resource.addedAt);
  const fresh = isFreshAdded(resource);

  return (
    <li>
      <Link
        to={`/reader?file=${encodeURIComponent(resource.path)}`}
        className={styles.row}
        aria-label={`Open ${resource.name}`}
      >
        <span
          className={`${styles.icon} nv-kind--${resource.kind}`}
          aria-hidden="true"
        >
          {KIND_ICONS[resource.kind]}
        </span>

        <span className={styles.body}>
          <span className={styles.title}>{resource.name}</span>
          <span className={styles.meta}>
            <span className={styles.subject}>{resource.subject}</span>
            <span className={styles.units}>
              {resource.units.join(' · ')}
              {resource.important ? <span className={styles.note}> · Topic scan</span> : null}
            </span>
          </span>
        </span>

        <time
          className={`${styles.date} ${fresh ? styles.dateFresh : ''}`}
          dateTime={addedDateAttr(resource.addedAt)}
          title={fresh ? `Added ${date || 'date unavailable'}` : date || 'Date unavailable'}
        >
          <CalendarDays size={13} aria-hidden="true" />
          {date || 'Date unavailable'}
        </time>

        <ArrowRight size={15} className={styles.arrow} aria-hidden="true" />
      </Link>
    </li>
  );
};
