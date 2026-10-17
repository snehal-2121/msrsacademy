import React, { useRef, useState, useEffect } from 'react';
import { usePhotos, PHOTO_SLOTS, PhotoSlot, PhotoScope } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { CircleImageSelectorModal } from './CircleImageSelectorModal';
import {
  X,
  Upload,
  Check,
  Image as ImageIcon,
  Sparkles,
  RefreshCw,
  Eye,
  CheckCircle2,
  ShieldCheck,
  Search,
  RotateCcw,
  Layers,
  CircleDot,
  Compass,
  FileCheck2,
} from 'lucide-react';

export const PhotoManagerModal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    getPhotoSrc,
    updatePhoto,
    resetPhoto,
    bulkImportFiles,
    photos,
    activeSlotForEdit,
    setActiveSlotForEdit,
  } = usePhotos();

  const { language, t } = useLanguage();
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const singleInputRef = useRef<HTMLInputElement>(null);
  const [selectedSlot, setSelectedSlot] = useState<PhotoSlot | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);
  const [activeScopeTab, setActiveScopeTab] = useState<PhotoScope>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [circleModalOpen, setCircleModalOpen] = useState(false);
  const [selectedCircleModal, setSelectedCircleModal] = useState<'left' | 'right'>('left');

  // If opened specifically for a slot, switch to its scope and select it
  useEffect(() => {
    if (activeSlotForEdit) {
      setSelectedSlot(activeSlotForEdit);
      setActiveScopeTab(activeSlotForEdit.scope || 'all');
      setTimeout(() => {
        const el = document.getElementById(`slot-card-${activeSlotForEdit.id}`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 150);
    }
  }, [activeSlotForEdit]);

  if (!isModalOpen) return null;

  const handleBulkChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setStatusMessage('फोटो लोड होत आहेत...');
    const result = await bulkImportFiles(e.target.files);
    setStatusMessage(`यशस्वी! ${result.matched} फोटो योग्य त्या ठिकाणी थेट अपडेट झाले आहेत.`);
    setTimeout(() => setStatusMessage(null), 5000);
    if (bulkInputRef.current) bulkInputRef.current.value = '';
  };

  const handleSingleSlotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedSlot) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      await updatePhoto(selectedSlot.id, reader.result as string, file.name);
      setStatusMessage(`'${selectedSlot.marathiTitle}' साठी फोटो तात्काळ अपडेट झाला.`);
      setTimeout(() => setStatusMessage(null), 4000);
      setSelectedSlot(null);
      if (setActiveSlotForEdit) setActiveSlotForEdit(null);
    };
    reader.readAsDataURL(file);
    if (singleInputRef.current) singleInputRef.current.value = '';
  };

  const handleResetSlot = async (slotId: string, title: string) => {
    await resetPhoto(slotId);
    setStatusMessage(`'${title}' चा फोटो मूळ स्थितीत पूर्ववत करण्यात आला.`);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  // Filter slots based on active tab and search query
  const filteredSlots = PHOTO_SLOTS.filter((slot) => {
    if (activeScopeTab !== 'all' && slot.scope !== activeScopeTab) {
      return false;
    }
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      slot.marathiTitle.toLowerCase().includes(q) ||
      slot.englishTitle.toLowerCase().includes(q) ||
      slot.destinationDesc.toLowerCase().includes(q) ||
      (slot.pagePath && slot.pagePath.toLowerCase().includes(q)) ||
      slot.recommendedWhatsAppFile.toLowerCase().includes(q)
    );
  });

  const customizedCount = Object.keys(photos).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[94vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white flex items-center justify-between shrink-0">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-400/20 text-amber-300">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h2 className="text-base sm:text-lg font-bold font-serif">
                {t('वेबसाईट फोटो व्यवस्थापक (Website Photos Manager)', 'Website Photos Manager')}
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              {t(
                'होमपेज वर्तुळाकार पोर्ट्रेट्स, मुख्य विभाग किंवा स्वतंत्र पानांचे फोटो कधीही एका क्लिकवर बदला.',
                'Easily customize every image anytime — homepage circle portraits, sections, and dedicated pages.'
              )}
            </p>
          </div>
          <button
            onClick={() => {
              setIsModalOpen(false);
              if (setActiveSlotForEdit) setActiveSlotForEdit(null);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action & Filter Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-b border-slate-200 shrink-0 space-y-3">
          
          {/* Top Row: Search + Bulk Upload + Custom Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('फोटो किंवा पान शोधा...', 'Search photos or pages...')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
              <span className="text-[11px] font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
                {t(
                  `एकूण ${PHOTO_SLOTS.length} पैकी ${customizedCount} सानुकूल फोटो सक्रिय`,
                  `${customizedCount} of ${PHOTO_SLOTS.length} photos active`
                )}
              </span>

              {/* Hidden file inputs */}
              <input
                ref={bulkInputRef}
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={handleBulkChange}
              />
              <input
                ref={singleInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleSingleSlotChange}
              />

              <button
                onClick={() => bulkInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs shadow-xs transition-all active:scale-95 cursor-pointer whitespace-nowrap"
                title="सर्व मूळ फोटो एकाच वेळी अपलोड करा"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>{t('सर्व फोटो एकत्र निवडा', 'Bulk Upload Photos')}</span>
              </button>
            </div>
          </div>

          {/* Scope Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 no-scrollbar text-xs">
            <button
              onClick={() => setActiveScopeTab('all')}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeScopeTab === 'all'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {t('सर्व फोटो', 'All Photos')} ({PHOTO_SLOTS.length})
            </button>

            <button
              onClick={() => setActiveScopeTab('home_circles')}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeScopeTab === 'home_circles'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-white text-amber-900 hover:bg-amber-100 border border-amber-300'
              }`}
            >
              <CircleDot className="w-3 h-3" />
              <span>{t('होमपेज वर्तुळ पोर्ट्रेट्स (Circle Photos)', 'Homepage Circles')}</span>
            </button>

            <button
              onClick={() => setActiveScopeTab('home_sections')}
              className={`px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeScopeTab === 'home_sections'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              {t('होमपेज विभाग कार्डे', 'Homepage Sections')}
            </button>

            <button
              onClick={() => setActiveScopeTab('core_pages')}
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-lg font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                activeScopeTab === 'core_pages'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'bg-white text-emerald-900 hover:bg-emerald-50 border border-emerald-300'
              }`}
            >
              <Layers className="w-3 h-3" />
              <span>{t('मुख्य विभाग स्वतंत्र पाने (Core Pages)', 'Core Section Pages')}</span>
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Slots Grid */}
        <div className="p-3 sm:p-5 overflow-y-auto flex-1 space-y-3 bg-slate-100/60">
          {filteredSlots.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-2">
              <ImageIcon className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs">{t('कोणतेही फोटो सापडले नाहीत.', 'No matching photos found.')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {filteredSlots.map((slot, index) => {
                const currentSrc = getPhotoSrc(slot.id, slot.fallbackSlotId);
                const isCustom = !!photos[slot.id];
                const isSelected = selectedSlot?.id === slot.id || activeSlotForEdit?.id === slot.id;

                return (
                  <div
                    id={`slot-card-${slot.id}`}
                    key={slot.id}
                    className={`p-3.5 rounded-2xl border transition-all flex gap-3.5 items-start ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500 shadow-md'
                        : isCustom
                        ? 'border-emerald-300 bg-white hover:shadow-md'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                    }`}
                  >
                    {/* Thumbnail / Image Preview */}
                    <div
                      onClick={() => {
                        if (currentSrc) {
                          setPreviewImage({
                            src: currentSrc,
                            title: language === 'mr' ? slot.marathiTitle : slot.englishTitle,
                          });
                        } else {
                          setSelectedSlot(slot);
                          singleInputRef.current?.click();
                        }
                      }}
                      className={`relative shrink-0 border border-slate-200 group cursor-pointer bg-slate-100 flex items-center justify-center overflow-hidden transition-transform hover:scale-103 ${
                        slot.isCircle
                          ? 'w-20 h-20 sm:w-24 sm:h-24 rounded-full ring-2 ring-amber-400'
                          : 'w-20 h-20 sm:w-24 sm:h-24 rounded-xl'
                      }`}
                    >
                      {currentSrc ? (
                        <>
                          <img
                            src={currentSrc}
                            alt={slot.marathiTitle}
                            className={`w-full h-full object-cover ${slot.isCircle ? 'rounded-full' : ''}`}
                          />
                          <div
                            className={`absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white ${
                              slot.isCircle ? 'rounded-full' : ''
                            }`}
                          >
                            <Eye className="w-4 h-4" />
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                          <Upload className="w-5 h-5 mb-1 text-blue-800" />
                          <span className="text-[9px] font-semibold leading-tight text-slate-500">
                            {t('फोटो जोडा', 'Add Photo')}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Slot Information & Actions */}
                    <div className="flex-1 min-w-0 space-y-1">
                      
                      {/* Badges: Scope & Status */}
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <div className="flex items-center gap-1 flex-wrap">
                          {slot.isCircle ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                              {t('वर्तुळाकार पोर्ट्रेट', 'Circle Portrait')}
                            </span>
                          ) : slot.scope === 'core_pages' ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-300">
                              {t('स्वतंत्र मुख्य पान', 'Core Page')}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {t('होमपेज विभाग', 'Home Section')}
                            </span>
                          )}

                          {slot.pagePath && (
                            <span className="text-[10px] text-slate-500 font-mono hidden sm:inline">
                              {slot.pagePath}
                            </span>
                          )}
                        </div>

                        {isCustom ? (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <Check className="w-3 h-3 text-emerald-600" /> {t('बदललेला फोटो', 'Active')}
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                            {t('डिफॉल्ट फोटो', 'Default')}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 font-serif">
                        {language === 'mr' ? slot.marathiTitle : slot.englishTitle}
                      </h4>

                      {/* Location description */}
                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        📍 {slot.destinationDesc}
                      </p>

                      {/* Recommended file hint */}
                      <div className="text-[10px] text-slate-400 font-mono truncate">
                        {slot.recommendedWhatsAppFile}
                      </div>

                      {/* Actions: Choose New Photo + Reset to Default + Presets for Circles */}
                      <div className="pt-2 flex items-center gap-2 flex-wrap">
                        <button
                          onClick={() => {
                            setSelectedSlot(slot);
                            singleInputRef.current?.click();
                          }}
                          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-blue-900 hover:bg-blue-800 text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                        >
                          <Upload className="w-3 h-3 text-amber-300" />
                          <span>{t('नवीन फोटो निवडा', 'Upload New')}</span>
                        </button>

                        {/* Presets Choice for Circle Portraits */}
                        {(slot.id === 'dr_ambedkar_hero' || slot.id === 'taporatna_swamiji_hero') && (
                          <button
                            onClick={() => {
                              setSelectedCircleModal(slot.id === 'dr_ambedkar_hero' ? 'left' : 'right');
                              setCircleModalOpen(true);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition-all shadow-2xs cursor-pointer active:scale-95"
                          >
                            <Sparkles className="w-3 h-3 text-white" />
                            <span>{t('जुने व क्लासिक पर्याय', 'Presets / Classic')}</span>
                          </button>
                        )}

                        {isCustom && (
                          <button
                            onClick={() => handleResetSlot(slot.id, slot.marathiTitle)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-600 hover:text-rose-700 hover:bg-rose-50 border border-slate-200 transition-colors cursor-pointer"
                            title={t('मूळ डिफॉल्ट फोटोवर परत या', 'Reset to Default')}
                          >
                            <RotateCcw className="w-3 h-3" />
                            <span>{t('मूळ पूर्ववत करा', 'Reset')}</span>
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2 text-slate-600 text-center sm:text-left">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              {t(
                'टीप: आपण सेट केलेले सर्व फोटो आपोआप कायमस्वरूपी सेव्ह राहतात आणि वेबसाईटवर लगेच दिसतात.',
                'Tip: Every uploaded photo is automatically saved and immediately visible across the website.'
              )}
            </span>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(false);
              if (setActiveSlotForEdit) setActiveSlotForEdit(null);
            }}
            className="w-full sm:w-auto px-6 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors cursor-pointer"
          >
            {t('पूर्ण झाले (Done)', 'Done')}
          </button>
        </div>

      </div>

      {/* Lightbox for Image Preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage.src}
              alt={previewImage.title}
              className="w-full max-h-[75vh] object-contain bg-slate-950"
            />
            <div className="p-4 flex items-center justify-between bg-slate-50 border-t border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 cursor-pointer"
              >
                {t('बंद करा', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Circle Image Selector & Custom Uploader Modal */}
      <CircleImageSelectorModal
        isOpen={circleModalOpen}
        onClose={() => setCircleModalOpen(false)}
        initialCircle={selectedCircleModal}
      />
    </div>
  );
};
