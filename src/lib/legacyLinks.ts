/**
 * Backwards compatibility for the vanilla app's hash routes.
 *
 * Old links look like:
 *   #file=<encoded path>&page=<n>
 *   #unit=<unit>
 *   #subject=<unit>/<subject>
 *   #all
 *   #search[=<query>]
 *
 * The React app uses HashRouter (`#/route?params`). These helpers translate the
 * old URLs on boot so shared links, bookmarks and browser history keep working.
 */

export function readerHash(path: string, page?: number): string {
  const encoded = encodeURIComponent(path);
  return `#/reader?file=${encoded}${page && page > 1 ? `&page=${page}` : ''}`;
}

function decode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function parseParams(payload: string): Record<string, string> {
  const params: Record<string, string> = {};
  for (const part of payload.split('&')) {
    const index = part.indexOf('=');
    if (index === -1) continue;
    params[part.slice(0, index)] = decode(part.slice(index + 1));
  }
  return params;
}

/**
 * Returns the modern hash (`#/...`) for a legacy hash, or `null` when the hash
 * is not a legacy route (empty, already modern, or an unknown fragment).
 */
export function translateLegacyHash(hash: string): string | null {
  if (!hash.startsWith('#')) return null;
  const raw = hash.slice(1);

  if (raw.startsWith('/')) return null;
  if (raw === '' || raw === '!') return null;

  if (raw.startsWith('file=')) {
    const params = parseParams(raw);
    const path = params.file;
    if (!path) return null;
    const page = Number.parseInt(params.page ?? '', 10);
    return readerHash(path, Number.isFinite(page) ? page : undefined);
  }

  if (raw.startsWith('unit=')) {
    const unit = decode(raw.slice(5).split('&')[0]);
    return unit ? `#/category/${encodeURIComponent(unit)}` : null;
  }

  if (raw === 'all') return '#/all';

  if (raw.startsWith('subject=')) {
    const value = decode(raw.slice(8).split('&')[0]);
    if (!value) return null;
    // The vanilla app wrote either `#subject=<unit>/<subject>` or
    // `#subject=/<subject>`; a bare subject is accepted as well.
    const slash = value.indexOf('/');
    const unit = slash === -1 ? '' : value.slice(0, slash);
    const subject = slash === -1 ? value : value.slice(slash + 1);
    if (!subject) return null;
    const query = unit ? `?unit=${encodeURIComponent(unit)}` : '';
    return `#/subject/${encodeURIComponent(subject)}${query}`;
  }

  if (raw === 'search') return '#/search';
  if (raw.startsWith('search=')) {
    const query = raw.slice(7).split('&')[0];
    return query ? `#/search?q=${encodeURIComponent(decode(query))}` : '#/search';
  }

  return null;
}

/**
 * Rewrite the current URL once, at boot, before React Router reads it.
 * Uses replaceState so the back button does not land on the stale URL again.
 */
export function applyLegacyHashRedirect(
  location: Pick<Location, 'hash' | 'pathname' | 'search'> = window.location,
  replace: (url: string) => void = (url) => window.history.replaceState(null, '', url),
): string | null {
  const translated = translateLegacyHash(location.hash);
  if (!translated) return null;
  replace(`${location.pathname}${location.search}${translated}`);
  return translated;
}
