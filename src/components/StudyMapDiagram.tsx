import React, { useState } from 'react';
import { Sparkles, ZoomIn, ZoomOut, Maximize2, Layers, CheckCircle, Info, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export interface StudyMapDiagramProps {
  examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb';
  onOpenInquiry?: (category: string, subject?: string) => void;
  onSelectNode?: (nodeId: string, title: string, marathiTitle: string) => void;
}

export const StudyMapDiagram: React.FC<StudyMapDiagramProps> = ({
  examId,
  onOpenInquiry,
  onSelectNode,
}) => {
  const { language, t } = useLanguage();
  const [mpscView, setMpscView] = useState<'overview' | 'nongazetted'>('overview');
  const [activeNodeModal, setActiveNodeModalState] = useState<{
    title: string;
    marathiTitle: string;
    details: string;
    marathiDetails: string;
    category?: string;
  } | null>(null);

  const resolveNodeId = (titleText: string, color?: string): string => {
    const lower = titleText.trim().toLowerCase();
    if (examId === 'mpsc') {
      if (lower === 'mpsc') return 'mpsc-root';
      if (color === 'teal') {
        if (lower.includes('gazetted')) return 'mpsc-gazetted';
        if (lower.includes('syllabus')) return 'mpsc-gazetted-syllabus';
        if (lower.includes('post')) return 'mpsc-gazetted-post';
        if (lower.includes('pattern')) return 'mpsc-gazetted-pattern';
        if (lower.includes('prelim')) return 'mpsc-gazetted-prelims';
        if (lower.includes('gs-i') || lower.includes('gs')) return 'mpsc-gazetted-gs1';
        if (lower.includes('csat')) return 'mpsc-gazetted-csat';
        if (lower.includes('main')) return 'mpsc-gazetted-mains';
        if (lower.includes('interview')) return 'mpsc-gazetted-interview';
        return 'mpsc-gazetted';
      }
      if (lower.includes('non-gazetted') || lower.includes('group b & c')) return 'mpsc-nongazetted';
      if (lower.includes('syllabus')) return 'mpsc-nongazetted-syllabus';
      if (lower.includes('post')) return 'mpsc-nongazetted-post';
      if (lower.includes('pattern')) return 'mpsc-nongazetted-pattern';
      if (lower.includes('prelim')) return 'mpsc-nongazetted-prelims';
      if (lower.includes('main')) return 'mpsc-nongazetted-mains';
      return 'mpsc-nongazetted';
    }
    if (examId === 'upsc') {
      if (lower === 'upsc') return 'upsc-root';
      if (lower.includes('syllabus')) return 'upsc-syllabus';
      if (lower.includes('pattern') || lower.includes('stage')) return 'upsc-pattern';
      if (lower.includes('prelim')) return 'upsc-prelims';
      if (lower.includes('main')) return 'upsc-mains';
      if (lower.includes('interview')) return 'upsc-interview';
      if (lower.includes('post')) return 'upsc-posts';
      return 'upsc-root';
    }
    if (examId === 'ssc') {
      if (lower === 'ssc') return 'ssc-root';
      if (lower.includes('syllabus')) return 'ssc-syllabus';
      if (lower.includes('pattern') || lower.includes('stage')) return 'ssc-pattern';
      if (lower.includes('tier-i (cbt)') || lower === 'tier-i') return 'ssc-tier1';
      if (lower.includes('tier-ii')) return 'ssc-tier2';
      if (lower.includes('skill')) return 'ssc-skill';
      if (lower.includes('post')) return 'ssc-posts';
      return 'ssc-root';
    }
    if (lower === 'rrb') return 'rrb-root';
    if (lower.includes('syllabus')) return 'rrb-syllabus';
    if (lower.includes('pattern') || lower.includes('stage')) return 'rrb-pattern';
    if (lower.includes('cbt-1')) return 'rrb-cbt1';
    if (lower.includes('cbt-2')) return 'rrb-cbt2';
    if (lower.includes('cbat')) return 'rrb-cbat';
    if (lower.includes('post')) return 'rrb-posts';
    return 'rrb-root';
  };

  const setActiveNodeModal = (
    nodeInfo: {
      title: string;
      marathiTitle: string;
      details: string;
      marathiDetails: string;
      category?: string;
    } | null
  ) => {
    if (!nodeInfo) {
      setActiveNodeModalState(null);
      return;
    }
    if (onSelectNode) {
      const nodeId = resolveNodeId(nodeInfo.title);
      onSelectNode(nodeId, nodeInfo.title, nodeInfo.marathiTitle);
      return;
    }
    setActiveNodeModalState(nodeInfo);
  };

  // Common node card component matching the exact drawing style
  const DiagramNode = ({
    label,
    marathiLabel,
    subLabel,
    color = 'terracotta',
    onClick,
    size = 'md',
    isActive = false,
  }: {
    label: string;
    marathiLabel?: string;
    subLabel?: string;
    color?: 'terracotta' | 'teal' | 'navy';
    onClick?: () => void;
    size?: 'sm' | 'md' | 'lg';
    isActive?: boolean;
  }) => {
    const colorClasses =
      color === 'teal'
        ? 'bg-[#F2FAF9] text-[#0A4D4C] border-[#0E6260] hover:bg-[#E3F4F3]'
        : color === 'navy'
        ? 'bg-blue-950 text-white border-amber-400'
        : 'bg-[#FFF6F2] text-[#692411] border-[#91381E] hover:bg-[#FCE8DF]';

    const sizeClasses =
      size === 'lg'
        ? 'px-6 sm:px-10 py-2.5 sm:py-3 text-base sm:text-lg font-bold min-w-[130px] sm:min-w-[170px]'
        : size === 'sm'
        ? 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold min-w-[70px] sm:min-w-[95px]'
        : 'px-4 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-base font-bold min-w-[90px] sm:min-w-[125px]';

    const handleDefaultClick = () => {
      if (onSelectNode) {
        const nodeId = resolveNodeId(label, color);
        onSelectNode(nodeId, label, marathiLabel || label);
        return;
      }
      if (onClick) {
        onClick();
      }
    };

    return (
      <button
        type="button"
        onClick={handleDefaultClick}
        className={`relative inline-flex flex-col items-center justify-center rounded-xl border-[2.5px] shadow-sm transition-all duration-200 transform hover:scale-103 cursor-pointer select-none font-sans z-10 ${sizeClasses} ${colorClasses} ${
          isActive ? 'ring-2 ring-offset-2 ring-amber-400 scale-103' : ''
        }`}
        style={{
          boxShadow:
            color === 'teal'
              ? '3px 4px 0px rgba(14, 98, 96, 0.35)'
              : color === 'navy'
              ? '3px 4px 0px rgba(15, 23, 42, 0.4)'
              : '3px 4px 0px rgba(145, 56, 30, 0.35)',
        }}
      >
        <span className="tracking-wide text-center leading-tight font-bold">
          {language === 'mr' && marathiLabel ? marathiLabel : label}
        </span>
        {subLabel && (
          <span className="text-[10px] opacity-80 font-medium mt-0.5">{subLabel}</span>
        )}
      </button>
    );
  };

  // Reusable Tree Branch Helpers for Crystal Clear Visual Connections
  const VBranch = ({
    height = 'h-6',
    color = 'terracotta',
    className = '',
  }: {
    height?: string;
    color?: 'terracotta' | 'teal' | 'navy' | 'slate';
    className?: string;
  }) => {
    const bg =
      color === 'teal'
        ? 'bg-[#0E6260]'
        : color === 'navy' || color === 'slate'
        ? 'bg-slate-900'
        : 'bg-[#91381E]';
    return <div className={`w-[3.5px] ${height} ${bg} mx-auto rounded-full shadow-2xs ${className}`} />;
  };

  const HBranch = ({
    color = 'terracotta',
    className = '',
  }: {
    color?: 'terracotta' | 'teal' | 'navy' | 'slate';
    className?: string;
  }) => {
    const bg =
      color === 'teal'
        ? 'bg-[#0E6260]'
        : color === 'navy' || color === 'slate'
        ? 'bg-slate-900'
        : 'bg-[#91381E]';
    return <div className={`h-[3.5px] ${bg} rounded-full shadow-2xs ${className}`} />;
  };

  const JunctionNode = ({ color = 'terracotta' }: { color?: 'terracotta' | 'teal' | 'navy' | 'slate' }) => {
    const bg =
      color === 'teal'
        ? 'bg-[#0E6260]'
        : color === 'navy' || color === 'slate'
        ? 'bg-slate-900'
        : 'bg-[#91381E]';
    return (
      <div
        className={`w-3.5 h-3.5 rounded-full ${bg} ring-[2.5px] ring-white shadow-xs mx-auto -mt-[7px] z-20 relative`}
      />
    );
  };

  const BranchArrow = ({ color = 'terracotta' }: { color?: 'terracotta' | 'teal' | 'navy' | 'slate' }) => {
    const border =
      color === 'teal'
        ? 'border-[#0E6260]'
        : color === 'navy' || color === 'slate'
        ? 'border-slate-900'
        : 'border-[#91381E]';
    return (
      <div
        className={`w-2.5 h-2.5 border-b-[2.5px] border-r-[2.5px] ${border} rotate-45 mx-auto -mt-2 mb-1.5`}
      />
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden relative">
      {/* Top Banner Bar with Study Map Breadcrumb */}
      <div className="border-b border-slate-200 bg-slate-50/70 px-5 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-600" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
            STUDY MAP / {examId.toUpperCase()}
          </span>
          {examId === 'mpsc' && (
            <span className="text-[11px] font-semibold text-blue-900 bg-blue-100/80 px-2 py-0.5 rounded-md hidden sm:inline">
              {mpscView === 'overview'
                ? t('संपूर्ण परीक्षा रचना (Overview)', 'Complete Paths Overview')
                : t('गट-ब व गट-क विशेष रचना', 'Non-Gazetted Group B & C Map')}
            </span>
          )}
        </div>

        {/* View Switcher for MPSC (from the 2 user uploaded MPSC images) */}
        {examId === 'mpsc' && (
          <div className="flex items-center gap-1.5 bg-slate-200/80 p-1 rounded-xl text-xs font-bold">
            <button
              onClick={() => setMpscView('overview')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mpscView === 'overview'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('मॅप १: सर्व पदे (Overview)', 'Map 1: Complete Overview')}
            </button>
            <button
              onClick={() => setMpscView('nongazetted')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                mpscView === 'nongazetted'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {t('मॅप २: गट-ब व गट-क (Group B & C)', 'Map 2: Group B & C')}
            </button>
          </div>
        )}

        <div className="text-[11px] text-slate-500 hidden md:flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-blue-600" />
          <span>{t('घटकावर क्लिक करून सविस्तर माहिती पहा', 'Click any node to view breakdown')}</span>
        </div>
      </div>

      {/* Main Diagram Area */}
      <div className="p-4 sm:p-8 overflow-x-auto min-h-[460px] flex flex-col justify-between bg-[#FCFCFD]">
        
        {/* ========================================================================= */}
        {/* 1. MPSC VIEW 1: PREPARATION PATHS (OVERVIEW) */}
        {/* ========================================================================= */}
        {examId === 'mpsc' && mpscView === 'overview' && (
          <div className="min-w-[700px] max-w-4xl mx-auto py-4">
            
            {/* Top Root Node: MPSC */}
            <div className="text-center mb-6">
              <DiagramNode
                label="MPSC"
                marathiLabel="MPSC"
                size="lg"
                color="navy"
                onClick={() =>
                  setActiveNodeModal({
                    title: 'MPSC (Maharashtra Public Service Commission)',
                    marathiTitle: 'महाराष्ट्र लोकसेवा आयोग (MPSC)',
                    details:
                      'Apex state recruitment commission for Group A, Group B, and Group C administrative, police, executive, and clerical posts across Maharashtra.',
                    marathiDetails:
                      'महाराष्ट्र शासनातील वर्ग-१, वर्ग-२ आणि वर्ग-३ ची राजपत्रित व अराजपत्रित प्रशासकीय पदे भरण्यासाठीची सर्वोच्च परीक्षा संस्था.',
                  })
                }
              />
              <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-widest mt-1.5">
                EXAM PREPARATION OVERVIEW
              </span>

              {/* Vertical connector down */}
              <VBranch height="h-7" color="slate" className="mt-1" />
              <JunctionNode color="slate" />
            </div>

            {/* Split into 2 Main Branches: Gazetted (Teal) vs Non-Gazetted (Terracotta) */}
            <div className="relative">
              {/* Horizontal line connecting left and right branches */}
              <div className="absolute top-0 left-[26%] right-[26%]">
                <HBranch color="slate" />
              </div>

              <div className="grid grid-cols-2 gap-8 pt-4">
                
                {/* ----------------- LEFT BRANCH: Gazetted Group A & Group B (Teal) ----------------- */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="teal" className="-mt-4 mb-1" />
                  <BranchArrow color="teal" />
                  
                  <DiagramNode
                    label="Gazetted Group A & Group B"
                    marathiLabel="राजपत्रित गट-अ व गट-ब (राज्यसेवा)"
                    color="teal"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Gazetted Group A & Group B (Rajyaseva)',
                        marathiTitle: 'राजपत्रित गट-अ व गट-ब (राज्यसेवा)',
                        details:
                          'Cadres include Deputy Collector, DSP / ACP, Tehsildar, Block Development Officer (BDO), and ARTO.',
                        marathiDetails:
                          'उपजिल्हाधिकारी, पोलीस उपाधीक्षक (DSP), तहसीलदार, गट विकास अधिकारी (BDO) व सहाय्यक प्रादेशिक परिवहन अधिकारी (ARTO) इत्यादी पदे.',
                      })
                    }
                  />

                  {/* Vertical drop */}
                  <VBranch height="h-6" color="teal" />

                  {/* Horizontal Bar for 3 sub-nodes */}
                  <div className="relative w-full max-w-xs">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="teal" />
                    </div>
                    <JunctionNode color="teal" />
                    
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Syllabus"
                          marathiLabel="Syllabus"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Gazetted Syllabus Structure',
                              marathiTitle: 'राजपत्रित अभ्यासक्रम रचना',
                              details:
                                'Descriptive & Objective General Studies (History, Geography, Polity, Economy, Agriculture, Science) and Language Papers.',
                              marathiDetails:
                                'इतिहास, भूगोल, राज्यघटना, कृषी अर्थशास्त्र, विज्ञान तंत्रज्ञान आणि मराठी-इंग्रजी भाषा अभ्यासक्रम.',
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Post"
                          marathiLabel="Post"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Gazetted Posts & Roles',
                              marathiTitle: 'राजपत्रित पदे',
                              details:
                                'Class-1 and Class-2 prestigious administrative authority roles across government divisions.',
                              marathiDetails:
                                'प्रशासकीय प्रमुख, महसूल अधिकारी व पोलीस उपअधीक्षक पदे.',
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Exam Pattern"
                          marathiLabel="Exam Pattern"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Exam Pattern Stages',
                              marathiTitle: 'परीक्षा स्वरूप',
                              details:
                                '3-Tier Selection: Preliminary screening exam followed by written Mains exam and Final Interview.',
                              marathiDetails:
                                'पूर्व परीक्षा, मुख्य लेखी परीक्षा आणि मुलाखत अशी त्रिस्तरीय पद्धत.',
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flow down to Pattern Stages */}
                  <VBranch height="h-6" color="teal" className="mt-2" />
                  <DiagramNode
                    label="Pattern Stages"
                    marathiLabel="Pattern Stages"
                    color="teal"
                    size="sm"
                  />

                  {/* Sub-branches for Prelims, Mains, Interview */}
                  <VBranch height="h-5" color="teal" />
                  <div className="relative w-full max-w-xs">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="teal" />
                    </div>
                    <JunctionNode color="teal" />
                    
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      
                      {/* Prelims + GS-I & CSAT */}
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Prelims"
                          marathiLabel="Prelims"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Prelims Examination (पूर्व परीक्षा)',
                              marathiTitle: 'पूर्व परीक्षा (Prelims)',
                              details:
                                'Paper 1 (GS) 200 marks + Paper 2 (CSAT) 200 marks (qualifying 33%). Objective MCQ format.',
                              marathiDetails:
                                'सामान्य अध्ययन पेपर-१ (२०० गुण) आणि सीसॅट पेपर-२ (२०० गुण, ३३% पात्रता). वस्तुनिष्ठ बहुपर्यायी.',
                            })
                          }
                        />

                        {/* Drop down to GS-I and CSAT */}
                        <VBranch height="h-4" color="teal" className="mt-1" />
                        <div className="relative w-full">
                          <div className="absolute top-0 left-[25%] right-[25%]">
                            <HBranch color="teal" />
                          </div>
                          <JunctionNode color="teal" />
                          <div className="grid grid-cols-2 gap-1 pt-2">
                            <div className="flex flex-col items-center">
                              <VBranch height="h-3" color="teal" className="-mt-2 mb-0.5" />
                              <DiagramNode label="GS-I" color="teal" size="sm" />
                            </div>
                            <div className="flex flex-col items-center">
                              <VBranch height="h-3" color="teal" className="-mt-2 mb-0.5" />
                              <DiagramNode label="CSAT" color="teal" size="sm" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mains */}
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Mains"
                          marathiLabel="Mains"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Mains Examination (मुख्य परीक्षा - 1250 Marks)',
                              marathiTitle: 'मुख्य परीक्षा (Mains - १२५० गुण)',
                              details:
                                '7 Descriptive Papers (1250 Marks) determining state merit ranking.',
                              marathiDetails:
                                '७ पेपर्स (१२५० गुण) असणारी सखोल लेखी मुख्य परीक्षा.',
                            })
                          }
                        />
                      </div>

                      {/* Interview */}
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="teal" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Interview"
                          marathiLabel="Interview"
                          color="teal"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Interview / Personality Test (175 Marks)',
                              marathiTitle: 'मुलाखत (Interview - १७५ गुण)',
                              details:
                                'Final personality assessment evaluating ethical integrity and leadership (175 Marks). Grand Total: 1425 Marks.',
                              marathiDetails:
                                'व्यक्तिमत्त्व चाचणी व नेतृत्वगुणांची पडताळणी (१७५ गुण). अंतिम गुणवत्ता एकूण: १४२५ गुण.',
                            })
                          }
                        />
                      </div>

                    </div>
                  </div>

                </div>

                {/* ----------------- RIGHT BRANCH: Non-Gazetted Group B & C (Terracotta) ----------------- */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <BranchArrow color="terracotta" />
                  
                  <DiagramNode
                    label="Non-Gazetted Group B & C"
                    marathiLabel="अराजपत्रित स्वतंत्र गट-ब व गट-क"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Non-Gazetted Group B & Group C Exam',
                        marathiTitle: 'दुय्यम सेवा अराजपत्रित गट-ब व गट-क',
                        details:
                          'Popular exams for PSI (Police Sub-Inspector), STI (State Tax Inspector), ASO (Assistant Section Officer), Clerk-Typist, and Tax Assistant.',
                        marathiDetails:
                          'पोलीस उपनिरीक्षक (PSI), राज्य कर निरीक्षक (STI), सहायक कक्ष अधिकारी (ASO), लिपिक-टंकलेखक व कर सहायक पदे.',
                      })
                    }
                  />

                  {/* Vertical drop */}
                  <VBranch height="h-6" color="terracotta" />

                  {/* Horizontal Bar for 3 sub-nodes */}
                  <div className="relative w-full max-w-xs">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Syllabus"
                          color="terracotta"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Group B & C Syllabus',
                              marathiTitle: 'गट-ब व क अभ्यासक्रम',
                              details:
                                'History, Geography, Polity, Science, Economy, Current Affairs, Maths, Reasoning, and Marathi-English Grammar.',
                              marathiDetails:
                                'इतिहास, भूगोल, राज्यघटना, सामान्य विज्ञान, अर्थव्यवस्था, चालू घडामोडी, अंकगणित, बुद्धिमत्ता व मराठी-इंग्रजी व्याकरण.',
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Post"
                          color="terracotta"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Cadres & Posts (गट-ब व क पदे)',
                              marathiTitle: 'गट-ब व गट-क प्रमुख पदे',
                              details:
                                'PSI, STI, ASO, Sub-Inspector Excise, Clerk Typist, Tax Assistant, and Talathi.',
                              marathiDetails:
                                'पोलीस उपनिरीक्षक (PSI), कर निरीक्षक (STI), मंत्रालय कक्ष अधिकारी (ASO), लिपिक व तलाठी.',
                            })
                          }
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Pattern"
                          color="terracotta"
                          size="sm"
                          onClick={() =>
                            setActiveNodeModal({
                              title: 'Group B & C Pattern',
                              marathiTitle: 'गट-ब व क परीक्षा पद्धत',
                              details:
                                'Separate Preliminary Exam (100 Marks, 100 Qs) followed by Separate Mains Exam.',
                              marathiDetails:
                                'स्वतंत्र पूर्व परीक्षा (१०० गुण) आणि स्वतंत्र मुख्य परीक्षा.',
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Flow down to Prelim & Main */}
                  <VBranch height="h-6" color="terracotta" className="mt-3" />
                  <div className="relative w-full max-w-[200px]">
                    <div className="absolute top-0 left-[25%] right-[25%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    <div className="grid grid-cols-2 gap-3 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Prelim"
                          marathiLabel="Prelim (१०० गुण)"
                          color="terracotta"
                          size="sm"
                        />
                      </div>

                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode
                          label="Main"
                          marathiLabel="Main (४०० गुण)"
                          color="terracotta"
                          size="sm"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* Bottom Signature Marker */}
            <div className="mt-10 pt-4 border-t border-slate-200 text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                MPSC • PREPARATION PATHS
              </span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. MPSC VIEW 2: NON-GAZETTED GROUP B & C (FOCUSED MAP) */}
        {/* ========================================================================= */}
        {examId === 'mpsc' && mpscView === 'nongazetted' && (
          <div className="min-w-[600px] max-w-3xl mx-auto py-4 text-center">
            
            {/* Top Root Node: MPSC */}
            <div className="inline-block mb-3">
              <DiagramNode label="MPSC" size="lg" color="terracotta" />
              <VBranch height="h-6" color="terracotta" className="mt-1" />
              <BranchArrow color="terracotta" />
            </div>

            {/* Secondary Header: Non-Gazetted Group B & C */}
            <div className="mb-6">
              <DiagramNode
                label="Non-Gazetted Group B & C"
                marathiLabel="Non-Gazetted Group B & C"
                size="lg"
                color="terracotta"
              />
              <VBranch height="h-7" color="terracotta" className="mt-1" />
            </div>

            {/* 3 Main Branches: Syllabus | Pattern | Posts */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute top-0 left-[16%] right-[16%]">
                <HBranch color="terracotta" />
              </div>
              <JunctionNode color="terracotta" />

              <div className="grid grid-cols-3 gap-4 pt-4">
                
                {/* Branch 1: Syllabus */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Syllabus"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Group B & C Detailed Syllabus',
                        marathiTitle: 'गट-ब व गट-क सविस्तर अभ्यासक्रम',
                        details:
                          'Preliminary Exam: GS, Maths, Reasoning. Mains Exam: Marathi, English & General Studies Paper-II.',
                        marathiDetails:
                          'पूर्व परीक्षा: चालू घडामोडी, नागरिकशास्त्र, इतिहास, भूगोल, अर्थशास्त्र, सामान्य विज्ञान व बुद्धिमत्ता. मुख्य परीक्षा: भाषा व GS.',
                      })
                    }
                  />
                </div>

                {/* Branch 2: Pattern (branches to Prelims & Mains) */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Pattern"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Selection Pattern',
                        marathiTitle: 'निवड पद्धती',
                        details:
                          'Stage 1: Preliminary Exam (100 Marks). Stage 2: Mains Exam (400 Marks). Stage 3 (for PSI): Physical Test (100 Marks) & Interview.',
                        marathiDetails:
                          'पहिली पायरी: १०० गुणांची संयुक्त पूर्व परीक्षा. दुसरी पायरी: ४०० गुणांची मुख्य परीक्षा. PSI साठी शारीरिक चाचणी.',
                      })
                    }
                  />

                  {/* Flow down to Prelims and Mains */}
                  <VBranch height="h-6" color="terracotta" className="mt-2" />
                  <div className="relative w-full max-w-[200px]">
                    <div className="absolute top-0 left-[25%] right-[25%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    <div className="grid grid-cols-2 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Prelims" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Mains" color="terracotta" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 3: Posts */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Posts"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Available Posts in Group B & C',
                        marathiTitle: 'गट-ब व गट-क अंतर्गत पदे',
                        details:
                          'Police Sub-Inspector (PSI), State Tax Inspector (STI), Assistant Section Officer (ASO), Sub-Inspector State Excise, Tax Assistant, Clerk-Typist.',
                        marathiDetails:
                          'पोलीस उपनिरीक्षक (PSI), विक्रीकर/राज्य कर निरीक्षक (STI), मंत्रालय सहायक (ASO), राज्य उत्पादन शुल्क उपनिरीक्षक आणि लिपिक-टंकलेखक.',
                      })
                    }
                  />
                </div>

              </div>
            </div>

            {/* Bottom Signature Marker */}
            <div className="mt-14 pt-4 border-t border-slate-200 text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                MPSC • NON-GAZETTED GROUP B & C
              </span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. UPSC STUDY MAP (Matching user uploaded UPSC image exactly) */}
        {/* ========================================================================= */}
        {examId === 'upsc' && (
          <div className="min-w-[600px] max-w-3xl mx-auto py-4 text-center">
            
            {/* Top Root Node: UPSC */}
            <div className="inline-block mb-6">
              <DiagramNode label="UPSC" size="lg" color="terracotta" />
              <VBranch height="h-8" color="terracotta" className="mt-1" />
            </div>

            {/* 3 Branches: Syllabus | Pattern / Stages | Posts */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute top-0 left-[16%] right-[16%]">
                <HBranch color="terracotta" />
              </div>
              <JunctionNode color="terracotta" />

              <div className="grid grid-cols-3 gap-4 pt-4">
                
                {/* Branch 1: Syllabus */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Syllabus"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'UPSC Civil Services Syllabus',
                        marathiTitle: 'UPSC नागरी सेवा अभ्यासक्रम',
                        details:
                          'Comprehensive syllabus based on NCERT foundations, History, Geography, Polity, Governance, Economy, Ecology, Science & Technology, Ethics, and Optional Subject.',
                        marathiDetails:
                          'NCERT पायाभूत अभ्यास, इतिहास, राज्यघटना, भूगोल, पर्यावरण, अर्थव्यवस्था, नीतीशास्त्र (GS 4) आणि १ ऐच्छिक विषय (Optional).',
                      })
                    }
                  />
                </div>

                {/* Branch 2: Pattern / Stages (branches to Prelims, Mains, Interview) */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Pattern / Stages"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'UPSC 3-Tier Examination Pattern',
                        marathiTitle: 'UPSC त्रिस्तरीय परीक्षा रचना',
                        details:
                          'Stage 1: Prelims (Objective 400 marks). Stage 2: Mains (Written 1750 marks). Stage 3: Personality Test (Interview 275 marks). Total: 2025 Marks.',
                        marathiDetails:
                          'पहिली पायरी: पूर्व परीक्षा (४०० गुण). दुसरी पायरी: मुख्य लेखी परीक्षा (१७५० गुण). तिसरी पायरी: मुलाखत (२७५ गुण). एकूण: २०२५ गुण.',
                      })
                    }
                  />

                  {/* Flow down to Prelims, Mains, Interview */}
                  <VBranch height="h-6" color="terracotta" className="mt-2" />
                  <div className="relative w-full max-w-[280px]">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Prelims" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Mains" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Interview" color="terracotta" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 3: Posts */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Posts"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'All India & Central Civil Services Posts',
                        marathiTitle: 'अखिल भारतीय व केंद्रीय नागरी सेवा पदे',
                        details:
                          'Indian Administrative Service (IAS), Indian Police Service (IPS), Indian Foreign Service (IFS), Indian Revenue Service (IRS), IA&AS, IDAS, etc.',
                        marathiDetails:
                          'भारतीय प्रशासकीय सेवा (IAS - जिल्हाधिकारी), पोलीस सेवा (IPS - SP), परराष्ट्र सेवा (IFS), महसूल सेवा (IRS) इत्यादी सर्वोच्च पदे.',
                      })
                    }
                  />
                </div>

              </div>
            </div>

            {/* Bottom Signature Marker */}
            <div className="mt-16 pt-4 border-t border-slate-200 text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                UPSC • CIVIL SERVICES EXAMINATION
              </span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 4. SSC STUDY MAP (Consistent Architectural Layout) */}
        {/* ========================================================================= */}
        {examId === 'ssc' && (
          <div className="min-w-[600px] max-w-3xl mx-auto py-4 text-center">
            
            {/* Top Root Node: SSC */}
            <div className="inline-block mb-6">
              <DiagramNode label="SSC" size="lg" color="terracotta" />
              <VBranch height="h-8" color="terracotta" className="mt-1" />
            </div>

            {/* 3 Branches: Syllabus | Pattern / Stages | Posts */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute top-0 left-[16%] right-[16%]">
                <HBranch color="terracotta" />
              </div>
              <JunctionNode color="terracotta" />

              <div className="grid grid-cols-3 gap-4 pt-4">
                
                {/* Branch 1: Syllabus */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Syllabus"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'SSC Comprehensive Syllabus',
                        marathiTitle: 'SSC अभ्यासक्रम रूपरेषा',
                        details:
                          'Quantitative Aptitude (Arithmetic & Advanced Algebra/Geometry), Reasoning Ability, English Comprehension, and General Awareness.',
                        marathiDetails:
                          'अंकगणित, बीजगणित, भूमिती (शॉर्ट ट्रिक्स), तार्किक बुद्धिमत्ता, इंग्रजी व्याकरण व शब्दसंग्रह आणि चालू घडामोडी.',
                      })
                    }
                  />
                </div>

                {/* Branch 2: Pattern / Stages */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Pattern / Stages"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'SSC Computer Based Test (CBT) Pattern',
                        marathiTitle: 'SSC ऑनलाइन परीक्षा पद्धत',
                        details:
                          'Tier-I Computer Based Test (Screening), Tier-II Advanced Comprehensive CBT, and Skill / Data Entry Speed Test (DEST).',
                        marathiDetails:
                          'टियर-१ कॉम्प्युटर ऑनलाइन चाचणी, टियर-२ प्रगत लेखी परीक्षा आणि टायपिंग/कौशल्य चाचणी.',
                      })
                    }
                  />

                  {/* Flow down to Tier-I, Tier-II, Skill Test */}
                  <VBranch height="h-6" color="terracotta" className="mt-2" />
                  <div className="relative w-full max-w-[280px]">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Tier-I (CBT)" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Tier-II (CBT)" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="Skill Test" color="terracotta" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 3: Posts */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Posts"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Central Government Ministries Posts',
                        marathiTitle: 'केंद्रीय मंत्रालये व विभाग पदे',
                        details:
                          'Income Tax Inspector, Central Excise / GST Inspector, CBI Sub-Inspector, Preventive Officer, Assistant Section Officer, CHSL LDC/DEO, MTS, and GD Constable.',
                        marathiDetails:
                          'आयकर निरीक्षक, जीएसटी/अबकारी निरीक्षक, सीबीआय, मंत्रालयीन सहायक, टायपिस्ट, डेटा एन्ट्री ऑपरेटर व सुरक्षा दले.',
                      })
                    }
                  />
                </div>

              </div>
            </div>

            {/* Bottom Signature Marker */}
            <div className="mt-16 pt-4 border-t border-slate-200 text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                SSC • CENTRAL MINISTRIES &amp; DEPARTMENTS
              </span>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* 5. RRB STUDY MAP (Consistent Architectural Layout) */}
        {/* ========================================================================= */}
        {examId === 'rrb' && (
          <div className="min-w-[600px] max-w-3xl mx-auto py-4 text-center">
            
            {/* Top Root Node: RRB */}
            <div className="inline-block mb-6">
              <DiagramNode label="RRB" size="lg" color="terracotta" />
              <VBranch height="h-8" color="terracotta" className="mt-1" />
            </div>

            {/* 3 Branches: Syllabus | Pattern / Stages | Posts */}
            <div className="relative max-w-lg mx-auto">
              <div className="absolute top-0 left-[16%] right-[16%]">
                <HBranch color="terracotta" />
              </div>
              <JunctionNode color="terracotta" />

              <div className="grid grid-cols-3 gap-4 pt-4">
                
                {/* Branch 1: Syllabus */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Syllabus"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Railway Recruitment Board Syllabus',
                        marathiTitle: 'रेल्वे भरती अभ्यासक्रम',
                        details:
                          'General Science (Physics, Chemistry, Biology - 10th level), Basic Mathematics, General Intelligence & Reasoning, and Current Affairs.',
                        marathiDetails:
                          'सामान्य विज्ञान (१० वी स्तर), मूलभूत अंकगणित, तर्कशक्ती-बुद्धिमत्ता आणि रेल्वे व चालू घडामोडी.',
                      })
                    }
                  />
                </div>

                {/* Branch 2: Pattern / Stages */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Pattern / Stages"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Railway Examination Pattern',
                        marathiTitle: 'रेल्वे परीक्षा स्वरूप',
                        details:
                          'Stage 1: CBT-1 Screening Exam (100 Marks). Stage 2: CBT-2 Main Exam (120 Marks). Stage 3: Computer Based Aptitude Test (CBAT) / Trade Skill Test & Strict Medical.',
                        marathiDetails:
                          'पहिली पायरी: सीबीटी-१ १०० गुणांची चाचणी. दुसरी पायरी: सीबीटी-२ १२० गुणांची मुख्य परीक्षा. तिसरी पायरी: सायको चाचणी व वैद्यकीय तपासणी.',
                      })
                    }
                  />

                  {/* Flow down to CBT-1, CBT-2, CBAT */}
                  <VBranch height="h-6" color="terracotta" className="mt-2" />
                  <div className="relative w-full max-w-[280px]">
                    <div className="absolute top-0 left-[16%] right-[16%]">
                      <HBranch color="terracotta" />
                    </div>
                    <JunctionNode color="terracotta" />
                    <div className="grid grid-cols-3 gap-2 pt-3">
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="CBT-1" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="CBT-2" color="terracotta" size="sm" />
                      </div>
                      <div className="flex flex-col items-center">
                        <VBranch height="h-4" color="terracotta" className="-mt-3 mb-1" />
                        <DiagramNode label="CBAT" color="terracotta" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Branch 3: Posts */}
                <div className="flex flex-col items-center">
                  <VBranch height="h-5" color="terracotta" className="-mt-4 mb-1" />
                  <DiagramNode
                    label="Posts"
                    color="terracotta"
                    size="md"
                    onClick={() =>
                      setActiveNodeModal({
                        title: 'Indian Railways Cadres & Posts',
                        marathiTitle: 'भारतीय रेल्वे संवर्ग व पदे',
                        details:
                          'Station Master, Goods Guard, Senior Commercial Clerk, Assistant Loco Pilot (ALP), Railway Technicians, Track Maintainer, and RPF Sub-Inspector / Constable.',
                        marathiDetails:
                          'स्टेशन मास्तर, मालगाडी गार्ड, लोको पायलट (चालक), रेल्वे टेक्निशियन, गट-ड ट्रॅक मेंटेनर्स आणि रेल्वे सुरक्षा दल (RPF).',
                      })
                    }
                  />
                </div>

              </div>
            </div>

            {/* Bottom Signature Marker */}
            <div className="mt-16 pt-4 border-t border-slate-200 text-left">
              <span className="text-[11px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
                RRB • INDIAN RAILWAYS CADRES
              </span>
            </div>

          </div>
        )}

      </div>

      {/* Node Details Modal */}
      {activeNodeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setActiveNodeModal(null)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 uppercase">
                {examId.toUpperCase()} Roadmap Guide
              </span>
            </div>

            <h4 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
              {language === 'mr' ? activeNodeModal.marathiTitle : activeNodeModal.title}
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {language === 'mr' ? activeNodeModal.marathiDetails : activeNodeModal.details}
            </p>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  setActiveNodeModal(null);
                  if (onOpenInquiry) {
                    onOpenInquiry('competitive', `${examId.toUpperCase()} - ${activeNodeModal.title}`);
                  }
                }}
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition-colors"
              >
                {t('या घटकाबाबत अधिक माहिती विचारा', 'Inquire About This Stage')}
              </button>

              <button
                onClick={() => setActiveNodeModal(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                {t('बंद करा (Close)', 'Close')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
