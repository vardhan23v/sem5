import React, { useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import styles from './SearchField.module.css';

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  autoFocus?: boolean;
  placeholder?: string;
  label?: string;
}

export const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  autoFocus = false,
  placeholder = 'Search topics, subjects, units, keywords…',
  label = 'Search the resource library',
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className={styles.field}>
      <Search size={18} className={styles.icon} aria-hidden="true" />
      <input
        ref={inputRef}
        type="search"
        className={styles.input}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && value) {
            event.stopPropagation();
            onChange('');
          }
        }}
        placeholder={placeholder}
        aria-label={label}
        autoComplete="off"
        spellCheck={false}
      />
      {value ? (
        <button
          type="button"
          className={styles.clear}
          onClick={() => {
            onChange('');
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      ) : (
        <kbd className={styles.kbd} aria-hidden="true">
          /
        </kbd>
      )}
    </div>
  );
};
