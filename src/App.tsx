import React, { useState, useEffect } from 'react';
import { NavSection } from './types';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { WhatWeOffer } from './components/WhatWeOffer';
import { TapovanAbhyasika } from './components/TapovanAbhyasika';
import { AmbedkarLibrary } from './components/AmbedkarLibrary';
import { CoachingSection } from './components/CoachingSection';
import { CompetitiveSection } from './components/CompetitiveSection';
import { AgricultureDroneSection } from './components/AgricultureDroneSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { PhotoProvider } from './context/PhotoContext';
import { LanguageProvider } from './context/LanguageContext';
import { PhotoManagerModal } from './components/PhotoManagerModal';

// Dedicated Next-Page Views
import { AboutPage } from './pages/AboutPage';
import { LibraryPage } from './pages/LibraryPage';
import { AgriculturePage } from './pages/AgriculturePage';
import { CoachingPage } from './pages/CoachingPage';
import { CompetitivePage } from './pages/CompetitivePage';
import { GalleryPage } from './pages/GalleryPage';
import { ContactPage } from './pages/ContactPage';
import { ExamRoadmapPage } from './pages/ExamRoadmapPage';

export default function App() {
  const getSectionFromHash = (): NavSection => {
    if (typeof window === 'undefined') return 'home';
    const cleanHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (cleanHash === 'about' || cleanHash === 'about-section') {
      return 'home';
    }
    if (cleanHash === 'how-it-started' || cleanHash === 'about-page') {
      return 'about';
    }
    const validSections: NavSection[] = [
      'home',
      'about',
      'about-page',
      'how-it-started',
      'coaching',
      'competitive',
      'library',
      'agriculture',
      'gallery',
      'contact',
      'exam-mpsc',
      'exam-upsc',
      'exam-ssc',
      'exam-rrb',
      'exam-police'
    ];
    return validSections.includes(cleanHash as NavSection) ? (cleanHash as NavSection) : 'home';
  };

  const [activeSection, setActiveSection] = useState<NavSection>(getSectionFromHash);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [inquiryCategory, setInquiryCategory] = useState<string>('abhyasika');
  const [inquirySubject, setInquirySubject] = useState<string>('');

  // Synchronize browser history / URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const cleanHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
      
      // If hash is about or about-section, remain on home page and scroll to about section
      if (cleanHash === 'about' || cleanHash === 'about-section') {
        setActiveSection('home');
        setTimeout(() => {
          const el = document.getElementById('about-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 80);
        return;
      }

      // If hash is how-it-started or about-page, open the dedicated next page
      if (cleanHash === 'how-it-started' || cleanHash === 'about-page') {
        setActiveSection('about');
        setTimeout(() => {
          if (cleanHash === 'how-it-started') {
            const el = document.getElementById('how-it-started-section');
            if (el) {
              el.scrollIntoView({ behavior: 'smooth' });
              return;
            }
          }
          window.scrollTo({ top: 0, behavior: 'instant' });
        }, 100);
        return;
      }

      const section = getSectionFromHash();
      setActiveSection(section);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handle scroll on initial load
  useEffect(() => {
    const cleanHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (cleanHash === 'about' || cleanHash === 'about-section') {
      setTimeout(() => {
        const el = document.getElementById('about-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    } else if (cleanHash === 'how-it-started') {
      setTimeout(() => {
        const el = document.getElementById('how-it-started-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 150);
    }
  }, []);

  const handleNavigate = (section: NavSection) => {
    // 1. About Us: stays on Home page and scrolls to the About Us section
    if (section === 'about') {
      setActiveSection('home');
      window.location.hash = '#/about';
      setTimeout(() => {
        const el = document.getElementById('about-section');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 60);
      return;
    }

    // 2. How It Started / About Page: opens on the dedicated NEXT page
    if (section === 'how-it-started' || section === 'about-page') {
      setActiveSection('about');
      window.location.hash = section === 'how-it-started' ? '#/how-it-started' : '#/about-page';
      window.scrollTo({ top: 0, behavior: 'instant' });
      if (section === 'how-it-started') {
        setTimeout(() => {
          const el = document.getElementById('how-it-started-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      return;
    }

    setActiveSection(section);
    if (section === 'home') {
      window.history.pushState(null, '', window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      window.location.hash = `#/${section}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleOpenInquiry = (category: string = 'abhyasika', subject: string = '') => {
    setInquiryCategory(category);
    setInquirySubject(subject);
    setInquiryModalOpen(true);
  };

  return (
    <LanguageProvider>
      <PhotoProvider>
        <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-800 antialiased font-sans">

        {/* 1. Top Bar Navigation: Clicking any link opens that section on its dedicated page */}
        <Navbar
          activeSection={activeSection}
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />

        <main className="flex-1">
          {/* Multi-Page Architecture: If section is NOT 'home', open that specific dedicated page */}
          {(activeSection === 'about' || activeSection === 'about-page') && (
            <AboutPage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'library' && (
            <LibraryPage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'agriculture' && (
            <AgriculturePage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'coaching' && (
            <CoachingPage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'competitive' && (
            <CompetitivePage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'gallery' && (
            <GalleryPage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'contact' && (
            <ContactPage
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {/* Dedicated Exam Roadmap & Study Map Pages */}
          {activeSection === 'exam-mpsc' && (
            <ExamRoadmapPage
              examId="mpsc"
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'exam-upsc' && (
            <ExamRoadmapPage
              examId="upsc"
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'exam-ssc' && (
            <ExamRoadmapPage
              examId="ssc"
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'exam-rrb' && (
            <ExamRoadmapPage
              examId="rrb"
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {activeSection === 'exam-police' && (
            <ExamRoadmapPage
              examId="police"
              onNavigate={handleNavigate}
              onOpenInquiry={handleOpenInquiry}
            />
          )}

          {/* Home View: Retains ALL original sections, exactly as requested ("keep all old work as it is") */}
          {activeSection === 'home' && (
            <>
              {/* 2. Top Hero Banner matching handwritten Page 1 layout with background themes */}
              <HeroBanner
                onNavigate={handleNavigate}
                onOpenInquiry={handleOpenInquiry}
              />

              {/* 3. What We Offer? matching handwritten Page 6 */}
              <WhatWeOffer
                onNavigate={handleNavigate}
                onOpenInquiry={handleOpenInquiry}
              />

              {/* 4. तपोवन अभ्यासिका (Study Room) - What we have for Girls */}
              <TapovanAbhyasika
                onOpenInquiry={handleOpenInquiry}
              />

              {/* 5. Dr. Babasaheb Ambedkar Library (ग्रंथालय) - What else we have? */}
              <AmbedkarLibrary
                onOpenInquiry={handleOpenInquiry}
                onNavigate={handleNavigate}
              />

              {/* 6. What's for Future Generation - Coaching Classes 1st - 10th std */}
              <CoachingSection
                onOpenInquiry={handleOpenInquiry}
                onNavigate={handleNavigate}
              />

              {/* 7. Competitive Section (C.S.) - Free Mentorship & Paid Batches (MPSC & Police Bharti) */}
              <CompetitiveSection
                onNavigate={handleNavigate}
                onOpenInquiry={handleOpenInquiry}
              />

              {/* 8. Agriculture Section - What we do for Sustainable Development */}
              <AgricultureDroneSection
                onOpenInquiry={handleOpenInquiry}
                onNavigate={handleNavigate}
              />

              {/* 9. About Us Section */}
              <AboutSection
                onNavigate={handleNavigate}
              />

              {/* 10. Gallery Section */}
              <GallerySection />
            </>
          )}
        </main>

        {/* Footer with Contact Details */}
        <Footer
          onNavigate={handleNavigate}
          onOpenInquiry={handleOpenInquiry}
        />

        {/* Global Interactive Inquiry / Seat Booking Modal */}
        <InquiryModal
          isOpen={inquiryModalOpen}
          onClose={() => setInquiryModalOpen(false)}
          defaultCategory={inquiryCategory}
          defaultSubject={inquirySubject}
        />

        {/* Direct Original Photo Manager Modal */}
        <PhotoManagerModal />
      </div>
    </PhotoProvider>
    </LanguageProvider>
  );
}
