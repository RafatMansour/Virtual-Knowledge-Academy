'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type MediaItem = {
  url: string;
  type?: string | null;
  title?: string | null;
};

function isLikelyVideoFile(url: string): boolean {
  try {
    const lower = url.split('?')[0].toLowerCase();
    return lower.endsWith('.mp4') || lower.endsWith('.webm') || lower.endsWith('.ogg');
  } catch {
    return false;
  }
}

function getMediaKind(item: MediaItem): 'image' | 'video' | 'link' {
  const declared = (item.type || '').toLowerCase();
  if (declared === 'image') return 'image';
  if (declared === 'video') return 'video';
  if (isLikelyVideoFile(item.url)) return 'video';
  const isImage = /(\.png|\.jpg|\.jpeg|\.gif|\.webp)(\?.*)?$/i.test(item.url);
  if (isImage) return 'image';
  return 'link';
}

export default function MediaGallery({
  media,
  levelTitle,
}: {
  media: MediaItem[];
  levelTitle?: string;
}) {
  const [open, setOpen] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewerContainerRef = useRef<HTMLDivElement | null>(null);
  const items = useMemo(() => (Array.isArray(media) ? media.filter((m) => m && m.url) : []), [media]);

  if (!items.length) return null;

  function openViewerAt(index: number) {
    setCurrentIndex(index);
    setViewerOpen(true);
  }

  function closeViewer() {
    setViewerOpen(false);
  }

  function showPrev() {
    setCurrentIndex((i) => (i - 1 + items.length) % items.length);
  }

  function showNext() {
    setCurrentIndex((i) => (i + 1) % items.length);
  }

  async function toggleBrowserFullscreen() {
    try {
      const element = viewerContainerRef.current || document.documentElement;
      if (!document.fullscreenElement) {
        await element.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    if (!viewerOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeViewer();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [viewerOpen, items.length]);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="text-xs"
        onClick={() => setOpen(true)}
        aria-label="عرض الوسائط"
      >
        عرض الوسائط
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative z-[1001] mx-4 w-full max-w-5xl overflow-hidden rounded-2xl border border-slate-200 dark:border-[#2c2144] bg-white dark:bg-[#443266] shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-[#2c2144] px-4 py-3">
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                {levelTitle ? `وسائط المستوى: ${levelTitle}` : 'الوسائط'}
              </h2>
              <Button variant="ghost" size="sm" onClick={() => setOpen(false)} aria-label="إغلاق">
                إغلاق
              </Button>
            </div>
            <div className="max-h-[75vh] overflow-y-auto p-4">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((item, idx) => {
                  const kind = getMediaKind(item);
                  return (
                    <div
                      key={`${item.url}-${idx}`}
                      className="rounded-xl border border-slate-100 dark:border-[#2c2144] bg-slate-50 dark:bg-[#382a55] p-3"
                    >
                      <button
                        type="button"
                        onClick={() => openViewerAt(idx)}
                        className="aspect-video w-full overflow-hidden rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center group"
                        aria-label="فتح في شاشة كاملة"
                      >
                        {kind === 'image' && (
                          // Use <img> to avoid Next remote patterns constraints
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={item.url}
                            alt={item.title || 'صورة'}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                            loading="lazy"
                          />
                        )}
                        {kind === 'video' && (
                          <video className="h-full w-full" controls preload="metadata">
                            <source src={item.url} />
                            متصفحك لا يدعم تشغيل الفيديو.
                          </video>
                        )}
                        {kind === 'link' && (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary underline"
                          >
                            فتح الوسيط في تبويب جديد
                          </a>
                        )}
                      </button>
                      {(item.title || item.type) && (
                        <div className="mt-2 text-right">
                          <div className="text-sm font-semibold text-slate-800 dark:text-white">
                            {item.title || 'وسيط'}
                          </div>
                          {item.type && (
                            <div className="text-xs text-slate-500 dark:text-slate-300">النوع: {item.type}</div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {viewerOpen && (
        <div className="fixed inset-0 z-[1100] bg-black/90 flex items-center justify-center select-none" role="dialog" aria-modal="true">
          <div className="absolute inset-0" onClick={closeViewer} />
          <div ref={viewerContainerRef} className="relative z-[1101] mx-4 flex max-h-[96vh] max-w-[96vw] flex-col items-center justify-center">
            <div className="absolute right-2 top-2 flex gap-2">
              <Button variant="ghost" size="sm" onClick={toggleBrowserFullscreen} aria-label="ملء الشاشة" className="text-white">
                ملء الشاشة
              </Button>
              <Button variant="ghost" size="sm" onClick={closeViewer} aria-label="إغلاق" className="text-white">
                إغلاق
              </Button>
            </div>
            <button type="button" onClick={showPrev} aria-label="السابق" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20">
              ‹
            </button>
            <button type="button" onClick={showNext} aria-label="التالي" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 px-3 py-2 text-white hover:bg-white/20">
              ›
            </button>
            {(() => {
              const item = items[currentIndex];
              const kind = getMediaKind(item);
              return (
                <div className="flex w-full items-center justify-center">
                  {kind === 'image' && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.url} alt={item.title || 'صورة'} className="max-h-[85vh] max-w-[90vw] object-contain" />
                  )}
                  {kind === 'video' && (
                    <video className="max-h-[85vh] max-w-[90vw]" controls autoPlay>
                      <source src={item.url} />
                      متصفحك لا يدعم تشغيل الفيديو.
                    </video>
                  )}
                  {kind === 'link' && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="text-white underline">
                      فتح الوسيط في تبويب جديد
                    </a>
                  )}
                </div>
              );
            })()}
            {(items[currentIndex]?.title || items[currentIndex]?.type) && (
              <div className="mt-3 text-center text-white">
                <div className="text-sm font-semibold">{items[currentIndex]?.title || 'وسيط'}</div>
                {items[currentIndex]?.type && <div className="text-xs opacity-80">النوع: {items[currentIndex]?.type}</div>}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}


