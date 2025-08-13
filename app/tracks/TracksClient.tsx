'use client';

import React from 'react';
import MediaGallery from '@/components/MediaGallery';
import type { Track } from '@/types/tracks';

export default function TracksClient({ tracks }: { tracks: Track[] }) {
  if (!tracks?.length) {
    return <div className="text-center text-slate-600 dark:text-slate-200">لا توجد مسارات متاحة حالياً.</div>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {tracks.map((track) => {
        const levelCount = track.levels?.length || 0;
        return (
          <article
            key={track.id}
            className="rounded-2xl border border-slate-200 dark:border-[#2c2144] bg-white dark:bg-[#443266] shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-[#7CB5EB]/20 via-[#aa7fff]/20 to-[#aa7fff]/20 dark:from-white/5 dark:via-white/5 dark:to-white/5 p-5">
              <h3 className="text-xl font-extrabold text-slate-800 dark:text-white">{track.name}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-200 line-clamp-3">{track.description || 'بدون وصف'}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-300">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#aa7fff]/10 text-[#6b4bbd] dark:text-[#cbb2ff] px-2 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#aa7fff]"></span>
                  {levelCount} مستوى
                </span>
              </div>
            </div>
            {levelCount > 0 && (
              <div className="px-5 pb-5">
                <ul className="mt-4 space-y-3">
                  {track.levels!.map((level, idx) => {
                    const mediaArray = Array.isArray(level.media) ? level.media : [];
                    const mediaCount = mediaArray.length;
                    return (
                      <li
                        key={level.id}
                        className="rounded-xl border border-slate-100 dark:border-[#2c2144] bg-slate-50 dark:bg-[#382a55] px-4 py-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <div className="text-sm font-bold text-slate-800 dark:text-white">
                              المستوى {level.order_num ?? idx + 1}: {level.name}
                            </div>
                            {level.description && (
                              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-200 line-clamp-2">
                                {level.description}
                              </p>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="text-[10px] text-slate-500 dark:text-slate-300 whitespace-nowrap">
                              {mediaCount} وسائط
                            </div>
                            {mediaCount > 0 && (
                              <MediaGallery media={mediaArray} levelTitle={level.name} />
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}


