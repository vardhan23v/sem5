import { describe, expect, it, vi } from 'vitest';
import { applyLegacyHashRedirect, readerHash, translateLegacyHash } from './legacyLinks';

describe('legacy hash translation', () => {
  it('translates file deep links, keeping the page', () => {
    const hash = '#file=' + encodeURIComponent('OS/OS UNIT 1.pdf') + '&page=4';
    expect(translateLegacyHash(hash)).toBe(
      '#/reader?file=' + encodeURIComponent('OS/OS UNIT 1.pdf') + '&page=4',
    );
  });

  it('omits page 1 from reader links', () => {
    const path = 'UHV/Unit 1 — Descriptive Q&A.pdf';
    expect(readerHash(path)).toBe('#/reader?file=' + encodeURIComponent(path));
    expect(readerHash(path, 1)).toBe('#/reader?file=' + encodeURIComponent(path));
  });

  it('translates unit routes', () => {
    expect(translateLegacyHash('#unit=Unit%202')).toBe('#/category/Unit%202');
    expect(translateLegacyHash('#unit=Lab%20Manuals')).toBe('#/category/Lab%20Manuals');
  });

  it('translates subject routes and keeps an optional unit', () => {
    expect(translateLegacyHash('#subject=OS')).toBe('#/subject/OS');
    expect(translateLegacyHash('#subject=%2FOS')).toBe('#/subject/OS');
    expect(translateLegacyHash('#subject=Unit%202/OS')).toBe('#/subject/OS?unit=Unit%202');
  });

  it('translates the all-resources and search routes', () => {
    expect(translateLegacyHash('#all')).toBe('#/all');
    expect(translateLegacyHash('#search')).toBe('#/search');
    expect(translateLegacyHash('#search=deadlock')).toBe('#/search?q=deadlock');
  });

  it('leaves modern, empty and unknown hashes alone', () => {
    expect(translateLegacyHash('')).toBeNull();
    expect(translateLegacyHash('#/search?q=x')).toBeNull();
    expect(translateLegacyHash('#something-else')).toBeNull();
    expect(translateLegacyHash('#file=')).toBeNull();
  });

  it('rewrites the URL once with replaceState semantics', () => {
    const replace = vi.fn();
    const translated = applyLegacyHashRedirect(
      { hash: '#file=' + encodeURIComponent('OS/OS UNIT 1.pdf') + '&page=2', pathname: '/sem5/', search: '' },
      replace,
    );

    expect(translated).toBe('#/reader?file=' + encodeURIComponent('OS/OS UNIT 1.pdf') + '&page=2');
    expect(replace).toHaveBeenCalledWith(
      '/sem5/#/reader?file=' + encodeURIComponent('OS/OS UNIT 1.pdf') + '&page=2',
    );
  });

  it('does not rewrite non-legacy URLs', () => {
    const replace = vi.fn();
    expect(
      applyLegacyHashRedirect({ hash: '#/all', pathname: '/sem5/', search: '' }, replace),
    ).toBeNull();
    expect(replace).not.toHaveBeenCalled();
  });
});
