import { existsSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  ALL_RESOURCES,
  SUBJECTS,
  UNIT_SUMMARIES,
  getResourceByPath,
  getSubject,
  library,
  resourcesInUnit,
  subjectsInUnit,
} from './library';
import { UNITS } from '../data/units';

describe('library index', () => {
  it('indexes every resource exactly once', () => {
    expect(library.totalResources).toBe(66);
    expect(library.totalFiles).toBe(54);
    expect(library.totalImportant).toBe(12);
    expect(ALL_RESOURCES).toHaveLength(66);

    expect(new Set(ALL_RESOURCES.map((resource) => resource.path)).size).toBe(66);
    expect(new Set(ALL_RESOURCES.map((resource) => resource.id)).size).toBe(66);
  });

  it('keeps the nine existing subjects', () => {
    expect(SUBJECTS.map((subject) => subject.name)).toEqual([
      'CNC',
      'OS',
      'PPTs',
      'TOC',
      'ESD',
      'SCR',
      'Data Science',
      'UHV',
      'Lab Manuals',
    ]);
    expect(SUBJECTS).toHaveLength(9);
  });

  it('derives subject counts from their resources', () => {
    for (const subject of SUBJECTS) {
      expect(subject.resourceCount).toBe(subject.files.length + subject.important.length);
      expect(subject.resourceCount).toBeGreaterThan(0);
    }

    const summed = SUBJECTS.reduce((total, subject) => total + subject.resourceCount, 0);
    expect(summed).toBe(library.totalResources);
  });

  it('reports the four real units and never a Unit 4', () => {
    expect(UNITS).toEqual(['Unit 1', 'Unit 2', 'Unit 3', 'Lab Manuals']);
    expect(UNITS).not.toContain('Unit 4');

    expect(UNIT_SUMMARIES.map((summary) => [summary.unit, summary.resourceCount])).toEqual([
      ['Unit 1', 30],
      ['Unit 2', 11],
      ['Unit 3', 9],
      ['Lab Manuals', 5],
    ]);

    expect(UNIT_SUMMARIES.map((summary) => summary.subjectCount)).toEqual([8, 4, 3, 1]);
  });

  it('links unit resources back to their subject', () => {
    for (const unit of UNITS) {
      const resources = resourcesInUnit(unit);
      expect(resources.length).toBeGreaterThan(0);
      expect(resources.every((resource) => resource.units.includes(unit))).toBe(true);

      const subjects = subjectsInUnit(unit);
      const expected = new Set(resources.map((resource) => resource.subject)).size;
      expect(subjects).toHaveLength(expected);
      expect(subjects.reduce((total, entry) => total + entry.count, 0)).toBe(resources.length);
    }
  });

  it('resolves resources and subjects by stable keys', () => {
    const resource = ALL_RESOURCES.find((entry) => entry.path.includes('CH6_DEADLOCKS'));
    expect(resource).toBeDefined();
    expect(getResourceByPath(resource!.path)).toBe(resource);
    expect(getSubject(resource!.subject)?.name).toBe('OS');
    expect(getSubject('Not a subject')).toBeUndefined();
  });

  it('points at files that actually exist on disk', () => {
    const missing = ALL_RESOURCES.map((resource) => resource.path).filter(
      (relativePath) => !existsSync(path.resolve(process.cwd(), relativePath)),
    );

    expect(missing).toEqual([]);
  });

  it('gives every resource the metadata cards rely on', () => {
    for (const resource of ALL_RESOURCES) {
      expect(resource.name.trim()).not.toBe('');
      expect(resource.subject).not.toBe('');
      expect(resource.units.length).toBeGreaterThan(0);
      expect(resource.kind).toBeTruthy();
    }
  });
});
