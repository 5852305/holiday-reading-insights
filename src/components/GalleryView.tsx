import React from 'react';
import { BookletData, ThemeConfig } from '../types';
import { CoverPage } from './CoverPage';
import { TocPage } from './TocPage';
import { ReflectionPage } from './ReflectionPage';
import { BackCoverPage } from './BackCoverPage';
import { BookOpen, Eye, ArrowRight } from 'lucide-react';

interface GalleryViewProps {
  data: BookletData;
  theme: ThemeConfig;
  onSelectPage: (pageIndex: number) => void;
  onEditClick: () => void;
  onPhotoUploadClick: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  data,
  theme,
  onSelectPage,
  onEditClick,
  onPhotoUploadClick,
}) => {
  const totalPages = data.books.length + 3;

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Gallery Header */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-stone-900 text-white flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-stone-900 font-serif-sc">
              全卷画廊总览 · 共 14 页完整书册
            </h2>
            <p className="text-xs text-stone-500 font-serif-sc">
              点击任意页面卡片即可立即进入该页进行沉浸阅读或定制
            </p>
          </div>
        </div>

        <span className="text-xs font-serif-sc text-stone-600 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
          包含：封面 + 目录 + 11 篇感悟 + 封底
        </span>
      </div>

      {/* Grid of Pages */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. Cover Card */}
        <div className="flex flex-col gap-2 group">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1 font-serif-sc">
            <span>第 01 页 · 封面</span>
            <button
              type="button"
              onClick={() => onSelectPage(0)}
              className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer text-xs"
            >
              <span>放大阅读</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div
            onClick={() => onSelectPage(0)}
            className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.01] rounded-2xl overflow-hidden shadow-md border border-stone-200"
          >
            <CoverPage
              data={data}
              theme={theme}
              onEditClick={onEditClick}
              onPhotoUploadClick={onPhotoUploadClick}
            />
          </div>
        </div>

        {/* 2. TOC Card */}
        <div className="flex flex-col gap-2 group">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1 font-serif-sc">
            <span>第 02 页 · 目录</span>
            <button
              type="button"
              onClick={() => onSelectPage(1)}
              className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer text-xs"
            >
              <span>放大阅读</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div
            onClick={() => onSelectPage(1)}
            className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.01] rounded-2xl overflow-hidden shadow-md border border-stone-200"
          >
            <TocPage
              data={data}
              theme={theme}
              onNavigateToPage={onSelectPage}
            />
          </div>
        </div>

        {/* 3-13: 11 Books Cards */}
        {data.books.map((book, index) => {
          const pageNumber = index + 3;
          return (
            <div key={book.id} className="flex flex-col gap-2 group">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1 font-serif-sc">
                <span>第 {pageNumber < 10 ? `0${pageNumber}` : pageNumber} 页 · {book.shortTitle}</span>
                <button
                  type="button"
                  onClick={() => onSelectPage(index + 2)}
                  className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer text-xs"
                >
                  <span>放大阅读</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
              <div
                onClick={() => onSelectPage(index + 2)}
                className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.01] rounded-2xl overflow-hidden shadow-md border border-stone-200"
              >
                <ReflectionPage
                  book={book}
                  theme={theme}
                  student={data.student}
                  pageIndex={pageNumber}
                  totalPages={totalPages}
                />
              </div>
            </div>
          );
        })}

        {/* 14. BackCover Card */}
        <div className="flex flex-col gap-2 group">
          <div className="flex items-center justify-between text-xs font-bold text-stone-700 px-1 font-serif-sc">
            <span>第 14 页 · 封底</span>
            <button
              type="button"
              onClick={() => onSelectPage(totalPages - 1)}
              className="text-amber-700 hover:underline flex items-center gap-1 cursor-pointer text-xs"
            >
              <span>放大阅读</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
          <div
            onClick={() => onSelectPage(totalPages - 1)}
            className="cursor-pointer transition-transform duration-200 group-hover:scale-[1.01] rounded-2xl overflow-hidden shadow-md border border-stone-200"
          >
            <BackCoverPage
              data={data}
              theme={theme}
              onEditClick={onEditClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
