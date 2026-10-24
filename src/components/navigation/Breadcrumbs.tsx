import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import styles from './Breadcrumbs.module.css';

export interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: Crumb[] }> = ({ items }) => (
  <nav className={styles.nav} aria-label="Breadcrumb">
    <ol className={styles.list}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <li key={`${item.label}-${index}`} className={styles.item}>
            {item.to && !isLast ? (
              <Link to={item.to} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current} aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
            {!isLast ? (
              <ChevronRight size={13} className={styles.separator} aria-hidden="true" />
            ) : null}
          </li>
        );
      })}
    </ol>
  </nav>
);
