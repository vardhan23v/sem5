import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { filtersToParams, readFilters } from '../lib/filters';
import type { ResourceFilters } from '../types';

/**
 * Shared filter state for the searchable library views (Search, Recently
 * Added). State is mirrored into the URL with `replace` so filtered views stay
 * shareable and reload-safe without polluting history.
 */
export function useResourceFilters() {
  const [params, setParams] = useSearchParams();
  const initial = useMemo(() => readFilters(params), []);
  const [filters, setFilters] = useState<ResourceFilters>(initial);

  const setFilter = (next: Partial<ResourceFilters>) => {
    const merged = { ...filters, ...next };
    setFilters(merged);
    setParams(filtersToParams(merged), { replace: true });
  };

  const reset = () => {
    const cleared: ResourceFilters = { query: '', kind: 'all', unit: '', subject: '' };
    setFilters(cleared);
    setParams(new URLSearchParams(), { replace: true });
  };

  return { filters, setFilter, reset };
}
