/** Small formatting helpers shared by cards and the reader. */

/** "just now" / "12m ago" / "3h ago" / "4d ago", falling back to a date. */
export function relativeTime(timestamp: number): string {
  if (!timestamp || !Number.isFinite(timestamp)) return '';
  const seconds = Math.max(0, Math.floor((Date.now() - timestamp) / 1000));

  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  try {
    return new Date(timestamp).toLocaleDateString(undefined, {
      day: 'numeric',
      month: 'short',
    });
  } catch {
    return '';
  }
}

/** "12 resources", "1 resource" */
export function countLabel(count: number, singular: string, plural = `${singular}s`): string {
  return `${count} ${count === 1 ? singular : plural}`;
}

export function percent(page: number, total: number): number {
  if (!total) return 0;
  return Math.min(100, Math.max(0, Math.round((page / total) * 100)));
}
