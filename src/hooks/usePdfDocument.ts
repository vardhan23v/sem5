import { useEffect, useState } from 'react';
import * as pdfjs from 'pdfjs-dist';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Bundle the worker with the app so the reader works offline and under the
// GitHub Pages base path (no CDN dependency, no MIME surprises).
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

interface PdfDocumentState {
  doc: PDFDocumentProxy | null;
  totalPages: number;
  loading: boolean;
  progress: number;
  error: string | null;
}

/**
 * Loads a PDF with pdf.js and destroys it on unmount or URL change.
 * `url` must already be resolved through `publicUrl`.
 */
export function usePdfDocument(url: string): PdfDocumentState {
  const [state, setState] = useState<PdfDocumentState>({
    doc: null,
    totalPages: 0,
    loading: true,
    progress: 0,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;

    setState({ doc: null, totalPages: 0, loading: true, progress: 0, error: null });

    const task = pdfjs.getDocument({ url });

    task.onProgress = ({ loaded: bytes, total }: { loaded: number; total: number }) => {
      if (cancelled || !total) return;
      setState((current) =>
        current.loading ? { ...current, progress: Math.round((bytes / total) * 100) } : current,
      );
    };

    task.promise
      .then((document) => {
        if (cancelled) return;
        setState({
          doc: document,
          totalPages: document.numPages,
          loading: false,
          progress: 100,
          error: null,
        });
      })
      .catch((error: unknown) => {
        if (cancelled) return;
        const message =
          error instanceof Error ? error.message : 'The document could not be loaded.';
        setState({
          doc: null,
          totalPages: 0,
          loading: false,
          progress: 0,
          error: message,
        });
      });

    return () => {
      cancelled = true;
      // pdf.js 6 exposes teardown on the loading task only.
      void task.destroy();
    };
  }, [url]);

  return state;
}
