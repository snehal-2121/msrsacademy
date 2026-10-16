import React, { useState } from 'react';
import { BookOpen, Sparkles, Palette, Crown, Sun, Feather, Camera } from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { usePhotos } from '../context/PhotoContext';

// Exact portrait image paths
import drAmbedkarHeroImg from '../assets/images/dr_ambedkar_hero.jpg';
import taporatnaSwamijiHeroImg from '../assets/images/taporatna_swamiji_hero.jpg';

interface HeroBannerProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string) => void;
}

type HeroTheme = 'royal' | 'ivory' | 'modern';

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [theme, setTheme] = useState<HeroTheme>('royal');
  const { language, t } = useLanguage();
  const { getPhotoSrc, setIsModalOpen } = usePhotos();

  const ambedkarImgSrc = getPhotoSrc('dr_ambedkar_hero') || drAmbedkarHeroImg;
  const swamijiImgSrc = getPhotoSrc('taporatna_swamiji_hero') || taporatnaSwamijiHeroImg;

  return (
    <section
      className={`relative overflow-hidden transition-all duration-700 pt-6 sm:pt-10 pb-14 border-b ${
        theme === 'royal'
          ? 'bg-gradient-to-b from-[#050D1E] via-[#0A1A3B] to-[#081226] text-white border-blue-900/60'
          : theme === 'ivory'
          ? 'bg-gradient-to-b from-[#FFFDF9] via-[#FAF4E8] to-[#F3E7D3] text-slate-900 border-amber-300/60'
          : 'bg-gradient-to-b from-[#09151F] via-[#0D2423] to-[#0A191B] text-white border-emerald-900/60'
      }`}
    >
      {/* ========================================================= */}
      {/* ATMOSPHERIC BACKGROUND LAYERS & DISTINCTIVE LIGHTING */}
      {/* ========================================================= */}
      
      {/* 1. Ambient Spotlights */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {theme === 'royal' && (
          <>
            {/* Left Blue Glow behind Babasaheb */}
            <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-600/25 blur-3xl animate-pulse-soft" />
            {/* Right Saffron/Gold Glow behind Shivaji Maharaj */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-500/25 blur-3xl animate-pulse-soft" />
            {/* Center Royal Crown Glow */}
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-400/15 blur-3xl" />
          </>
        )}

        {theme === 'ivory' && (
          <>
            <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-blue-300/30 blur-3xl" />
            <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-amber-400/25 blur-3xl" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-amber-200/40 blur-3xl" />
          </>
        )}

        {theme === 'modern' && (
          <>
            <div className="absolute top-1/4 -left-20 w-96 h-96 rounded-full bg-cyan-600/20 blur-3xl" />
            <div className="absolute top-1/4 -right-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl" />
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-teal-400/15 blur-3xl" />
          </>
        )}
      </div>

      {/* 2. Geometric & Cultural Watermarks */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] flex items-center justify-between px-10">
        {/* Ashoka Chakra 24-spoke Watermark on Left */}
        <div className="w-80 h-80 rounded-full border-8 border-current border-dashed animate-spin-very-slow flex items-center justify-center">
          <div className="w-56 h-56 rounded-full border-4 border-current flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-current/30" />
          </div>
        </div>

        {/* Surya / Sunburst Mandala Watermark on Right */}
        <div className="w-80 h-80 rounded-full border-8 border-current border-dotted animate-spin-very-slow flex items-center justify-center">
          <div className="w-60 h-60 border-2 border-current rotate-45 flex items-center justify-center">
            <div className="w-40 h-40 border-2 border-current rotate-45" />
          </div>
        </div>
      </div>

      {/* 3. Subtle Pattern Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-sacred-pattern" />

      {/* ========================================================= */}
      {/* MAIN CONTENT WRAPPER */}
      {/* ========================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Compact Theme Switcher */}
        <div className="flex items-center justify-center mb-5">
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-black/35 backdrop-blur-md border border-white/15 text-xs shadow-md">
            <span className="px-2 py-0.5 text-[10px] font-bold text-amber-300/90 flex items-center gap-1">
              <Palette className="w-3 h-3 text-amber-400" />
              <span className="hidden xs:inline">{t('थीम:', 'Theme:')}</span>
            </span>
            <button
              onClick={() => setTheme('royal')}
              className={`px-2 py-1 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 ${
                theme === 'royal'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Royal Theme"
            >
              <Crown className="w-2.5 h-2.5" />
              <span>{t('राजेशाही', 'Royal')}</span>
            </button>
            <button
              onClick={() => setTheme('ivory')}
              className={`px-2 py-1 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 ${
                theme === 'ivory'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Ivory Theme"
            >
              <Sun className="w-2.5 h-2.5" />
              <span>{t('आयव्हरी', 'Ivory')}</span>
            </button>
            <button
              onClick={() => setTheme('modern')}
              className={`px-2 py-1 rounded-lg font-bold text-[10px] transition-all flex items-center gap-1 ${
                theme === 'modern'
                  ? 'bg-emerald-500 text-slate-950 shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
              title="Modern Theme"
            >
              <Feather className="w-2.5 h-2.5" />
              <span>{t('आधुनिक', 'Modern')}</span>
            </button>
          </div>
        </div>

        {/* Sanskrit Shlok Bar */}
        <div className="max-w-4xl mx-auto mb-7 text-center">
          <div
            className={`inline-flex flex-col sm:flex-row items-center justify-center gap-1.5 sm:gap-2 px-5 py-2.5 rounded-2xl shadow-lg transition-all ${
              theme === 'royal'
                ? 'bg-slate-900/90 border border-amber-400/40 text-amber-200'
                : theme === 'ivory'
                ? 'bg-white border-2 border-amber-300 text-amber-950'
                : 'bg-teal-950/80 border border-teal-400/40 text-teal-200'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs sm:text-base font-bold tracking-wide font-serif leading-relaxed">
                ॥ उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः । न हि सुप्तस्य सिंहस्य प्रविशन्ति मुखे मृगाः ॥
              </span>
            </div>
          </div>
          <p
            className={`mt-1.5 text-[11px] sm:text-xs font-medium transition-colors ${
              theme === 'ivory' ? 'text-slate-600' : 'text-slate-300'
            }`}
          >
            {t(
              '(परिश्रमानेच कार्ये सिद्धीस जातात, केवळ मनोरथांनी नाही · Success comes through persistent effort, never by mere wishing)',
              '(Tasks are accomplished through focused effort and hard work, never by mere wishful thinking)'
            )}
          </p>
        </div>

        {/* ========================================================= */}
        {/* MAIN HERO CARD CONTAINER */}
        {/* ========================================================= */}
        <div
          className={`relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${
            theme === 'royal'
              ? 'bg-gradient-to-b from-white via-slate-50 to-white text-slate-900 border-2 border-amber-400/60 ring-8 ring-amber-400/10'
              : theme === 'ivory'
              ? 'bg-white text-slate-900 border-2 border-amber-300 shadow-amber-900/10 ring-8 ring-amber-100'
              : 'bg-white text-slate-900 border-2 border-teal-500/50 ring-8 ring-teal-500/10'
          }`}
        >
          {/* Top saffron-gold highlight line */}
          <div className="h-2 w-full bg-gradient-to-r from-blue-700 via-amber-500 to-indigo-700" />

          <div className="p-6 sm:p-10 lg:p-12 relative">
            
            {/* Subtle card watermark */}
            <div className="absolute right-4 bottom-4 opacity-5 pointer-events-none">
              <BookOpen className="w-64 h-64 text-slate-900" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              
              {/* Left Circle: Dr. Baba Saheb Image */}
              <div className="order-2 lg:order-1 lg:col-span-3 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-blue-900/30 ring-4 ring-blue-300 bg-slate-100 mx-auto transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={ambedkarImgSrc}
                      alt="Dr. Babasaheb Ambedkar"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-blue-900/90 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-800"
                      title={t('फोटो बदला / अपलोड करा', 'Change / Upload Photo')}
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-3.5">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-100 text-blue-900 uppercase tracking-wider mb-1 shadow-2xs">
                      {t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय प्रेरणा', 'Inspiration · Dr. Babasaheb Ambedkar')}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                      {t('भारतरत्न डॉ. बाबासाहेब आंबेडकर', 'Bharat Ratna Dr. B. R. Ambedkar')}
                    </h2>
                    <p className="text-[11px] font-semibold text-blue-900 mt-0.5">
                      {t('"शिका, संघटित व्हा आणि संघर्ष करा"', '"Educate, Agitate, Organise"')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Center Content: Exact titles & font emphasis from the drawing */}
              <div className="order-1 lg:order-2 lg:col-span-6 text-center space-y-4">
                
                {/* Main Title: MSR's Academy (Clean typography, no symbols or top badge) */}
                <div className="flex flex-col items-center justify-center pb-2">
                  <div className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-3xl bg-gradient-to-r from-[#061226] via-[#0b1f44] to-[#071530] text-white shadow-2xl border-2 border-amber-400/90 ring-4 ring-amber-400/20 backdrop-blur-md hover:border-amber-300 transition-all duration-300 hover:scale-[1.02]">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-serif tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-amber-100 drop-shadow-[0_4px_16px_rgba(251,191,36,0.35)]">
                      MSR's Academy
                    </h1>
                  </div>
                  <p className="mt-2.5 text-base sm:text-lg md:text-xl font-normal font-sans text-slate-700">
                    Honesty, Consistency and Dedication
                  </p>
                </div>

                {/* Primary Dual Institution Titles */}
                <div className="space-y-3 pt-1">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-blue-950 tracking-tight leading-tight font-serif drop-shadow-xs">
                    <span>{t('डॉ. बाबासाहेब आंबेडकर ग्रंथालय', 'Dr. Babasaheb Ambedkar Library')}</span>
                  </h1>

                  <div className="flex items-center justify-center gap-3 text-slate-400">
                    <div className="h-px w-12 bg-amber-400/80" />
                    <span className="text-sm font-bold text-amber-800 font-serif px-2">{t('व', '&')}</span>
                    <div className="h-px w-12 bg-amber-400/80" />
                  </div>

                  <div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-amber-950 tracking-tight font-serif leading-tight">
                      {t('तपोरत्न अभ्यासिका', 'Taporatna Study Centre')}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm font-bold">
                      <span className="text-rose-800 bg-rose-50 px-3.5 py-1 rounded-full border border-rose-300 shadow-2xs">
                        {t('(फक्त मुलींसाठी अभ्यासिका)', '(Exclusively For Female Students)')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Circle: Taporatna Yogirajendra Mahaswamiji */}
              <div className="order-3 lg:order-3 lg:col-span-3 flex flex-col items-center text-center">
                <div className="relative group">
                  <div className="relative w-36 h-36 sm:w-44 sm:h-44 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl shadow-amber-900/30 ring-4 ring-amber-300 bg-slate-100 mx-auto transition-transform duration-500 group-hover:scale-105">
                    <img
                      src={swamijiImgSrc}
                      alt="Taporatna Yogirajendra Shivacharya Mahaswamiji"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" />
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="absolute bottom-2 right-2 p-2 rounded-full bg-amber-700/90 text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-amber-600"
                      title={t('फोटो बदला / अपलोड करा', 'Change / Upload Photo')}
                    >
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="mt-3.5">
                    <span className="inline-block px-3 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-900 uppercase tracking-wider mb-1 shadow-2xs">
                      {t('तपोरत्न अभ्यासिका प्रेरणा', 'Inspiration · Taporatna Abhyasika')}
                    </span>
                    <h2 className="text-sm sm:text-base font-bold text-slate-900 font-serif">
                      {t('लिंगैक्य श्री. ष. ब्र. तपोरत्नं योगिराजेंद्र शिवाचार्य महास्वामीजी', 'Taporatna Yogirajendra Shivacharya Mahaswamiji')}
                    </h2>
                    <p className="text-[11px] font-semibold text-amber-900 mt-0.5">
                      {t('"ज्ञान आणि तपाचे पावन प्रतीक"', '"Sacred Symbol of Knowledge & Penance"')}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
