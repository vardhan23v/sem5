import React from 'react';
import { KIND_OPTIONS } from '../../lib/filters';
import { UNITS } from '../../data/units';
import type { ResourceFilters } from '../../types';
import styles from './ResourceFilterPanel.module.css';

interface ResourceFilterPanelProps {
  filters: ResourceFilters;
  subjectOptions: string[];
  onChange: (next: Partial<ResourceFilters>) => void;
}

/** Type / unit / subject chip groups shared by the library views. */
export const ResourceFilterPanel: React.FC<ResourceFilterPanelProps> = ({
  filters,
  subjectOptions,
  onChange,
}) => (
  <section className={`${styles.panel} nv-glass`} aria-label="Filters">
    <FilterRow
      label="Type"
      id="filter-type"
      value={filters.kind}
      options={KIND_OPTIONS.map((option) => ({ value: option.value, label: option.label }))}
      onSelect={(value) => onChange({ kind: value as ResourceFilters['kind'] })}
    />

    <FilterRow
      label="Unit"
      id="filter-unit"
      value={filters.unit}
      options={[{ value: '', label: 'All units' }, ...UNITS.map((unit) => ({ value: unit, label: unit }))]}
      onSelect={(value) => onChange({ unit: value })}
      isEqual={(a, b) => a === b}
    />

    <FilterRow
      label="Subject"
      id="filter-subject"
      value={filters.subject}
      options={[
        { value: '', label: 'All subjects' },
        ...subjectOptions.map((subject) => ({ value: subject, label: subject })),
      ]}
      onSelect={(value) => onChange({ subject: value })}
    />
  </section>
);

interface FilterRowProps<T extends string> {
  label: string;
  id: string;
  value: T;
  options: Array<{ value: T; label: string }>;
  onSelect: (value: T) => void;
  /** Kind filters compare with `all` instead of an empty string. */
  isEqual?: (a: T, b: T) => boolean;
}

function FilterRow<T extends string>({
  label,
  id,
  value,
  options,
  onSelect,
  isEqual = (a: T, b: T) => a === b,
}: FilterRowProps<T>): React.ReactElement {
  return (
    <div className={styles.row}>
      <span className={styles.label} id={id}>
        {label}
      </span>
      <div className={styles.chips} role="group" aria-labelledby={id}>
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            className="nv-chip"
            aria-pressed={isEqual(value, option.value)}
            onClick={() => onSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
