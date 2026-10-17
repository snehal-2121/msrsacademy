import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Check,
  RotateCcw,
  Sparkles,
  Camera,
  Image as ImageIcon,
  CheckCircle2,
  Crown,
  Heart,
  ChevronRight,
  Eye,
  Sliders,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { usePhotos } from '../context/PhotoContext';
import {
  AMBEDKAR_CIRCLE_PRESETS,
  MAHARAJ_CIRCLE_PRESETS,
  CirclePreset,
} from '../data/circleImagePresets';

interface CircleImageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCircle?: 'left' | 'right'; // left = Ambedkar, right = Maharaj
}

export const CircleImageSelectorModal: React.FC<CircleImageSelectorModalProps> = ({
  isOpen,
  onClose,
  initialCircle = 'left',
}) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc, updatePhoto, resetPhoto, photos } = usePhotos();

  const [activeCircle, setActiveCircle] = useState<'left' | 'right'>(initialCircle);
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Custom upload state
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customFilePreview, setCustomFilePreview] = useState<string | null>(null);
  const [customFileName, setCustomFileName] = useState<string>('');
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customQuote, setCustomQuote] = useState<string>('');

  useEffect(() => {
    setActiveCircle(initialCircle);
  }, [initialCircle]);

  if (!isOpen) return null;

  const slotId = activeCircle === 'left' ? 'dr_ambedkar_hero' : 'taporatna_swamiji_hero';
  const currentPhotoSrc = getPhotoSrc(slotId);
  const presets = activeCircle === 'left' ? AMBEDKAR_CIRCLE_PRESETS : MAHARAJ_CIRCLE_PRESETS;

  // Check which preset is currently active (if any)
  const activePresetId = localStorage.getItem(`circle_preset_${slotId}`) || '';

  // Helper to convert an image URL (such as imported asset) to base64 DataURL for persistent storage
  const urlToDataUrl = async (url: string): Promise<string> => {
    if (url.startsWith('data:image')) return url;
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 600;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/jpeg', 0.92));
        } else {
          resolve(url);
        }
      };
      img.onerror = () => resolve(url);
      img.src = url;
    });
  };

  const handleSelectPreset = async (preset: CirclePreset) => {
    setIsProcessing(true);
    try {
      const dataUrl = await urlToDataUrl(preset.imageSrc);
      await updatePhoto(slotId, dataUrl, preset.id);

      // Save metadata for dynamic hero banner display
      localStorage.setItem(`circle_preset_${slotId}`, preset.id);
      localStorage.setItem(`circle_title_mr_${slotId}`, preset.nameMr);
      localStorage.setItem(`circle_title_en_${slotId}`, preset.nameEn);
      localStorage.setItem(`circle_quote_mr_${slotId}`, preset.quoteMr);
      localStorage.setItem(`circle_quote_en_${slotId}`, preset.quoteEn);
      localStorage.setItem(`circle_badge_mr_${slotId}`, preset.badgeMr);
      localStorage.setItem(`circle_badge_en_${slotId}`, preset.badgeEn);
      localStorage.setItem(`circle_personality_${slotId}`, preset.personality);

      // Dispatch custom event so HeroBanner updates synchronously
      window.dispatchEvent(new Event('circle_photo_changed'));

      setStatusMessage(
        language === 'mr'
          ? `'${preset.nameMr}' चा फोटो तात्काळ होमपेजवर लागू झाला!`
          : `'${preset.nameEn}' image applied to homepage circle!`
      );
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage('Error updating photo');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCustomFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setCustomFileName(file.name);

    const reader = new FileReader();
    reader.onload = () => {
      setCustomFilePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleApplyCustomPhoto = async () => {
    if (!customFilePreview) return;
    setIsProcessing(true);
    try {
      await updatePhoto(slotId, customFilePreview, customFileName);

      // Save custom labels if provided
      localStorage.setItem(`circle_preset_${slotId}`, 'custom_user_image');
      if (customTitle.trim()) {
        localStorage.setItem(`circle_title_mr_${slotId}`, customTitle.trim());
        localStorage.setItem(`circle_title_en_${slotId}`, customTitle.trim());
      } else {
        localStorage.removeItem(`circle_title_mr_${slotId}`);
        localStorage.removeItem(`circle_title_en_${slotId}`);
      }

      if (customQuote.trim()) {
        localStorage.setItem(`circle_quote_mr_${slotId}`, `"${customQuote.trim()}"`);
        localStorage.setItem(`circle_quote_en_${slotId}`, `"${customQuote.trim()}"`);
      } else {
        localStorage.removeItem(`circle_quote_mr_${slotId}`);
        localStorage.removeItem(`circle_quote_en_${slotId}`);
      }

      localStorage.setItem(`circle_personality_${slotId}`, 'custom');
      window.dispatchEvent(new Event('circle_photo_changed'));

      setStatusMessage(
        language === 'mr'
          ? 'आपला सानुकूल फोटो होमपेजवर यशस्वीरित्या जतन व लागू झाला!'
          : 'Your custom photo has been saved & applied successfully!'
      );
      setCustomFilePreview(null);
      setCustomFileName('');
      setTimeout(() => setStatusMessage(null), 4000);
    } catch {
      setStatusMessage('Error saving custom photo');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetToDefault = async () => {
    setIsProcessing(true);
    try {
      await resetPhoto(slotId);
      localStorage.removeItem(`circle_preset_${slotId}`);
      localStorage.removeItem(`circle_title_mr_${slotId}`);
      localStorage.removeItem(`circle_title_en_${slotId}`);
      localStorage.removeItem(`circle_quote_mr_${slotId}`);
      localStorage.removeItem(`circle_quote_en_${slotId}`);
      localStorage.removeItem(`circle_badge_mr_${slotId}`);
      localStorage.removeItem(`circle_badge_en_${slotId}`);
      localStorage.removeItem(`circle_personality_${slotId}`);
      window.dispatchEvent(new Event('circle_photo_changed'));

      setStatusMessage(
        language === 'mr'
          ? 'होमपेज वर्तुळ फोटो मूळ डिफॉल्ट स्थितीत पूर्ववत करण्यात आला.'
          : 'Homepage circle photo restored to default.'
      );
      setTimeout(() => setStatusMessage(null), 3500);
    } catch {
      // ignore
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border-2 border-amber-400/40 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#061226] via-[#0b1f44] to-[#071530] text-white flex items-center justify-between shrink-0 border-b border-amber-400/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-lg font-black shrink-0">
              <Camera className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {t('होमपेज हेरो वर्तुळ फोटो', 'Homepage Circle Photos')}
                </span>
              </div>
              <h3 className="text-base sm:text-xl font-bold font-serif text-white flex items-center gap-2">
                <span>{t('फोटो बदला व सानुकूल करा (Change & Select Photo)', 'Change & Customize Photo')}</span>
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Circle Switcher: Left (Dr. Ambedkar) vs Right (Maharaj) */}
        <div className="p-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
              {t('कोणते वर्तुळ बदलायचे आहे?:', 'Choose Circle:')}
            </span>
            <div className="inline-flex rounded-xl bg-slate-950 p-1 border border-slate-700 w-full sm:w-auto">
              <button
                onClick={() => setActiveCircle('left')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeCircle === 'left'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-blue-400 shrink-0" />
                <span>{t('डावे वर्तुळ: डॉ. बाबासाहेब आंबेडकर', 'Left Circle: Dr. Ambedkar')}</span>
              </button>

              <button
                onClick={() => setActiveCircle('right')}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeCircle === 'right'
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shrink-0" />
                <span>{t('उजवे वर्तुळ: महाराज / तपोरत्न', 'Right Circle: Maharaj')}</span>
              </button>
            </div>
          </div>

          {/* Action Mode Tabs: Presets vs Custom Upload */}
          <div className="inline-flex rounded-xl bg-slate-800 p-1 border border-slate-700 w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('presets')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'presets'
                  ? 'bg-white text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>{t('क्लासिक व जुने पर्याय निवडा', 'Choose from Presets')}</span>
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'custom'
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>{t('माझा नवीन फोटो जोडा', 'Add Custom Image')}</span>
            </button>
          </div>
        </div>

        {/* Live Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2 shrink-0 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 bg-slate-50 space-y-6">

          {/* TAB 1: PRESET SELECTIONS */}
          {activeTab === 'presets' && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 font-serif flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>
                      {activeCircle === 'left'
                        ? t(
                            'डॉ. बाबासाहेब आंबेडकर - क्लासिक व उपलब्ध फोटो पर्याय',
                            'Dr. Babasaheb Ambedkar - Available Classic Portraits'
                          )
                        : t(
                            'छत्रपती शिवाजी महाराज व तपोरत्न महास्वामीजी - उपलब्ध पर्याय',
                            'Chhatrapati Shivaji Maharaj & Taporatna Swamiji - Presets'
                          )}
                    </span>
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {t(
                      'खालीलपैकी कोणत्याही फोटोवर क्लिक करा; तो तात्काळ मुख्य होमपेजच्या वर्तुळात सक्रिय होईल.',
                      'Click on any preset below to instantly activate it in the homepage circle.'
                    )}
                  </p>
                </div>

                {photos[slotId] && (
                  <button
                    onClick={handleResetToDefault}
                    disabled={isProcessing}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white hover:bg-rose-50 hover:text-rose-700 hover:border-rose-200 transition-colors cursor-pointer self-start sm:self-center"
                    title={t('मूळ डिफॉल्ट फोटोवर परत या', 'Reset to Default')}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t('मूळ डिफॉल्ट करा', 'Reset to Default')}</span>
                  </button>
                )}
              </div>

              {/* Grid of Presets */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {presets.map((preset) => {
                  const isCurrent =
                    activePresetId === preset.id ||
                    (!activePresetId &&
                      preset.id ===
                        (activeCircle === 'left' ? 'ambedkar_default_hero' : 'swamiji_default_hero'));

                  return (
                    <div
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex gap-4 items-center group ${
                        isCurrent
                          ? activeCircle === 'left'
                            ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500/20 shadow-md'
                            : 'border-amber-600 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-md'
                          : 'border-slate-200 bg-white hover:border-slate-400 hover:shadow-md'
                      }`}
                    >
                      {/* Circular Thumbnail */}
                      <div
                        className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 border-3 shadow-md ${
                          preset.personality === 'maharaj_shivaji'
                            ? 'border-amber-500 ring-2 ring-amber-300'
                            : preset.personality === 'ambedkar'
                            ? 'border-blue-600 ring-2 ring-blue-300'
                            : 'border-amber-400 ring-2 ring-amber-200'
                        }`}
                      >
                        <img
                          src={preset.imageSrc}
                          alt={preset.nameMr}
                          className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        />
                        {isCurrent && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Check className="w-6 h-6 text-emerald-400 stroke-[3]" />
                          </div>
                        )}
                      </div>

                      {/* Content Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span
                            className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                              preset.personality === 'maharaj_shivaji'
                                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                : preset.personality === 'ambedkar'
                                ? 'bg-blue-100 text-blue-900 border border-blue-300'
                                : 'bg-amber-100 text-amber-900 border border-amber-200'
                            }`}
                          >
                            {language === 'mr' ? preset.badgeMr : preset.badgeEn}
                          </span>

                          {isCurrent && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-300">
                              <Check className="w-3 h-3 text-emerald-600" />
                              {t('सक्रिय आहे', 'Active')}
                            </span>
                          )}
                        </div>

                        <h5 className="text-sm font-bold text-slate-900 font-serif leading-tight">
                          {language === 'mr' ? preset.nameMr : preset.nameEn}
                        </h5>

                        <p className="text-[11px] text-slate-600 line-clamp-1 italic font-serif">
                          {language === 'mr' ? preset.quoteMr : preset.quoteEn}
                        </p>

                        <p className="text-[10px] text-slate-400 line-clamp-1">
                          {language === 'mr' ? preset.descriptionMr : preset.descriptionEn}
                        </p>

                        <div className="pt-1.5 flex items-center justify-end">
                          <span
                            className={`inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-lg transition-all ${
                              isCurrent
                                ? 'bg-emerald-600 text-white'
                                : 'bg-slate-900 text-white group-hover:bg-amber-600'
                            }`}
                          >
                            {isCurrent
                              ? t('सध्या निवडलेले', 'Currently Selected')
                              : t('हा फोटो निवडा', 'Select This Photo')}
                            <ChevronRight className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 2: CUSTOM USER UPLOAD */}
          {activeTab === 'custom' && (
            <div className="space-y-5 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h4 className="text-base font-bold text-slate-900 font-serif">
                  {t(
                    'आपल्या डिव्हाइसवरून सानुकूल फोटो अपलोड करा',
                    'Upload Your Custom Photo from Device'
                  )}
                </h4>
                <p className="text-xs text-slate-500">
                  {t(
                    'आपण आपल्या कॉम्प्युटर किंवा मोबाईल गॅलरीमधील कोणताही फोटो येथे थेट अपलोड करू शकता.',
                    'Upload any custom photo from your computer or phone anytime. It is permanently saved.'
                  )}
                </p>
              </div>

              {/* Hidden file picker input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleCustomFileSelect}
              />

              {/* Upload Dropzone */}
              {!customFilePreview ? (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 hover:border-amber-500 rounded-3xl p-8 sm:p-12 text-center bg-white hover:bg-amber-50/20 transition-all cursor-pointer group space-y-3"
                >
                  <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Upload className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">
                      {t('फोटो निवडण्यासाठी येथे क्लिक करा', 'Click here to choose an image')}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      PNG, JPG, WEBP, JPEG (High Resolution Recommended)
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    {t('फाईल निवडा (Choose File)', 'Browse from Device')}
                  </button>
                </div>
              ) : (
                /* Live Preview & Options */
                <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-md space-y-5">
                  <div className="text-center">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300">
                      {t('फोटो निवडला गेला आहे · पूर्वदृश्य', 'Photo Selected · Live Circle Preview')}
                    </span>
                  </div>

                  {/* Circle Live Preview */}
                  <div className="flex flex-col items-center justify-center">
                    <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-amber-400 bg-slate-100 mx-auto">
                      <img
                        src={customFilePreview}
                        alt="Preview"
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-2 truncate max-w-xs">
                      {customFileName}
                    </p>
                  </div>

                  {/* Optional Custom Labels */}
                  <div className="space-y-3 pt-2 border-t border-slate-100">
                    <div className="text-xs font-bold text-slate-700">
                      {t('शीर्षक व ब्रीदवाक्य (ऐच्छिक):', 'Title & Quote (Optional):')}
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        {t('नाव / शीर्षक', 'Name / Title')}
                      </label>
                      <input
                        type="text"
                        value={customTitle}
                        onChange={(e) => setCustomTitle(e.target.value)}
                        placeholder={
                          activeCircle === 'left'
                            ? 'उदा. भारतरत्न डॉ. बाबासाहेब आंबेडकर'
                            : 'उदा. छत्रपती शिवाजी महाराज / तपोरत्न महास्वामीजी'
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                        {t('प्रेरणादायी ब्रीदवाक्य', 'Inspirational Quote')}
                      </label>
                      <input
                        type="text"
                        value={customQuote}
                        onChange={(e) => setCustomQuote(e.target.value)}
                        placeholder={
                          activeCircle === 'left'
                            ? 'उदा. "शिका, संघटित व्हा आणि संघर्ष करा"'
                            : 'उदा. "प्रौढ प्रताप पुरंदर, क्षत्रिय कुलावतंस..."'
                        }
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-3">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomFilePreview(null);
                        setCustomFileName('');
                      }}
                      className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 transition-colors cursor-pointer"
                    >
                      {t('रद्द करा / दुसरा निवडा', 'Cancel / Change')}
                    </button>
                    <button
                      type="button"
                      disabled={isProcessing}
                      onClick={handleApplyCustomPhoto}
                      className="px-6 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
                    >
                      <Check className="w-4 h-4" />
                      <span>{t('हा फोटो जतन करा व लागू करा', 'Save & Apply Custom Photo')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2 text-slate-600 text-center sm:text-left">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {t(
                'येथे निवडलेला फोटो आपोआप कायमस्वरूपी सेव्ह होतो व होमपेजवर लगेच दिसतो.',
                'Your chosen photo is permanently saved and immediately displayed on the homepage.'
              )}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
          >
            {t('पूर्ण झाले (Done)', 'Done')}
          </button>
        </div>

      </div>
    </div>
  );
};
