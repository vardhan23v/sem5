import React from 'react';
import { LibraryBig } from 'lucide-react';
import { SUBJECTS, library } from '../lib/library';
import { SubjectCard } from '../components/cards/SubjectCard';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { PageHeader } from '../components/common/PageHeader';
import styles from './collection.module.css';

export const SubjectsPage: React.FC = () => (
  <div className={styles.page}>
    <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Subjects' }]} />

    <PageHeader
      eyebrow="Library"
      title="Subjects"
      description={`All ${SUBJECTS.length} subjects for semester 5, with every note, paper and presentation indexed.`}
      meta={
        <>
          <span className="nv-badge">{library.totalResources} resources</span>
          <span className="nv-badge">{library.totalFiles} files</span>
          <span className="nv-badge">{library.totalImportant} important-topic scans</span>
        </>
      }
      actions={
        <span className={styles.statPill} aria-hidden="true">
          <span className={styles.statValue}>{SUBJECTS.length}</span>
          <span className={styles.statLabel}>
            <LibraryBig size={11} /> Subjects
          </span>
        </span>
      }
    />

    <div className={styles.grid}>
      {SUBJECTS.map((subject) => (
        <SubjectCard key={subject.name} subject={subject} />
      ))}
    </div>
  </div>
);
