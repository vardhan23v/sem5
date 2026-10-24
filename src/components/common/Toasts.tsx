import React from 'react';
import { CircleAlert, CircleCheckBig, Info, TriangleAlert, X } from 'lucide-react';
import { useApp } from '../../hooks/useApp';
import styles from './Toasts.module.css';

const ICONS = {
  info: Info,
  success: CircleCheckBig,
  warning: TriangleAlert,
  danger: CircleAlert,
};

export const Toasts: React.FC = () => {
  const { toasts, dismissToast } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div className={styles.stack} role="status" aria-live="polite">
      {toasts.map((toast) => {
        const Icon = ICONS[toast.tone];
        return (
          <div key={toast.id} className={`${styles.toast} ${styles[toast.tone]}`}>
            <Icon size={16} className={styles.icon} />
            <span className={styles.message}>{toast.message}</span>
            <button
              type="button"
              className={styles.close}
              onClick={() => dismissToast(toast.id)}
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
