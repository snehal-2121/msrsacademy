import React from 'react';
import { 
  ArrowRight, 
  BookOpen, 
  Quote
} from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface AboutSectionProps {
  onNavigate?: (section: NavSection) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  const handleOpenNextPage = () => {
    if (onNavigate) {
      onNavigate('how-it-started');
    } else {
      window.location.hash = '#/how-it-started';
    }
  };

  return (
    <section id="about-section" className="py-14 sm:py-20 bg-white border-b border-slate-200 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-serif text-slate-900 tracking-tight">
            About us.
          </h2>
        </div>

        {/* Core "About Us." Card */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-3xl p-6 sm:p-10 shadow-xs border border-slate-200 relative overflow-hidden mb-8">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

          {/* A Little Quote About Us */}
          <div className="mb-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white shadow-sm border border-blue-900/40 flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-xs text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-white/10">
              <Quote className="w-4 h-4" />
            </div>
            <div className="space-y-1">
              <p className="text-sm sm:text-base font-serif italic text-slate-100 font-medium leading-relaxed">
                “Education is the movement from darkness to light — empowering every young mind to realize their potential and serve the nation with dedication.”
              </p>
              <p className="text-xs sm:text-sm text-amber-300 font-serif">
                “शिक्षण हे केवळ ज्ञान नसून, ते स्वाभिमान, सक्षमीकरण आणि राष्ट्र उभारणीचे सर्वात मोठे सामर्थ्य आहे.”
              </p>
            </div>
          </div>

          <div className="space-y-4 text-base sm:text-lg text-slate-800 leading-relaxed font-normal">
            <div className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <p>
                We are the team trying to doing revolutionary things &amp; educational of all field and woman empowerment by providing safe, healthy environment &amp; opportunities for quality study.
              </p>
            </div>
            
            <div className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <p>
                We guide the aspirants who wants to serve the humanity, sociaty &amp; Ultimately to the Nation of India by themeselves by becoming the civil servants.
              </p>
            </div>
            
            <div className="bg-white/90 p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
              <p>
                We trying to build the carreer &amp; to shape future of such aspirants from early educational age.
              </p>
            </div>
          </div>

          {/* Single Reference to "How It Started" that Opens on the Next Dedicated Page */}
          <div className="mt-8 pt-6 border-t border-slate-200/90 bg-gradient-to-r from-amber-50/90 via-amber-50/60 to-orange-50/90 p-5 sm:p-6 rounded-2xl border border-amber-200/90 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-1.5 max-w-2xl">
              <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 inline-flex items-center gap-1.5 bg-amber-100/80 px-2.5 py-0.5 rounded-md">
                <BookOpen className="w-3.5 h-3.5 text-amber-800" />
                <span>{t('कशी झाली सुरुवात?', 'How it is Started ?')}</span>
              </span>
              <h4 className="text-base sm:text-lg font-bold font-serif text-slate-900">
                {t(
                  'कशी झाली सुरुवात? व ध्येय आणि उद्दिष्टे (How it is Started ? & Vision-Mission)',
                  'How it is Started ? & Vision-Mission'
                )}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'आमचा २०१८ ते २०२४ चा प्रेरणादायी प्रवास, डॉ. बाबासाहेब आंबेडकर ग्रंथालय व तपोवन अभ्यासिका स्थापना आणि शैक्षणिक व शाश्वत कृषी क्षेत्रातील संपूर्ण ध्येय-उद्दिष्टे पुढील पानावर वाचा.',
                  'Read our authentic 2018-2024 story, the establishment of Dr. Babasaheb Ambedkar Library & Taporatn Abhyasika, and our complete Educational & Agricultural Vision-Mission on the dedicated page.'
                )}
              </p>
            </div>

            <button
              onClick={handleOpenNextPage}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all cursor-pointer group shrink-0"
            >
              <span>{t('वाचा संपूर्ण कहाणी (Read How It Started)', 'Read How It Started')}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
