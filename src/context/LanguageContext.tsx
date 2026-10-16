import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'mr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  isMarathi: boolean;
  isEnglish: boolean;
  t: (marathiText: string, englishText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('preferred_language');
      if (saved === 'en' || saved === 'mr') return saved;
    }
    return 'mr'; // default to Marathi as requested for this rural Maharashtra institution, toggleable anytime
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred_language', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'mr' ? 'en' : 'mr');
  };

  const isMarathi = language === 'mr';
  const isEnglish = language === 'en';

  const t = (marathiText: string, englishText: string): string => {
    return language === 'mr' ? marathiText : englishText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        isMarathi,
        isEnglish,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
