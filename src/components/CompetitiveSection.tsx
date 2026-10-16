import React, { useState } from 'react';
import { Compass, BookCheck, ShieldAlert, CheckCircle2, Award, Clock, ArrowRight, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { NavSection } from '../types';

interface CompetitiveSectionProps {
  onNavigate?: (section: NavSection) => void;
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const CompetitiveSection: React.FC<CompetitiveSectionProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'free' | 'paid'>('free');

  return (
    <section id="competitive-section" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-100 text-blue-900 text-xs font-semibold mb-3">
            <Compass className="w-3.5 h-3.5 text-blue-800" />
            <span>{t('स्पर्धा परीक्षा विभाग (C.S.)', 'Competitive Exams Wing (C.S.)')}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight font-serif">
            {t('स्पर्धा परीक्षा विभाग', 'Competitive Examination Section')}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {t(
              'स्पर्धा परीक्षेची दिशा ठरवण्यासाठी निःशुल्क तज्ज्ञ मार्गदर्शन, आणि राज्यसेवा, पोलीस भरती व सरळसेवेसाठी परिपूर्ण दर्जेदार वर्ग.',
              'Free expert mentorship to choose your competitive exam roadmap, and comprehensive coaching classes for MPSC, Police Bharti, and Saralseva.'
            )}
          </p>

          {/* Toggle between Free Guidance & Paid Coaching */}
          <div className="inline-flex p-1 mt-6 bg-slate-100 rounded-xl border border-slate-200">
            <button
              onClick={() => setActiveTab('free')}
              className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'free'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('(१) विनामूल्य मार्गदर्शन (Free Guidance)', '(1) Free Guidance (Mentorship)')}
            </button>
            <button
              onClick={() => setActiveTab('paid')}
              className={`px-4 sm:px-6 py-2 text-xs sm:text-sm font-bold rounded-lg transition-all ${
                activeTab === 'paid'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('(२) सशुल्क वर्ग (Paid Coaching & Tests)', '(2) Paid Coaching & Test Series')}
            </button>
          </div>
        </div>

        {/* Tab 1: Free Guidance */}
        {activeTab === 'free' && (
          <div className="bg-gradient-to-br from-blue-50/70 via-white to-slate-50 rounded-2xl p-6 sm:p-10 border border-blue-200 shadow-xs">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-blue-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase tracking-wider">
                    {t('१००% विनामूल्य समुपदेशन', '100% Free Mentorship & Counseling')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-2">
                    {t('सर्व स्पर्धा परीक्षांचे मोफत मार्गदर्शन (फक्त समुपदेशन)', 'Free Guidance of All Competitive Exams (Not Coaching)')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {t(
                      'सर्व स्पर्धा परीक्षांची दिशा, पद्धती, अभ्यासक्रम व पुस्तकांची अचूक यादी मोफत दिली जाते.',
                      'Accurate syllabus breakdown, exam pattern clarification, and recommended booklists provided completely free.'
                    )}
                  </p>
                </div>
                <button
                  onClick={() => onOpenInquiry('competitive', 'Free Guidance Session Booking')}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs self-start md:self-auto shrink-0"
                >
                  {t('मोफत मार्गदर्शन सत्र बुक करा', 'Book Free Mentorship Call')}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {[
                  {
                    name: t("UPSC नागरी सेवा", "UPSC Civil Services"),
                    desc: t("IAS, IPS, IFS परीक्षा पद्धती, NCERT वाचन योजना व वैकल्पिक विषयाची निवड.", "IAS, IPS, IFS exam pattern, NCERT strategy and optional selection tips.")
                  },
                  {
                    name: t("MPSC (राज्यसेवा)", "MPSC (State Services)"),
                    desc: t("राज्यसेवा पूर्व व मुख्य परीक्षा नियोजन, अभ्यासक्रम विश्लेषण व संदर्भ पुस्तकांची यादी.", "Rajyaseva prelims + mains strategy, syllabus decode, and reference booklist.")
                  },
                  {
                    name: t("सरळसेवा भरती", "Direct Recruitment (Saralseva)"),
                    desc: t("तलाठी, ग्रामसेवक, जिल्हा परिषद, लिपिक व वनरक्षक भरती मार्गदर्शन.", "Talathi, Gramsevak, Zilla Parishad, Clerk, and Forest Guard guidelines.")
                  },
                  {
                    name: t("रेल्वे भरती (RRB)", "Railway Exams (RRB)"),
                    desc: t("NTPC, ग्रुप D, ALP गणिताच्या शॉर्ट ट्रिक्स व सामान्य विज्ञानाची तयारी.", "NTPC, Group D, ALP math speed tricks and general science approach.")
                  },
                  {
                    name: t("कर्मचारी निवड आयोग (SSC)", "Staff Selection (SSC)"),
                    desc: t("CGL, CHSL, MTS अंकगणित, बुद्धिमत्ता व इंग्रजी व्याकरण रोडमॅप.", "CGL, CHSL, MTS quantitative reasoning and English grammar roadmaps.")
                  },
                  {
                    name: t("पोलीस भरती, NEET व JEE", "Police Bharti, NEET and JEE"),
                    desc: t("शारीरिक चाचणी निकष, लेखी परीक्षा गुण वाढीची रणनीती, NEET व JEE समुपदेशन.", "Physical test requirements, written exam marks strategy, and NEET & JEE counseling.")
                  },
                ].map((item, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
                    <h4 className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      {item.name}
                    </h4>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-blue-100/60 rounded-xl text-xs text-blue-900 border border-blue-200 flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-blue-800 shrink-0" />
                <span>
                  <strong>{t('महत्त्वाची नोंद:', 'Note:')}</strong>{' '}
                  {t(
                    'आम्ही विद्यार्थ्यांना अनावश्यक क्लास लावण्यास भाग पाडत नाही. आमच्या मोफत समुपदेशनातून तुम्हाला ग्रंथालयातील स्व-अभ्यास पुरेसा आहे की क्लासची गरज आहे, हे स्पष्ट सांगितले जाते.',
                    'We do not push students into unnecessary coaching. Our free mentorship clarifies whether self-study with our library is sufficient or if you need classroom coaching.'
                  )}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Paid Coaching */}
        {activeTab === 'paid' && (
          <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-xs">
            <div className="max-w-4xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
                <div>
                  <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wider">
                    {t('सशुल्क वर्ग व टेस्ट सिरीज', 'Paid Classroom & Test Series')}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-serif mt-2">
                    {t('राज्यसेवा व सरळसेवा परीक्षेसाठी विशेष वर्ग', 'Coaching Classes for State PCS & Direct Recruitment')}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    (MPSC - Separate Group B and C, Police Bharti, Saralseva)
                  </p>
                </div>
                <button
                  onClick={() => onOpenInquiry('competitive', 'MPSC Separate & Police Bharti Batch')}
                  className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs self-start md:self-auto shrink-0"
                >
                  {t('बॅच शुल्क व वेळापत्रकाची चौकशी', 'Inquire Batch Fees & Schedule')}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* MPSC Separate Card */}
                <div className="p-6 rounded-2xl border border-blue-200 bg-blue-50/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider">
                      {t('लक्ष्य अभ्यासक्रम', 'Target Course')}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">
                      MPSC Separate Group B &amp; C
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {t(
                        'PSI, STI, ASO, कर सहाय्यक आणि दुय्यम निबंधक पदांसाठी. इतिहास, भूगोल, राज्यघटना, अर्थशास्त्र, सामान्य विज्ञान, बुद्धिमत्ता व चालू घडामोडींचे सखोल मार्गदर्शन.',
                        'For PSI, STI, ASO, Tax Assistant, and Sub-Registrar posts. Full coverage of History, Geography, Polity, Economics, General Science, Aptitude, Reasoning, and Current Affairs.'
                      )}
                    </p>
                    <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>{t('दररोज ३ तासांचे परीक्षाभिमुख लेक्चर्स', 'Daily 3-hour targeted lecture sessions')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>{t('साप्ताहिक OMR-आधारित टेस्ट सिरीज व गुणवत्ता यादी', 'Weekly OMR-based test papers with instant ranks')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-700" />
                        <span>{t('दर्जेदार मुद्रित अभ्यास साहित्य व नोट्स', 'Comprehensive printed study material & notes')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenInquiry('competitive', 'MPSC Separate Group B/C Batch')}
                    className="mt-6 w-full py-2.5 bg-white border border-blue-300 text-blue-900 hover:bg-blue-900 hover:text-white font-bold text-xs rounded-xl transition-all shadow-2xs"
                  >
                    {t('MPSC बॅचमध्ये प्रवेश घ्या', 'Join MPSC Batch')}
                  </button>
                </div>

                {/* Police Bharti Card */}
                <div className="p-6 rounded-2xl border border-amber-200 bg-amber-50/30 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
                      {t('लक्ष्य अभ्यासक्रम', 'Target Course')}
                    </span>
                    <h4 className="text-lg font-bold text-slate-900 mt-1">
                      {t('पोलीस भरती विशेष वर्ग', 'Police Bharti Dedicated Batch')}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {t(
                        'मराठी व्याकरण, अंकगणित, बुद्धिमत्ता चाचणी आणि सामान्य ज्ञान यांची १०० पैकी १०० गुणांची अचूक तयारी.',
                        'Precision preparation for Marathi grammar, arithmetic, reasoning, and general knowledge for top marks.'
                      )}
                    </p>
                    <div className="mt-4 space-y-1.5 text-xs text-slate-700">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('शेकडो मागील प्रश्नपत्रिकांचे सराव विश्लेषण', 'In-depth analysis of hundreds of previous papers')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('गणित व बुद्धिमत्तेच्या अचूक शॉर्टकट ट्रिक्स', 'Speed shortcut tricks for math and reasoning')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-700" />
                        <span>{t('मैदानी चाचणीसाठी मार्गदर्शन व वेळ व्यवस्थापन', 'Physical stamina and time management guidance')}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenInquiry('competitive', 'Police Bharti Dedicated Batch')}
                    className="mt-6 w-full py-2.5 bg-white border border-amber-300 text-amber-900 hover:bg-amber-900 hover:text-white font-bold text-xs rounded-xl transition-all shadow-2xs"
                  >
                    {t('पोलीस भरती बॅचमध्ये प्रवेश घ्या', 'Join Police Bharti Batch')}
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* Button to Open Competitive Study Roadmap on Next Page */}
        {onNavigate && (
          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('competitive')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 hover:from-blue-900 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm shadow-lg transition-all"
            >
              <Compass className="w-4 h-4 text-amber-400" />
              <span>
                {t(
                  'स्पर्धा परीक्षा स्टडी रोडमॅप पुढील पानावर पहा (MPSC, UPSC, SSC, RRB)',
                  'Open Competitive Exam Study Roadmap on Next Page (MPSC, UPSC, SSC, RRB)'
                )}
              </span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
