import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bookmark,
  CircleCheckBig,
  Download,
  ExternalLink,
  FileQuestionMark,
  Info,
  Link2,
  Presentation,
  TriangleAlert,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { ALL_RESOURCES, KIND_LABELS, library } from '../lib/library';
import { fileName, publicUrl, viewerMode } from '../lib/paths';
import { getProgress } from '../lib/storage';
import { useApp } from '../hooks/useApp';
import { PdfReader } from '../components/reader/PdfReader';
import { EmptyState } from '../components/common/EmptyState';
import { Toasts } from '../components/common/Toasts';
import styles from './ReaderPage.module.css';

export const ReaderPage: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, isDone, toggleDone, recordOpen, saveProgress, notify } =
    useApp();

  const filePath = params.get('file') ?? '';
  const url = filePath ? publicUrl(filePath) : '';

  const resource = useMemo(() => library.byPath.get(filePath), [filePath]);
  const title = resource?.name ?? (filePath ? fileName(filePath) : '');
  const mode = viewerMode(filePath);

  const [imageZoom, setImageZoom] = useState(1);
  const [showResume, setShowResume] = useState(false);
  const [resumePage, setResumePage] = useState(0);
  const progressTimer = useRef<number | null>(null);
  const pendingProgress = useRef<{ path: string; page: number; total: number } | null>(null);
  const lastSaved = useRef<string>('');

  /**
   * Resume target: an explicit `?page=` in the link wins, then saved progress,
   * then page 1. Evaluated once per opened file.
   */
  const initialPage = useMemo(() => {
    const explicit = Number.parseInt(params.get('page') ?? '', 10);
    if (Number.isFinite(explicit) && explicit > 1) return explicit;
    const saved = getProgress(filePath);
    return saved && saved.page > 1 ? saved.page : 1;
    // params intentionally read once per file — page updates below must not retrigger this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  useEffect(() => {
    if (!filePath) return;
    if (resource) recordOpen(resource);
    setImageZoom(1);
    setResumePage(initialPage > 1 ? initialPage : 0);
    setShowResume(initialPage > 1);
    const timer = window.setTimeout(() => setShowResume(false), 5000);
    return () => window.clearTimeout(timer);
    // recordOpen is stable; only re-run when the opened file changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filePath]);

  useEffect(() => {
    document.body.classList.add('reader-open');
    return () => document.body.classList.remove('reader-open');
  }, []);

  /* -------------------------------- progress -------------------------------- */

  const handlePageChange = useCallback(
    (page: number, total: number) => {
      // Reflect the page in the URL without stacking history entries.
      const current = Number.parseInt(params.get('page') ?? '', 10);
      if (page > 1 && current !== page) {
        const next = new URLSearchParams(params);
        next.set('page', String(page));
        setParams(next, { replace: true });
      }

      const key = `${page}/${total}`;
      if (lastSaved.current === key) return;
      lastSaved.current = key;

      pendingProgress.current = { path: filePath, page, total };
      if (progressTimer.current) window.clearTimeout(progressTimer.current);
      progressTimer.current = window.setTimeout(() => {
        const pending = pendingProgress.current;
        if (pending) {
          saveProgress(pending.path, pending.page, pending.total);
          pendingProgress.current = null;
        }
      }, 400);
    },
    [filePath, params, setParams, saveProgress],
  );

  // Flush the last page position if the reader is closed before the debounce.
  useEffect(
    () => () => {
      if (progressTimer.current) window.clearTimeout(progressTimer.current);
      const pending = pendingProgress.current;
      if (pending) saveProgress(pending.path, pending.page, pending.total);
    },
    [saveProgress],
  );

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      notify('Link copied to clipboard', 'success');
    } catch {
      notify('Could not copy the link', 'danger');
    }
  }, [notify]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  if (!filePath) {
    return (
      <div className={styles.page}>
        <div className={styles.topbar}>
          <button type="button" className="nv-btn nv-btn--ghost nv-btn--sm" onClick={goBack}>
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
        </div>
        <div className={styles.fallbackWrap}>
          <EmptyState
            icon={<FileQuestionMark size={18} />}
            title="No document selected"
            description="Pick a resource from the library and it will open here."
            action={
              <Link to="/all" className="nv-btn nv-btn--primary nv-btn--sm">
                Browse all resources
              </Link>
            }
          />
        </div>
      </div>
    );
  }

  const favorite = isFavorite(filePath);
  const done = isDone(filePath);
  const totalFiles = ALL_RESOURCES.length;

  return (
    <div className={styles.page}>
      <header className={`${styles.topbar} nv-glass`}>
        <div className={styles.topLeft}>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={goBack}
            aria-label="Go back"
            title="Back"
          >
            <ArrowLeft size={17} />
          </button>
          <div className={styles.docInfo}>
            <h1 className={styles.docTitle} title={title}>
              {title}
            </h1>
            <p className={styles.docMeta}>
              {resource ? (
                <>
                  <span className={styles.metaSubject}>{resource.subject}</span>
                  <span aria-hidden="true">·</span>
                  <span>{resource.units.join(' · ')}</span>
                  <span aria-hidden="true">·</span>
                  <span className={`nv-kind nv-kind--${resource.kind}`}>
                    {KIND_LABELS[resource.kind]}
                  </span>
                </>
              ) : (
                <span>{totalFiles} resources indexed</span>
              )}
            </p>
          </div>
        </div>

        <div className={styles.topActions}>
          <button
            type="button"
            className={`nv-btn nv-btn--sm ${done ? styles.btnDone : ''}`}
            onClick={() => toggleDone(filePath)}
            aria-pressed={done}
            aria-label={done ? 'Done' : 'Mark done'}
          >
            <CircleCheckBig size={15} />
            <span className={styles.actionLabel}>{done ? 'Done' : 'Mark done'}</span>
          </button>
          <button
            type="button"
            className={`nv-btn nv-btn--sm ${favorite ? styles.btnFavorite : ''}`}
            onClick={() => toggleFavorite(filePath)}
            aria-pressed={favorite}
            aria-label={favorite ? 'Saved' : 'Save'}
          >
            <Bookmark size={15} fill={favorite ? 'currentColor' : 'none'} />
            <span className={styles.actionLabel}>{favorite ? 'Saved' : 'Save'}</span>
          </button>
          <button
            type="button"
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            onClick={copyLink}
            aria-label="Copy link to this document"
            title="Copy link"
          >
            <Link2 size={16} />
          </button>
          <a
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            href={url}
            download={title}
            aria-label="Download file"
            title="Download"
          >
            <Download size={16} />
          </a>
          <a
            className="nv-btn nv-btn--ghost nv-btn--icon nv-btn--sm"
            href={url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Open in new tab"
            title="Open in new tab"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </header>

      {showResume ? (
        <div className={`${styles.resumeChip} nv-glass--strong`} role="status">
          <Info size={13} />
          <span>Resumed at page {resumePage}</span>
          <button
            type="button"
            onClick={() => setShowResume(false)}
            aria-label="Dismiss resume notice"
          >
            ×
          </button>
        </div>
      ) : null}

      {mode === 'pdf' ? (
        <PdfReader
          url={url}
          initialPage={initialPage}
          onPageChange={handlePageChange}
          onToggleDone={() => toggleDone(filePath)}
        />
      ) : mode === 'html' ? (
        <iframe
          src={url}
          title={title}
          className={styles.htmlFrame}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
        />
      ) : mode === 'image' ? (
        <div className={styles.imageStage}>
          <div className={styles.imageControls}>
            <button
              type="button"
              className="nv-btn nv-btn--sm nv-btn--icon"
              onClick={() => setImageZoom((value) => Math.max(0.5, Number((value - 0.25).toFixed(2))))}
              aria-label="Zoom out"
            >
              <ZoomOut size={15} />
            </button>
            <span className={styles.zoomLabel}>{Math.round(imageZoom * 100)}%</span>
            <button
              type="button"
              className="nv-btn nv-btn--sm nv-btn--icon"
              onClick={() => setImageZoom((value) => Math.min(4, Number((value + 0.25).toFixed(2))))}
              aria-label="Zoom in"
            >
              <ZoomIn size={15} />
            </button>
          </div>
          <div className={styles.imageScroll}>
            <img
              src={url}
              alt={title}
              className={styles.image}
              style={{ width: `${imageZoom * 100}%` }}
            />
          </div>
        </div>
      ) : (
        <div className={styles.fallbackWrap}>
          <EmptyState
            icon={mode === 'ppt' ? <Presentation size={18} /> : <TriangleAlert size={18} />}
            title={mode === 'ppt' ? 'Presentation file' : 'No in-browser preview'}
            description={
              mode === 'ppt'
                ? 'PowerPoint slides cannot be rendered in the browser. Download the file to view it in PowerPoint or Keynote.'
                : 'This file type has no browser preview. Download it to open it locally.'
            }
            action={
              <div className={styles.fallbackActions}>
                <a className="nv-btn nv-btn--primary nv-btn--sm" href={url} download={title}>
                  <Download size={14} />
                  <span>Download file</span>
                </a>
                <a
                  className="nv-btn nv-btn--sm"
                  href={url}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  <ExternalLink size={14} />
                  <span>Open in new tab</span>
                </a>
                <Link to="/all" className="nv-btn nv-btn--sm">
                  Back to library
                </Link>
              </div>
            }
          />
        </div>
      )}

      <Toasts />
    </div>
  );
};
