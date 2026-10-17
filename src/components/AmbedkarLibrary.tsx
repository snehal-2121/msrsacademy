import React, { useState } from 'react';
import { AMBEDKAR_LIBRARY_BOOKS } from '../data/academyData';
import { BookOpen, Search, CheckCircle2, BookmarkCheck, Library, Sparkles, BookMarked, Eye, ArrowRight } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { EditableImage } from './EditableImage';

interface AmbedkarLibraryProps {
  onOpenInquiry: (category: string, subject?: string) => void;
  onNavigate?: (section: NavSection) => void;
}

export const AmbedkarLibrary: React.FC<AmbedkarLibraryProps> = ({ onOpenInquiry, onNavigate }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const libraryWelcomeImg = getPhotoSrc('library_welcome');
  const libraryBooksImg = getPhotoSrc('library_books_closeup');
  const libraryShowcaseImg = getPhotoSrc('library_showcase');

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategory = AMBEDKAR_LIBRARY_BOOKS[activeCategoryIndex];

  const filteredBooks = AMBEDKAR_LIBRARY_BOOKS.filter((cat) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      cat.category.toLowerCase().includes(query) ||
      cat.marathiCategory.toLowerCase().includes(query) ||
      cat.desc.toLowerCase().includes(query) ||
      cat.examples.some((ex) => ex.toLowerCase().includes(query))
    );
  });

  return (
    <section id="library-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Page 5 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 text-blue-900 text-xs font-semibold mb-3">
            <Library className="w-3.5 h-3.5" />
            <span>{t('ज्ञानभांडार व संदर्भ ग्रंथ दालन', 'Knowledge Treasury & Reference Archive')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Babasaheb Ambedkar Library')}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'मूलभूत अभ्यासासाठी स्टेट बोर्ड ते उच्च स्पर्धा परीक्षांसाठी प्रमाणित संदर्भ ग्रंथ आणि व्यक्तिमत्त्व विकासासाठी समृद्ध साहित्य दालन.',
              'Authoritative textbooks ranging from State Board and NCERT to standard civil services references, literature, and biographies.'
            )}
          </p>

          {onNavigate && (
            <div className="mt-4">
              <button
                onClick={() => onNavigate('library')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-105"
              >
                <span>{t('📚 ग्रंथालय व अभ्यासिका स्वतंत्र पान पहा', '📚 Open Dedicated Library & Study Page')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Visual Library Showcase Banner (Click any image to customize) */}
        {(libraryWelcomeImg || libraryBooksImg || libraryShowcaseImg) && (
          <div className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-4">
            {libraryWelcomeImg && (
              <div className={`${libraryBooksImg || libraryShowcaseImg ? 'md:col-span-8' : 'md:col-span-12'} rounded-2xl overflow-hidden border border-blue-200 shadow-md relative group h-56 sm:h-72 bg-slate-900`}>
                <EditableImage
                  slotId="home_library_welcome"
                  fallbackSlotId="library_welcome"
                  alt="Dr. Babasaheb Ambedkar Library Bookshelves and Welcome Area"
                  className="w-full h-full"
                  imgClassName="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-950/60 to-transparent flex flex-col justify-center px-6 sm:px-10 text-white max-w-xl pointer-events-none">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                      <BookMarked className="w-4 h-4 text-amber-300" />
                      {t('प्रत्यक्ष ग्रंथालय दालन · पुस्तकांचे भांडार', 'Actual Campus Library · 2,300+ Books')}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-serif text-white">
                      {t('हजारो पुस्तकांचा समृद्ध संग्रह व शांत अभ्यास वातावरण', 'Authoritative Book Collection & Tranquil Environment')}
                    </h3>
                    <p className="text-xs text-blue-100 mt-2 hidden sm:block leading-relaxed">
                      {t(
                        'महाराष्ट्र स्टेट बोर्ड, एनसीईआरटी, स्पर्धा परीक्षा मार्गदर्शक, इतिहास, राज्यशास्त्र, अर्थशास्त्र आणि प्रेरणादायी साहित्याची सुसज्ज मांडणी.',
                        'Comprehensive shelves for Maharashtra State Board, NCERT, MPSC/UPSC guides, constitution, history, economy, and inspiring classics.'
                      )}
                    </p>
                  </div>
                </EditableImage>
              </div>
            )}

            {(libraryBooksImg || libraryShowcaseImg) && (
              <div className={`${libraryWelcomeImg ? 'md:col-span-4' : 'md:col-span-12'} grid grid-cols-2 md:grid-cols-1 gap-4`}>
                {libraryBooksImg && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 relative group h-26 sm:h-34">
                    <EditableImage
                      slotId="home_library_books"
                      fallbackSlotId="library_books_closeup"
                      alt="NCERT and competitive exam books collection"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[11px] text-white font-semibold text-center truncate pointer-events-none">
                        {t('स्पर्धा परीक्षा ग्रंथ कपाटे', 'Exam Reference Racks')}
                      </div>
                    </EditableImage>
                  </div>
                )}
                {libraryShowcaseImg && (
                  <div className="rounded-xl overflow-hidden border border-slate-200 relative group h-26 sm:h-34">
                    <EditableImage
                      slotId="core_library_showcase"
                      fallbackSlotId="library_showcase"
                      alt="Library showcase, awards and Buddha statue"
                      className="w-full h-full"
                      imgClassName="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    >
                      <div className="absolute inset-x-0 bottom-0 bg-slate-950/80 p-1.5 text-[11px] text-white font-semibold text-center truncate pointer-events-none">
                        {t('स्मृतिचिन्हे व बुद्ध मूर्ती दालन', 'Cultural Heritage Showcase')}
                      </div>
                    </EditableImage>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Search & Filter Bar */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t('पुस्तके शोधा (उदा. NCERT, स्टेट बोर्ड, राज्यशास्त्र, MPSC, कादंबऱ्या)...', 'Search library catalog (e.g., NCERT, State Board, Polity, MPSC, Novels)...')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Book Collection Categories - All 5 from Page 5 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Category Tabs (Left) */}
          <div className="lg:col-span-5 space-y-2">
            {AMBEDKAR_LIBRARY_BOOKS.map((cat, idx) => {
              const primaryCategory = language === 'mr' ? cat.marathiCategory : cat.category;
              const secondaryCategory = language === 'mr' ? cat.category : cat.marathiCategory;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start justify-between gap-3 ${
                    activeCategoryIndex === idx
                      ? 'bg-blue-50/80 border-blue-300 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold font-mono px-2 py-0.5 rounded-sm ${
                          activeCategoryIndex === idx
                            ? 'bg-blue-900 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">
                        {primaryCategory}
                      </h3>
                    </div>
                    <p className="text-xs text-blue-900 font-medium pl-8">
                      {secondaryCategory}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Category View (Right) */}
          <div className="lg:col-span-7 bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
                  {t('निवडलेला संग्रह', 'Featured Collection')}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-serif">
                  {language === 'mr' ? currentCategory.marathiCategory : currentCategory.category}
                </h3>
                <span className="text-xs font-semibold text-slate-600">
                  {language === 'mr' ? currentCategory.category : currentCategory.marathiCategory}
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6">
              {currentCategory.desc}
            </p>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">
                {t('प्रातिनिधिक व संदर्भ पुस्तके:', 'Representative Volumes & Standard Titles:')}
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentCategory.examples.map((ex, i) => (
                  <div
                    key={i}
                    className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-800 font-medium leading-relaxed"
                  >
                    <BookmarkCheck className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
                    <span>{ex}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-xs text-slate-500 text-center sm:text-left">
                {t('दैनंदिन वाचन व ग्रंथालय सभासदत्व उपलब्ध.', 'Daily lending & silent reading hall memberships available.')}
              </div>
              <button
                onClick={() => onOpenInquiry('library', `ग्रंथालय चौकशी - ${currentCategory.category}`)}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs shrink-0"
              >
                {t('ग्रंथालय सभासदत्व नोंदणी', 'Inquire Library Membership')}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
