/**
 * Utility functions for printing and exporting the booklet
 */

export function triggerDirectPrint() {
  try {
    window.focus();
    window.print();
  } catch (err) {
    console.error('Direct print failed, attempting alternative print method:', err);
  }
}

/**
 * Creates an isolated printable HTML document and opens it in a new tab or triggers print
 */
export function openPrintWindow(containerElement: HTMLElement, title: string = '假期读书感想集') {
  if (!containerElement) return;

  // Collect all styles from the current document
  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((el) => el.outerHTML)
    .join('\n');

  const contentHtml = containerElement.innerHTML;

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;500;600;700;900&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
  ${styles}
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      background: #ffffff !important;
      color: #1a1a1a !important;
      margin: 0 !important;
      padding: 0 !important;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      width: 210mm !important;
    }
    .no-print {
      display: none !important;
    }
    .print-page {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: always !important;
      break-after: page !important;
      width: 210mm !important;
      height: 297mm !important;
      max-height: 297mm !important;
      min-height: 297mm !important;
      margin: 0 !important;
      padding: 0 !important;
      background-color: #ffffff !important;
      box-shadow: none !important;
      border: none !important;
      overflow: hidden !important;
      box-sizing: border-box !important;
    }
    .print-page:last-child {
      page-break-after: avoid !important;
      break-after: avoid !important;
    }
    @media print {
      .print-page {
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
      }
    }
  </style>
</head>
<body class="bg-white">
  <div class="print-container w-full max-w-[210mm] mx-auto">
    ${contentHtml}
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() {
        window.focus();
        window.print();
      }, 500);
    };
  </script>
</body>
</html>`;

  // Create a Blob URL and open it
  try {
    const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const printWin = window.open(url, '_blank');
    if (!printWin) {
      // If popup blocked, download as standalone HTML or fallback
      triggerDirectPrint();
    }
  } catch (e) {
    console.warn('Popup window blocked or error:', e);
    triggerDirectPrint();
  }
}

/**
 * Downloads a standalone, self-contained HTML file that user can open anywhere and print to PDF
 */
export function downloadStandaloneHtml(containerElement: HTMLElement, studentName: string = '学生') {
  if (!containerElement) return;

  const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
    .map((el) => el.outerHTML)
    .join('\n');

  const contentHtml = containerElement.innerHTML;
  const fileName = `假期读书感想集-${studentName || '亲子悦读'}.html`;

  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>假期读书感想集 - ${studentName}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=Noto+Serif+SC:wght@400;500;600;700;900&family=ZCOOL+XiaoWei&display=swap" rel="stylesheet">
  ${styles}
  <style>
    @page {
      size: A4 portrait;
      margin: 0;
    }
    html, body {
      background: #f5f5f4;
      color: #1a1a1a;
      margin: 0;
      padding: 0;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    .print-banner {
      max-width: 210mm;
      margin: 20px auto;
      padding: 16px 20px;
      background: #fef3c7;
      border: 1px solid #fde68a;
      border-radius: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 4px rgba(0,0,0,0.05);
      font-family: 'Noto Serif SC', serif;
    }
    .print-btn {
      background: #b45309;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 8px;
      font-weight: bold;
      cursor: pointer;
      font-size: 14px;
    }
    .print-btn:hover {
      background: #92400e;
    }
    .print-page {
      page-break-inside: avoid !important;
      break-inside: avoid !important;
      page-break-after: always;
      break-after: page;
      width: 210mm;
      height: 297mm;
      max-height: 297mm;
      min-height: 297mm;
      margin: 0 auto 30px auto;
      padding: 0;
      background-color: #ffffff;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      border-radius: 8px;
      box-sizing: border-box;
      overflow: hidden;
    }
    @media print {
      body {
        background: #ffffff !important;
        padding: 0 !important;
      }
      .no-print, .print-banner {
        display: none !important;
      }
      .print-page {
        box-shadow: none !important;
        border: none !important;
        border-radius: 0 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 210mm !important;
        height: 297mm !important;
        max-height: 297mm !important;
        min-height: 297mm !important;
      }
      .print-page:last-child {
        page-break-after: avoid !important;
        break-after: avoid !important;
      }
    }
  </style>
</head>
<body>
  <div class="print-banner no-print">
    <div>
      <div style="font-weight: bold; font-size: 16px; color: #78350f;">📖 假期读书感想集 · A4 独立打印册</div>
      <div style="font-size: 13px; color: #92400e; margin-top: 4px;">点击右侧按钮或直接按键盘「Ctrl + P / Cmd + P」调起打印，选择「另存为 PDF」</div>
    </div>
    <button class="print-btn" onclick="window.print()">🖨️ 立即打印 / 另存为 PDF</button>
  </div>
  <div class="print-container">
    ${contentHtml}
  </div>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
