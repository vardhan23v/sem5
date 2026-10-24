import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App';
import { applyLegacyHashRedirect } from './lib/legacyLinks';
import './styles/globals.css';

// Translate pre-migration links (#file=, #unit=, #subject=, #all, #search)
// before the router reads the location. Uses replaceState, so Back never
// returns to the stale URL.
applyLegacyHashRedirect();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
