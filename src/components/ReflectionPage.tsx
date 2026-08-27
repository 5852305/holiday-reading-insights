import React from 'react';
import { BookReflection, ThemeConfig, StudentInfo } from '../types';
import { Quote, Sparkles, Lightbulb, Tag } from 'lucide-react';

interface ReflectionPageProps {
  book: BookReflection;
  theme: ThemeConfig;
  student: StudentInfo;
  pageIndex: number;
  totalPages: number;
  isPrint?: boolean;
}

export const ReflectionPage: React.FC<ReflectionPageProps> = ({
  book,
  theme,
  student,
  pageIndex,
  totalPages,
  isPrint = false,
}) => {
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
      {/* Decorative Vintage Corner marks */}
      <div className="absolute top-4 right-6 w-10 h-10 border-t-2 border-r-2 opacity-30 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>
      <div className="absolute bottom-4 left-6 w-10 h-10 border-b-2 border-l-2 opacity-30 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>

      {/* Book Title */}
      <div className="relative z-10 pb-2">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight font-serif-sc" style={{ color: theme.textColor }}>
          {book.title}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 my-auto flex flex-col gap-4 py-2">
        {/* 1. Golden Quote / Core takeaway card */}
        {book.goldenQuote && (
          <div
            className="relative p-3.5 sm:p-4 rounded-xl border transition-all"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              borderColor: theme.borderColor,
              boxShadow: '0 2px 8px -2px rgba(0,0,0,0.05)',
            }}
          >
            <div className="flex gap-2.5 items-start">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: theme.accentBg, color: theme.accentColor }}
              >
                <Quote className="w-4 h-4 fill-current opacity-80" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider block opacity-60 font-serif-sc mb-0.5" style={{ color: theme.accentColor }}>
                  核心金句 · 心灵共鸣
                </span>
                <p className="text-xs sm:text-sm font-semibold font-serif-sc tracking-wide leading-relaxed italic" style={{ color: theme.accentColor }}>
                  “ {book.goldenQuote} ”
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Reading Reflection Body (User-provided text) */}
        <div
          className="p-4 sm:p-5 rounded-2xl border relative overflow-hidden"
          style={{
            backgroundColor: '#ffffff',
            borderColor: theme.borderColor,
            boxShadow: '0 4px 12px -2px rgba(0,0,0,0.04)',
          }}
        >
          {/* Header label inside box */}
          <div className="flex items-center gap-1.5 mb-2.5 pb-2 border-b border-stone-100">
            <Sparkles className="w-4 h-4" style={{ color: theme.accentColor }} />
            <h3 className="text-xs sm:text-sm font-bold font-serif-sc tracking-wider" style={{ color: theme.textColor }}>
              读书心得与感悟
            </h3>
          </div>

          {/* Body Text */}
          <div className="text-stone-800 font-serif-sc text-sm sm:text-[15px] leading-relaxed tracking-normal text-justify space-y-2">
            <p className="indent-7">
              {book.reflectionText}
            </p>
          </div>

          {/* Tags */}
          {book.tags && book.tags.length > 0 && (
            <div className="mt-3 pt-2.5 border-t border-stone-100 flex flex-wrap items-center gap-1.5">
              <span className="text-[11px] text-stone-400 flex items-center gap-1 font-serif-sc">
                <Tag className="w-3 h-3" />
                <span>关键词:</span>
              </span>
              {book.tags.map((tag, tIdx) => (
                <span
                  key={tIdx}
                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style={{ backgroundColor: theme.accentBg, color: theme.accentColor }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 3. Actionable Family Takeaway / Parenting Action Box */}
        {book.parentTakeaway && (
          <div
            className="p-3.5 sm:p-4 rounded-xl border border-dashed"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              borderColor: theme.borderColor,
            }}
          >
            <div className="flex items-start gap-2.5">
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                style={{ backgroundColor: theme.accentBg, color: theme.accentColor }}
              >
                <Lightbulb className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold font-serif-sc mb-1 flex items-center gap-1" style={{ color: theme.textColor }}>
                  <span>家庭实践与亲子共读启示</span>
                </h4>
                <p className="text-xs font-serif-sc text-stone-600 leading-normal">
                  {book.parentTakeaway}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Page Footer */}
      <div className="relative z-10 pt-3 border-t" style={{ borderColor: theme.borderColor }}>
        <div className="flex items-center justify-between text-xs text-stone-500 font-serif-sc">
          <div className="flex items-center gap-2">
            <span>{student.studentName} · 读书心得笔记</span>
            <span className="opacity-40">|</span>
            <span className="text-[11px]">{student.gradeClass}</span>
          </div>

          <div className="font-serif-sc font-medium tracking-wider" style={{ color: theme.accentColor }}>
            - 第 {pageIndex} 页 -
          </div>
        </div>
      </div>
    </div>
  );
};
