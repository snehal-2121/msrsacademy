import React from 'react';
import { ArrowLeft, GraduationCap, Award } from 'lucide-react';
import { COACHING_DETAILS } from '../data/academyData';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';
import { EditableImage } from '../components/EditableImage';

interface CoachingPageProps {
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category?: string, subject?: string) => void;
}

export const CoachingPage: React.FC<CoachingPageProps> = ({ onNavigate, onOpenInquiry }) => {
  const { language, t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const coachingClassImg = getPhotoSrc('coaching_students');

  return (
    <div className="min-h-screen bg-slate-50/60 pb-20">
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{t('← मुख्य पानावर परत', '← Back to Home')}</span>
          </button>

          <div className="text-xs text-slate-500 font-medium">
            <span>{t('मुख्य पान', 'Home')}</span> <span className="mx-1">/</span>{' '}
            <span className="text-slate-900 font-bold">
              {t('शालेय कोचिंग (१ ली ते १० वी वर्ग)', 'School Coaching (1st to 10th Std)')}
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white py-14 sm:py-20 text-center relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-semibold mb-4">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('भविष्यातील पिढीसाठी पायाभूत शिक्षण', 'Foundation Education for the Future Generation')}</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white mb-3">
            {t('१ ली ते १० वी विशेष कोचिंग क्लासेस', 'Coaching Classes (1st to 10th Standard)')}
          </h1>
          <p className="text-lg sm:text-xl font-serif text-amber-300 font-bold max-w-3xl mx-auto">
            {t(
              '१ ली ते १० वी विशेष मार्गदर्शन वर्ग व शिष्यवृत्ती परीक्षा तयारी',
              'Special Guidance Batches & All Scholarship Exam Preparations'
            )}
          </p>
          <p className="mt-4 text-xs sm:text-base text-blue-100 leading-relaxed max-w-3xl mx-auto">
            {t(
              'मराठी, सेमी-इंग्रजी व इंग्रजी माध्यमांच्या सर्व विषयांचे सखोल शिक्षण, नियमित चाचण्या आणि शिष्यवृत्ती परीक्षांचे विशेष वर्ग.',
              'In-depth coaching for Marathi, Semi-English and English mediums across all subjects, weekly unit tests, and specialized scholarship batches.'
            )}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {coachingClassImg && (
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                <EditableImage
                  slotId="core_coaching_batch"
                  fallbackSlotId="coaching_students"
                  alt="Coaching classroom"
                  className="w-full h-64 sm:h-80"
                  imgClassName="w-full h-64 sm:h-80 object-cover"
                />
              </div>
            )}
            <div className={`${coachingClassImg ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-4`}>
              <span className="text-xs font-bold text-blue-900 bg-blue-50 px-3 py-1 rounded-md">
                {t('वैशिष्ट्ये व पद्धती', 'Key Highlights & Methodology')}
              </span>
              <h2 className="text-2xl font-bold font-serif text-slate-900">
                {t(
                  'प्रत्येक विद्यार्थ्याकडे वैयक्तिक लक्ष व संकल्पना स्पष्टीकरण',
                  'Personalized Attention & Deep Conceptual Clarity'
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {t(
                  'गणित, विज्ञान आणि इंग्रजी या कठीण वाटणाऱ्या विषयांची भीती घालवून अभ्यासाची गोडी निर्माण केली जाते. दर आठवड्याला घटक चाचण्या आणि पालकांशी नियमित संवाद साधला जातो.',
                  'We eliminate fear of Mathematics, Science and English by cultivating genuine interest and conceptual mastery, with regular weekly mock tests and parent meetings.'
                )}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">{t('इयत्ता १ ली ते १० वी', '1st to 10th Std')}</span>
                  <span className="text-[11px] text-slate-500">{t('सर्व विषय', 'All Subjects')}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">{t('सर्व माध्यमे', 'All Mediums')}</span>
                  <span className="text-[11px] text-slate-500">{t('मराठी / सेमी / इंग्रजी', 'Marathi / Semi / English')}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-xs font-bold text-slate-900 block">{t('साप्ताहिक चाचण्या', 'Weekly Unit Tests')}</span>
                  <span className="text-[11px] text-slate-500">{t('नियमित प्रगती अहवाल', 'Regular Progress Cards')}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onOpenInquiry('coaching', 'शालेय कोचिंग प्रवेश चौकशी')}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-md transition-all"
                >
                  {t('शालेय बॅचसाठी प्रवेश चौकशी करा →', 'Inquire for School Batch Admission →')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scholarships */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md mb-12">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block mb-1">
              {t('प्रज्ञाशोध व शिष्यवृत्ती पाया', 'Talent & Competitive Foundation')}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900">
              {t(
                'शासनमान्य सर्व शिष्यवृत्ती व प्रज्ञाशोध परीक्षांची तयारी',
                'All Scholarship Exams Conducted by State & Central Govt.'
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {t(
                'शासकीय व राष्ट्रीय पातळीवरील सर्व नामांकित शिष्यवृत्ती व प्रज्ञाशोध परीक्षांचे विशेष मार्गदर्शन वर्ग.',
                'Specialized coaching batches for state and national merit scholarship and talent search examinations.'
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COACHING_DETAILS.scholarshipExams.map((exam, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-900 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-blue-800" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                    {language === 'mr' ? exam.marathi : exam.name}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'mr' ? exam.name : exam.marathi}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
