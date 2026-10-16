import React, { useRef, useState } from 'react';
import { usePhotos, PHOTO_SLOTS, PhotoSlot } from '../context/PhotoContext';
import { X, Upload, Check, Image as ImageIcon, Sparkles, RefreshCw, Eye, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PhotoManagerModal: React.FC = () => {
  const { isModalOpen, setIsModalOpen, getPhotoSrc, updatePhoto, bulkImportFiles, photos, resetAllPhotos } = usePhotos();
  const bulkInputRef = useRef<HTMLInputElement>(null);
  const singleInputRef = useRef<HTMLInputElement>(null);
  const [selectedSlotForEdit, setSelectedSlotForEdit] = useState<PhotoSlot | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<{ src: string; title: string } | null>(null);

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
    if (!e.target.files || e.target.files.length === 0 || !selectedSlotForEdit) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = async () => {
      await updatePhoto(selectedSlotForEdit.id, reader.result as string, file.name);
      setStatusMessage(`'${selectedSlotForEdit.marathiTitle}' साठी फोटो अपडेट झाला.`);
      setTimeout(() => setStatusMessage(null), 4000);
      setSelectedSlotForEdit(null);
    };
    reader.readAsDataURL(file);
    if (singleInputRef.current) singleInputRef.current.value = '';
  };

  const uploadedCount = Object.keys(photos).length;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-blue-950 via-slate-900 to-amber-950 text-white flex items-center justify-between shrink-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300">
                <ImageIcon className="w-5 h-5" />
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif">
                मूळ फोटो व्यवस्थापक (Original Photos Manager)
              </h2>
            </div>
            <p className="text-xs text-slate-300">
              आपण पाठवलेले सर्व प्रत्यक्ष व्हॉट्सॲप फोटो (होमपेज पोर्ट्रेट्स व दालने) थेट वेबसाईटवर सेट करा.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Bar */}
        <div className="p-4 sm:p-5 bg-amber-50/80 border-b border-amber-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-amber-950">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                सद्यस्थिती: {uploadedCount} पैकी {PHOTO_SLOTS.length} फोटो प्रत्यक्ष मूळ फोटो म्हणून सक्रिय
              </span>
            </div>
            <p className="text-[11px] text-amber-900/80 mt-0.5">
              आपल्या फोन किंवा कॉम्प्युटरमधील फोटो एका क्लिकवर सिंक करा.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Hidden inputs */}
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
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-amber-300" />
              <span>सर्व फोटो एकत्र निवडा</span>
            </button>
          </div>
        </div>

        {/* Status Toast */}
        {statusMessage && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs font-semibold text-center flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Slots Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PHOTO_SLOTS.map((slot, index) => {
              const currentSrc = getPhotoSrc(slot.id);
              const isCustom = !!photos[slot.id];

              return (
                <div
                  key={slot.id}
                  className={`p-3 sm:p-4 rounded-xl border transition-all flex gap-3.5 items-start ${
                    isCustom
                      ? 'border-emerald-300 bg-emerald-50/40'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    onClick={() => {
                      if (currentSrc) {
                        setPreviewImage({ src: currentSrc, title: slot.marathiTitle });
                      } else {
                        setSelectedSlotForEdit(slot);
                        singleInputRef.current?.click();
                      }
                    }}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 border border-slate-200 relative group cursor-pointer bg-slate-100 flex items-center justify-center"
                  >
                    {currentSrc ? (
                      <>
                        <img
                          src={currentSrc}
                          alt={slot.marathiTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <Eye className="w-4 h-4" />
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
                        <Upload className="w-5 h-5 mb-1 text-blue-800" />
                        <span className="text-[9px] font-semibold leading-tight text-slate-500">फोटो जोडा</span>
                      </div>
                    )}
                  </div>

                  {/* Slot Details */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                        #{index + 1} · {slot.category.toUpperCase()}
                      </span>
                      {isCustom ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                          <Check className="w-3 h-3" /> मूळ फोटो सक्रिय
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full">
                          मूळ फोटो जोडा
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 font-serif">
                      {slot.marathiTitle}
                    </h4>
                    
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      📍 {slot.destinationDesc}
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono truncate">
                      फाइल: {slot.recommendedWhatsAppFile}
                    </div>

                    {/* Action Button */}
                    <div className="pt-1.5 flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedSlotForEdit(slot);
                          singleInputRef.current?.click();
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 transition-all shadow-2xs"
                      >
                        <Upload className="w-3 h-3 text-blue-900" />
                        <span>{isCustom ? 'फोटो बदला' : 'हा फोटो निवडा'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500 shrink-0">
          <div className="flex items-center gap-2">
            <span>टीप: आपण सेट केलेले सर्व फोटो आपोआप कायमस्वरूपी सेव्ह राहतात.</span>
          </div>
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-colors"
          >
            पूर्ण झाले (Done)
          </button>
        </div>

      </div>

      {/* Lightbox for preview */}
      {previewImage && (
        <div
          className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div className="max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
            <img src={previewImage.src} alt={previewImage.title} className="w-full max-h-[75vh] object-contain bg-slate-950" />
            <div className="p-4 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 text-sm">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
