import React from 'react';
import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';
import styles from './NotFoundPage.module.css';

export const NotFoundPage: React.FC = () => (
  <div className={styles.page}>
    <EmptyState
      icon={<SearchX size={18} />}
      title="That page isn't in the vault"
      description="The link may be out of date. Everything is still available from the dashboard, search or subject list."
      action={
        <div className={styles.actions}>
          <Link to="/" className="nv-btn nv-btn--primary nv-btn--sm">
            Back to dashboard
          </Link>
          <Link to="/search" className="nv-btn nv-btn--sm">
            Search resources
          </Link>
        </div>
      }
    />
  </div>
);
