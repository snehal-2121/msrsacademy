import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  findExamTreeNode,
  getExamNodeBreadcrumbPath,
  ExamTreeNode,
} from '../data/examTreeHierarchy';
import { VERIFIED_EXAM_NODE_DATA } from '../data/verifiedExamNodeData';

interface ExamNodeDetailPageProps {
  examId: 'mpsc' | 'upsc' | 'ssc' | 'rrb' | 'police';
  nodeId: string;
  nodeTitle?: string;
  nodeMarathiTitle?: string;
  onBackToMap: () => void;
  onSelectChildNode: (nodeId: string, title: string, marathiTitle: string) => void;
  onOpenInquiry: (category: string, subject?: string) => void;
}

export const ExamNodeDetailPage: React.FC<ExamNodeDetailPageProps> = ({
  examId,
  nodeId,
  nodeTitle,
  nodeMarathiTitle,
  onBackToMap,
  onSelectChildNode,
}) => {
  const { language, t } = useLanguage();

  const treeNode = findExamTreeNode(examId, nodeId);
  const breadcrumbPath = getExamNodeBreadcrumbPath(examId, nodeId);
  const verifiedContent = VERIFIED_EXAM_NODE_DATA[nodeId];

  // Determine parent node for step-by-step back navigation
  const parentNode =
    breadcrumbPath.length >= 2 ? breadcrumbPath[breadcrumbPath.length - 2] : null;

  const handleStepBack = () => {
    // If parent is not root, go back one step to parent node page; if parent is root (or none), return to full pillar tree map
    if (parentNode && parentNode.nodeId !== `${examId}-root`) {
      onSelectChildNode(parentNode.nodeId, parentNode.label, parentNode.marathiLabel);
    } else {
      onBackToMap();
    }
  };

  const displayTitle = treeNode
    ? language === 'mr'
      ? treeNode.marathiLabel
      : treeNode.label
    : language === 'mr'
    ? nodeMarathiTitle || nodeTitle || examId.toUpperCase()
    : nodeTitle || examId.toUpperCase();

  const nodeColor = treeNode?.color || 'terracotta';
  const childNodes: ExamTreeNode[] = treeNode?.children || [];
  const hasChildren = childNodes.length > 0;

  const getNodeThemeClasses = (color: 'teal' | 'terracotta' | 'navy') => {
    if (color === 'teal') {
      return {
        box: 'bg-[#F2FAF9] text-[#0A4D4C] border-[#0E6260] hover:bg-[#E3F4F3]',
        line: 'bg-[#0E6260]',
        arrow: 'border-[#0E6260]',
        shadow: '3px 4px 0px rgba(14, 98, 96, 0.35)',
        badge: 'bg-teal-50 text-teal-900 border-teal-300',
        accentBorder: 'border-teal-200',
        accentBg: 'bg-teal-50/70',
        accentText: 'text-[#0A4D4C]',
        bulletBg: 'bg-[#0E6260] text-white',
      };
    }
    if (color === 'navy') {
      return {
        box: 'bg-blue-950 text-white border-amber-400 hover:bg-blue-900',
        line: 'bg-slate-900',
        arrow: 'border-slate-900',
        shadow: '3px 4px 0px rgba(15, 23, 42, 0.4)',
        badge: 'bg-blue-50 text-blue-900 border-blue-200',
        accentBorder: 'border-blue-200',
        accentBg: 'bg-blue-50/70',
        accentText: 'text-blue-950',
        bulletBg: 'bg-blue-900 text-white',
      };
    }
    return {
      box: 'bg-[#FFF6F2] text-[#692411] border-[#91381E] hover:bg-[#FCE8DF]',
      line: 'bg-[#91381E]',
      arrow: 'border-[#91381E]',
      shadow: '3px 4px 0px rgba(145, 56, 30, 0.35)',
      badge: 'bg-orange-50 text-[#692411] border-[#91381E]/40',
      accentBorder: 'border-orange-200',
      accentBg: 'bg-orange-50/70',
      accentText: 'text-[#692411]',
      bulletBg: 'bg-[#91381E] text-white',
    };
  };

  const theme = getNodeThemeClasses(nodeColor);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Sub-Navigation & Step-by-Step Breadcrumb Trail */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleStepBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>
              {parentNode && parentNode.nodeId !== `${examId}-root`
                ? t(
                    `← मागे जा (${parentNode.label})`,
                    `← Back to ${parentNode.label}`
                  )
                : t(
                    `← ${examId.toUpperCase()} मुख्य ट्री-मॅपवर परत जा`,
                    `← Back to ${examId.toUpperCase()} Tree Map`
                  )}
            </span>
          </button>

          {parentNode && parentNode.nodeId !== `${examId}-root` && (
            <button
              onClick={onBackToMap}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors cursor-pointer"
            >
              <span>
                {t(
                  `${examId.toUpperCase()} संपूर्ण ट्री-मॅप`,
                  `${examId.toUpperCase()} Full Tree Map`
                )}
              </span>
            </button>
          )}
        </div>

        {/* Clickable Hierarchy Path */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-slate-500">
          <button
            onClick={onBackToMap}
            className="uppercase font-mono font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md border border-blue-200 transition-colors cursor-pointer"
          >
            {examId.toUpperCase()} MAP
          </button>

          {breadcrumbPath
            .filter((n) => n.nodeId !== `${examId}-root`)
            .map((crumb, idx, arr) => {
              const isLast = idx === arr.length - 1;
              return (
                <React.Fragment key={crumb.nodeId}>
                  <span className="text-slate-400">/</span>
                  {isLast ? (
                    <span className="font-bold text-slate-900 px-2 py-0.5 rounded bg-slate-100">
                      {language === 'mr' ? crumb.marathiLabel : crumb.label}
                    </span>
                  ) : (
                    <button
                      onClick={() =>
                        onSelectChildNode(crumb.nodeId, crumb.label, crumb.marathiLabel)
                      }
                      className="text-blue-900 hover:underline font-semibold cursor-pointer"
                    >
                      {language === 'mr' ? crumb.marathiLabel : crumb.label}
                    </button>
                  )}
                </React.Fragment>
              );
            })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. BRANCH NODE TREE SELECTOR (Kept Intact for Nodes with Child Options)   */}
      {/* ========================================================================= */}
      {hasChildren && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm flex flex-col items-center justify-center">
          <div className="w-full max-w-4xl mx-auto py-2 text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold uppercase tracking-wider mb-6">
              <GitBranch className="w-3.5 h-3.5 text-blue-800" />
              <span>
                {t(
                  'पुढील पानावर जाण्यासाठी खालीलपैकी एका पर्यायावर क्लिक करा',
                  'Click any option below to open its dedicated page'
                )}
              </span>
            </div>

            {/* Current Parent Node Box */}
            <div>
              <div
                className={`inline-flex flex-col items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl border-[2.5px] font-bold text-lg sm:text-2xl ${theme.box}`}
                style={{ boxShadow: theme.shadow }}
              >
                <span>{displayTitle}</span>
              </div>

              {/* Vertical stem down from current node */}
              <div className={`w-[3.5px] h-8 ${theme.line} mx-auto rounded-full`} />
            </div>

            {/* Optional Intermediate Stage Box (e.g., "Pattern Stages") matching the MPSC/UPSC/SSC/RRB diagram */}
            {treeNode?.childGroupLabel === 'Pattern Stages' && (
              <div>
                <div
                  className={`inline-flex items-center justify-center px-6 py-2 rounded-xl border-[2.5px] font-bold text-xs sm:text-sm ${theme.box}`}
                  style={{ boxShadow: theme.shadow }}
                >
                  <span>
                    {language === 'mr' && treeNode.childGroupMarathiLabel
                      ? treeNode.childGroupMarathiLabel
                      : treeNode.childGroupLabel}
                  </span>
                </div>
                <div className={`w-[3.5px] h-7 ${theme.line} mx-auto rounded-full`} />
              </div>
            )}

            {/* Junction Circle */}
            <div
              className={`w-3.5 h-3.5 rounded-full ${theme.line} ring-[2.5px] ring-white shadow-xs mx-auto -mt-[7px] z-20 relative`}
            />

            {/* Tree Branches to Child Option Cards */}
            <div className="relative mt-0">
              {childNodes.length === 2 && (
                <div
                  className={`hidden sm:block absolute top-0 left-[25%] right-[25%] h-[3.5px] ${theme.line} rounded-full`}
                />
              )}
              {childNodes.length === 3 && (
                <div
                  className={`hidden sm:block absolute top-0 left-[16.66%] right-[16.66%] h-[3.5px] ${theme.line} rounded-full`}
                />
              )}
              {childNodes.length >= 4 && (
                <div
                  className={`hidden sm:block absolute top-0 left-[12.5%] right-[12.5%] h-[3.5px] ${theme.line} rounded-full`}
                />
              )}

              <div
                className={`grid grid-cols-1 ${
                  childNodes.length === 2
                    ? 'sm:grid-cols-2 max-w-xl'
                    : childNodes.length === 3
                    ? 'sm:grid-cols-3 max-w-3xl'
                    : 'sm:grid-cols-2 md:grid-cols-4 max-w-4xl'
                } gap-4 sm:gap-6 mx-auto pt-4`}
              >
                {childNodes.map((child) => {
                  const childTheme = getNodeThemeClasses(child.color);
                  return (
                    <div key={child.nodeId} className="flex flex-col items-center">
                      {/* Vertical stem + arrow on desktop */}
                      <div
                        className={`hidden sm:block w-[3.5px] h-6 ${childTheme.line} -mt-4 mb-1 rounded-full`}
                      />
                      <div
                        className={`hidden sm:block w-2.5 h-2.5 border-b-[2.5px] border-r-[2.5px] ${childTheme.arrow} rotate-45 -mt-2.5 mb-2`}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          onSelectChildNode(child.nodeId, child.label, child.marathiLabel)
                        }
                        className={`w-full px-6 py-5 rounded-2xl border-[2.5px] transition-all duration-200 transform hover:scale-103 cursor-pointer flex flex-col items-center justify-center gap-2 group ${childTheme.box}`}
                        style={{ boxShadow: childTheme.shadow }}
                      >
                        <span className="text-base sm:text-lg font-extrabold tracking-wide text-center">
                          {language === 'mr' ? child.marathiLabel : child.label}
                        </span>

                        <span className="inline-flex items-center gap-1 text-[11px] font-bold opacity-80 group-hover:opacity-100 mt-1">
                          <span>{t('उघडा', 'Open')}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. VERIFIED POINT-WISE DATA & OFFICIAL LINKS / SYLLABUS PDF SECTION       */}
      {/* ========================================================================= */}
      {verifiedContent ? (
        <div className="space-y-6">
          {/* Official Header Banner & Quick Highlights */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border ${theme.badge}`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{examId.toUpperCase()} OFFICIAL VERIFIED DATA</span>
                </span>
                <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  {language === 'mr'
                    ? verifiedContent.marathiOfficialAuthority
                    : verifiedContent.officialAuthority}
                </span>
              </div>

              <a
                href={verifiedContent.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-900 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3.5 py-1.5 rounded-xl transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>
                  {t('अधिकृत संकेतस्थळ (Official Website)', 'Official Commission Website')}
                </span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-serif tracking-tight text-slate-900 mb-2">
              {language === 'mr' ? verifiedContent.marathiTitle : verifiedContent.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 font-medium">
              {language === 'mr'
                ? verifiedContent.marathiSubtitle
                : verifiedContent.subtitle}
            </p>

            {/* Quick Highlights Grid */}
            {verifiedContent.quickHighlights.length > 0 && (
              <div
                className={`grid grid-cols-1 sm:grid-cols-2 ${
                  verifiedContent.quickHighlights.length === 3
                    ? 'md:grid-cols-3'
                    : 'lg:grid-cols-4'
                } gap-3.5 mt-6 pt-6 border-t border-slate-100`}
              >
                {verifiedContent.quickHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 border ${theme.accentBorder} ${theme.accentBg}`}
                  >
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                      {language === 'mr' ? item.marathiLabel : item.label}
                    </div>
                    <div className={`text-sm sm:text-base font-extrabold ${theme.accentText}`}>
                      {language === 'mr' ? item.marathiValue : item.value}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Official Syllabus PDF & Commission Portal Links */}
          {verifiedContent.officialLinks.length > 0 && (
            <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-sm border border-blue-900/50">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <div>
                  <span className="inline-block text-[11px] font-mono uppercase tracking-widest text-amber-300 font-bold mb-1">
                    {t(
                      'अधिकृत अभ्यासक्रम PDF आणि आयोगाच्या लिंक्स',
                      'OFFICIAL SYLLABUS PDF & COMMISSION PORTALS'
                    )}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {t(
                      'मूळ अधिकृत अभ्यासक्रम (PDF) व थेट संकेतस्थळ दुवे',
                      'Direct Official Syllabus PDFs & Original Commission Links'
                    )}
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {verifiedContent.officialLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/10 hover:bg-white/15 border border-white/15 hover:border-amber-400/60 rounded-2xl p-4 transition-all flex flex-col justify-between gap-3"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/30">
                          {link.type === 'pdf' ? (
                            <>
                              <FileText className="w-3.5 h-3.5" />
                              <span>OFFICIAL PDF / SYLLABUS</span>
                            </>
                          ) : link.type === 'syllabus' ? (
                            <>
                              <FileText className="w-3.5 h-3.5" />
                              <span>OFFICIAL SYLLABUS</span>
                            </>
                          ) : (
                            <>
                              <Globe className="w-3.5 h-3.5" />
                              <span>OFFICIAL PORTAL</span>
                            </>
                          )}
                        </span>
                        <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>

                      <div className="font-bold text-sm sm:text-base text-white group-hover:text-amber-200 transition-colors">
                        {language === 'mr' ? link.marathiTitle : link.title}
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {language === 'mr' ? link.marathiDescription : link.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-amber-300">
                      <span className="truncate max-w-[220px]">{link.url}</span>
                      <span className="font-sans font-bold underline">
                        {t('उघडा →', 'Open →')}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Point-wise Verified Sections */}
          <div className="space-y-5">
            {verifiedContent.sections.map((section, secIdx) => {
              const pointsList =
                language === 'mr' ? section.marathiPoints : section.points;
              return (
                <div
                  key={secIdx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-slate-100">
                    <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
                      {language === 'mr' ? section.marathiHeading : section.heading}
                    </h3>
                    {(section.badge || section.marathiBadge) && (
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full border ${theme.badge}`}
                      >
                        {language === 'mr'
                          ? section.marathiBadge || section.badge
                          : section.badge}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3.5">
                    {pointsList.map((point, ptIdx) => (
                      <li
                        key={ptIdx}
                        className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/70 border border-slate-200/70 transition-colors"
                      >
                        <span
                          className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 ${theme.bulletBg}`}
                        >
                          {ptIdx + 1}
                        </span>
                        <span className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed whitespace-pre-line">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        !hasChildren && (
          <div className="bg-white rounded-3xl p-6 sm:p-12 border border-slate-200 shadow-sm text-center max-w-2xl mx-auto py-8">
            <span
              className={`inline-block text-xs font-mono font-bold uppercase tracking-widest px-3.5 py-1 rounded-full border mb-4 ${theme.badge}`}
            >
              {examId.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-serif tracking-tight text-slate-900">
              {displayTitle}
            </h2>
          </div>
        )
      )}
    </div>
  );
};

