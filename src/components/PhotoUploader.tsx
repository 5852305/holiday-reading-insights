import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, X, Check, RefreshCw } from 'lucide-react';

interface PhotoUploaderProps {
  currentPhoto: string;
  onSavePhoto: (photoUrl: string) => void;
  onClose: () => void;
}

const PRESET_PHOTOS = [
  {
    name: '女孩读书 1',
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '男孩专注阅读',
    url: 'https://images.unsplash.com/photo-1485546246426-74dc88dec4d9?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '小女孩阅览',
    url: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '阳光少年',
    url: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
  },
  {
    name: '书桌阅读',
    url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=600&q=80',
  },
];

export const PhotoUploader: React.FC<PhotoUploaderProps> = ({
  currentPhoto,
  onSavePhoto,
  onClose,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string>(currentPhoto);
  const [customUrl, setCustomUrl] = useState<string>('');
  const [dragActive, setDragActive] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('请选择有效的图片文件 (JPG, PNG, WebP)');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setSelectedPhoto(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-stone-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100 bg-stone-50">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-stone-800 font-serif-sc text-base">
              上传或更换学生照片（封面）
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-lg hover:bg-stone-200 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Current Preview */}
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="relative w-36 h-44 rounded-xl overflow-hidden shadow-md border-2 border-stone-300 bg-stone-50 flex flex-col items-center justify-center">
              {selectedPhoto ? (
                <>
                  <img
                    src={selectedPhoto}
                    alt="照片预览"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setSelectedPhoto('')}
                    className="absolute top-1.5 right-1.5 p-1 bg-black/60 hover:bg-red-600 text-white rounded-full text-xs cursor-pointer transition-colors shadow-xs"
                    title="清除照片，恢复留白框"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full p-3 border-2 border-dashed border-stone-300 rounded-lg flex flex-col items-center justify-center text-center">
                  <Camera className="w-8 h-8 text-stone-400 mb-2 stroke-1" />
                  <span className="text-sm font-serif-sc font-bold text-stone-600 tracking-wider">
                    贴孩子照片
                  </span>
                  <span className="text-[10px] text-stone-400 mt-1">（当前为留白框）</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-stone-500 font-serif-sc">
                {selectedPhoto ? '已选择照片' : '当前状态：留空（仅显示贴照片框）'}
              </span>
              {selectedPhoto && (
                <button
                  type="button"
                  onClick={() => setSelectedPhoto('')}
                  className="text-xs text-amber-700 hover:text-red-600 font-medium underline cursor-pointer"
                >
                  设为留空框
                </button>
              )}
            </div>
          </div>

          {/* Upload Drop Area */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1.5 font-serif-sc">
              方式一：上传本地照片 (支持拖拽 / 点击选择)
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`p-5 rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                dragActive
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-stone-300 hover:border-amber-400 hover:bg-stone-50'
              }`}
            >
              <Upload className="w-8 h-8 text-amber-600 mb-2 stroke-1" />
              <p className="text-xs font-semibold text-stone-700">
                点击上传手机/电脑里的孩子照片
              </p>
              <p className="text-[11px] text-stone-400 mt-0.5">
                支持 JPG, PNG, WebP 格式，打印效果更清晰
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />
            </div>
          </div>

          {/* Preset Photos Selection */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-2 font-serif-sc">
              方式二：选择精选预设照片
            </label>
            <div className="grid grid-cols-5 gap-2">
              {PRESET_PHOTOS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(item.url)}
                  className={`group relative rounded-lg overflow-hidden aspect-3/4 border-2 transition-all cursor-pointer ${
                    selectedPhoto === item.url
                      ? 'border-amber-600 ring-2 ring-amber-400'
                      : 'border-stone-200 hover:border-amber-300 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                  {selectedPhoto === item.url && (
                    <div className="absolute inset-0 bg-amber-600/30 flex items-center justify-center">
                      <Check className="w-4 h-4 text-white drop-shadow-md" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Network Image URL */}
          <div>
            <label className="block text-xs font-bold text-stone-700 mb-1 font-serif-sc">
              方式三：输入网络图片链接
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
              <button
                type="button"
                onClick={() => {
                  if (customUrl.trim()) {
                    setSelectedPhoto(customUrl.trim());
                  }
                }}
                className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium cursor-pointer"
              >
                应用链接
              </button>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-stone-100 bg-stone-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-stone-600 hover:bg-stone-200 rounded-xl cursor-pointer"
          >
            取消
          </button>
          <button
            type="button"
            onClick={() => {
              onSavePhoto(selectedPhoto);
              onClose();
            }}
            className="px-5 py-2 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>保存并使用此照片</span>
          </button>
        </div>
      </div>
    </div>
  );
};
