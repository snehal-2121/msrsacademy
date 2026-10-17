import React, { useRef, useState } from 'react';
import { Camera, Check, Upload, RefreshCw, Sparkles, SlidersHorizontal, Image as ImageIcon } from 'lucide-react';
import { usePhotos, PHOTO_SLOTS } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';

export interface EditableImageProps {
  slotId: string;
  fallbackSlotId?: string;
  defaultSrc?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  isCircle?: boolean;
  buttonPosition?: 'bottom-right' | 'top-right' | 'bottom-center' | 'top-left' | 'bottom-left';
  showEditButton?: boolean;
  clickToUpload?: boolean;
  onImageChange?: (newSrc: string) => void;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  title?: string;
  children?: React.ReactNode;
}

export const EditableImage: React.FC<EditableImageProps> = ({
  slotId,
  fallbackSlotId,
  defaultSrc = '',
  alt,
  className = '',
  imgClassName = '',
  isCircle = false,
  buttonPosition = 'bottom-right',
  showEditButton = true,
  clickToUpload = true,
  onImageChange,
  referrerPolicy = 'no-referrer',
  title,
  children,
}) => {
  const { getPhotoSrc, updatePhoto, openPhotoManagerForSlot, photos } = usePhotos();
  const { language, t } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const currentSrc = getPhotoSrc(slotId, fallbackSlotId) || defaultSrc;
  const isCustomized = !!photos[slotId];

  const slotMeta = PHOTO_SLOTS.find(s => s.id === slotId) || 
    (fallbackSlotId ? PHOTO_SLOTS.find(s => s.id === fallbackSlotId) : undefined);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUpdating(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const result = reader.result as string;
        await updatePhoto(slotId, result, file.name);
        setIsUpdating(false);
        setShowSuccessToast(true);
        if (onImageChange) onImageChange(result);
        setTimeout(() => setShowSuccessToast(false), 3500);
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUpdating(false);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getPositionClasses = () => {
    if (isCircle) {
      return 'bottom-2 right-2';
    }
    switch (buttonPosition) {
      case 'top-right':
        return 'top-2.5 right-2.5';
      case 'bottom-center':
        return 'bottom-2.5 left-1/2 -translate-x-1/2';
      case 'top-left':
        return 'top-2.5 left-2.5';
      case 'bottom-left':
        return 'bottom-2.5 left-2.5';
      case 'bottom-right':
      default:
        return 'bottom-2.5 right-2.5';
    }
  };

  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={clickToUpload ? triggerUpload : undefined}
      className={`relative group/editable select-none overflow-hidden cursor-pointer ${
        isCircle ? 'rounded-full' : ''
      } ${className}`}
      title={t(
        `फोटो बदलण्यासाठी क्लिक करा (${slotMeta?.marathiTitle || alt})`,
        `Click to change this photo (${slotMeta?.englishTitle || alt})`
      )}
    >
      {/* Hidden file input specifically for this image slot */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* The Actual Rendered Image */}
      {currentSrc ? (
        <img
          src={currentSrc}
          alt={alt}
          title={title || slotMeta?.marathiTitle || alt}
          referrerPolicy={referrerPolicy}
          className={`${isCircle ? 'rounded-full object-cover' : 'object-cover'} ${imgClassName}`}
        />
      ) : (
        <div
          className={`w-full h-full min-h-[140px] bg-slate-100 flex flex-col items-center justify-center text-slate-400 p-4 border border-dashed border-slate-300 ${
            isCircle ? 'rounded-full' : 'rounded-xl'
          } ${imgClassName}`}
        >
          <Camera className="w-6 h-6 mb-1 text-slate-400" />
          <span className="text-[11px] font-medium text-center text-slate-500">
            {language === 'mr' ? 'फोटो उपलब्ध नाही (क्लिक करून जोडा)' : 'No Photo (Click to Upload)'}
          </span>
        </div>
      )}

      {/* Optional Children overlay (e.g. banners, badges, text) */}
      {children}

      {/* Hover Dimming & Click Indicator Overlay */}
      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover/editable:opacity-100 transition-opacity duration-200 pointer-events-none flex items-center justify-center">
        <div className="bg-slate-950/90 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xl border border-white/25 transform scale-95 group-hover/editable:scale-100 transition-transform">
          <Camera className="w-3.5 h-3.5 text-amber-300" />
          <span>{t('फोटो बदला', 'Change Photo')}</span>
        </div>
      </div>

      {/* Floating Action Badge / Camera Trigger on Hover & Tap */}
      {showEditButton && (
        <div
          className={`absolute ${getPositionClasses()} z-30 flex items-center gap-1.5 opacity-90 sm:opacity-0 group-hover/editable:opacity-100 transition-all duration-200 pointer-events-auto`}
        >
          {/* Main Direct File Picker Button */}
          <button
            type="button"
            onClick={triggerUpload}
            disabled={isUpdating}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-3 sm:py-1.5 rounded-full text-white shadow-xl backdrop-blur-md transition-all active:scale-95 cursor-pointer border border-white/40 text-[11px] font-bold ${
              isCircle
                ? 'bg-slate-900/90 hover:bg-blue-900'
                : 'bg-slate-900/85 hover:bg-blue-900'
            }`}
            title={t(
              `हा फोटो बदला (${slotMeta?.marathiTitle || alt})`,
              `Change this photo (${slotMeta?.englishTitle || alt})`
            )}
          >
            {isUpdating ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-300" />
            ) : showSuccessToast ? (
              <Check className="w-3.5 h-3.5 text-emerald-400" />
            ) : (
              <Camera className="w-3.5 h-3.5 text-amber-300" />
            )}
            <span className="hidden sm:inline">
              {isUpdating
                ? t('अपडेट होत आहे...', 'Updating...')
                : showSuccessToast
                ? t('बदलले!', 'Changed!')
                : t('फोटो बदला', 'Change Photo')}
            </span>
          </button>

          {/* Quick Open Manager Button for Full View */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              openPhotoManagerForSlot(slotId);
            }}
            className="w-7 h-7 rounded-full bg-black/75 hover:bg-slate-900 text-white flex items-center justify-center shadow-lg border border-white/30 backdrop-blur-md transition-transform hover:scale-105 cursor-pointer"
            title={t('सर्व फोटो व्यवस्थापक उघडा', 'Open Photos Manager')}
          >
            <SlidersHorizontal className="w-3 h-3 text-slate-200" />
          </button>
        </div>
      )}

      {/* Floating Success Indicator Toast */}
      {showSuccessToast && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-40 bg-emerald-600 text-white px-3 py-1 rounded-full text-[11px] font-bold shadow-lg flex items-center gap-1.5 animate-in fade-in slide-in-from-top-1 whitespace-nowrap pointer-events-none">
          <Check className="w-3.5 h-3.5" />
          <span>{t('फोटो अपडेट झाला!', 'Photo Updated Successfully!')}</span>
        </div>
      )}
    </div>
  );
};
