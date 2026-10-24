import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers } from 'lucide-react';
import type { UnitSummary } from '../../types';
import { UNIT_DESCRIPTIONS } from '../../data/units';
import { countLabel } from '../../lib/format';
import styles from './UnitCard.module.css';

interface UnitCardProps {
  summary: UnitSummary;
}

export const UnitCard: React.FC<UnitCardProps> = ({ summary }) => (
  <Link
    to={`/category/${encodeURIComponent(summary.unit)}`}
    className={styles.card}
    aria-label={`${summary.unit} — ${countLabel(summary.resourceCount, 'resource')}`}
  >
    <div className={styles.head}>
      <span className={styles.iconBox} aria-hidden="true">
        <Layers size={17} strokeWidth={1.9} />
      </span>
      <ArrowRight size={15} className={styles.arrow} aria-hidden="true" />
    </div>

    <div className={styles.body}>
      <h3 className={styles.title}>{summary.unit}</h3>
      <p className={styles.description}>{UNIT_DESCRIPTIONS[summary.unit]}</p>
    </div>

    <div className={styles.meta}>
      <span className={styles.count}>{countLabel(summary.resourceCount, 'resource')}</span>
      <span className={styles.dot} aria-hidden="true" />
      <span>{countLabel(summary.subjectCount, 'subject')}</span>
    </div>
  </Link>
);
