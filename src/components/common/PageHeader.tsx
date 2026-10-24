import React from 'react';
import styles from './PageHeader.module.css';

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}

/** Compact page-level header: eyebrow, title, description, optional stats/actions. */
export const PageHeader: React.FC<PageHeaderProps> = ({
  eyebrow,
  title,
  description,
  meta,
  actions,
}) => (
  <header className={styles.header}>
    <div className={styles.text}>
      {eyebrow ? <span className={styles.eyebrow}>{eyebrow}</span> : null}
      <h1 className={styles.title}>{title}</h1>
      {description ? <p className={styles.description}>{description}</p> : null}
      {meta ? <div className={styles.meta}>{meta}</div> : null}
    </div>
    {actions ? <div className={styles.actions}>{actions}</div> : null}
  </header>
);

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/** Consistent heading row used by every homepage/dashboard section. */
export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description, action }) => (
  <div className={styles.sectionHeader}>
    <div className={styles.sectionText}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      {description ? <p className={styles.sectionDescription}>{description}</p> : null}
    </div>
    {action ? <div className={styles.sectionAction}>{action}</div> : null}
  </div>
);
