import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Check, Monitor, Moon, Sun } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import type { ThemePreference } from '../../hooks/useTheme';
import styles from './ThemeMenu.module.css';

interface ThemeOption {
  value: ThemePreference;
  label: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
}

const OPTIONS: ThemeOption[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

/**
 * Sidebar-footer theme switcher: a menu-button wired to the app theme
 * (`light` / `dark` / `system`). Owns no layout beyond its own intrinsic size —
 * the host slot positions it. Keyboard: open with Enter/Space/ArrowDown or
 * ArrowUp, move with Arrow keys/Home/End, pick with Enter/Space, close with
 * Escape (focus returns to the trigger), Tab, outside pointer or focus loss.
 */
export default function ThemeMenu(): React.JSX.Element {
  const { themePreference, setTheme } = useApp();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Pointer-down outside the widget closes it; focus loss (Tab out) too.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent): void => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [open]);

  // Opening a menu should land focus on the active option.
  useEffect(() => {
    if (!open) return;
    const frame = window.requestAnimationFrame(() => {
      rootRef.current
        ?.querySelector<HTMLButtonElement>('button[aria-checked="true"]')
        ?.focus();
    });
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  const select = useCallback(
    (value: ThemePreference) => {
      setTheme(value);
      close();
      triggerRef.current?.focus();
    },
    [setTheme, close],
  );

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
      triggerRef.current?.focus();
      return;
    }
  };

  const onTriggerKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(event.key)) {
      event.preventDefault();
      setOpen(true);
    }
  };

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    const items = menuItems(rootRef);
    if (items.length === 0) return;
    const index = items.indexOf(event.currentTarget);
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(index + 1) % items.length]?.focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length]?.focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0]?.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1]?.focus();
    }
  };

  const onRootBlur = (event: React.FocusEvent<HTMLDivElement>): void => {
    if (
      open &&
      rootRef.current &&
      !(event.relatedTarget instanceof Node && rootRef.current.contains(event.relatedTarget))
    ) {
      close();
    }
  };

  const current = OPTIONS.find((option) => option.value === themePreference) ?? OPTIONS[0];
  const CurrentIcon = current.icon;

  return (
    <div ref={rootRef} className={styles.root} onKeyDown={onKeyDown} onBlur={onRootBlur}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((value) => !value)}
        onKeyDown={onTriggerKeyDown}
      >
        <CurrentIcon size={15} strokeWidth={1.9} aria-hidden="true" />
        <span>{current.label}</span>
      </button>

      {open ? (
        <ul
          id={menuId}
          role="menu"
          aria-label="Theme"
          className={`${styles.menu} nv-glass--strong`}
        >
          {OPTIONS.map(({ value, label, icon: Icon }) => {
            const checked = themePreference === value;
            return (
              <li key={value} role="none">
                <button
                  type="button"
                  role="menuitemradio"
                  aria-checked={checked}
                  className={checked ? `${styles.item} ${styles.itemChecked}` : styles.item}
                  onClick={() => select(value)}
                  onKeyDown={onItemKeyDown}
                >
                  <Icon size={14} strokeWidth={1.9} aria-hidden="true" />
                  <span>{label}</span>
                  {checked ? (
                    <Check size={14} strokeWidth={2.4} aria-hidden="true" className={styles.check} />
                  ) : (
                    <span className={styles.checkSpace} aria-hidden="true" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

/* Local DOM helpers, kept tiny and typed. */
function menuItems(root: React.RefObject<HTMLDivElement | null>): HTMLButtonElement[] {
  return Array.from(
    root.current?.querySelectorAll<HTMLButtonElement>('[role="menuitemradio"]') ?? [],
  );
}
