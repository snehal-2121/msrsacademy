import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { GallerySection } from '../components/GallerySection';

interface GalleryPageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onNavigate }) => {
  const { language, t } = useLanguage();
  return (
    <div className="min-h-screen bg-slate-50/60 pb-12">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('← मुख्य पानावर परत', '← Back to Home')}</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            <span>{t('मुख्य पान', 'Home')}</span> <span className="mx-1">/</span>{' '}
            <span className="text-slate-900 font-bold">{t('छायाचित्रे दालन', 'Gallery')}</span>
          </div>
        </div>
      </div>

      {/* Sliding Images Gallery Section */}
      <GallerySection />
    </div>
  );
};
