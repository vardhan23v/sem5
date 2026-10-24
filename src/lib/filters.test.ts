import { describe, expect, it } from 'vitest';
import { ALL_RESOURCES } from './library';
import { filterResources, hasActiveFilters, normalizeText, searchHaystack } from './filters';
import type { ResourceFilters } from '../types';

const base: ResourceFilters = { query: '', kind: 'all', unit: '', subject: '' };

const isSubset = (results: typeof ALL_RESOURCES, filters: ResourceFilters) =>
  results.every(
    (resource) =>
      (filters.kind === 'all' || resource.kind === filters.kind) &&
      (!filters.unit || resource.units.includes(filters.unit)) &&
      (!filters.subject || resource.subject === filters.subject),
  );

describe('resource filtering', () => {
  it('returns the whole library when nothing is active', () => {
    const results = filterResources(ALL_RESOURCES, base);
    expect(results).toHaveLength(ALL_RESOURCES.length);
    expect(hasActiveFilters(base)).toBe(false);
  });

  it('matches search terms against name, topic, subject and unit', () => {
    const results = filterResources(ALL_RESOURCES, { ...base, query: 'deadlock' });

    expect(results.length).toBeGreaterThan(0);
    expect(results.some((resource) => resource.path.includes('CH6_DEADLOCKS'))).toBe(true);
    expect(results.every((resource) => searchHaystack(resource).includes('deadlock'))).toBe(true);
  });

  it('combines keyword, unit, subject and file type with AND semantics', () => {
    const filters: ResourceFilters = {
      query: 'unit',
      kind: 'pdf',
      unit: 'Unit 2',
      subject: 'OS',
    };
    const results = filterResources(ALL_RESOURCES, filters);

    expect(results.length).toBeGreaterThan(0);
    expect(isSubset(results, filters)).toBe(true);
    expect(results.every((resource) => searchHaystack(resource).includes('unit'))).toBe(true);
  });

  it('returns nothing when the conditions cannot overlap', () => {
    const results = filterResources(ALL_RESOURCES, {
      ...base,
      unit: 'Unit 3',
      subject: 'Lab Manuals',
    });
    expect(results).toEqual([]);
  });

  it('treats every word of the query as required', () => {
    const results = filterResources(ALL_RESOURCES, { ...base, query: 'deadlock nonexistentterm' });
    expect(results).toEqual([]);
  });

  it('is case and whitespace insensitive', () => {
    const spaced = filterResources(ALL_RESOURCES, { ...base, query: '  DATA   SCIENCE ' });
    const plain = filterResources(ALL_RESOURCES, { ...base, query: 'data science' });
    expect(spaced.map((resource) => resource.id)).toEqual(plain.map((resource) => resource.id));
    expect(spaced.length).toBeGreaterThan(0);
  });

  it('narrows a subject to one unit', () => {
    const results = filterResources(ALL_RESOURCES, { ...base, subject: 'CNC', unit: 'Unit 1' });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((resource) => resource.subject === 'CNC')).toBe(true);
    expect(results.every((resource) => resource.units.includes('Unit 1'))).toBe(true);
  });

  it('detects active filters', () => {
    expect(hasActiveFilters({ ...base, query: 'x' })).toBe(true);
    expect(hasActiveFilters({ ...base, kind: 'pdf' })).toBe(true);
    expect(hasActiveFilters({ ...base, unit: 'Unit 1' })).toBe(true);
    expect(hasActiveFilters({ ...base, subject: 'OS' })).toBe(true);
    expect(hasActiveFilters({ ...base, query: '   ' })).toBe(false);
  });

  it('normalises text consistently', () => {
    expect(normalizeText('  Process   Synchronization ')).toBe('process synchronization');
    expect(normalizeText(null)).toBe('');
  });
});
