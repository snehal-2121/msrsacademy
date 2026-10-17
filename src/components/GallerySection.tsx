import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Image as ImageIcon,
  X,
  ZoomIn,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Upload,
} from 'lucide-react';
import { usePhotos, PHOTO_SLOTS } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';

export const GallerySection: React.FC = () => {
  const { language, t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const { getPhotoSrc, setIsModalOpen, photos, bulkImportFiles } = usePhotos();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const quickUploadRef = useRef<HTMLInputElement>(null);

  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    title: string;
    tag: string;
    category: string;
    desc: string;
    fileName?: string;
  } | null>(null);

  const handleQuickFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    await bulkImportFiles(e.target.files);
    if (quickUploadRef.current) quickUploadRef.current.value = '';
  };

  const slotGalleryItems = [
    {
      id: 'police_banner',
      src: getPhotoSrc('police_banner'),
      title: "मुंबई शहर पोलीस दल निवड सत्कार - कु. लक्ष्मी सोनकडे बॅनर",
      tag: "यशोगाथा (Felicitation)",
      category: "achievements",
      desc: "MSR's Academy संचालित डॉ. बाबासाहेब आंबेडकर ग्रंथालय व तपोरत्न अभ्यासिकेची विद्यार्थिनी कु. लक्ष्मी महानंदा अंबण्णा सोनकडे हिची मुंबई पोलीस दलात निवड झाल्याबद्दल सन्मानपूर्वक लावण्यात आलेला मूळ फ्लेक्स बॅनर.",
      fileName: "WhatsApp Image 2026-09-24 at 3.17.02 PM.jpeg",
    },
    {
      id: 'drone_puja',
      src: getPhotoSrc('drone_puja'),
      title: "मशाळे ॲग्रिकल्चरल सर्व्हिसेस - ड्रोन लोकार्पण व पूजन सोहळा",
      tag: "कृषी ड्रोन (Drone Puja)",
      category: "agriculture",
      desc: "शेतकऱ्यांच्या सोयीसाठी अत्याधुनिक कृषी फवारणी ड्रोनचे पुष्पहार, नारळ व औक्षण करून पारंपारिक पद्धतीने विधिवत पूजन व लोकार्पण सोहळा.",
      fileName: "WhatsApp Image 2026-09-24 at 3.17.03 PM.jpeg",
    },
    {
      id: 'drone_students_group',
      src: getPhotoSrc('drone_students_group'),
      title: "संचालक, विद्यार्थी व कृषी ड्रोन गट छायाचित्र",
      tag: "कृषी ड्रोन (Drone Team)",
      category: "agriculture",
      desc: "अत्याधुनिक कृषी फवारणी ड्रोनच्या सादरीकरणावेळी अकॅडमीचे संचालक, तंत्रज्ञ आणि परिसरातील विद्यार्थी-युवक यांचे एकत्रित छायाचित्र.",
      fileName: "WhatsApp Image 2026-09-24 at 3.17.01 PM.jpeg",
    },
    {
      id: 'drone_family',
      src: getPhotoSrc('drone_family'),
      title: "ड्रोन लोकार्पण सोहळा - संचालक, कुटुंबिय व शेतकरी",
      tag: "कृषी ड्रोन (Inauguration)",
      category: "agriculture",
      desc: "आधुनिक शेती तंत्रज्ञानाचा शुभारंभ प्रसंगी उपस्थित संचालक, ज्येष्ठ कुटुंबिय आणि ग्रामस्थ शेतकरी बांधव.",
      fileName: "WhatsApp Image 2026-09-24 at 3.17.00 PM.jpeg",
    },
    {
      id: 'tapovan_cubicles',
      src: getPhotoSrc('tapovan_cubicles'),
      title: "तपोरत्न अभ्यासिका - मुलींसाठी स्वतंत्र अभ्यास क्युबिकल्स",
      tag: "तपोरत्न अभ्यासिका (Study Hall)",
      category: "study",
      desc: "शांततामय वातावरणात १००% लक्ष केंद्रित करण्यासाठी तयार केलेले स्वतंत्र लाकडी कम्पार्टमेंट्स, आरामदायी खुर्च्या, नैसर्गिक उजेड आणि शिस्तबद्ध वातावरण.",
      fileName: "WhatsApp Image 2026-09-24 at 3.13.32 PM.jpeg",
    },
    {
      id: 'building_exterior',
      src: getPhotoSrc('building_exterior'),
      title: "MSR's Academy & तपोरत्न अभ्यासिका २ मजली मुख्य इमारत",
      tag: "परिसर व इमारत (Campus)",
      category: "study",
      desc: "दोन मजली स्वतंत्र व भव्य शैक्षणिक संकुल. तळमजल्यावर ग्रंथालय व शालेय मार्गदर्शन वर्ग, आणि पहिल्या मजल्यावर मुलींसाठी तपोरत्न अभ्यासिका.",
      fileName: "WhatsApp Image 2026-09-24 at 3.13.31 PM.jpeg",
    },
    {
      id: 'library_welcome',
      src: getPhotoSrc('library_welcome'),
      title: "डॉ. बाबासाहेब आंबेडकर ग्रंथालय - स्वागत दालन व 'WEL-COME' सजावट",
      tag: "ग्रंथालय (Library Welcome)",
      category: "library",
      desc: "अभ्यासिका व ग्रंथालयाच्या स्वागत दालनाची सुवर्ण फुगे आणि पुस्तकांनी सुशोभित मांडणी.",
      fileName: "WhatsApp Image 2026-09-24 at 3.09.11 PM (1).jpeg",
    },
    {
      id: 'library_books_closeup',
      src: getPhotoSrc('library_books_closeup'),
      title: "ग्रंथालय स्पर्धा परीक्षा व संदर्भ ग्रंथ कपाट",
      tag: "ग्रंथालय (Book Stack)",
      category: "library",
      desc: "महाराष्ट्र स्टेट बोर्ड, एनसीईआरटी, पोलीस भरती, एमपीएससी मार्गदर्शक, इतिहास, राज्यशास्त्र आणि समाजसुधारकांच्या ग्रंथांचा समृद्ध खजिना.",
      fileName: "WhatsApp Image 2026-09-24 at 3.09.11 PM.jpeg",
    },
    {
      id: 'library_showcase',
      src: getPhotoSrc('library_showcase'),
      title: "ग्रंथालय पुरस्कार, स्मृतिचिन्हे व बुद्ध मूर्ती दालन",
      tag: "ग्रंथालय (Showcase)",
      category: "library",
      desc: "डबल व्हाईट शेल्फ कपाटामध्ये लावलेली विविध स्मृतिचिन्हे, पुरस्कार आणि भगवान गौतम बुद्ध यांची सुंदर मूर्ती.",
      fileName: "WhatsApp Image 2026-09-24 at 3.12.28 PM.jpeg",
    },
    {
      id: 'students_celebration',
      src: getPhotoSrc('students_celebration'),
      title: "ग्रंथालय स्नेहसंमेलन व सत्कार सोहळा - संचालक व विद्यार्थिनी",
      tag: "कार्यक्रम (Celebration)",
      category: "events",
      desc: "अकॅडमीच्या वार्षिक स्नेहसंमेलनात तिरंगी बॅज लावून उपस्थित विद्यार्थिनी आणि नेव्ही ब्लू सुटातील सन्माननीय संचालक सर.",
      fileName: "WhatsApp Image 2026-09-24 at 3.09.12 PM (1).jpeg",
    },
    {
      id: 'ambedkar_shivaji_puja',
      src: getPhotoSrc('ambedkar_shivaji_puja'),
      title: "महामानव डॉ. बाबासाहेब आंबेडकर व छत्रपती शिवाजी महाराज वंदना",
      tag: "प्रेरणास्थान (Tribute Table)",
      category: "events",
      desc: "अकॅडमीच्या मुख्य दालनात भारतरत्न डॉ. बाबासाहेब आंबेडकर आणि छत्रपती शिवाजी महाराज यांच्या प्रतिमेचे पूजन करताना विद्यार्थिनी.",
      fileName: "WhatsApp Image 2026-09-24 at 3.09.12 PM.jpeg",
    },
  ];

  // Include any additional custom uploaded photos beyond the standard slots
  const knownSlotIds = new Set<string>([
    ...PHOTO_SLOTS.map(s => s.id),
    ...PHOTO_SLOTS.filter(s => s.fallbackSlotId).map(s => s.fallbackSlotId as string),
    ...slotGalleryItems.map(s => s.id),
    'ambedkar_shivaji_puja',
    'building_exterior',
    'drone_family',
    'drone_puja',
    'drone_students_group',
    'library_showcase',
    'police_banner',
    'students_celebration',
    'tapovan_cubicles',
    'library_welcome',
    'library_books_closeup',
    'coaching_students',
    'dr_ambedkar_hero',
    'taporatna_swamiji_hero',
  ]);

  const extraUploadedItems = Object.entries(photos)
    .filter(([key, val]) => !knownSlotIds.has(key) && typeof val === 'string' && val.startsWith('data:image'))
    .map(([key, val], idx) => ({
      id: `custom_photo_${key}_${idx}`,
      src: val,
      title: `MSR's Academy प्रत्यक्ष छायाचित्र #${idx + 1}`,
      tag: 'प्रत्यक्ष फोटो (Real Photo)',
      category: 'events',
      desc: "MSR's Academy & Team चे प्रत्यक्ष अपलोड केलेले छायाचित्र.",
      fileName: undefined as string | undefined,
    }));

  // ONLY include real-time uploaded images (never AI-generated images) & ensure unique IDs
  const rawItems = [
    ...slotGalleryItems.filter(item => Boolean(item.src)),
    ...extraUploadedItems,
  ];
  const seenGalleryIds = new Set<string>();
  const galleryItems = rawItems.filter(item => {
    if (seenGalleryIds.has(item.id)) return false;
    seenGalleryIds.add(item.id);
    return true;
  });

  const categories = [
    { id: 'all', label: t('सर्व फोटो (All)', 'All Photos') },
    { id: 'agriculture', label: t('🌾 कृषी ड्रोन (Agriculture)', '🌾 Agri Drone') },
    { id: 'study', label: t('🏛️ अभ्यासिका व इमारत (Study & Campus)', '🏛️ Study & Campus') },
    { id: 'library', label: t('📚 ग्रंथालय (Library)', '📚 Library') },
    { id: 'achievements', label: t('🏆 यशोगाथा (Police Bharti)', '🏆 Achievement & Felicitation') },
    { id: 'events', label: t('🎉 स्नेहसंमेलन व वंदना (Events)', '🎉 Events & Assemblies') },
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const safeIndex = filteredItems.length > 0 ? currentIndex % filteredItems.length : 0;

  const handleNext = useCallback(() => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  }, [filteredItems.length]);

  const handlePrev = useCallback(() => {
    if (filteredItems.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length);
  }, [filteredItems.length]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentIndex(0);
  };

  // Automatic one-after-another slide effect
  useEffect(() => {
    if (!isAutoPlaying || isHovered || selectedImage || filteredItems.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isHovered, selectedImage, filteredItems.length, handleNext]);

  const customPhotoCount = Object.keys(photos).length;

  return (
    <section id="gallery-section" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <ImageIcon className="w-3.5 h-3.5 text-amber-800" />
            <span>{t('प्रत्यक्ष छायाचित्र दालन', 'Actual Photo Showcase')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            MSR's Academy <span className="text-blue-950">{t('फोटो गॅलरी', 'Photo Gallery')}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto">
            {t(
              'कृषी ड्रोन फवारणी सोहळा, तपोरत्न अभ्यासिका, डॉ. बाबासाहेब आंबेडकर ग्रंथालय, पोलीस भरती निवड आणि अकॅडमीच्या प्रत्यक्ष छायाचित्रांचा संग्रह.',
              'Authentic gallery featuring our Quadcopters agricultural drone, Taporatna girls study, Dr. Babasaheb Ambedkar library, and student achievements.'
            )}
          </p>

          {/* Quick Photo Manager & Direct Real Photo Upload Trigger in Gallery */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5">
            <input
              ref={quickUploadRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleQuickFilesUpload}
            />
            <button
              onClick={() => quickUploadRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Upload className="w-4 h-4 text-amber-200" />
              <span>
                {t('प्रत्यक्ष फोटो अपलोड करा (Upload Real Photos)', 'Upload Real-Time Photos')}
              </span>
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold shadow-md transition-all active:scale-95"
            >
              <Camera className="w-4 h-4 text-amber-300" />
              <span>
                {customPhotoCount > 0
                  ? (language === 'mr'
                      ? `आपले ${customPhotoCount} प्रत्यक्ष फोटो सक्रिय आहेत (व्यवस्थापित करा)`
                      : `${customPhotoCount} Real Uploaded Photos Active (Manage)`)
                  : (language === 'mr'
                      ? 'मूळ फोटो व्यवस्थापक (Manage Slots)'
                      : 'Original Photo Slots Manager')}
              </span>
            </button>
          </div>
        </div>

        {/* Category Filters */}
        {galleryItems.length > 0 && (
          <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Empty State when no real photos are uploaded yet */}
        {galleryItems.length === 0 && (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border-2 border-dashed border-blue-300 text-center shadow-sm">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto mb-4">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              {t('येथे फक्त प्रत्यक्ष अपलोड केलेले मूळ फोटो दिसतील', 'Only Real-Time Uploaded Photos Appear Here')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-lg mx-auto leading-relaxed">
              {t(
                'कोणतेही AI-निर्मित फोटो दाखवले जात नाहीत. कृपया खालील बटणावर क्लिक करून आपले प्रत्यक्ष फोटो निवडा; ते सर्व युजर्ससाठी वेबसाईटवर कायमस्वरूपी सेव्ह होतील.',
                'No AI-generated images are shown. Click below to select your real-time photos from your phone or computer so they appear live across the site for all visitors.'
              )}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => quickUploadRef.current?.click()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
              >
                <Upload className="w-4 h-4 text-amber-300" />
                <span>{t('सर्व प्रत्यक्ष फोटो निवडा व अपलोड करा', 'Select & Upload Real-Time Photos')}</span>
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-bold transition-all"
              >
                <Camera className="w-4 h-4 text-blue-900" />
                <span>{t('विभागानुसार फोटो सेट करा', 'Manage Photo Slots')}</span>
              </button>
            </div>
          </div>
        )}

        {/* Main Sliding Carousel Showcase */}
        {filteredItems.length > 0 && (
          <div
            className="max-w-5xl mx-auto"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200 shadow-2xl">
              
              {/* Top Controls Bar Over Slide */}
              <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/90 text-white shadow-md backdrop-blur-md border border-white/15">
                    {filteredItems[safeIndex].tag}
                  </span>
                  {filteredItems[safeIndex].id && photos[filteredItems[safeIndex].id] && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-600/95 text-white shadow-md">
                      <Check className="w-3 h-3" /> मूळ फोटो
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 pointer-events-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/65 text-white backdrop-blur-md border border-white/15">
                    {safeIndex + 1} / {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setIsAutoPlaying((prev) => !prev)}
                    className="p-2 rounded-full bg-black/65 hover:bg-black/85 text-white backdrop-blur-md border border-white/15 transition-colors"
                    title={isAutoPlaying ? 'Pause Slideshow' : 'Play Slideshow'}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5 text-amber-300" /> : <Play className="w-3.5 h-3.5 text-emerald-300" />}
                  </button>
                </div>
              </div>

              {/* Sliding Track: Images Slide One After Another */}
              <div className="overflow-hidden w-full">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${safeIndex * 100}%)` }}
                >
                  {filteredItems.map((item, index) => (
                    <div
                      key={`gallery-slide-${item.id}-${index}`}
                      className="w-full shrink-0 flex flex-col"
                    >
                      {/* Slide Image Viewport */}
                      <div
                        onClick={() => setSelectedImage(item)}
                        className="relative h-[320px] sm:h-[440px] md:h-[500px] w-full bg-slate-950 flex items-center justify-center cursor-pointer group overflow-hidden"
                      >
                        {/* Subtle blurred backdrop for portrait/varied aspect ratio images */}
                        <img
                          src={item.src}
                          alt=""
                          aria-hidden="true"
                          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110"
                        />
                        <img
                          src={item.src}
                          alt={item.title}
                          className="relative z-10 w-full h-full object-contain transition-transform duration-700 group-hover:scale-103"
                        />
                        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 opacity-80 group-hover:opacity-95 transition-opacity" />

                        {/* Zoom Fullscreen Hint */}
                        <div className="absolute bottom-4 right-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all">
                          <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                          <span>{t('मोठ्या आकारात पहा', 'View Fullscreen')}</span>
                        </div>
                      </div>

                      {/* Slide Caption Bar */}
                      <div className="p-5 sm:p-6 bg-white border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1 max-w-3xl">
                          <h3 className="text-base sm:text-xl font-bold text-slate-900 font-serif">
                            {item.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                            {item.desc}
                          </p>
                        </div>

                        <button
                          onClick={() => setSelectedImage(item)}
                          className="shrink-0 self-start sm:self-center px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 font-bold text-xs transition-colors"
                        >
                          {t('तपशील पहा →', 'Full View →')}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Left & Right Previous / Next Sliding Buttons */}
              {filteredItems.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    className="absolute left-3 sm:left-5 top-[160px] sm:top-[220px] md:top-[250px] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-blue-900 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-white/25 transition-all hover:scale-105 active:scale-95"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="absolute right-3 sm:right-5 top-[160px] sm:top-[220px] md:top-[250px] -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 hover:bg-blue-900 text-white flex items-center justify-center shadow-lg backdrop-blur-md border border-white/25 transition-all hover:scale-105 active:scale-95"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip Slider Below */}
            {filteredItems.length > 1 && (
              <div className="mt-5 flex items-center gap-2.5 overflow-x-auto pb-2 pt-1 px-1 scrollbar-thin">
                {filteredItems.map((item, idx) => {
                  const isActive = idx === safeIndex;
                  return (
                    <button
                      key={`gallery-thumb-${item.id}-${idx}`}
                      onClick={() => setCurrentIndex(idx)}
                      className={`relative shrink-0 w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        isActive
                          ? 'border-blue-900 ring-2 ring-blue-900/30 scale-105 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-95'
                      }`}
                    >
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Image */}
              <div className="max-h-[70vh] w-full flex items-center justify-center bg-black">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              </div>

              {/* Modal Details */}
              <div className="p-5 sm:p-6 bg-slate-900 text-white">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {selectedImage.tag}
                  </span>
                  {selectedImage.fileName && (
                    <span className="text-[10px] text-slate-400 font-mono">
                      {selectedImage.fileName}
                    </span>
                  )}
                </div>
                <h3 className="text-base sm:text-xl font-bold font-serif">
                  {selectedImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                  {selectedImage.desc}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
