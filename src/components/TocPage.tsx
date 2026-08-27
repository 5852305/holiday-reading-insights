import React from 'react';
import { BookletData, ThemeConfig } from '../types';
import { BookmarkCheck, ArrowRight, BookOpen, Compass, Layers } from 'lucide-react';

interface TocPageProps {
  data: BookletData;
  theme: ThemeConfig;
  onNavigateToPage?: (pageIndex: number) => void;
  isPrint?: boolean;
}

export const TocPage: React.FC<TocPageProps> = ({
  data,
  theme,
  onNavigateToPage,
  isPrint = false,
}) => {
  const { books, student } = data;

  return (
    <div
      className={`relative w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b ${theme.bgGradient} ${
        isPrint ? 'h-[297mm] max-h-[297mm] p-8 sm:p-10 shadow-none' : 'min-h-[780px] p-8 sm:p-12 book-shadow rounded-r-xl'
      } book-spine-left`}
      style={{
        boxSizing: 'border-box',
        color: theme.textColor,
      }}
    >
      {/* Decorative Traditional Border accents */}
      <div className="absolute top-4 left-6 w-8 h-8 border-t-2 border-l-2 opacity-30 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>
      <div className="absolute top-4 right-6 w-8 h-8 border-t-2 border-r-2 opacity-30 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>

      {/* Top Header */}
      <div className="relative z-10 pt-1 pb-4">
        <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: theme.borderColor }}>
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shadow-xs"
              style={{ backgroundColor: theme.accentBg, color: theme.accentColor }}
            >
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-widest block opacity-70 font-serif-sc font-medium">TABLE OF CONTENTS</span>
              <h2 className="text-2xl sm:text-3xl font-black font-calligraphy tracking-widest" style={{ color: theme.textColor }}>
                阅读目录 · 书香索引
              </h2>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs px-3 py-1 rounded-full font-serif-sc font-medium shadow-2xs" style={{ backgroundColor: theme.badgeBg, color: theme.accentColor }}>
              共研读 11 部经典著作
            </span>
          </div>
        </div>
      </div>

      {/* Directory Single-Column List (Classic Table of Contents Layout) */}
      <div className="relative z-10 my-auto py-1 flex-1 flex flex-col justify-center">
        <div className="space-y-1.5 sm:space-y-2">
          {books.map((book, index) => {
            const pageNum = index + 3; // Cover is 1, TOC is 2, Book 1 is 3
            return (
              <div
                key={book.id}
                onClick={() => !isPrint && onNavigateToPage && onNavigateToPage(index + 2)}
                className={`group relative flex items-center justify-between px-3 py-1.5 sm:py-2 rounded-lg border transition-all duration-200 ${
                  !isPrint ? 'cursor-pointer hover:bg-white hover:shadow-xs hover:border-amber-400' : 'bg-white/60'
                }`}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.7)',
                  borderColor: theme.borderColor,
                }}
              >
                {/* Left: Number + Full Title (Strictly Single Line, No Wrapping) */}
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink-0 mr-2">
                  <div
                    className="w-5 h-5 sm:w-6 sm:h-6 rounded-md flex items-center justify-center font-mono font-bold text-[11px] sm:text-xs shrink-0 shadow-2xs"
                    style={{ backgroundColor: theme.accentBg, color: theme.accentColor }}
                  >
                    {book.numberStr}
                  </div>
                  <h3 className="text-xs sm:text-[13.5px] font-bold text-stone-800 group-hover:text-amber-800 transition-colors font-serif-sc tracking-wide whitespace-nowrap">
                    {book.title}
                  </h3>
                </div>

                {/* Dotted Leader Line */}
                <div className="flex flex-1 items-center mx-2 overflow-hidden opacity-35">
                  <div className="w-full border-b border-dotted border-stone-500"></div>
                </div>

                {/* Right: Page Number & Navigate Indicator */}
                <div className="flex items-center gap-1.5 shrink-0 pl-1">
                  <div
                    className="px-2.5 py-0.5 rounded-md font-serif-sc font-medium text-xs shadow-2xs whitespace-nowrap"
                    style={{ backgroundColor: theme.badgeBg, color: theme.accentColor }}
                  >
                    第 {pageNum} 页
                  </div>
                  {!isPrint && (
                    <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-amber-700 group-hover:translate-x-0.5 transition-transform" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Directory Bottom Category Banner & Footer */}
      <div className="relative z-10 pt-3 border-t" style={{ borderColor: theme.borderColor }}>
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-serif-sc">
          <div className="flex items-center gap-1.5 text-stone-600">
            <BookmarkCheck className="w-4 h-4" style={{ color: theme.accentColor }} />
            <span>涵盖领域：亲子沟通 · 青春期 · 品格塑造 · 脑科学 · 高效方法</span>
          </div>

          <div className="text-[11px] font-serif-sc font-medium" style={{ color: theme.accentColor }}>
            - 第 2 页 -
          </div>
        </div>
      </div>
    </div>
  );
};
