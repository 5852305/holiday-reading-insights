import React, { useState, useEffect } from 'react';
import { BookletData, ThemeType, ViewMode } from './types';
import { INITIAL_BOOKLET_DATA, THEMES } from './data/defaultData';
import { Navbar } from './components/Navbar';
import { BookletViewer } from './components/BookletViewer';
import { GalleryView } from './components/GalleryView';
import { PrintView } from './components/PrintView';
import { EditModal } from './components/EditModal';
import { PhotoUploader } from './components/PhotoUploader';

const STORAGE_KEY = 'holiday_reading_reflections_v1';

export default function App() {
  const [data, setData] = useState<BookletData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return INITIAL_BOOKLET_DATA;
      }
    }
    return INITIAL_BOOKLET_DATA;
  });

  const [themeId, setThemeId] = useState<ThemeType>((data.themeId as ThemeType) || 'warm-ivory');
  const [viewMode, setViewMode] = useState<ViewMode>('flip');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState<boolean>(false);

  const currentTheme = THEMES[themeId] || THEMES['warm-ivory'];

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...data, themeId }));
  }, [data, themeId]);

  const handleUpdateData = (updatedData: BookletData) => {
    setData(updatedData);
  };

  const handleSavePhoto = (photoUrl: string) => {
    setData((prev) => ({
      ...prev,
      student: {
        ...prev.student,
        photoUrl,
      },
    }));
  };

  const handleResetData = () => {
    if (window.confirm('确定要重置为默认的《假期读书感想集》数据吗？已编辑的个性化信息将被还原。')) {
      setData(INITIAL_BOOKLET_DATA);
      setThemeId('warm-ivory');
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleSelectPageInGallery = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setViewMode('flip');
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans selection:bg-amber-200">
      {/* Top Navigation Bar */}
      <Navbar
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        currentTheme={currentTheme}
        onThemeChange={(newTheme) => setThemeId(newTheme)}
        onOpenEditModal={() => setIsEditModalOpen(true)}
        onOpenPhotoModal={() => setIsPhotoModalOpen(true)}
        onResetData={handleResetData}
      />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center justify-start">
        {viewMode === 'flip' && (
          <BookletViewer
            data={data}
            theme={currentTheme}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onEditClick={() => setIsEditModalOpen(true)}
            onPhotoUploadClick={() => setIsPhotoModalOpen(true)}
          />
        )}

        {viewMode === 'gallery' && (
          <GalleryView
            data={data}
            theme={currentTheme}
            onSelectPage={handleSelectPageInGallery}
            onEditClick={() => setIsEditModalOpen(true)}
            onPhotoUploadClick={() => setIsPhotoModalOpen(true)}
          />
        )}

        {viewMode === 'print' && (
          <PrintView
            data={data}
            theme={currentTheme}
            onOpenPhotoUploader={() => setIsPhotoModalOpen(true)}
          />
        )}
      </main>

      {/* Modals */}
      {isEditModalOpen && (
        <EditModal
          data={data}
          onSave={handleUpdateData}
          onClose={() => setIsEditModalOpen(false)}
          onOpenPhotoUploader={() => setIsPhotoModalOpen(true)}
        />
      )}

      {isPhotoModalOpen && (
        <PhotoUploader
          currentPhoto={data.student.photoUrl}
          onSavePhoto={handleSavePhoto}
          onClose={() => setIsPhotoModalOpen(false)}
        />
      )}
    </div>
  );
}
