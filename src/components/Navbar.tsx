import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavSection } from '../types';
import academyLogo from '../assets/images/msr_academy_logo.jpg';
import { useLanguage } from '../context/LanguageContext';
import { LanguageTranslator } from './LanguageTranslator';

interface NavbarProps {
  activeSection: NavSection;
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, t } = useLanguage();
  const [currentHash, setCurrentHash] = useState(() => (typeof window !== 'undefined' ? window.location.hash : ''));

  React.useEffect(() => {
    const handleHash = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navLinks: { id: NavSection; label: string; marathi: string; english: string }[] = [
    { id: 'home', label: 'Home', marathi: 'मुख्यपृष्ठ', english: 'Home' },
    { id: 'about', label: 'About us', marathi: 'आमच्याबद्दल', english: 'About Us' },
    { id: 'coaching', label: 'Coaching', marathi: 'शालेय वर्ग', english: 'Coaching Classes' },
    { id: 'competitive', label: 'Competitive section', marathi: 'स्पर्धा परीक्षा', english: 'Competitive Exams' },
    { id: 'library', label: 'Library section', marathi: 'ग्रंथालय व अभ्यासिका', english: 'Library' },
    { id: 'agriculture', label: 'Agriculture Drone', marathi: 'कृषी ड्रोन', english: 'Agriculture Drone' },
    { id: 'gallery', label: 'Gallery', marathi: 'छायाचित्रे', english: 'Gallery' },
  ];

  const handleLinkClick = (id: NavSection) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo / Brand Name */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-3 text-left group focus:outline-hidden"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full p-0.5 bg-gradient-to-br from-amber-300 via-yellow-500 to-amber-700 shadow-xs group-hover:scale-105 transition-transform shrink-0">
              <img
                src={academyLogo}
                alt="MSR's Academy Seal Logo"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <span className="block text-lg sm:text-xl font-bold tracking-tight text-slate-900 font-sans group-hover:text-blue-900 transition-colors">
                MSR's Academy
              </span>
            </div>
          </button>

          {/* Nav Items with Active Language Translation */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const isAbout = item.id === 'about';
              const isHome = item.id === 'home';
              const hasAboutHash = currentHash.includes('about') || currentHash.includes('started');
              const isActive =
                (isAbout && (activeSection === 'about' || (activeSection === 'home' && hasAboutHash))) ||
                (isHome && activeSection === 'home' && !hasAboutHash) ||
                (!isAbout && !isHome && (activeSection === item.id || (item.id === 'competitive' && activeSection.startsWith('exam-'))));
              const displayLabel = language === 'mr' ? item.marathi : item.english;
              return (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors relative whitespace-nowrap rounded-md ${
                    isActive
                      ? 'text-blue-900 font-bold bg-blue-50/80'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                  }`}
                >
                  {displayLabel}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-700 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Header Area: Language Switcher + Enquire Now + Mobile Menu Button */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Prominent Navbar Language Translator */}
            <LanguageTranslator variant="navbar" className="inline-flex" />

            <button
              onClick={() => onOpenInquiry()}
              className="px-3.5 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap active:scale-98 border border-blue-950"
            >
              {t('चौकशी करा', 'Enquire Now')}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in fade-in slide-in-from-top-2">
          {/* Mobile Translator in Drawer */}
          <LanguageTranslator variant="drawer" className="mb-2" />

          {navLinks.map((item) => {
            const isAbout = item.id === 'about';
            const isHome = item.id === 'home';
            const hasAboutHash = currentHash.includes('about') || currentHash.includes('started');
            const isActive =
              (isAbout && (activeSection === 'about' || (activeSection === 'home' && hasAboutHash))) ||
              (isHome && activeSection === 'home' && !hasAboutHash) ||
              (!isAbout && !isHome && (activeSection === item.id || (item.id === 'competitive' && activeSection.startsWith('exam-'))));
            const primaryTitle = language === 'mr' ? item.marathi : item.english;
            const secondaryTitle = language === 'mr' ? item.english : item.marathi;
            return (
              <button
                key={item.id}
                onClick={() => handleLinkClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-900 font-semibold'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <span>{primaryTitle}</span>
                <span className="text-xs text-slate-400 font-normal">{secondaryTitle}</span>
              </button>
            );
          })}
          <div className="pt-3 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => {
                onOpenInquiry('abhyasika');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-lg text-center"
            >
              {t('तपोरत्न अभ्यासिका प्रवेश', 'Taporatna Study')}
            </button>
            <button
              onClick={() => {
                onOpenInquiry('drone');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2.5 px-3 bg-emerald-50 text-emerald-900 border border-emerald-200 text-xs font-semibold rounded-lg text-center"
            >
              {t('ड्रोन फवारणी बुकिंग', 'Drone Spraying')}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
