import React, { useEffect, useRef } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import styles from './PdfReader.module.css';

interface ThumbProps {
  doc: PDFDocumentProxy;
  page: number;
  active: boolean;
  onSelect: (page: number) => void;
  railRef: React.RefObject<HTMLDivElement | null>;
}

const Thumb: React.FC<ThumbProps> = ({ doc, page, active, onSelect, railRef }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendered = useRef(false);

  useEffect(() => {
    rendered.current = false;
    const target = buttonRef.current;
    const canvas = canvasRef.current;
    if (!target || !canvas) return;

    let cancelled = false;

    const draw = async () => {
      if (rendered.current || cancelled) return;
      rendered.current = true;
      try {
        const pdfPage = await doc.getPage(page);
        if (cancelled) return;
        const viewport = pdfPage.getViewport({ scale: 0.22 });
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await pdfPage.render({ canvas, viewport }).promise;
      } catch {
        rendered.current = false;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void draw();
          observer.disconnect();
        }
      },
      { root: railRef.current, rootMargin: '300px' },
    );

    observer.observe(target);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [doc, page, railRef]);

  return (
    <button
      ref={buttonRef}
      type="button"
      className={`${styles.thumb} ${active ? styles.thumbActive : ''}`}
      onClick={() => onSelect(page)}
      aria-label={`Go to page ${page}`}
      aria-current={active ? 'page' : undefined}
    >
      <canvas ref={canvasRef} className={styles.thumbCanvas} />
      <span className={styles.thumbNumber}>{page}</span>
    </button>
  );
};

interface ThumbnailRailProps {
  doc: PDFDocumentProxy;
  totalPages: number;
  currentPage: number;
  onSelect: (page: number) => void;
}

export const ThumbnailRail: React.FC<ThumbnailRailProps> = ({
  doc,
  totalPages,
  currentPage,
  onSelect,
}) => {
  const railRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const active = rail?.querySelector<HTMLElement>('[aria-current="page"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [currentPage]);

  return (
    <div className={styles.rail} ref={railRef} aria-label="Page thumbnails">
      {Array.from({ length: totalPages }, (_, index) => (
        <Thumb
          key={index + 1}
          doc={doc}
          page={index + 1}
          active={currentPage === index + 1}
          onSelect={onSelect}
          railRef={railRef}
        />
      ))}
    </div>
  );
};
