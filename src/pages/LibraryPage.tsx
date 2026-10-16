import React, { useState } from 'react';
import { BookOpen, Search, CheckCircle2, BookmarkCheck, Library, Sparkles, BookMarked, Eye, ArrowLeft, ShieldCheck, Clock, Wifi, Droplets, Camera, LayoutGrid, Coffee, PhoneCall } from 'lucide-react';
import { AMBEDKAR_LIBRARY_BOOKS, TAPOVAN_GIRLS_FACILITIES, LIBRARY_REGULATIONS } from '../data/academyData';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';

interface LibraryPageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const LibraryPage: React.FC<LibraryPageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const libraryWelcomeImg = getPhotoSrc('library_welcome');
  const libraryBooksImg = getPhotoSrc('library_books_closeup');
  const libraryShowcaseImg = getPhotoSrc('library_showcase');
  const tapovanCubiclesImg = getPhotoSrc('tapovan_cubicles');

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'library' | 'abhyasika'>('all');

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
    <div className="min-h-screen bg-slate-50/60 pb-20">
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
            <span className="text-slate-900 font-bold">
              {t('ग्रंथालय व अभ्यासिका दालन', 'Library & Study Centre')}
            </span>
          </div>
        </div>
      </div>

      {/* Page Hero Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white py-14 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-4">
            <Library className="w-3.5 h-3.5" />
            <span>ज्ञानभांडार, वाचनालय व सुरक्षित अभ्यास केंद्र</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            Dr. Babasaheb Ambedkar Library &amp; Taporatna Abhyasika
          </h1>

          <p className="text-lg sm:text-xl font-serif text-amber-300 font-bold max-w-3xl mx-auto">
            डॉ. बाबासाहेब आंबेडकर ग्रंथालय व तपोरत्न अभ्यासिका (Study Centre)
          </p>

          <p className="mt-4 text-xs sm:text-base text-blue-100 leading-relaxed max-w-3xl mx-auto">
            २,३०० हून अधिक संदर्भ ग्रंथ, शालेय पाठ्यपुस्तके व मासिके; आणि विद्यार्थिनींसाठी संपूर्ण सुरक्षित, खाजगी क्युबिकल्सयुक्त शांत अभ्यासिका दालन.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onOpenInquiry('abhyasika', 'तपोरत्न अभ्यासिका जागा आरक्षण')}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-bold shadow-lg transition-transform hover:scale-105"
            >
              👩‍🎓 अभ्यासिका जागा चौकशी करा
            </button>
            <button
              onClick={() => onOpenInquiry('library', 'डॉ. आंबेडकर ग्रंथालय सदस्यत्व')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30 text-white text-xs sm:text-sm font-semibold transition-all"
            >
              📖 ग्रंथालय सदस्यत्व चौकशी
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        
        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-mono">२,३००+</span>
            <p className="text-xs font-bold text-slate-700 mt-1">एकूण संदर्भ ग्रंथ व पुस्तके</p>
            <span className="text-[11px] text-slate-500">MPSC, UPSC, Board, NCERT</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-rose-700 font-mono">१००%</span>
            <p className="text-xs font-bold text-slate-700 mt-1">फक्त विद्यार्थिनींसाठी सुरक्षित</p>
            <span className="text-[11px] text-slate-500">Exclusively for Girls</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-700 font-mono">१७ तास</span>
            <p className="text-xs font-bold text-slate-700 mt-1">दैनंदिन अभ्यास वेळ</p>
            <span className="text-[11px] text-slate-500">सकाळी ५:०० ते रात्री ११:००</span>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-md text-center">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono">२४/७</span>
            <p className="text-xs font-bold text-slate-700 mt-1">सीसीटीव्ही व वायफाय</p>
            <span className="text-[11px] text-slate-500">हाई-स्पीड इंटरनेट व सुरक्षा</span>
          </div>
        </div>

        {/* Real Photo Showcase Gallery (Only rendered when real uploaded photos exist) */}
        {(libraryWelcomeImg || tapovanCubiclesImg || libraryBooksImg) && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md mb-14">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                  प्रत्यक्ष छायाचित्रे
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 mt-1">
                  ग्रंथालय व अभ्यासिका परिसर दर्शन
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {libraryWelcomeImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={libraryWelcomeImg}
                      alt="Library Welcome & Bookshelves"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">ग्रंथालय स्वागत दालन व मांडणी</h3>
                    <p className="text-xs text-slate-600 mt-1">पुस्तकांची सुसज्ज मांडणी व शांत स्वागत परिसर.</p>
                  </div>
                </div>
              )}

              {tapovanCubiclesImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={tapovanCubiclesImg}
                      alt="Taporatna Girls Study Cubicles"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">तपोरत्न अभ्यासिका - स्वतंत्र क्युबिकल्स</h3>
                    <p className="text-xs text-slate-600 mt-1">प्रत्येक विद्यार्थिनीसाठी स्वतंत्र लाकडी कम्पार्टमेंट व लॅम्प.</p>
                  </div>
                </div>
              )}

              {libraryBooksImg && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs group">
                  <div className="h-56 overflow-hidden">
                    <img
                      src={libraryBooksImg}
                      alt="Library Competitive Exam Bookshelves"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4 bg-slate-50">
                    <h3 className="text-sm font-bold text-slate-900">स्पर्धा परीक्षा संदर्भ ग्रंथ कपाट</h3>
                    <p className="text-xs text-slate-600 mt-1">MPSC, पोलीस भरती, NCERT व इतिहास-भूगोल ग्रंथ संच.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Detailed Section 1: Dr. Babasaheb Ambedkar Library Catalog */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-14">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 text-blue-900 text-xs font-bold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>डॉ. बाबासाहेब आंबेडकर ग्रंथालय (लायब्ररी)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              ग्रंथालय संदर्भ सूची व पुस्तकांचे वर्गीकरण
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              शोध पट्टीमध्ये पुस्तकाचे किंवा विषयाचे नाव टाकून उपलब्ध ग्रंथ शोधा (उदा. MPSC, NCERT, राज्यघटना, गणित, कादंबरी).
            </p>
          </div>

          {/* Search Box */}
          <div className="relative max-w-xl mb-8">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="ग्रंथालय सूची शोधा (Search books, categories, exams)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-blue-700/20 focus:border-blue-700 transition-all placeholder:text-slate-400"
            />
          </div>

          {/* Book Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks.map((cat, idx) => (
              <div
                key={idx}
                className="bg-slate-50/70 rounded-2xl p-5 border border-slate-200 hover:border-blue-300 hover:bg-white transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-blue-900 bg-blue-100/70 px-2.5 py-0.5 rounded-md">
                      {cat.count}
                    </span>
                    <BookmarkCheck className="w-4 h-4 text-slate-400" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {language === 'mr' ? cat.marathiCategory : cat.category}
                  </h3>
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    {language === 'mr' ? cat.category : cat.marathiCategory}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{cat.desc}</p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[11px] font-bold text-slate-700 block mb-1">समाविष्ट ग्रंथ उदाहरणे:</span>
                  <ul className="space-y-1.5">
                    {cat.examples.map((ex, i) => (
                      <li key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5 leading-snug">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Periodicals & Daily Newspapers Box */}
          <div className="mt-8 p-6 rounded-2xl bg-amber-50/70 border border-amber-200">
            <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-700" />
              <span>दैनिक वर्तमानपत्रे व चालू घडामोडी मासिके (Daily Papers &amp; Monthly Magazines)</span>
            </h3>
            <p className="text-xs text-amber-900 leading-relaxed">
              वाचनालयात दररोज सकाळी प्रमुख मराठी व इंग्रजी वर्तमानपत्रे (लोकसत्ता, सकाळ, महाराष्ट्र टाइम्स, The Hindu) तसेच मासिक स्पर्धा मासिके (योजना, कुरुक्षेत्र, लोकराज्य, चाणक्य मंडल बुलेटिन) वाचनासाठी उपलब्ध असतात.
            </p>
          </div>
        </div>

        {/* Detailed Section 2: Taporatna Abhyasika for Girls */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-rose-100 shadow-md mb-14">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-rose-50 text-rose-900 text-xs font-bold mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-rose-700" />
              <span>तपोरत्न अभ्यासिका · Dedicated Exclusively For Girls</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900">
              विद्यार्थिनींसाठी सुरक्षित, खाजगी व शांत अभ्यास दालन
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              मुलींच्या एकाग्रतेसाठी आणि सुरक्षिततेसाठी विशेष काळजी घेऊन तयार करण्यात आलेली अद्ययावत अभ्यासिका.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAPOVAN_GIRLS_FACILITIES.map((facility, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-rose-50/30 border border-rose-100 hover:border-rose-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-900 flex items-center justify-center mb-3">
                    <ShieldCheck className="w-5 h-5 text-rose-800" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{facility.marathi}</h3>
                  <span className="text-[11px] font-semibold text-rose-800 block mt-0.5 mb-2">
                    {facility.title}
                  </span>
                  <p className="text-xs text-slate-600 leading-relaxed">{facility.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-rose-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-900">प्रवेश क्षमता:</span> मर्यादित जागा उपलब्ध; प्रथम येणाऱ्यास प्राधान्य दिले जाते.
            </div>
            <button
              onClick={() => onOpenInquiry('abhyasika', 'मुलींच्या अभ्यासिकेत नावनोंदणी')}
              className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-all shadow-md"
            >
              अभ्यासिकेत नाव नोंदवा (Book Seat) →
            </button>
          </div>
        </div>

        {/* Official Rules & Timings */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-14">
          <div className="max-w-2xl mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              नियमावली व शिस्त
            </span>
            <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
              अभ्यासिका व ग्रंथालय नियम (Regulations)
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              वेळापत्रक: {LIBRARY_REGULATIONS.timings}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {LIBRARY_REGULATIONS.rules.map((rule, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">{rule.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-7">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>← मुख्य पानावर परत (Back to Home)</span>
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenInquiry('abhyasika', 'तपोरत्न अभ्यासिका प्रवेश चौकशी')}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
            >
              तपोरत्न अभ्यासिका प्रवेश
            </button>
            <button
              onClick={() => onOpenInquiry('library', 'ग्रंथालय सभासदत्व नोंदणी')}
              className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs"
            >
              ग्रंथालय सभासदत्व नोंदणी
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
