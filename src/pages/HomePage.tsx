import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Files } from 'lucide-react';
import {
  ALL_RESOURCES,
  SUBJECTS,
  UNIT_SUMMARIES,
  library,
} from '../lib/library';
import { countLabel } from '../lib/format';
import { UnitCard } from '../components/cards/UnitCard';
import { SubjectCard } from '../components/cards/SubjectCard';
import { ContinueStudying } from '../components/cards/ContinueStudying';
import { RecentlyAdded } from '../components/cards/RecentlyAdded';
import { SectionHeader } from '../components/common/PageHeader';
import styles from './HomePage.module.css';

export const HomePage: React.FC = () => (
  <div className={styles.page}>
    {/* A. Compact page header */}
    <header className={styles.header}>
      <div className={styles.headerText}>
        <span className={styles.eyebrow}>
          <span className={styles.eyebrowDot} aria-hidden="true" />
          NoteVault · Semester 5
        </span>
        <h1 className={styles.title}>Semester 5</h1>
        <p className={styles.description}>
          Every lecture note, question bank and lab manual for the semester, organised in one
          place.
        </p>
      </div>

      <dl className={styles.stats}>
        <div className={styles.stat}>
          <dd className={styles.statValue}>{library.totalResources}</dd>
          <dt className={styles.statLabel}>Resources</dt>
        </div>
        <div className={styles.stat}>
          <dd className={styles.statValue}>{library.totalFiles}</dd>
          <dt className={styles.statLabel}>Files</dt>
        </div>
        <div className={styles.stat}>
          <dd className={styles.statValue}>{SUBJECTS.length}</dd>
          <dt className={styles.statLabel}>Subjects</dt>
        </div>
      </dl>
    </header>

    {/* B. Browse by unit */}
    <section aria-labelledby="units-heading">
      <SectionHeader
        title="Browse by unit"
        description="Three teaching units plus the lab manuals and syllabus"
      />
      <h2 id="units-heading" className="srOnly">
        Browse by unit
      </h2>
      <div className={styles.unitGrid}>
        {UNIT_SUMMARIES.map((summary) => (
          <UnitCard key={summary.unit} summary={summary} />
        ))}
      </div>
    </section>

    {/* C. All resources */}
    <section aria-labelledby="all-heading">
      <SectionHeader title="All resources" description="The complete indexed library" />
      <h2 id="all-heading" className="srOnly">
        All resources
      </h2>
      <Link to="/all" className={styles.allCard}>
        <span className={styles.allIcon} aria-hidden="true">
          <Files size={20} strokeWidth={1.9} />
        </span>
        <span className={styles.allBody}>
          <span className={styles.allTitle}>Complete resource archive</span>
          <span className={styles.allDescription}>
            {countLabel(ALL_RESOURCES.length, 'resource')} across{' '}
            {countLabel(SUBJECTS.length, 'subject')} — filter by unit, type or keyword.
          </span>
        </span>
        <span className={styles.allAction}>
          <span className={styles.allCount}>{library.totalResources}</span>
          <ArrowRight size={16} aria-hidden="true" />
        </span>
      </Link>
    </section>

    {/* D. Browse by subject */}
    <section aria-labelledby="subjects-heading">
      <SectionHeader
        title="Browse by subject"
        description="Open a subject to see its notes, papers and presentations"
        action={
          <Link to="/subjects" className="nv-link">
            <span>View all</span>
            <ChevronRight size={14} />
          </Link>
        }
      />
      <h2 id="subjects-heading" className="srOnly">
        Browse by subject
      </h2>
      <div className={styles.subjectGrid}>
        {SUBJECTS.map((subject) => (
          <SubjectCard key={subject.name} subject={subject} />
        ))}
      </div>
    </section>

    {/* E. Recently added */}
    <RecentlyAdded />

    {/* F. Continue studying */}
    <ContinueStudying />
  </div>
);
