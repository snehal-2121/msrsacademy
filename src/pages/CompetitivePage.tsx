import React from 'react';
import { ArrowLeft, Target, CheckCircle2 } from 'lucide-react';
import { NavSection } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { CompetitivePlatformRoadmap } from '../components/CompetitivePlatformRoadmap';

interface CompetitivePageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const CompetitivePage: React.FC<CompetitivePageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();
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
            <span className="text-slate-900 font-bold">{t('स्पर्धा परीक्षा विभाग (C.S.)', 'Competitive Section')}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-4">
            <Target className="w-3.5 h-3.5" />
            <span>मोफत मार्गदर्शन व सराव बॅचेस</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            Competitive Exams Section (C.S.)
          </h1>
          <p className="text-lg sm:text-xl font-serif text-amber-300 font-bold max-w-3xl mx-auto">
            MPSC, पोलीस भरती, तलाठी व सर्व स्पर्धा परीक्षांचे प्रामाणिक मार्गदर्शन
          </p>
          <p className="mt-4 text-xs sm:text-base text-blue-100 leading-relaxed max-w-3xl mx-auto">
            कोणतीही दिशाभूल न करता अभ्यासक्रमाची अचूक मांडणी, योग्य संदर्भ साहित्याची निवड आणि मोफत समुपदेशन.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Guidance vs Coaching */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-3xl p-8 border border-blue-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                विनामूल्य समुपदेशन
              </span>
              <h3 className="text-xl font-bold font-serif text-slate-900 mt-2 mb-3">
                सर्व स्पर्धा परीक्षांचे मोफत मार्गदर्शन (Free Guidance)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                कोणत्याही शुल्काशिवाय अभ्यासक्रम समजून घेणे, पुस्तकांची यादी, दररोजचे अभ्यासाचे नियोजन आणि आत्मविश्वासाने तयारी कशी करावी याविषयी मोफत समुपदेशन.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> UPSC &amp; MPSC राज्यसेवा प्राथमिक तयारी</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> पोलीस भरती शारीरिक व लेखी मार्गदर्शन</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> तलाठी, ग्रामसेवक, जिल्हा परिषद सरळसेवा</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenInquiry('competitive', 'मोफत समुपदेशन सत्र नोंदणी')}
              className="mt-6 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-bold transition-all"
            >
              मार्गदर्शनासाठी वेळ निश्चित करा
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-amber-200 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-3 py-1 rounded-md">
                नियमित सराव वर्ग
              </span>
              <h3 className="text-xl font-bold font-serif text-slate-900 mt-2 mb-3">
                स्पर्धा परीक्षा विशेष बॅचेस (Paid Coaching Batches)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                मराठी व इंग्रजी व्याकरण, अंकगणित व बुद्धिमत्ता, चालू घडामोडी आणि मागील वर्षांच्या प्रश्नपत्रिकांचा सखोल सराव.
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> MPSC गट-ब व गट-क संयुक्त परीक्षा वर्ग</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> पोलीस भरती विशेष लेखी परीक्षा सराव बॅच</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-600" /> चालू घडामोडी व साप्ताहिक टेस्ट सिरीज</li>
              </ul>
            </div>
            <button
              onClick={() => onOpenInquiry('competitive', 'स्पर्धा परीक्षा बॅच प्रवेश')}
              className="mt-6 w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md"
            >
              बॅच प्रवेशासाठी चौकशी करा
            </button>
          </div>
        </div>

        {/* 4-Pillar Competitive Exam Preparation Platform Roadmap (MPSC, UPSC, SSC, RRB) */}
        <CompetitivePlatformRoadmap onNavigate={onNavigate} onOpenInquiry={onOpenInquiry} />

      </div>
    </div>
  );
};
