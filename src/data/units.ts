import type { Unit } from '../types';

/**
 * The four navigation buckets shown on the homepage.
 * Semester 5 has three teaching units plus lab manuals — never a Unit 4.
 */
export const UNITS: readonly Unit[] = ['Unit 1', 'Unit 2', 'Unit 3', 'Lab Manuals'] as const;

export const UNIT_DESCRIPTIONS: Record<Unit, string> = {
  'Unit 1': 'Foundations and core concepts',
  'Unit 2': 'Applied topics and problem solving',
  'Unit 3': 'Advanced topics and revision',
  'Lab Manuals': 'Lab programmes and syllabus',
};
