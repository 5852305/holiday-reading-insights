import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BookletData, ThemeConfig } from '../types';
import { CoverPage } from './CoverPage';
import { TocPage } from './TocPage';
import { ReflectionPage } from './ReflectionPage';
import { BackCoverPage } from './BackCoverPage';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Bookmark,
  Layers,
  BookOpen,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookletViewerProps {
  data: BookletData;
  theme: ThemeConfig;
  currentPage: number;
  onPageChange: (page: number) => void;
  onEditClick: () => void;
  onPhotoUploadClick: () => void;
}

export const BookletViewer: React.FC<BookletViewerProps> = ({
  data,
  theme,
  currentPage,
  onPageChange,
  onEditClick,
  onPhotoUploadClick,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const containerRef = useRef<HTMLDivElement>(null);

  // Total pages = 1 (Cover) + 1 (TOC) + 11 (Books) + 1 (BackCover) = 14 pages (indices 0 to 13)
  const totalPages = data.books.length + 3; // 14 total

  // Synthesize realistic subtle paper flip sound via Web Audio API
  const playPageSound = useCallback(() => {
    if (!soundEnabled) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      const bufferSize = ctx.sampleRate * 0.12; // 120ms
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start();
    } catch (e) {
      // Audio not permitted or supported, silent ignore
    }
  }, [soundEnabled]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 0) {
      setDirection('left');
      playPageSound();
      onPageChange(currentPage - 1);
    }
  }, [currentPage, onPageChange, playPageSound]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages - 1) {
      setDirection('right');
      playPageSound();
      onPageChange(currentPage + 1);
    }
  }, [currentPage, totalPages, onPageChange, playPageSound]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        goToNextPage();
      } else if (e.key === 'Home') {
        onPageChange(0);
      } else if (e.key === 'End') {
        onPageChange(totalPages - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevPage, goToNextPage, onPageChange, totalPages]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Get current page title/label
  const getPageTitle = (idx: number) => {
    if (idx === 0) return '封面 · 亲子信息与照片';
    if (idx === 1) return '目录 · 十一卷书目索引';
    if (idx === totalPages - 1) return '封底 · 寄语与评定';
    const book = data.books[idx - 2];
    return book ? `第${book.numberStr}篇 · ${book.shortTitle}` : `第 ${idx} 页`;
  };

  return (
    <div
      ref={containerRef}
      className={`w-full flex flex-col items-center select-none ${
        isFullscreen ? 'fixed inset-0 bg-stone-900 z-50 p-4 overflow-auto' : ''
      }`}
    >
      {/* Top Floating Mini-Nav for Book Reader */}
      <div className="w-full max-w-2xl mb-4 flex items-center justify-between px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md shadow-xs border border-stone-200 text-xs font-serif-sc">
        {/* Left: Quick Jump Dropdown */}
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-700 shrink-0" />
          <select
            value={currentPage}
            onChange={(e) => {
              const target = Number(e.target.value);
              setDirection(target > currentPage ? 'right' : 'left');
              playPageSound();
              onPageChange(target);
            }}
            className="bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1 text-xs font-medium text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer max-w-[180px] sm:max-w-[240px] truncate"
          >
            <option value={0}>01. 封面 (Cover Page)</option>
            <option value={1}>02. 目录 (Contents)</option>
            {data.books.map((b, i) => (
              <option key={b.id} value={i + 2}>
                {i + 3 < 10 ? `0${i + 3}` : i + 3}. {b.numberStr} {b.shortTitle}
              </option>
            ))}
            <option value={totalPages - 1}>{totalPages}. 封底 (Back Cover)</option>
          </select>
        </div>

        {/* Right: Audio Toggle & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
              soundEnabled ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-stone-400 bg-stone-50 border-stone-200'
            }`}
            title={soundEnabled ? '翻页音效：已开启' : '翻页音效：已静音'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 cursor-pointer"
            title={isFullscreen ? '退出全屏' : '全屏沉浸阅读'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Flipbook Canvas Stage with Smooth Navigation */}
      <div className="relative w-full max-w-xl flex items-center justify-center">
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          className={`absolute -left-4 sm:-left-14 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 shadow-lg border border-stone-200 flex items-center justify-center transition-all cursor-pointer ${
            currentPage === 0
              ? 'opacity-30 cursor-not-allowed text-stone-300'
              : 'text-stone-700 hover:text-amber-700 hover:bg-white hover:scale-105 active:scale-95'
          }`}
          aria-label="上一页"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* The Animated Page Container */}
        <div className="w-full relative overflow-hidden rounded-2xl">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={currentPage}
              custom={direction}
              initial={{
                opacity: 0.4,
                x: direction === 'right' ? 40 : -40,
                rotateY: direction === 'right' ? 4 : -4,
              }}
              animate={{
                opacity: 1,
                x: 0,
                rotateY: 0,
              }}
              exit={{
                opacity: 0.3,
                x: direction === 'right' ? -40 : 40,
                rotateY: direction === 'right' ? -4 : 4,
              }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="w-full min-h-[760px] sm:min-h-[820px] flex items-stretch"
            >
              {currentPage === 0 && (
                <CoverPage
                  data={data}
                  theme={theme}
                  onEditClick={onEditClick}
                  onPhotoUploadClick={onPhotoUploadClick}
                />
              )}

              {currentPage === 1 && (
                <TocPage
                  data={data}
                  theme={theme}
                  onNavigateToPage={(targetIdx) => {
                    setDirection('right');
                    playPageSound();
                    onPageChange(targetIdx);
                  }}
                />
              )}

              {currentPage >= 2 && currentPage <= totalPages - 2 && (
                <ReflectionPage
                  book={data.books[currentPage - 2]}
                  theme={theme}
                  student={data.student}
                  pageIndex={currentPage + 1}
                  totalPages={totalPages}
                />
              )}

              {currentPage === totalPages - 1 && (
                <BackCoverPage
                  data={data}
                  theme={theme}
                  onEditClick={onEditClick}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          className={`absolute -right-4 sm:-right-14 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/95 shadow-lg border border-stone-200 flex items-center justify-center transition-all cursor-pointer ${
            currentPage === totalPages - 1
              ? 'opacity-30 cursor-not-allowed text-stone-300'
              : 'text-stone-700 hover:text-amber-700 hover:bg-white hover:scale-105 active:scale-95'
          }`}
          aria-label="下一页"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Reader Bottom Navigation & Pagination Bar */}
      <div className="w-full max-w-xl mt-4 flex flex-col items-center gap-2">
        {/* Page progress pill */}
        <div className="flex items-center justify-between w-full px-3 text-xs font-serif-sc text-stone-500">
          <button
            type="button"
            onClick={() => {
              setDirection('left');
              playPageSound();
              onPageChange(0);
            }}
            disabled={currentPage === 0}
            className="flex items-center gap-1 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
          >
            <ChevronsLeft className="w-3.5 h-3.5" />
            <span>首页</span>
          </button>

          <span className="font-bold text-stone-700 bg-white px-3 py-1 rounded-full border border-stone-200 shadow-2xs">
            {getPageTitle(currentPage)} ({currentPage + 1} / {totalPages})
          </span>

          <button
            type="button"
            onClick={() => {
              setDirection('right');
              playPageSound();
              onPageChange(totalPages - 1);
            }}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-1 hover:text-stone-900 disabled:opacity-30 cursor-pointer"
          >
            <span>末页</span>
            <ChevronsRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mini Page Thumbnail Strip */}
        <div className="w-full overflow-x-auto py-2 flex items-center justify-start sm:justify-center gap-1.5 scrollbar-thin px-2">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setDirection(idx > currentPage ? 'right' : 'left');
                playPageSound();
                onPageChange(idx);
              }}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentPage === idx
                  ? 'w-8 bg-amber-600'
                  : 'w-2.5 bg-stone-300 hover:bg-stone-400'
              }`}
              title={getPageTitle(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
