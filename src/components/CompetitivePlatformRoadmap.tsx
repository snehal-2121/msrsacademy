import React from 'react';
import {
  Compass,
  ArrowRight,
  BookOpen,
  Award,
  Layers,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { COMPETITIVE_ROADMAP_DATA } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';

interface CompetitivePlatformRoadmapProps {
  onNavigate?: (section: NavSection) => void;
  onOpenInquiry?: (category: string, subject?: string) => void;
}

export const CompetitivePlatformRoadmap: React.FC<CompetitivePlatformRoadmapProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const { language, t } = useLanguage();

  const handlePillarClick = (examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb') => {
    if (onNavigate) {
      const targetSection = `exam-${examId}` as NavSection;
      onNavigate(targetSection);
    }
  };

  return (
    <div className="mt-12 bg-white rounded-3xl border border-slate-200/90 shadow-lg p-6 sm:p-10 overflow-hidden relative">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-50/50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Header Badge */}
      <div className="text-center max-w-3xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Layers className="w-3.5 h-3.5 text-blue-700" />
          <span>{t('स्पर्धा परीक्षा संपूर्ण तयारी प्लॅटफॉर्म', 'All Exam Preparation Platform')}</span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif tracking-tight">
          {t('स्पर्धा परीक्षा रोडमॅप व रचना (Exam Roadmap)', 'Competitive Exam Roadmap & Platform')}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-xl mx-auto leading-relaxed">
          {t(
            'MPSC, UPSC, SSC आणि RRB या चार प्रमुख परीक्षांची रचना. खालील स्तंभावर क्लिक करून सविस्तर स्टडी मॅप आणि परीक्षा आराखडा पहा.',
            'Structured 4-pillar preparation platform. Click any exam pillar to explore its complete visual Study Map and preparation roadmap.'
          )}
        </p>
      </div>

      {/* ========================================================================= */}
      {/* EXACT HANDWRITTEN TREE ROADMAP DIAGRAM (From user uploaded sketch) */}
      {/* ========================================================================= */}
      <div className="max-w-4xl mx-auto relative z-10 bg-slate-50/90 rounded-2xl p-5 sm:p-8 border border-slate-200 shadow-xs">
        <div className="text-center mb-4">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest block mb-1">
            {t('मार्गदर्शक रचना रेखाचित्र · Architectural Diagram', 'Handwritten Roadmap Architecture')}
          </span>

          {/* Root Node: Competitive section */}
          <div className="inline-block relative">
            <div className="px-6 sm:px-8 py-2.5 rounded-xl bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 text-white font-serif font-black text-sm sm:text-base shadow-md border border-blue-800 flex items-center justify-center gap-2">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Competitive section.</span>
              <span className="text-xs font-sans text-amber-300 font-semibold hidden sm:inline">
                {t('(स्पर्धा परीक्षा विभाग)', '(All Exams)')}
              </span>
            </div>

            {/* Vertical stem from root */}
            <div className="w-[3.5px] h-7 bg-slate-900 mx-auto rounded-full shadow-xs" />
            <div className="w-3.5 h-3.5 rounded-full bg-slate-900 ring-[2.5px] ring-white shadow-xs mx-auto -mt-2 z-10 relative" />
          </div>
        </div>

        {/* Tree Branching Bar */}
        <div className="relative mt-0">
          {/* Horizontal line spanning across all 4 columns */}
          <div className="hidden md:block absolute top-0 left-[12%] right-[12%] h-[3.5px] bg-slate-900 rounded-full shadow-2xs" />

          {/* 4 Pillars matching the drawing: MPSC, UPSC, SSC, RRB */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 relative pt-0 md:pt-4">
            {COMPETITIVE_ROADMAP_DATA.map((exam) => {
              return (
                <div key={exam.id} className="flex flex-col items-center">
                  {/* Vertical stem drop on desktop */}
                  <div className="hidden md:block w-[3.5px] h-5 bg-slate-900 -mt-4 mb-1 rounded-full shadow-2xs" />
                  <div className="hidden md:block w-2.5 h-2.5 border-b-[2.5px] border-r-[2.5px] border-slate-900 rotate-45 -mt-2.5 mb-1.5" />

                  {/* Card Button Navigating to Dedicated Exam Roadmap Page */}
                  <button
                    onClick={() => handlePillarClick(exam.id)}
                    className="w-full p-4 sm:p-5 rounded-2xl text-center transition-all duration-300 border flex flex-col items-center justify-between gap-2.5 group bg-white text-slate-800 border-slate-200 hover:border-blue-700 hover:shadow-xl hover:scale-103 cursor-pointer shadow-xs min-h-[170px]"
                  >
                    <div className="flex flex-col items-center justify-center gap-1">
                      <span className="text-xl sm:text-2xl font-black font-serif tracking-wider text-slate-900 group-hover:text-blue-900 transition-colors">
                        {exam.code}
                      </span>

                      <span className="text-xs font-semibold text-slate-600 line-clamp-1">
                        {language === 'mr' ? exam.marathiFullName.split('(')[0] : exam.fullName}
                      </span>
                    </div>

                    <div className="w-full pt-1.5 border-t border-slate-100 flex flex-col items-center gap-1.5">
                      <span className="text-[11px] text-slate-500 line-clamp-1">
                        {exam.popularExams[0]?.name}
                      </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-900 bg-blue-50 group-hover:bg-blue-900 group-hover:text-white px-3 py-1 rounded-lg transition-colors shadow-2xs">
                        <span>{t('स्टडी मॅप उघडा', 'View Study Map')}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Note */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{t('प्रत्येक स्तंभावर क्लिक करून स्वतंत्र स्टडी मॅप पानावर जा.', 'Click any pillar to open its dedicated Study Map & Roadmap page.')}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700">{t('उपलब्ध:', 'Available:')}</span>
            <span className="font-mono font-bold text-blue-900">MPSC · UPSC · SSC · RRB</span>
          </div>
        </div>

      </div>
    </div>
  );
};
