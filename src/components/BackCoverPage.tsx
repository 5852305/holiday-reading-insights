import React from 'react';
import { BookletData, ThemeConfig } from '../types';
import { Award, BookOpen, Clock, Calendar, CheckSquare, HeartHandshake, Feather, CheckCircle2 } from 'lucide-react';

interface BackCoverPageProps {
  data: BookletData;
  theme: ThemeConfig;
  onEditClick?: () => void;
  isPrint?: boolean;
}

export const BackCoverPage: React.FC<BackCoverPageProps> = ({
  data,
  theme,
  onEditClick,
  isPrint = false,
}) => {
  const { backCover, student } = data;

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
      <div className="absolute top-4 left-6 w-10 h-10 border-t-2 border-l-2 opacity-40 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>
      <div className="absolute top-4 right-6 w-10 h-10 border-t-2 border-r-2 opacity-40 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>
      <div className="absolute bottom-4 left-6 w-10 h-10 border-b-2 border-l-2 opacity-40 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>
      <div className="absolute bottom-4 right-6 w-10 h-10 border-b-2 border-r-2 opacity-40 pointer-events-none" style={{ borderColor: theme.accentColor }}></div>

      {/* Header */}
      <div className="relative z-10 text-center pt-2">
        <div
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full text-xs font-medium tracking-widest mb-2 shadow-2xs"
          style={{ backgroundColor: theme.accentBg, color: theme.accentColor, border: `1px solid ${theme.borderColor}` }}
        >
          <Award className="w-3.5 h-3.5" />
          <span>假期阅读总结与成长寄语 · 封底</span>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-calligraphy tracking-wider mb-2 whitespace-nowrap" style={{ color: theme.textColor }}>
          {backCover.closingTitle}
        </h2>
        <p className="text-xs sm:text-sm font-serif-sc text-stone-600 max-w-md mx-auto">
          {backCover.closingSubtitle}
        </p>

        {/* Decorative line */}
        <div className="flex items-center justify-center gap-3 my-3">
          <div className="h-[1px] w-12 sm:w-16" style={{ backgroundColor: theme.borderColor }}></div>
          <Feather className="w-4 h-4 opacity-70" style={{ color: theme.accentColor }} />
          <div className="h-[1px] w-12 sm:w-16" style={{ backgroundColor: theme.borderColor }}></div>
        </div>
      </div>

      {/* Content Area - Clean, Elegant Reflection and Closing Typography */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center max-w-xl mx-auto w-full py-8 text-center">
        {/* Family Reading Summary */}
        <div
          className="p-8 sm:p-10 rounded-2xl border relative shadow-xs text-left"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.88)', borderColor: theme.borderColor }}
        >
          <div className="flex items-center justify-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: `${theme.borderColor}80` }}>
            <h3 className="text-base sm:text-lg font-bold font-serif-sc tracking-wide" style={{ color: theme.textColor }}>
              阅读结语与亲子感言
            </h3>
          </div>

          <p className="text-sm sm:text-base font-serif-sc text-stone-700 leading-relaxed indent-8 tracking-wide">
            {backCover.reflectionSummary}
          </p>
        </div>
      </div>

      {/* Subtle Bottom Note */}
      <div className="relative z-10 text-center pb-2 text-xs font-serif-sc opacity-60 tracking-widest" style={{ color: theme.textColor }}>
        · 亲子共读 · 共同成长 ·
      </div>
    </div>
  );
};
