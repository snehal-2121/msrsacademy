import React, { useState } from 'react';
import { GraduationCap, CheckCircle2, ArrowRight } from 'lucide-react';
import { usePhotos } from '../context/PhotoContext';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';

interface CoachingSectionProps {
  onNavigate?: (section: NavSection) => void;
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const CoachingSection: React.FC<CoachingSectionProps> = ({
  onOpenInquiry,
  onNavigate,
}) => {
  const { t } = useLanguage();
  const { getPhotoSrc } = usePhotos();
  const coachingImg = getPhotoSrc('coaching_students');
  const [selectedStandardGroup, setSelectedStandardGroup] = useState<'primary' | 'middle' | 'tenth'>('tenth');

  return (
    <section id="coaching-section" className="py-16 sm:py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching Page 3 */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-amber-100 text-amber-900 text-xs font-semibold mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{t('शालेय शिक्षण व सुप्त गुण विकास', 'School Education & Talent Nurturing')}</span>
          </div>

          <span className="block text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">
            {t('भावी पिढीसाठी काय आहे? · What\'s for Future Generation', "What's for Future Generation · भावी पिढीसाठी")}
          </span>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t('इयत्ता १ ली ते १० वी शालेय शिकवणी वर्ग', 'Coaching Classes for 1st – 10th Std.')}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              '१ ली ते १० वी च्या विद्यार्थ्यांसाठी सर्व विषयांचे परिपूर्ण मार्गदर्शन आणि संकल्पना स्पष्टीकरणावर भर.',
              'Comprehensive guidance for 1st to 10th standard students across all subjects, focusing on crystal-clear concepts.'
            )}
          </p>

          {onNavigate && (
            <div className="mt-4">
              <button
                onClick={() => onNavigate('coaching')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-900 hover:text-blue-700 bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 px-3.5 py-1.5 rounded-full transition-all shadow-2xs"
              >
                <span>{t('📖 समर्पित कोचिंग व शिष्यवृत्ती विभाग पहा', '📖 View Dedicated Coaching & Scholarship Section')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Top 3-Pillar Quick Highlight: Boards / Mediums / Subjects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
              {t('अभ्यासक्रम मंडळ', 'Curriculum Covered')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              State Board, CBSE &amp; ICSE
            </h3>
            <p className="text-xs text-slate-600">
              {t(
                'अभ्यासक्रमाची सखोल मांडणी, धड्यानुसार प्रश्नोत्तरे आणि पाठ्यपुस्तक आधारित नियमित सराव.',
                'Complete chapter-wise syllabus tracking, textbook problem solving, and standard workbook practice aligned with modern school curriculum.'
              )}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 block mb-1">
              {t('शिक्षणाचे माध्यम', 'Mediums of Instruction')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t('मराठी · सेमी इंग्रजी · इंग्रजी', 'Marathi · Semi-English · English')}
            </h3>
            <p className="text-xs text-slate-600">
              {t(
                'मराठी व सेमी माध्यमाच्या विद्यार्थ्यांना विज्ञान व गणितातील संकल्पना सोप्या भाषेत समजण्यासाठी द्विभाषिक मार्गदर्शन.',
                'Clear bilingual instruction helping Marathi and Semi-English students master technical English terms in Science & Mathematics with ease.'
              )}
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              {t('प्रमुख व आवश्यक विषय', 'Core & Need-Based Subjects')}
            </span>
            <h3 className="text-base font-bold text-slate-900 mb-2">
              {t('गणित, विज्ञान, इंग्रजी व इतर', 'Maths, Science, English & More')}
            </h3>
            <p className="text-xs text-slate-600">
              {t(
                'विद्यार्थ्यांच्या गरजेनुसार सर्व विषयांचे मार्गदर्शन, साप्ताहिक चाचणी मालिका आणि गृहपाठाची तपासणी.',
                "All subjects covered depending on students' individual requirement, with dedicated weekly test series and homework checking."
              )}
            </p>
          </div>
        </div>

        {/* Main Interactive Coaching Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left: Coaching Image Showcase */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-lg bg-white group">
              {coachingImg && (
                <img
                  src={coachingImg}
                  alt="Msr's Academy Students & Coaching"
                  referrerPolicy="no-referrer"
                  className="w-full h-64 sm:h-72 object-cover group-hover:scale-102 transition-transform duration-500"
                />
              )}
              <div className="p-5">
                <span className="text-xs font-bold text-blue-900 uppercase tracking-wider">
                  {t("MSR's Academy विद्यार्थी व अभ्यास वर्ग", "MSR's Academy Students & Study Batches")}
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1">
                  {t('मर्यादित बॅच व वैयक्तिक लक्ष', 'Personalized Attention & Limited Batches')}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {t(
                    'प्रत्येक विद्यार्थ्याच्या शंकांचे निरसन, नियमित उपस्थिती नोंद आणि पालकांशी सातत्यपूर्ण संवाद.',
                    'Direct doubt clearance for every student, attendance monitoring, and regular parent-teacher reviews.'
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Right: Class Grouping Selector & Details */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center gap-2 mb-6 border-b border-slate-100 pb-4">
              <button
                onClick={() => setSelectedStandardGroup('tenth')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedStandardGroup === 'tenth'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t('१० वी (SSC बोर्ड विशेष बॅच)', '10th (SSC Board Special)')}
              </button>
              <button
                onClick={() => setSelectedStandardGroup('middle')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedStandardGroup === 'middle'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t('५ वी ते ९ वी (माध्यमिक वर्ग)', '5th to 9th (Middle School)')}
              </button>
              <button
                onClick={() => setSelectedStandardGroup('primary')}
                className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${
                  selectedStandardGroup === 'primary'
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {t('१ ली ते ४ थी (प्राथमिक पायाभूत)', '1st to 4th (Primary Foundation)')}
              </button>
            </div>

            {selectedStandardGroup === 'tenth' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">
                    {t('१० वी / SSC बोर्ड परीक्षेची परिपूर्ण तयारी', '10th / SSC Board Intensive Coaching')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t(
                      'गणित भाग १ व २, विज्ञान आणि तंत्रज्ञान भाग १ व २, आणि इंग्रजी व्याकरण व रायटिंग स्किल्सवर विशेष प्रभुत्व.',
                      'Specialized focus on Mathematics Part 1 & 2, Science & Technology Part 1 & 2, and English Grammar & Writing Skills for maximum board percentage.'
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('धड्यानुसार साप्ताहिक चाचणी व मॉडेल उत्तरे', 'Weekly chapter tests with model answer sheets')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('बोर्ड परीक्षांपूर्वी सराव पूर्वपरीक्षा (Prelim)', 'Board preliminary exam series before finals')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('प्रमेये व सूत्रांची विशेष उजळणी पुस्तिका', 'Special theorem and formula revision sheets')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('मराठी व सेमी-इंग्रजी सहज सोपी शिकवण', 'Marathi & Semi-English friendly teaching')}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedStandardGroup === 'middle' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">
                    {t('५ वी ते ९ वी – संकल्पना आणि पाया पक्का करणे', '5th to 9th Standard Concept Builder')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t(
                      'बीजगणित, भूमिती, मूलभूत भौतिकशास्त्र, रसायनशास्त्र आणि इंग्रजी रचनेचा पाया मजबूत करणे.',
                      'Transitioning students smoothly into high school with strong logic in algebra, geometry, basic physics, chemistry, and English composition.'
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('शाळेचा गृहपाठ व वह्या तपासणीत मदत', 'Daily school homework & notebook guidance')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('८ वी व ९ वी पासूनच १० वी चा पाया तयार', 'Foundation for 10th SSC from 8th & 9th std')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('इंग्रजी शब्दसंग्रह व व्याकरण दृढीकरण', 'Grammar & Vocabulary reinforcement')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('घटक चाचण्यांचा नियमित सराव', 'Regular unit exam mock tests')}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedStandardGroup === 'primary' && (
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-bold text-slate-900 font-serif">
                    {t('१ ली ते ४ थी – अभ्यासाची गोडी व मूलभूत कौशल्ये', '1st to 4th Standard Foundational Love for Learning')}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t(
                      'खेळकर वातावरणात वाचन, सुंदर हस्ताक्षर, पाढे, तोंडी गणित आणि सामान्यज्ञानाची आवड निर्माण करणे.',
                      'Friendly, joyful atmosphere to build early reading fluency, neat handwriting, mental arithmetic tables, and curiosity for environmental studies.'
                    )}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-700">
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('शुद्ध वाचन, लेखन आणि शब्दलेखन सराव', 'Reading, writing and spellings mastery')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('पाढे व तोंडी गणिताचा वेगवान सराव', 'Tables & mental math speed practice')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('४ थी शिष्यवृत्ती परीक्षेची पूर्वतयारी', 'Early preparation for 4th Scholarship')}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{t('संस्कार, शिस्त व सकारात्मक सवयी', 'Moral education & discipline cultivation')}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                {t('नवीन बॅचेस प्रवेश सुरू आहेत!', 'New batches starting soon for all standards!')}
              </span>
              <button
                onClick={() => onOpenInquiry('coaching', `शालेय वर्ग प्रवेश - ${selectedStandardGroup.toUpperCase()}`)}
                className="w-full sm:w-auto px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs rounded-xl transition-all shadow-xs"
              >
                {t('शालेय बॅच प्रवेशासाठी चौकशी करा', 'Inquire School Batch Admission')}
              </button>
            </div>
          </div>
        </div>

        {/* Simple Reference to Dedicated Coaching Class Section */}
        {onNavigate && (
          <div className="mt-8 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-blue-900" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                  {t('शालेय कोचिंग व शिष्यवृत्ती परीक्षांचे स्वतंत्र दालन', 'Dedicated School Coaching & Scholarship Section')}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5">
                  {t(
                    'सर्व शासकीय शिष्यवृत्ती परीक्षा, अभ्यासक्रम व संपूर्ण कार्यपद्धतीची सविस्तर माहिती पहा.',
                    'Explore full scholarship exams, detailed curriculum tracking, and coaching methodology.'
                  )}
                </p>
              </div>
            </div>

            <button
              onClick={() => onNavigate('coaching')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-all hover:scale-102 shrink-0"
            >
              <span>{t('समर्पित कोचिंग विभाग पहा', 'View Dedicated Coaching Section')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
