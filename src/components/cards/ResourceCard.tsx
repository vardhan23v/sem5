import React from 'react';
import { Link } from 'react-router-dom';
import { Bookmark, CircleCheckBig, FileText } from 'lucide-react';
import type { Resource } from '../../types';
import { KIND_LABELS } from '../../lib/library';
import { useApp } from '../../hooks/useApp';
import styles from './ResourceCard.module.css';

interface ResourceCardProps {
  resource: Resource;
  showSubject?: boolean;
}

export const ResourceCard: React.FC<ResourceCardProps> = ({ resource, showSubject = true }) => {
  const { isFavorite, toggleFavorite, isDone, toggleDone, progress } = useApp();
  const favorite = isFavorite(resource.path);
  const done = isDone(resource.path);
  const saved = progress[resource.path];

  return (
    <article className={`${styles.card} ${done ? styles.cardDone : ''}`}>
      <Link
        to={`/reader?file=${encodeURIComponent(resource.path)}`}
        className={styles.overlay}
        aria-label={`Open ${resource.name}`}
      />

      <div className={styles.top}>
        <span className={`nv-kind nv-kind--${resource.kind}`}>{KIND_LABELS[resource.kind]}</span>
        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.action} ${done ? styles.actionOn : ''}`}
            onClick={() => toggleDone(resource.path)}
            aria-pressed={done}
            aria-label={done ? `Mark ${resource.name} as not done` : `Mark ${resource.name} as done`}
            title={done ? 'Mark as not done' : 'Mark as done'}
          >
            <CircleCheckBig size={15} />
          </button>
          <button
            type="button"
            className={`${styles.action} ${favorite ? styles.favoriteOn : ''}`}
            onClick={() => toggleFavorite(resource.path)}
            aria-pressed={favorite}
            aria-label={
              favorite ? `Remove ${resource.name} from favourites` : `Add ${resource.name} to favourites`
            }
            title={favorite ? 'Remove from favourites' : 'Add to favourites'}
          >
            <Bookmark size={15} fill={favorite ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>

      <div className={styles.content}>
        <h3 className={`${styles.title} ${done ? styles.titleDone : ''}`}>{resource.name}</h3>
        <p className={styles.topic}>{resource.topic || resource.subjectFull}</p>
      </div>

      <div className={styles.meta}>
        {showSubject ? <span className={styles.subject}>{resource.subject}</span> : null}
        <span className={styles.units}>{resource.units.join(' · ')}</span>
        {saved && saved.page > 0 ? (
          <span className={styles.progress}>
            <FileText size={11} />
            {saved.percentage}%
          </span>
        ) : resource.size ? (
          <span className={styles.size}>{resource.size}</span>
        ) : null}
      </div>
    </article>
  );
};
