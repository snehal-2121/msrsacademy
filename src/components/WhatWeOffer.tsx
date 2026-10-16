import React from 'react';
import { WHAT_WE_OFFER } from '../data/academyData';
import { Check, ArrowRight, Award, BookOpen, Sparkles } from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface WhatWeOfferProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const WhatWeOffer: React.FC<WhatWeOfferProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const { language, t } = useLanguage();

  return (
    <section id="what-we-offer" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            What We Offer
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {t(
              'विद्यार्थ्यांच्या शालेय पायाभरणीपासून ते स्पर्धा परीक्षांमध्ये अंतिम यशापर्यंतची परिपूर्ण आणि समर्पित शिक्षण व्यवस्था.',
              'A dedicated academic roadmap supporting students from foundational school batches to ultimate civil services success.'
            )}
          </p>
        </div>

        {/* 5 Distinct Cards matching handwritten page 6 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_OFFER.map((item, index) => {
            const isFreeHighlight = !item.isPaid;
            const primaryTitle = language === 'mr' ? item.marathiTitle : item.title;
            const secondaryTitle = language === 'mr' ? item.title : item.marathiTitle;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col rounded-2xl p-6 sm:p-7 border transition-all duration-300 hover:shadow-lg ${
                  isFreeHighlight
                    ? 'bg-gradient-to-b from-blue-50/70 to-white border-blue-200 lg:col-span-2'
                    : 'bg-white border-slate-200 hover:border-blue-300'
                }`}
              >
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-900 text-white font-bold text-xs flex items-center justify-center font-mono">
                      0{index + 1}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                        isFreeHighlight
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {item.tag}
                    </span>
                  </div>
                  {isFreeHighlight && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200 uppercase tracking-wider">
                      {t('१००% विनामूल्य मार्गदर्शन', '100% Free Guidance')}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div className="mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {primaryTitle}
                  </h3>
                  <p className="text-xs font-medium text-blue-900 mt-1">
                    {secondaryTitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Target Exams / Subjects list */}
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                    {t('समाविष्ट परीक्षा व घटक:', 'Key Highlights & Covered Areas:')}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {item.exams.map((exam, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                      >
                        <Check className="w-3 h-3 text-blue-600" />
                        {exam}
                      </span>
                    ))}
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => {
                      if (item.id === 'free-guidance') {
                        onOpenInquiry('competitive', 'Free Guidance Session');
                      } else if (item.id === 'ssc-tenth' || item.id === 'school-coaching' || item.id === 'scholarships') {
                        onOpenInquiry('coaching', item.title);
                      } else {
                        onOpenInquiry('competitive', item.title);
                      }
                    }}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center justify-center gap-2 group ${
                      isFreeHighlight
                        ? 'bg-blue-900 text-white hover:bg-blue-800 shadow-xs'
                        : 'bg-slate-100 text-slate-900 hover:bg-blue-900 hover:text-white'
                    }`}
                  >
                    <span>{t(item.action === 'Register for Guidance' ? 'विनामूल्य नोंदणी करा' : 'प्रवेशासाठी संपर्क करा', item.action)}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Transition Banner to Girls Study Hall */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest font-bold text-amber-100">
              {t('विशेष दालन · तपोरत्न संकुल', 'Specialized Taporatna Abhyasika')}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              "Do you want to study in silent mode? Then come here!"
            </h3>
            <p className="text-xs sm:text-sm text-amber-100 max-w-xl">
              {t(
                'तपोरत्न अभ्यासिका — केवळ विद्यार्थिनींसाठी स्वतंत्र, सुरक्षित व वातानुकूलित अभ्यास कक्ष.',
                'Taporatna Study Room — Exclusively for female aspirants with 24/7 CCTV and silent study compartments.'
              )}
            </p>
          </div>
          <button
            onClick={() => onNavigate('library')}
            className="px-6 py-3 bg-white text-amber-900 font-bold text-xs sm:text-sm rounded-xl hover:bg-amber-50 transition-all shadow-md shrink-0 whitespace-nowrap active:scale-98"
          >
            {t('तपोरत्न अभ्यासिका पहा', 'Explore Taporatna Abhyasika')}
          </button>
        </div>

      </div>
    </section>
  );
};
