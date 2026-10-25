import React from 'react';
import { LoaderCircle } from 'lucide-react';
import styles from './RouteFallback.module.css';

/** Shown while a lazily loaded route (the PDF reader) is fetched. */
export const RouteFallback: React.FC = () => (
  <div className={styles.fallback} role="status" aria-live="polite">
    <span className={styles.spinnerWrap} aria-hidden="true">
      <LoaderCircle size={26} className={styles.spinner} />
    </span>
    <span className={styles.label}>Loading reader…</span>
  </div>
);
