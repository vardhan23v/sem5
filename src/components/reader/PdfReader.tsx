import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Keyboard,
  LoaderCircle,
  Maximize2,
  Minimize2,
  PanelLeft,
  Search,
  TriangleAlert,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { usePdfDocument } from '../../hooks/usePdfDocument';
import { getSpreadDefault, saveSpread } from '../../lib/storage';
import { ThumbnailRail } from './ThumbnailRail';
import styles from './PdfReader.module.css';

interface PdfReaderProps {
  url: string;
  initialPage?: number;
  onPageChange: (page: number, total: number) => void;
  onToggleDone?: () => void;
}

const MIN_ZOOM = 0.5;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.15;

const SHORTCUTS = [
  ['→ / ↓ / PageDown', 'Next page'],
  ['← / ↑ / PageUp', 'Previous page'],
  ['Home / End', 'First / last page'],
  ['+ / −', 'Zoom in / out'],
  ['0', 'Reset zoom to fit'],
  ['Ctrl / ⌘ + F', 'Find in document'],
  ['t', 'Toggle thumbnails'],
  ['b', 'Toggle two-page view'],
  ['f', 'Toggle fullscreen'],
  ['d', 'Mark as done'],
  ['?', 'Show shortcuts'],
  ['Esc', 'Close panel / exit fullscreen'],
];

async function pageText(doc: PDFDocumentProxy, pageNumber: number): Promise<string> {
  const page = await doc.getPage(pageNumber);
  const content = await page.getTextContent();
  return content.items
    .map((item) => ('str' in item ? item.str : ''))
    .join(' ')
    .toLowerCase()
    .replace(/\s+/g, ' ');
}

export const PdfReader: React.FC<PdfReaderProps> = ({
  url,
  initialPage = 1,
  onPageChange,
  onToggleDone,
}) => {
  const { doc, totalPages, loading, progress, error } = usePdfDocument(url);

  const [page, setPage] = useState(1);
  const [pageInput, setPageInput] = useState('1');
  const [zoom, setZoom] = useState(1);
  // Two-page (book) view: rendered side-by-side like a physical notebook.
  const [spread, setSpread] = useState(() => getSpreadDefault());
  const [thumbsOpen, setThumbsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const [findOpen, setFindOpen] = useState(false);
  const [findQuery, setFindQuery] = useState('');
  const [hits, setHits] = useState<number[]>([]);
  const [hitIndex, setHitIndex] = useState(0);
  const [searching, setSearching] = useState(false);

  const [rendering, setRendering] = useState(false);
  const [stageWidth, setStageWidth] = useState(0);

  const viewerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rightCanvasRef = useRef<HTMLCanvasElement>(null);
  const renderTask = useRef<{ cancel: () => void } | null>(null);
  const textCache = useRef<Map<number, string>>(new Map());
  const searchToken = useRef(0);
  const initialised = useRef(false);
  const findInputRef = useRef<HTMLInputElement>(null);

  /* ------------------------------- initial page ------------------------------ */

  useEffect(() => {
    if (!doc || initialised.current) return;
    initialised.current = true;
    const target = Math.min(Math.max(initialPage, 1), doc.numPages);
    setPage(target);
    setPageInput(String(target));
  }, [doc, initialPage]);

  useEffect(() => {
    initialised.current = false;
    textCache.current.clear();
  }, [url]);

  /* A failed load leaves the ghost of the previous document on the canvases;
     clear them so the recovery card is the only thing on the stage. */
  useEffect(() => {
    if (!error) return;
    for (const canvas of [canvasRef.current, rightCanvasRef.current]) {
      const context = canvas?.getContext('2d');
      if (canvas && context) {
        // pdf.js owns this context (alpha: false), so clearRect reads as black.
        // Paint the plain paper colour instead — it matches the surrounding page
        // surface in both themes and wipes whatever the previous document drew.
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = '#fff';
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, [error]);

  /* --------------------------------- clamping -------------------------------- */

  const goToPage = useCallback(
    (next: number) => {
      if (!totalPages) return;
      const target = Math.min(Math.max(Math.round(next), 1), totalPages);
      setPage(target);
      setPageInput(String(target));
    },
    [totalPages],
  );

  useEffect(() => {
    if (totalPages && page > totalPages) goToPage(totalPages);
  }, [totalPages, page, goToPage]);

  useEffect(() => {
    if (totalPages) onPageChange(page, totalPages);
  }, [page, totalPages, onPageChange]);

  /* ------------------------------- two-page view ------------------------------ */

  const toggleSpread = useCallback(() => {
    setSpread((value) => {
      const next = !value;
      saveSpread(next);
      return next;
    });
  }, []);

  /* ---------------------------------- render --------------------------------- */

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      setStageWidth(width);
    });
    observer.observe(stage);
    setStageWidth(stage.clientWidth);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!doc) return;
    const leftCanvas = canvasRef.current;
    if (!leftCanvas) return;

    let cancelled = false;
    const tasks: { cancel: () => void }[] = [];
    const task: { cancel: () => void } = { cancel: () => tasks.forEach((entry) => entry.cancel()) };

    const draw = async () => {
      setRendering(true);
      try {
        const leftPage = await doc.getPage(page);
        if (cancelled) return;

        // In two-page view the right page renders on its own canvas; both
        // share one uniform scale, like an open book.
        const rightPage =
          spread && leftCanvas && rightCanvasRef.current && page < (totalPages ?? 0)
            ? await doc.getPage(page + 1)
            : null;
        if (cancelled) return;

        const margin = 48; // breathing room already used in single-page mode
        const gap = 24; // gap between the two canvases (matches .canvasWrap)
        const perPage = Math.max((stageWidth - margin - gap) / (rightPage ? 2 : 1), 240);
        const baseLeft = leftPage.getViewport({ scale: 1 });
        let fit = Math.min(perPage / baseLeft.width, 1.6);
        if (rightPage) {
          const baseRight = rightPage.getViewport({ scale: 1 });
          fit = Math.min(fit, Math.min(perPage / baseRight.width, 1.6));
        }
        const scale = fit * zoom;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const paint = async (pdfPage: typeof leftPage, canvas: HTMLCanvasElement) => {
          const viewport = pdfPage.getViewport({ scale });
          canvas.width = Math.floor(viewport.width * dpr);
          canvas.height = Math.floor(viewport.height * dpr);
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          const render = pdfPage.render({
            canvas,
            viewport,
            transform: dpr === 1 ? undefined : [dpr, 0, 0, dpr, 0, 0],
          });
          tasks.push({ cancel: () => render.cancel() });
          await render.promise;
        };

        await paint(leftPage, leftCanvas);
        if (!cancelled && rightPage) await paint(rightPage, rightCanvasRef.current!);
      } catch (renderError) {
        const name = (renderError as { name?: string })?.name;
        if (name !== 'RenderingCancelledException' && !cancelled) {
          console.error('[NoteVault] PDF render failed', renderError);
        }
      } finally {
        if (!cancelled) setRendering(false);
      }
    };

    void draw();
    renderTask.current = task;

    return () => {
      cancelled = true;
      task.cancel();
    };
    // rightCanvas presence is implied by `spread` page state — refs don't go in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, page, zoom, stageWidth, spread, totalPages]);

  /* ------------------------------ find in document --------------------------- */

  const runSearch = useCallback(
    async (rawQuery: string) => {
      const token = ++searchToken.current;
      const needle = rawQuery.trim().toLowerCase().replace(/\s+/g, ' ');
      if (!doc || !needle) {
        setHits([]);
        setHitIndex(0);
        setSearching(false);
        return;
      }

      setSearching(true);
      setHits([]);
      setHitIndex(0);

      const found: number[] = [];
      try {
        for (let pageNumber = 1; pageNumber <= doc.numPages; pageNumber += 1) {
          if (searchToken.current !== token) return;
          let text = textCache.current.get(pageNumber);
          if (text === undefined) {
            text = await pageText(doc, pageNumber);
            textCache.current.set(pageNumber, text);
          }
          if (text.includes(needle)) found.push(pageNumber);
          // Yield regularly so a long document does not freeze the UI.
          if (pageNumber % 6 === 0) await new Promise((resolve) => setTimeout(resolve, 0));
        }
        if (searchToken.current !== token) return;
        setHits(found);
        if (found.length > 0) {
          setHitIndex(0);
          goToPage(found[0]);
        }
      } finally {
        if (searchToken.current === token) setSearching(false);
      }
    },
    [doc, goToPage],
  );

  const stepHit = useCallback(
    (delta: number) => {
      if (hits.length === 0) return;
      const next = (hitIndex + delta + hits.length) % hits.length;
      setHitIndex(next);
      goToPage(hits[next]);
    },
    [hits, hitIndex, goToPage],
  );

  const closeFind = useCallback(() => {
    searchToken.current += 1;
    setFindOpen(false);
    setSearching(false);
    setHits([]);
    setFindQuery('');
  }, []);

  /* -------------------------------- fullscreen ------------------------------- */

  const toggleFullscreen = useCallback(() => {
    const element = viewerRef.current;
    if (!document.fullscreenElement) {
      void element?.requestFullscreen?.().catch(() => {});
    } else {
      void document.exitFullscreen?.().catch(() => {});
    }
  }, []);

  useEffect(() => {
    const onChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onChange);
    return () => document.removeEventListener('fullscreenchange', onChange);
  }, []);

  /* -------------------------------- shortcuts -------------------------------- */

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable;

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'f') {
        event.preventDefault();
        setFindOpen(true);
        window.setTimeout(() => findInputRef.current?.select(), 0);
        return;
      }

      if (event.key === 'Escape') {
        if (showShortcuts) {
          setShowShortcuts(false);
          return;
        }
        if (findOpen) {
          closeFind();
          return;
        }
        if (document.fullscreenElement) {
          void document.exitFullscreen?.();
        }
        return;
      }

      if (typing) return;

      switch (event.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'PageDown':
          event.preventDefault();
          goToPage(page + (rightShown ? 2 : 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
        case 'PageUp':
          event.preventDefault();
          goToPage(page - (spread && page > 2 ? 2 : 1));
          break;
        case 'Home':
          event.preventDefault();
          goToPage(1);
          break;
        case 'End':
          event.preventDefault();
          goToPage(totalPages);
          break;
        case '+':
        case '=':
          setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))));
          break;
        case '-':
        case '_':
          setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))));
          break;
        case '0':
          setZoom(1);
          break;
        case 't':
          setThumbsOpen((value) => !value);
          break;
        case 'b':
          toggleSpread();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'd':
          onToggleDone?.();
          break;
        case '?':
          setShowShortcuts((value) => !value);
          break;
        default:
          break;
      }
    };

    // Book model: while a right-hand page is shown, paging moves a whole spread;
    // the very last page stands alone (odd document), so it moves one page.
    const rightShown = spread && Boolean(totalPages) && page < (totalPages ?? 0);

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [
    page,
    totalPages,
    spread,
    goToPage,
    toggleFullscreen,
    onToggleDone,
    findOpen,
    closeFind,
    showShortcuts,
  ]);

  /* --------------------------------- render UI -------------------------------- */

  const rightShown = spread && Boolean(totalPages) && page < (totalPages ?? 0);
  const prevDisabled = page <= 1;
  const nextDisabled = !totalPages || page + (rightShown ? 1 : 0) >= totalPages;

  return (
    <div ref={viewerRef} className={styles.viewer}>
      <div className={`${styles.toolbar} nv-glass--strong`}>
        <div className={styles.group}>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={() => goToPage(page - (spread && page > 2 ? 2 : 1))}
            disabled={prevDisabled}
            aria-label="Previous page"
            title="Previous page"
          >
            <ChevronLeft size={17} />
          </button>
          <div className={styles.pageControl}>
            <input
              type="number"
              className={styles.pageInput}
              value={pageInput}
              min={1}
              max={totalPages || 1}
              onChange={(event) => setPageInput(event.target.value)}
              onBlur={() => goToPage(Number(pageInput) || 1)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.currentTarget.blur();
                }
              }}
              aria-label="Page number"
            />
            <span className={styles.pageTotal}>/ {totalPages || '—'}</span>
          </div>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={() => goToPage(page + (rightShown ? 2 : 1))}
            disabled={nextDisabled}
            aria-label="Next page"
            title="Next page"
          >
            <ChevronRight size={17} />
          </button>
        </div>

        <div className={styles.group}>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={() => setZoom((value) => Math.max(MIN_ZOOM, Number((value - ZOOM_STEP).toFixed(2))))}
            aria-label="Zoom out"
            title="Zoom out"
          >
            <ZoomOut size={16} />
          </button>
          <span className={styles.zoomLabel}>{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--sm"
            onClick={() => setZoom(1)}
            aria-label="Fit page to width"
            title="Fit to width (0)"
          >
            Fit
          </button>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={() => setZoom((value) => Math.min(MAX_ZOOM, Number((value + ZOOM_STEP).toFixed(2))))}
            aria-label="Zoom in"
            title="Zoom in"
          >
            <ZoomIn size={16} />
          </button>
        </div>

        <div className={styles.group}>
          <button
            type="button"
            className={`nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm ${spread ? styles.toolActive : ''}`}
            onClick={toggleSpread}
            aria-label="Two-page view"
            aria-pressed={spread}
            title="Two-page view (b)"
          >
            <BookOpen size={16} />
          </button>
          <button
            type="button"
            className={`nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm ${findOpen ? styles.toolActive : ''}`}
            onClick={() => {
              setFindOpen((value) => !value);
              if (!findOpen) window.setTimeout(() => findInputRef.current?.focus(), 0);
            }}
            aria-label="Find in document"
            aria-pressed={findOpen}
            title="Find in document (Ctrl/⌘+F)"
          >
            <Search size={16} />
          </button>
          <button
            type="button"
            className={`nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm ${thumbsOpen ? styles.toolActive : ''}`}
            onClick={() => setThumbsOpen((value) => !value)}
            aria-label="Toggle thumbnails"
            aria-pressed={thumbsOpen}
            title="Thumbnails (t)"
          >
            <PanelLeft size={16} />
          </button>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={() => setShowShortcuts(true)}
            aria-label="Keyboard shortcuts"
            title="Keyboard shortcuts (?)"
          >
            <Keyboard size={16} />
          </button>
          <a
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open PDF in a new tab"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={toggleFullscreen}
            aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            title="Fullscreen (f)"
          >
            {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
        </div>
      </div>

      <div className={styles.body}>
        {thumbsOpen && doc ? (
          <ThumbnailRail
            doc={doc}
            totalPages={totalPages}
            currentPage={page}
            onSelect={(next) => goToPage(next)}
          />
        ) : null}

        <div className={styles.stage} ref={stageRef}>
          <div className={styles.canvasWrap}>
            <canvas ref={canvasRef} className={styles.canvas} aria-label={`Page ${page}`} />
            {rightShown ? (
              <canvas
                ref={rightCanvasRef}
                className={styles.canvas}
                aria-label={`Page ${page + 1}`}
              />
            ) : null}
          </div>

          {loading ? (
            <div className={styles.overlay}>
              <LoaderCircle size={22} className={styles.spinner} />
              <span>Loading document… {progress > 0 ? `${progress}%` : ''}</span>
            </div>
          ) : null}

          {error ? (
            <div className={styles.overlay}>
              <div className={styles.recoveryCard}>
                <TriangleAlert size={22} className={styles.errorIcon} />
                <p className={styles.errorTitle}>This PDF could not be opened</p>
                <p className={styles.errorText}>{error}</p>
                <a className="nv-btn nv-btn--sm" href={url} download>
                  Download instead
                </a>
              </div>
            </div>
          ) : null}

          {rendering && !loading && !error ? (
            <span className={styles.renderPill} role="status">
              Rendering…
            </span>
          ) : null}

          {findOpen ? (
            <div className={`${styles.findBar} nv-glass--strong`}>
              <Search size={14} className={styles.findIcon} />
              <input
                ref={findInputRef}
                type="text"
                className={styles.findInput}
                value={findQuery}
                onChange={(event) => {
                  setFindQuery(event.target.value);
                  if (!event.target.value) {
                    setHits([]);
                    setSearching(false);
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    if (hits.length > 0) stepHit(event.shiftKey ? -1 : 1);
                    else void runSearch(findQuery);
                  }
                }}
                placeholder="Find in document"
                aria-label="Find text in document"
              />
              <span className={styles.findStatus} aria-live="polite">
                {searching
                  ? 'Searching…'
                  : hits.length > 0
                    ? `${hitIndex + 1} of ${hits.length} · p.${hits[hitIndex]}`
                    : findQuery
                      ? 'No matches'
                      : ''}
              </span>
              <button
                type="button"
                className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
                onClick={() => stepHit(-1)}
                disabled={hits.length === 0}
                aria-label="Previous match"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                type="button"
                className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
                onClick={() => stepHit(1)}
                disabled={hits.length === 0}
                aria-label="Next match"
              >
                <ChevronRight size={15} />
              </button>
              <button
                type="button"
                className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
                onClick={closeFind}
                aria-label="Close find bar"
              >
                <X size={15} />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      {showShortcuts ? (
        <div
          className={styles.modalBackdrop}
          role="presentation"
          onClick={(event) => {
            if (event.target === event.currentTarget) setShowShortcuts(false);
          }}
        >
          <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Keyboard shortcuts</h2>
              <button
                type="button"
                className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
                onClick={() => setShowShortcuts(false)}
                aria-label="Close shortcuts"
              >
                <X size={16} />
              </button>
            </div>
            <dl className={styles.shortcutList}>
              {SHORTCUTS.map(([keys, action]) => (
                <div key={keys} className={styles.shortcutRow}>
                  <dt>
                    <kbd className={styles.kbd}>{keys}</kbd>
                  </dt>
                  <dd>{action}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : null}
    </div>
  );
};
