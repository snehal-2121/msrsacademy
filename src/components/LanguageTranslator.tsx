import React from 'react';
import { Languages, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageTranslatorProps {
  variant?: 'navbar' | 'compact' | 'drawer' | 'topbar' | 'floating';
  className?: string;
}

export const LanguageTranslator: React.FC<LanguageTranslatorProps> = ({
  variant = 'navbar',
  className = '',
}) => {
  const { language, setLanguage } = useLanguage();

  if (variant === 'floating') {
    return (
      <aside
        aria-label="Language selection"
        className={`fixed bottom-5 left-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-300 p-1.5 flex items-center gap-1 transition-all ${className}`}
      >
        <div className="flex items-center gap-1 pl-2 pr-1.5 text-slate-700 text-xs font-bold border-r border-slate-200">
          <Languages className="w-3.5 h-3.5 text-blue-900" />
          <span className="hidden sm:inline text-[11px]">भाषा:</span>
        </div>
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
            language === 'mr'
              ? 'bg-blue-900 text-white shadow-xs font-extrabold'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="मराठीत पहा"
        >
          <span>🇮🇳 मराठी</span>
          {language === 'mr' && <Check className="w-3 h-3 text-amber-400" />}
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
            language === 'en'
              ? 'bg-blue-900 text-white shadow-xs font-extrabold'
              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
          }`}
          title="View in English"
        >
          <span>🌐 English</span>
          {language === 'en' && <Check className="w-3 h-3 text-amber-400" />}
        </button>
      </aside>
    );
  }

  if (variant === 'topbar') {
    return (
      <div className={`inline-flex items-center gap-1.5 bg-slate-800/90 border border-slate-700/80 rounded-lg p-0.5 text-xs ${className}`}>
        <div className="flex items-center gap-1 pl-1.5 pr-1 text-[11px] text-amber-400 font-medium">
          <Languages className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">भाषा / Lang:</span>
        </div>
        <button
          type="button"
          onClick={() => setLanguage('mr')}
          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
            language === 'mr'
              ? 'bg-amber-400 text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
          title="मराठीत पहा (View in Marathi)"
        >
          मराठी
        </button>
        <button
          type="button"
          onClick={() => setLanguage('en')}
          className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
            language === 'en'
              ? 'bg-amber-400 text-slate-950 shadow-xs'
              : 'text-slate-300 hover:text-white'
          }`}
          title="View in English"
        >
          English
        </button>
      </div>
    );
  }

  if (variant === 'drawer') {
    return (
      <div className={`p-3 rounded-xl bg-slate-50 border border-slate-200 ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-blue-900" />
            <span>वेबसाईट भाषा निवडा / Select Language:</span>
          </span>
          <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 bg-blue-100 text-blue-900 rounded font-bold">
            {language === 'mr' ? 'मराठी' : 'English'}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setLanguage('mr')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              language === 'mr'
                ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {language === 'mr' && <Check className="w-3.5 h-3.5 text-amber-400" />}
            <span>मराठी (Marathi)</span>
          </button>
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`py-2 px-3 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
              language === 'en'
                ? 'bg-blue-900 text-white border-blue-950 shadow-sm'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {language === 'en' && <Check className="w-3.5 h-3.5 text-amber-400" />}
            <span>English (इंग्रजी)</span>
          </button>
        </div>
      </div>
    );
  }

  // Default navbar variant (sleek pill switcher with icon)
  return (
    <div
      className={`inline-flex items-center rounded-xl p-1 bg-slate-100/90 border border-slate-200/90 shadow-2xs ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <div className="hidden xl:flex items-center gap-1 pl-1.5 pr-1 text-slate-500 text-xs font-medium">
        <Languages className="w-3.5 h-3.5 text-blue-900" />
      </div>

      <button
        type="button"
        onClick={() => setLanguage('mr')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          language === 'mr'
            ? 'bg-blue-900 text-white shadow-xs font-extrabold'
            : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
        }`}
        title="मराठीत पहा (View in Marathi)"
      >
        <span className="text-[11px]">🇮🇳</span>
        <span>मराठी</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
          language === 'en'
            ? 'bg-blue-900 text-white shadow-xs font-extrabold'
            : 'text-slate-700 hover:text-slate-900 hover:bg-white/80'
        }`}
        title="View in English"
      >
        <span className="text-[11px]">🌐</span>
        <span>English</span>
      </button>
    </div>
  );
};
