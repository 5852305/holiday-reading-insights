import React, { useRef, useState } from 'react';
import { BookletData, ThemeConfig } from '../types';
import { CoverPage } from './CoverPage';
import { TocPage } from './TocPage';
import { ReflectionPage } from './ReflectionPage';
import { BackCoverPage } from './BackCoverPage';
import { Printer, Download, ExternalLink, Sparkles, Check, HelpCircle } from 'lucide-react';
import { triggerDirectPrint, openPrintWindow, downloadStandaloneHtml } from '../utils/printUtils';

interface PrintViewProps {
  data: BookletData;
  theme: ThemeConfig;
  onOpenPhotoUploader: () => void;
}

export const PrintView: React.FC<PrintViewProps> = ({
  data,
  theme,
}) => {
  const totalPages = data.books.length + 2; // Cover + TOC + 11 Books + BackCover = 14 total physical pages
  const printContainerRef = useRef<HTMLDivElement>(null);
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    triggerDirectPrint();
  };

  const handleOpenInNewWindow = () => {
    if (printContainerRef.current) {
      openPrintWindow(printContainerRef.current, `假期读书感想集-${data.student.studentName}`);
    } else {
      triggerDirectPrint();
    }
  };

  const handleDownloadHtml = () => {
    if (printContainerRef.current) {
      downloadStandaloneHtml(printContainerRef.current, data.student.studentName);
      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 3000);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Top Print Guidance Banner (hidden when actually printing) */}
      <div className="no-print w-full max-w-4xl mb-6 p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs mt-0.5">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-stone-900 font-serif-sc flex items-center gap-2">
                <span>A4 高清打印 & 导出 PDF</span>
                <span className="text-[11px] font-normal px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                  共 14 页完整排版
                </span>
              </h3>
              <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                包含封面、目录索引、11 篇深度感悟与封底。为获得最佳效果，请在打印选项中勾选<strong>「背景图形」</strong>，纸张设为 <strong>A4</strong>。
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            {/* Direct Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex-1 md:flex-none px-4 py-2.5 bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white rounded-xl font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
              title="直接调起系统打印面板"
            >
              <Printer className="w-4 h-4" />
              <span>调起打印 / 存PDF</span>
            </button>

            {/* Standalone Window Print (bypasses iframe sandbox) */}
            <button
              type="button"
              onClick={handleOpenInNewWindow}
              className="px-3.5 py-2.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              title="在新窗口打开纯净打印流（防止预览窗口拦截）"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              <span>新窗口打印</span>
            </button>

            {/* Export Standalone HTML file */}
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="px-3.5 py-2.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-800 rounded-xl font-bold text-xs sm:text-sm shadow-2xs flex items-center gap-1.5 cursor-pointer transition-all"
              title="导出独立离线 HTML 文件，可在电脑上随时双击打开并保存为 PDF"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-green-600" />
                  <span className="text-green-700">已导出HTML</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5 text-stone-600" />
                  <span>导出离线HTML</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Printable Sequential Pages Container */}
      <div ref={printContainerRef} className="print-container w-full max-w-[210mm] space-y-8 print:space-y-0">
        {/* PAGE 1: 封面 */}
        <div className="print-page bg-white shadow-xl rounded-xl overflow-hidden border border-stone-200 print:border-0 print:shadow-none print:m-0">
          <CoverPage data={data} theme={theme} isPrint={true} />
        </div>

        {/* PAGE 2: 目录 */}
        <div className="print-page bg-white shadow-xl rounded-xl overflow-hidden border border-stone-200 print:border-0 print:shadow-none print:m-0">
          <TocPage data={data} theme={theme} isPrint={true} />
        </div>

        {/* PAGES 3-13: 11篇读书感想 */}
        {data.books.map((book, index) => {
          const pageNumber = index + 3;
          return (
            <div
              key={book.id}
              className="print-page bg-white shadow-xl rounded-xl overflow-hidden border border-stone-200 print:border-0 print:shadow-none print:m-0"
            >
              <ReflectionPage
                book={book}
                theme={theme}
                student={data.student}
                pageIndex={pageNumber}
                totalPages={totalPages}
                isPrint={true}
              />
            </div>
          );
        })}

        {/* PAGE 14: 封底 */}
        <div className="print-page bg-white shadow-xl rounded-xl overflow-hidden border border-stone-200 print:border-0 print:shadow-none print:m-0">
          <BackCoverPage data={data} theme={theme} isPrint={true} />
        </div>
      </div>
    </div>
  );
};

