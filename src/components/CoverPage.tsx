import React from 'react';
import { BookletData, ThemeConfig } from '../types';
import { Camera, Edit3 } from 'lucide-react';

interface CoverPageProps {
  data: BookletData;
  theme: ThemeConfig;
  onEditClick?: () => void;
  onPhotoUploadClick?: () => void;
  isPrint?: boolean;
}

export const CoverPage: React.FC<CoverPageProps> = ({
  data,
  theme,
  onEditClick,
  onPhotoUploadClick,
  isPrint = false,
}) => {
  const { student } = data;

  return (
    <div
      className={`relative w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b ${theme.bgGradient} ${
        isPrint ? 'h-[297mm] max-h-[297mm] p-6 shadow-none' : 'min-h-[820px] p-6 sm:p-10 book-shadow rounded-r-xl'
      } book-spine-left select-none`}
      style={{
        boxSizing: 'border-box',
        color: theme.textColor,
      }}
    >
      {/* Outer Classic Double-Line Border with Inverted/Ornamental Corners */}
      <div
        className="absolute inset-4 sm:inset-6 border-[3px] pointer-events-none rounded-sm"
        style={{ borderColor: theme.accentColor }}
      >
        {/* Inner Thin Border with Decorative Concave Corners */}
        <div
          className="absolute inset-2 sm:inset-3 border rounded-xs pointer-events-none"
          style={{ borderColor: theme.borderColor }}
        >
          {/* Top-Left Corner Notch / Inset Decor */}
          <div
            className="absolute -top-1 -left-1 w-3.5 h-3.5 border-t-2 border-l-2"
            style={{ borderColor: theme.accentColor, backgroundColor: theme.cardBg }}
          />
          {/* Top-Right Corner Notch / Inset Decor */}
          <div
            className="absolute -top-1 -right-1 w-3.5 h-3.5 border-t-2 border-r-2"
            style={{ borderColor: theme.accentColor, backgroundColor: theme.cardBg }}
          />
          {/* Bottom-Left Corner Notch / Inset Decor */}
          <div
            className="absolute -bottom-1 -left-1 w-3.5 h-3.5 border-b-2 border-l-2"
            style={{ borderColor: theme.accentColor, backgroundColor: theme.cardBg }}
          />
          {/* Bottom-Right Corner Notch / Inset Decor */}
          <div
            className="absolute -bottom-1 -right-1 w-3.5 h-3.5 border-b-2 border-r-2"
            style={{ borderColor: theme.accentColor, backgroundColor: theme.cardBg }}
          />
        </div>
      </div>

      {/* Main Content Area within Borders */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-8">
        
        {/* SECTION 1: TOP HEADERS */}
        <div className="text-center pt-2 sm:pt-4">
          {/* Primary Main Big Title - Calligraphy & Theme Text Color */}
          <h1
            className="text-4xl sm:text-5xl lg:text-[54px] font-black tracking-widest font-calligraphy leading-tight"
            style={{
              color: theme.textColor,
              letterSpacing: '0.14em',
            }}
          >
            {data.title || '假期读书感想集'}
          </h1>

          {/* Subtitle flanked by clean horizontal rules */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-4 max-w-lg mx-auto">
            <div className="h-[1.5px] flex-1 max-w-[80px] sm:max-w-[120px]" style={{ backgroundColor: theme.accentColor }} />
            <span
              className="text-base sm:text-lg font-serif-sc font-medium tracking-widest whitespace-nowrap"
              style={{ color: theme.textColor }}
            >
              {data.subtitle || '阅读记录与成长感想'}
            </span>
            <div className="h-[1.5px] flex-1 max-w-[80px] sm:max-w-[120px]" style={{ backgroundColor: theme.accentColor }} />
          </div>
        </div>

        {/* SECTION 2: MIDDLE COMPOSITION (Book Stack Illustration + Photo Frame) */}
        <div className="relative my-auto flex items-center justify-between gap-4 max-w-xl mx-auto w-full px-2 sm:px-6 py-2">
          
          {/* Left: Hand-Drawn Style Vector Book Stack Illustration with Sparkles */}
          <div className="relative flex-1 flex justify-center items-center">
            {/* Ambient Sparkles */}
            <div className="absolute -top-3 left-4 text-base select-none opacity-80" style={{ color: theme.accentColor }}>✦</div>
            <div className="absolute top-2 right-6 text-xl select-none opacity-90" style={{ color: theme.accentColor }}>✧</div>
            <div className="absolute bottom-8 -left-3 text-lg select-none opacity-70" style={{ color: theme.accentColor }}>✧</div>
            <div className="absolute -bottom-1 right-8 text-sm select-none opacity-80" style={{ color: theme.accentColor }}>✦</div>

            {/* Hand-crafted Line-Art SVG Illustration: Books Stack + Pencils + Leaf */}
            <svg
              viewBox="0 0 320 260"
              className="w-48 sm:w-60 md:w-68 h-auto overflow-visible"
              fill="none"
              stroke={theme.accentColor}
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Stack of Hardcover Books */}
              {/* Book 1 (Top) */}
              <g id="book1" transform="translate(10, 0)">
                <path d="M 60,70 L 170,35 L 230,55 L 120,90 Z" fill={theme.cardBg} />
                <path d="M 60,70 L 60,82 L 120,102 L 120,90 Z" fill={theme.cardBg} />
                <path d="M 120,90 L 120,102 L 230,67 L 230,55 Z" fill={theme.cardBg} />
                {/* Book spine curve & pages details */}
                <path d="M 60,74 L 120,94 L 230,59" strokeWidth="1.2" />
                <path d="M 60,78 L 120,98 L 230,63" strokeWidth="1.2" />
                <path d="M 170,35 L 170,47" strokeWidth="1.5" />
              </g>

              {/* Book 2 (Second) */}
              <g id="book2" transform="translate(0, 22)">
                <path d="M 50,85 L 175,45 L 240,68 L 115,108 Z" fill={theme.cardBg} />
                <path d="M 50,85 L 50,100 L 115,123 L 115,108 Z" fill={theme.cardBg} />
                <path d="M 115,108 L 115,123 L 240,83 L 240,68 Z" fill={theme.cardBg} />
                {/* Page lines */}
                <path d="M 50,90 L 115,113 L 240,73" strokeWidth="1.2" />
                <path d="M 50,95 L 115,118 L 240,78" strokeWidth="1.2" />
              </g>

              {/* Book 3 (Third) */}
              <g id="book3" transform="translate(5, 48)">
                <path d="M 45,95 L 180,50 L 250,75 L 115,120 Z" fill={theme.cardBg} />
                <path d="M 45,95 L 45,112 L 115,137 L 115,120 Z" fill={theme.cardBg} />
                <path d="M 115,120 L 115,137 L 250,92 L 250,75 Z" fill={theme.cardBg} />
                {/* Page lines */}
                <path d="M 45,100 L 115,125 L 250,80" strokeWidth="1.2" />
                <path d="M 45,106 L 115,131 L 250,86" strokeWidth="1.2" />
              </g>

              {/* Book 4 (Bottom Base) */}
              <g id="book4" transform="translate(-2, 75)">
                <path d="M 40,105 L 185,55 L 260,82 L 115,132 Z" fill={theme.cardBg} />
                <path d="M 40,105 L 40,126 L 115,153 L 115,132 Z" fill={theme.cardBg} />
                <path d="M 115,132 L 115,153 L 260,103 L 260,82 Z" fill={theme.cardBg} />
                {/* Page lines */}
                <path d="M 40,111 L 115,138 L 260,88" strokeWidth="1.2" />
                <path d="M 40,117 L 115,144 L 260,94" strokeWidth="1.2" />
                <path d="M 40,122 L 115,149 L 260,99" strokeWidth="1.2" />
              </g>

              {/* Leaning Sharp Pencil 1 */}
              <g id="pencil1">
                <path d="M 225,120 L 248,60 L 262,66 L 239,126 Z" fill={theme.cardBg} />
                {/* Pencil Tip */}
                <path d="M 248,60 L 256,40 L 262,66 Z" fill={theme.cardBg} />
                <path d="M 253,48 L 256,40 L 257,49 Z" fill={theme.accentColor} />
                <path d="M 232,123 L 255,63" strokeWidth="1.2" />
              </g>

              {/* Leaning Eraser Pencil 2 */}
              <g id="pencil2">
                <path d="M 195,190 L 265,135 L 277,148 L 207,203 Z" fill={theme.cardBg} />
                {/* Tip */}
                <path d="M 207,203 L 185,212 L 195,190 Z" fill={theme.cardBg} />
                <path d="M 191,207 L 185,212 L 190,201 Z" fill={theme.accentColor} />
                <path d="M 201,196 L 271,141" strokeWidth="1.2" />
                {/* Band */}
                <path d="M 255,143 L 267,156" strokeWidth="1.5" />
              </g>

              {/* Small Organic Leaf Decor */}
              <g id="leaf" transform="translate(18, 175)">
                <path d="M 30,25 C 10,15 10,40 30,45 C 50,40 50,15 30,25 Z" fill={theme.cardBg} />
                <path d="M 15,35 Q 30,25 45,30" strokeWidth="1.5" />
                <path d="M 24,31 L 20,24" strokeWidth="1.2" />
                <path d="M 32,29 L 36,22" strokeWidth="1.2" />
                <path d="M 36,30 L 40,38" strokeWidth="1.2" />
              </g>
            </svg>
          </div>

          {/* Right: Rounded Rectangular Photo Frame ("贴孩子照片") */}
          <div className="shrink-0 flex flex-col items-center">
            <div
              className={`relative w-28 h-36 sm:w-36 sm:h-44 md:w-40 md:h-48 rounded-2xl border-2 p-1.5 flex flex-col items-center justify-center overflow-hidden shadow-xs group transition-all`}
              style={{
                borderColor: theme.accentColor,
                backgroundColor: theme.cardBg,
              }}
            >
              {student.photoUrl ? (
                <div className="relative w-full h-full rounded-xl overflow-hidden flex items-center justify-center bg-stone-50">
                  <img
                    src={student.photoUrl}
                    alt={student.studentName}
                    className="w-full h-full object-cover rounded-xl"
                    referrerPolicy="no-referrer"
                  />
                  {!isPrint && (
                    <button
                      type="button"
                      onClick={onPhotoUploadClick}
                      className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white cursor-pointer text-xs gap-1 backdrop-blur-[1px]"
                    >
                      <Camera className="w-5 h-5" />
                      <span>更换 / 留空</span>
                    </button>
                  )}
                </div>
              ) : (
                <div
                  onClick={!isPrint ? onPhotoUploadClick : undefined}
                  className={`w-full h-full rounded-xl border border-dashed flex flex-col items-center justify-center text-center p-2 transition-colors ${
                    !isPrint ? 'cursor-pointer hover:bg-black/5' : ''
                  }`}
                  style={{
                    borderColor: `${theme.accentColor}80`,
                  }}
                >
                  {!isPrint && (
                    <Camera className="w-6 h-6 mb-2 stroke-[1.5] opacity-60" style={{ color: theme.accentColor }} />
                  )}
                  <span
                    className="text-sm sm:text-base font-serif-sc font-medium tracking-widest select-none"
                    style={{ color: theme.accentColor }}
                  >
                    贴孩子照片
                  </span>
                  {!isPrint && (
                    <span className="text-[10px] opacity-60 font-serif-sc mt-1">
                      (点击上传或留空)
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 3: FORM FIELDS (Student Name & Parents Phones with Underline Style) */}
        <div className="relative max-w-md mx-auto w-full px-4 sm:px-8 space-y-4 sm:space-y-5 my-2">
          
          {/* Item 1: 学生姓名 */}
          <div className="flex items-end font-serif-sc">
            <span
              className="text-base sm:text-lg font-bold tracking-wider shrink-0 mr-2 whitespace-nowrap"
              style={{ color: theme.textColor }}
            >
              学生姓名：
            </span>
            <div
              className="flex-1 border-b-2 pb-1 px-2 flex items-center justify-center text-center min-h-[36px]"
              style={{ borderColor: theme.accentColor }}
            >
              <span
                className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-[0.2em] font-serif-sc"
                style={{ color: theme.textColor }}
              >
                {student.studentName || '张子涵'}
              </span>
            </div>
          </div>

          {/* Item 2: 父亲联系电话 */}
          <div className="flex items-end font-serif-sc">
            <span
              className="text-base sm:text-lg font-bold tracking-wider shrink-0 mr-2 whitespace-nowrap"
              style={{ color: theme.textColor }}
            >
              父亲联系电话：
            </span>
            <div
              className="flex-1 border-b-2 pb-1 px-2 text-center sm:text-left min-h-[30px] flex items-baseline justify-center sm:justify-start gap-2.5 sm:gap-3 flex-wrap"
              style={{ borderColor: theme.accentColor }}
            >
              <span
                className="text-base sm:text-lg font-bold font-serif-sc tracking-wider"
                style={{ color: theme.textColor }}
              >
                {student.fatherName || '石进'}
              </span>
              <span
                className="text-base sm:text-lg font-mono font-bold tracking-wider"
                style={{ color: theme.textColor }}
              >
                {student.fatherPhone || '138-8888-6666'}
              </span>
            </div>
          </div>

          {/* Item 3: 母亲联系电话 */}
          <div className="flex items-end font-serif-sc">
            <span
              className="text-base sm:text-lg font-bold tracking-wider shrink-0 mr-2 whitespace-nowrap"
              style={{ color: theme.textColor }}
            >
              母亲联系电话：
            </span>
            <div
              className="flex-1 border-b-2 pb-1 px-2 text-center sm:text-left min-h-[30px] flex items-baseline justify-center sm:justify-start gap-2.5 sm:gap-3 flex-wrap"
              style={{ borderColor: theme.accentColor }}
            >
              <span
                className="text-base sm:text-lg font-bold font-serif-sc tracking-wider"
                style={{ color: theme.textColor }}
              >
                {student.motherName || '何苗'}
              </span>
              <span
                className="text-base sm:text-lg font-mono font-bold tracking-wider"
                style={{ color: theme.textColor }}
              >
                {student.motherPhone || '139-6666-8888'}
              </span>
            </div>
          </div>

          {/* Optional inline edit trigger in interactive mode */}
          {!isPrint && onEditClick && (
            <div className="pt-1 flex justify-end">
              <button
                type="button"
                onClick={onEditClick}
                className="text-xs font-serif-sc opacity-75 hover:opacity-100 flex items-center gap-1 hover:underline cursor-pointer transition-opacity"
                style={{ color: theme.accentColor }}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>修改信息</span>
              </button>
            </div>
          )}
        </div>

        {/* SECTION 4: BOTTOM TITLE */}
        <div className="text-center pt-2 sm:pt-4 pb-2">
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black font-calligraphy tracking-widest"
            style={{
              color: theme.textColor,
              letterSpacing: '0.2em',
            }}
          >
            {student.holidaySeason || '假期成长档案'}
          </h2>
        </div>

      </div>
    </div>
  );
};
