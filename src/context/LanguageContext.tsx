import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import ptBR from '../locales/pt-BR.json';
import en from '../locales/en.json';
import gsap from 'gsap';

export type Locale = 'pt-BR' | 'en';
export type Translations = typeof ptBR;

interface LanguageContextValue {
  locale: Locale;
  t: Translations;
  isSwitchingLanguage: boolean;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const dictionaries: Record<Locale, Translations> = {
  'pt-BR': ptBR,
  en: en,
};

const STORAGE_KEY = 'portfolio-locale';

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'pt-BR';
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'pt-BR' || saved === 'en') return saved;
    if (navigator.language && navigator.language.toLowerCase().startsWith('en')) {
      return 'en';
    }
  } catch {
    // ignore
  }
  return 'pt-BR';
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'pt-BR',
  t: ptBR,
  isSwitchingLanguage: false,
  setLocale: () => {},
  toggleLocale: () => {},
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);
  const [isSwitchingLanguage, setIsSwitchingLanguage] = useState(false);
  const lockRef = useRef(false);

  const applyLocaleMetadata = useCallback((lang: Locale) => {
    const dict = dictionaries[lang];
    document.documentElement.setAttribute('lang', lang);
    document.title = dict.meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', dict.meta.description);
    }
  }, []);

  useEffect(() => {
    applyLocaleMetadata(locale);
  }, [locale, applyLocaleMetadata]);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale || lockRef.current) return;

      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // ignore
      }

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        setLocaleState(next);
        applyLocaleMetadata(next);
        return;
      }

      lockRef.current = true;
      setIsSwitchingLanguage(true);

      // Preserve current scroll position
      const savedScrollY = window.scrollY;
      const targets = gsap.utils.toArray<HTMLElement>('[data-i18n]');

      if (targets.length === 0) {
        setLocaleState(next);
        applyLocaleMetadata(next);
        lockRef.current = false;
        setIsSwitchingLanguage(false);
        return;
      }

      // Phase 1: Smooth exit (opacity 0 + translateY -8px, ~260ms)
      gsap.killTweensOf(targets);
      gsap.to(targets, {
        opacity: 0,
        y: -7,
        duration: 0.25,
        stagger: {
          amount: 0.08,
          from: 'start',
        },
        ease: 'power2.in',
        overwrite: 'auto',
        onComplete: () => {
          // Swap locale dictionary
          setLocaleState(next);
          applyLocaleMetadata(next);

          // Wait next animation frame for React DOM text update, keeping scroll position intact
          requestAnimationFrame(() => {
            window.scrollTo({ top: savedScrollY, behavior: 'instant' as ScrollBehavior });
            const updatedTargets = gsap.utils.toArray<HTMLElement>('[data-i18n]');
            gsap.fromTo(
              updatedTargets,
              {
                opacity: 0,
                y: 8,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.38,
                stagger: {
                  amount: 0.12,
                  from: 'start',
                },
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                onComplete: () => {
                  lockRef.current = false;
                  setIsSwitchingLanguage(false);
                },
              }
            );
          });
        },
      });
    },
    [locale, applyLocaleMetadata]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'pt-BR' ? 'en' : 'pt-BR');
  }, [locale, setLocale]);

  return (
    <LanguageContext.Provider
      value={{
        locale,
        t: dictionaries[locale],
        isSwitchingLanguage,
        setLocale,
        toggleLocale,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
