import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Subject } from '../../types';
import { countLabel } from '../../lib/format';
import { useApp } from '../../hooks/useApp';
import { SubjectIcon } from '../common/SubjectIcon';
import styles from './SubjectCard.module.css';

interface SubjectCardProps {
  subject: Subject;
}

export const SubjectCard: React.FC<SubjectCardProps> = ({ subject }) => {
  const { done } = useApp();
  const completed = subject.files.filter((file) => done.includes(file.path)).length;
  const progress = subject.files.length
    ? Math.round((completed / subject.files.length) * 100)
    : 0;

  return (
    <Link
      to={`/subject/${encodeURIComponent(subject.name)}`}
      className={styles.card}
      aria-label={`${subject.name} — ${countLabel(subject.resourceCount, 'resource')}`}
    >
      <div className={styles.head}>
        <span
          className={styles.iconBox}
          style={{
            color: subject.color,
            borderColor: `color-mix(in srgb, ${subject.color} 34%, transparent)`,
            backgroundColor: `color-mix(in srgb, ${subject.color} 12%, transparent)`,
          }}
          aria-hidden="true"
        >
          <SubjectIcon name={subject.name} size={17} />
        </span>
        <ArrowRight size={15} className={styles.arrow} aria-hidden="true" />
      </div>

      <div className={styles.body}>
        <h3 className={styles.name}>{subject.name}</h3>
        <p className={styles.fullName}>{subject.fullName}</p>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerRow}>
          <span className={styles.count}>{countLabel(subject.resourceCount, 'resource')}</span>
          {completed > 0 ? (
            <span className={styles.progressText}>
              {completed}/{subject.files.length} done
            </span>
          ) : null}
        </div>
        {completed > 0 ? (
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${subject.name} completion`}
          >
            <span
              className={styles.progressFill}
              style={{ width: `${progress}%`, backgroundColor: subject.color }}
            />
          </div>
        ) : (
          <div className={styles.progressSpacer} aria-hidden="true" />
        )}
      </div>
    </Link>
  );
};
