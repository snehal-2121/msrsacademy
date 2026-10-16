import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Compass,
  Award,
  BookOpen,
  CheckCircle2,
  Layers,
  CalendarCheck,
  ArrowRight,
} from 'lucide-react';
import { NavSection } from '../types';
import { COMPETITIVE_ROADMAP_DATA, ExamPillarData } from '../data/academyData';
import { useLanguage } from '../context/LanguageContext';
import { StudyMapDiagram } from '../components/StudyMapDiagram';
import { ExamNodeDetailPage } from './ExamNodeDetailPage';
import { getExamNodeBreadcrumbPath } from '../data/examTreeHierarchy';

interface ExamRoadmapPageProps {
  examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb';
  onNavigate: (section: NavSection) => void;
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const ExamRoadmapPage: React.FC<ExamRoadmapPageProps> = ({
  examId = 'mpsc',
  onNavigate,
  onOpenInquiry,
}) => {
  const { language, t } = useLanguage();
  const [selectedNode, setSelectedNode] = useState<{
    nodeId: string;
    title: string;
    marathiTitle: string;
  } | null>(null);

  // Reset selected node when switching between MPSC, UPSC, SSC, RRB
  useEffect(() => {
    setSelectedNode(null);
  }, [examId]);

  const currentExam: ExamPillarData =
    COMPETITIVE_ROADMAP_DATA.find((e) => e.id === examId) || COMPETITIVE_ROADMAP_DATA[0];

  const handleSelectNode = (nodeId: string, title: string, marathiTitle: string) => {
    setSelectedNode({ nodeId, title, marathiTitle });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbPath = selectedNode
    ? getExamNodeBreadcrumbPath(examId, selectedNode.nodeId)
    : [];
  const parentCrumb =
    breadcrumbPath.length >= 2 ? breadcrumbPath[breadcrumbPath.length - 2] : null;

  return (
    <div className="min-h-screen bg-slate-50/70 pb-20">
      
      {/* Top Breadcrumb & Return Bar */}
      <div className="bg-white border-b border-slate-200 sticky top-16 sm:top-20 z-40 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {selectedNode ? (
            <button
              onClick={() => {
                if (parentCrumb && parentCrumb.nodeId !== `${examId}-root`) {
                  handleSelectNode(
                    parentCrumb.nodeId,
                    parentCrumb.label,
                    parentCrumb.marathiLabel
                  );
                } else {
                  setSelectedNode(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>
                {parentCrumb && parentCrumb.nodeId !== `${examId}-root`
                  ? t(
                      `← मागे जा (${parentCrumb.label})`,
                      `← Back to ${parentCrumb.label}`
                    )
                  : t(
                      `← ${currentExam.code} ट्री-मॅपवर परत जा`,
                      `← Back to ${currentExam.code} Tree Map`
                    )}
              </span>
            </button>
          ) : (
            <button
              onClick={() => onNavigate('competitive')}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-900 hover:text-blue-700 bg-blue-50/80 hover:bg-blue-100 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t('← स्पर्धा परीक्षा विभागाकडे परत', '← Back to Competitive Section')}</span>
            </button>
          )}

          <div className="text-xs text-slate-500 font-medium hidden sm:flex items-center gap-1.5 flex-wrap">
            <button onClick={() => onNavigate('home')} className="hover:text-blue-900 cursor-pointer">Home</button>
            <span>/</span>
            <button onClick={() => onNavigate('competitive')} className="hover:text-blue-900 cursor-pointer">Competitive Section</button>
            <span>/</span>
            <button
              onClick={() => setSelectedNode(null)}
              className={selectedNode ? 'hover:text-blue-900 cursor-pointer' : 'text-slate-900 font-bold'}
            >
              {currentExam.code} Study Map
            </button>
            {breadcrumbPath
              .filter((c) => c.nodeId !== `${examId}-root`)
              .map((crumb, idx, arr) => {
                const isLast = idx === arr.length - 1;
                return (
                  <React.Fragment key={crumb.nodeId}>
                    <span>/</span>
                    {isLast ? (
                      <span className="text-blue-900 font-bold truncate max-w-[180px]">
                        {language === 'mr' ? crumb.marathiLabel : crumb.label}
                      </span>
                    ) : (
                      <button
                        onClick={() =>
                          handleSelectNode(crumb.nodeId, crumb.label, crumb.marathiLabel)
                        }
                        className="hover:text-blue-900 cursor-pointer"
                      >
                        {language === 'mr' ? crumb.marathiLabel : crumb.label}
                      </button>
                    )}
                  </React.Fragment>
                );
              })}
          </div>
        </div>
      </div>

      {/* If a specific Tree Node is clicked, open its Dedicated Study Material Page */}
      {selectedNode ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <ExamNodeDetailPage
            examId={examId}
            nodeId={selectedNode.nodeId}
            nodeTitle={selectedNode.title}
            nodeMarathiTitle={selectedNode.marathiTitle}
            onBackToMap={() => {
              setSelectedNode(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectChildNode={handleSelectNode}
            onOpenInquiry={onOpenInquiry}
          />
        </div>
      ) : (
        <>
          {/* Hero Header */}
          <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-indigo-950 text-white py-12 sm:py-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-semibold mb-3">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{t('स्पर्धा परीक्षा संपूर्ण तयारी प्लॅटफॉर्म', 'Competitive Exam Preparation Platform')}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white mb-2">
                    {currentExam.code}{' '}
                    <span className="text-amber-300 text-2xl sm:text-3xl font-bold font-sans">
                      {t('स्टडी मॅप व परीक्षा रोडमॅप', 'Study Map & Preparation Paths')}
                    </span>
                  </h1>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                    {language === 'mr' ? currentExam.marathiFullName : currentExam.fullName} —{' '}
                    {language === 'mr' ? currentExam.marathiTagline : currentExam.tagline}
                  </p>
                </div>

                {/* Quick Consultation CTA */}
                <div className="shrink-0 flex flex-wrap gap-3">
                  <button
                    onClick={() => onOpenInquiry('competitive', `${currentExam.code} मोफत समुपदेशन व बॅच प्रवेश`)}
                    className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2"
                  >
                    <CalendarCheck className="w-4 h-4 text-slate-950" />
                    <span>{t('मोफत मार्गदर्शन व जागा नोंदणी', 'Book Free Guidance Session')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-10">

            {/* ========================================================================= */}
            {/* SECTION 1: THE INTERACTIVE TREE ROADMAP DIAGRAM (Click any node to open page) */}
            {/* ========================================================================= */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-blue-900" />
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                    {currentExam.code} {t('इंटरॅक्टिव्ह ट्री स्टडी मॅप (कोणत्याही घटकावर क्लिक करा)', 'Interactive Tree Study Map (Click Any Node to Open Material)')}
                  </h2>
                </div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {t('✨ ट्री मधील कोणत्याही बॉक्सवर क्लिक केल्यास स्वतंत्र अभ्यास साहित्य पान उघडेल', '✨ Click any box in the tree to open its dedicated study material page')}
                </span>
              </div>

              {/* Render the visual Study Map Diagram with real-time next-page node navigation */}
              <StudyMapDiagram
                examId={examId}
                onOpenInquiry={onOpenInquiry}
                onSelectNode={handleSelectNode}
              />
            </div>

            {/* Bottom Navigation Ribbon */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-xs">
              <button
                onClick={() => onNavigate('competitive')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{t('← स्पर्धा परीक्षा मुख्य विभागावर परत', 'Back to Competitive Section')}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenInquiry('competitive', `${currentExam.code} मोफत समुपदेशन व बॅच प्रवेश`)}
                  className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center gap-2"
                >
                  <CalendarCheck className="w-4 h-4 text-slate-950" />
                  <span>{t('मोफत मार्गदर्शन व जागा नोंदणी', `Register for ${currentExam.code} Guidance`)}</span>
                </button>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
};
