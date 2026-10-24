/** URL and file-mode helpers. All resource paths are repo-root relative. */

/** Encode a path for use in an href/src, preserving the folder structure. */
export function encodePath(path: string): string {
  return path
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');
}

const BASE = (import.meta.env?.BASE_URL ?? '/').replace(/\/+$/, '');

/**
 * Resolve a repo-relative resource path to a URL that works both locally and
 * under the GitHub Pages `/sem5/` base path.
 */
export function publicUrl(path: string): string {
  const clean = path.replace(/^\/+/, '');
  return `${BASE}/${encodePath(clean)}`;
}

export type ViewerMode = 'pdf' | 'html' | 'image' | 'ppt' | 'office' | 'other';

export function viewerMode(path: string): ViewerMode {
  const ext = (path.split('.').pop() || '').toLowerCase();
  if (ext === 'pdf') return 'pdf';
  if (ext === 'html' || ext === 'htm') return 'html';
  if (['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(ext)) return 'image';
  if (ext === 'ppt' || ext === 'pptx') return 'ppt';
  if (['doc', 'docx', 'xls', 'xlsx'].includes(ext)) return 'office';
  return 'other';
}

export function isPdf(path: string): boolean {
  return viewerMode(path) === 'pdf';
}

/** File name from a path, for resources missing metadata. */
export function fileName(path: string): string {
  const last = path.split('/').pop() ?? path;
  try {
    return decodeURIComponent(last);
  } catch {
    return last;
  }
}
