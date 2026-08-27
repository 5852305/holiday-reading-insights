import React from 'react';
import { ViewMode, ThemeType, ThemeConfig } from '../types';
import { ThemeSelector } from './ThemeSelector';
import {
  BookOpen,
  LayoutGrid,
  Printer,
  Edit3,
  Camera,
  RotateCcw,
  Sparkles,
  Download
} from 'lucide-react';

interface NavbarProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  currentTheme: ThemeConfig;
  onThemeChange: (themeId: ThemeType) => void;
  onOpenEditModal: () => void;
  onOpenPhotoModal: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  viewMode,
  onViewModeChange,
  currentTheme,
  onThemeChange,
  onOpenEditModal,
  onOpenPhotoModal,
  onResetData,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-stone-200 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Branding & Tag */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs font-serif-sc font-black text-white"
              style={{ backgroundColor: currentTheme.accentColor }}
            >
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-base sm:text-lg font-black font-serif-sc tracking-wide text-stone-900">
                  假期读书感想集
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-800">
                  亲子共育
                </span>
              </div>
              <p className="text-[11px] text-stone-500 font-serif-sc">
                精美封面 · 目录索引 · 11篇深度感悟 · A4打印封底
              </p>
            </div>
          </div>

          {/* Mobile Edit quick button */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              type="button"
              onClick={onOpenEditModal}
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer"
              title="编辑内容"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => onViewModeChange('print')}
              className="p-2 text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-lg cursor-pointer"
              title="打印"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: View Mode Segmented Controls */}
        <div className="flex items-center bg-stone-100 p-1 rounded-xl border border-stone-200">
          <button
            type="button"
            onClick={() => onViewModeChange('flip')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-serif-sc transition-all cursor-pointer ${
              viewMode === 'flip'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>📖 翻页阅读</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('gallery')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-serif-sc transition-all cursor-pointer ${
              viewMode === 'gallery'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>📜 全卷总览</span>
          </button>

          <button
            type="button"
            onClick={() => onViewModeChange('print')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold font-serif-sc transition-all cursor-pointer ${
              viewMode === 'print'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Printer className="w-3.5 h-3.5" />
            <span>🖨️ A4 打印预览</span>
          </button>
        </div>

        {/* Right: Actions (Theme, Edit, Photo, Print) */}
        <div className="hidden md:flex items-center gap-2">
          {/* Theme Selector */}
          <ThemeSelector currentTheme={currentTheme} onSelectTheme={onThemeChange} />

          {/* Edit Button */}
          <button
            type="button"
            onClick={onOpenEditModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold font-serif-sc transition-all cursor-pointer border border-stone-200"
          >
            <Edit3 className="w-3.5 h-3.5 text-amber-600" />
            <span>编辑内容</span>
          </button>

          {/* Child Photo Button */}
          <button
            type="button"
            onClick={onOpenPhotoModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold font-serif-sc transition-all cursor-pointer border border-stone-200"
            title="更换封面孩子照片"
          >
            <Camera className="w-3.5 h-3.5 text-blue-600" />
            <span>贴入照片</span>
          </button>

          {/* Print / Save PDF Button */}
          <button
            type="button"
            onClick={() => {
              onViewModeChange('print');
              setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                try {
                  window.focus();
                  window.print();
                } catch (e) {
                  console.warn('Print trigger caught:', e);
                }
              }, 300);
            }}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer hover:scale-[1.02]"
            title="A4 打印 & 导出 PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>打印 / 导出</span>
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={onResetData}
            className="p-1.5 text-stone-400 hover:text-stone-700 hover:bg-stone-100 rounded-lg cursor-pointer transition-colors"
            title="重置为默认数据"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
