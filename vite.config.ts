import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Production is served from https://vardhan23v.github.io/sem5/.
  // Dev/preview stay at the server root so resource URLs keep working locally.
  base: mode === 'production' ? '/sem5/' : '/',
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: false,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
}));
