import React from 'react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
  compact = false,
}) => (
  <div className={compact ? `${styles.empty} ${styles.compact}` : styles.empty} role="status">
    <span className={styles.icon} aria-hidden="true">
      {icon}
    </span>
    <h3 className={styles.title}>{title}</h3>
    {description ? <p className={styles.description}>{description}</p> : null}
    {action ? <div className={styles.action}>{action}</div> : null}
  </div>
);
