import React from 'react';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { Camera } from 'lucide-react';

export const PhotoSyncBanner: React.FC = () => {
  const { setIsModalOpen, photos } = usePhotos();
  const { t } = useLanguage();
  const uploadedCount = Object.keys(photos).length;

  return (
    <div className="fixed bottom-5 right-5 z-40">
      <button
        onClick={() => setIsModalOpen(true)}
        className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-blue-950 text-white shadow-xl hover:bg-blue-900 border border-amber-400/50 hover:scale-105 transition-all"
        title={t("मूळ फोटो व्यवस्थापक (Manage Original Photos)", "Manage Original Photos")}
      >
        <span className="relative">
          <Camera className="w-5 h-5 text-amber-300 group-hover:rotate-12 transition-transform" />
          {uploadedCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center border-2 border-blue-950">
              ✓
            </span>
          )}
        </span>
        <span className="text-xs font-bold font-serif hidden sm:inline">
          {t('फोटो व्यवस्थापक', 'Photo Manager')}
        </span>
      </button>
    </div>
  );
};
