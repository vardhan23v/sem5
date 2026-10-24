import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import { ALL_RESOURCES } from '../lib/library';
import { useApp } from '../hooks/useApp';
import { ResourceCard } from '../components/cards/ResourceCard';
import { Breadcrumbs } from '../components/navigation/Breadcrumbs';
import { PageHeader } from '../components/common/PageHeader';
import { EmptyState } from '../components/common/EmptyState';
import styles from './collection.module.css';

export const FavoritesPage: React.FC = () => {
  const { favorites } = useApp();

  const resources = useMemo(
    () =>
      favorites
        .map((path) => ALL_RESOURCES.find((resource) => resource.path === path))
        .filter((resource): resource is (typeof ALL_RESOURCES)[number] => Boolean(resource)),
    [favorites],
  );

  return (
    <div className={styles.page}>
      <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Favourites' }]} />

      <PageHeader
        eyebrow="Personal"
        title="Favourites"
        description="Everything you bookmarked, saved on this device. Nothing is uploaded anywhere."
        meta={<span className="nv-badge">{resources.length} saved</span>}
      />

      {resources.length > 0 ? (
        <div className={styles.grid}>
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<Bookmark size={18} />}
          title="No favourites yet"
          description="Tap the bookmark icon on any resource card or in the reader to keep it here."
          action={
            <Link to="/search" className="nv-btn nv-btn--primary nv-btn--sm">
              Find resources
            </Link>
          }
        />
      )}
    </div>
  );
};
