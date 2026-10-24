import React, { Suspense } from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { translateLegacyHash } from './lib/legacyLinks';
import { AppProvider } from './hooks/useApp';
import { AppShell } from './components/layout/AppShell';
import { RouteFallback } from './components/common/RouteFallback';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectPage } from './pages/SubjectPage';
import { CategoryPage } from './pages/CategoryPage';
import { AllResourcesPage } from './pages/AllResourcesPage';
import { FavoritesPage } from './pages/FavoritesPage';
import { NotFoundPage } from './pages/NotFoundPage';

// The reader pulls in pdf.js (~1 MB), so it is loaded on demand: the dashboard
// stays fast and the reader chunk is cached after the first document opens.
const ReaderPage = React.lazy(() =>
  import('./pages/ReaderPage').then((module) => ({ default: module.ReaderPage })),
);

/**
 * Catches hashes the router could not match and forwards legacy `#file=`,
 * `#unit=`, `#subject=`, `#all` and `#search` fragments. This covers links that
 * arrive while the app is already open, where no fresh page load occurs.
 */
const LegacyFallback: React.FC = () => {
  const { hash } = window.location;
  // The hash history normalises `#unit=…` to `#/unit=…` before routing, so
  // also try the fragment with the injected leading slash removed.
  const translated =
    translateLegacyHash(hash) ??
    (hash.startsWith('#/') ? translateLegacyHash(`#${hash.slice(2)}`) : null);

  return <Navigate to={translated ? translated.slice(1) : '/404'} replace />;
};

/**
 * HashRouter is deliberate: GitHub Pages serves static files only, so
 * path-based routes would 404 on refresh. Hash routes also keep every nested
 * view shareable, and legacy `#file=` links are rewritten on boot.
 */
export const App: React.FC = () => (
  <AppProvider>
    <HashRouter>
      <Routes>
        {/* Full-viewport document reader (no dashboard chrome). */}
        <Route
          path="/reader"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ReaderPage />
            </Suspense>
          }
        />

        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/subject/:subjectName" element={<SubjectPage />} />
          <Route path="/category/:unitId" element={<CategoryPage />} />
          <Route path="/all" element={<AllResourcesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<LegacyFallback />} />
        </Route>
      </Routes>
    </HashRouter>
  </AppProvider>
);
