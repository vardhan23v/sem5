import React from 'react';
import { LoaderCircle } from 'lucide-react';
import styles from './RouteFallback.module.css';

/** Shown while a lazily loaded route (the PDF reader) is fetched. */
export const RouteFallback: React.FC = () => (
  <div className={styles.fallback} role="status" aria-live="polite">
    <LoaderCircle size={22} className={styles.spinner} aria-hidden="true" />
    <span>Loading reader…</span>
  </div>
);
