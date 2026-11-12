import React, { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '../router';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Sun, Moon, Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath, activeSection, setActiveSection, navigate } = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();
  const themeIconRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);

      if (currentPath === '/') {
        const sections = ['home', 'about', 'projects', 'skills', 'contact'];
        const scrollPosition = y + window.innerHeight * 0.32;
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]);
          if (el && el.offsetTop <= scrollPosition) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPath, setActiveSection]);

  const handleThemeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (themeIconRef.current) {
      gsap.fromTo(
        themeIconRef.current,
        { rotate: -90, scale: 0.65, opacity: 0.4 },
        {
          rotate: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'expo.out',
        }
      );
    }
    toggleTheme(e);
  };

  const navItems = [
    { id: 'home', label: t.nav.home, to: '/', sectionId: 'home' },
    { id: 'about', label: t.nav.about, to: '/', sectionId: 'about' },
    { id: 'projects', label: t.nav.projects, to: '/', sectionId: 'projects' },
    { id: 'skills', label: t.nav.skills, to: '/', sectionId: 'skills' },
    { id: 'contact', label: t.nav.contact, to: '/', sectionId: 'contact' },
  ];

  const isNavItemActive = (id: string) => {
    if (currentPath === '/') {
      return activeSection === id;
    }
    if (id === 'about' && currentPath === '/sobre') return true;
    if (id === 'projects' && currentPath.startsWith('/projetos')) return true;
    if (id === 'skills' && currentPath === '/certificacoes') return true;
    if (id === 'contact' && currentPath === '/contato') return true;
    return false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 no-print ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="editorial-container">
        <div
          className={`flex items-center justify-between rounded-full border transition-all duration-500 px-3 sm:px-5 ${
            scrolled
              ? 'py-2.5 bg-[var(--bg-glass)] border-[var(--border-subtle)] backdrop-blur-xl'
              : 'py-3 bg-[var(--bg-glass)]/85 border-[var(--border-subtle)]/80 backdrop-blur-md'
          }`}
          style={{ boxShadow: 'var(--shadow-pill)' }}
        >
          {/* Left: Personal Monogram & Brand Identity */}
          <Link
            to="/"
            sectionId="home"
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Lucas Ribeiro — Home"
          >
            <span className="w-9 h-9 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] flex items-center justify-center font-display font-extrabold text-xs tracking-tighter transition-transform duration-300 group-hover:scale-105">
              LR
            </span>
            <div className="flex flex-col">
              <span className="font-display font-bold text-xs sm:text-sm tracking-wider uppercase text-[var(--text-primary)] leading-none">
                LUCAS RIBEIRO
              </span>
              <span className="font-mono-tech text-[10px] text-[var(--text-muted)] tracking-widest uppercase mt-0.5 hidden sm:inline">
                CS · IMT
              </span>
            </div>
          </Link>

          {/* Center: Desktop Floating Navigation */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-1 px-1.5 py-1 rounded-full bg-[var(--bg-primary)]/50 border border-[var(--border-subtle)]"
          >
            {navItems.map((item) => {
              const active = isNavItemActive(item.id);
              return (
                <Link
                  key={item.id}
                  to={item.to}
                  sectionId={item.sectionId}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider transition-colors duration-200 ${
                    active
                      ? 'text-[var(--accent-text)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 rounded-full bg-[var(--accent-bg)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span data-i18n={`nav-${item.id}`}>{item.label}</span>
                </Link>
              );
            })}

            <span className="w-[1px] h-4 bg-[var(--border-subtle)] mx-1" />

            <Link
              to="/curriculo"
              className={`relative px-3.5 py-1.5 rounded-full text-xs font-mono-tech uppercase tracking-wider flex items-center gap-1.5 transition-colors duration-200 ${
                currentPath === '/curriculo'
                  ? 'text-[var(--accent-text)] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {currentPath === '/curriculo' && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[var(--accent-bg)] -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              <FileText className="w-3 h-3" />
              <span data-i18n="nav-resume">{t.nav.resume}</span>
            </Link>
          </nav>

          {/* Right: Language Switcher (PT/EN), Theme Switcher (Light/Dark), CTA & Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Animated PT / EN Language Switcher (Visible on all viewports) */}
            <div
              role="group"
              aria-label={t.nav.switchLang}
              className="flex items-center p-0.5 rounded-full bg-[var(--bg-primary)]/70 border border-[var(--border-subtle)] text-[11px] font-mono-tech"
            >
              <button
                type="button"
                onClick={() => setLocale('pt-BR')}
                aria-pressed={locale === 'pt-BR'}
                className={`relative px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer ${
                  locale === 'pt-BR'
                    ? 'text-[var(--accent-text)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {locale === 'pt-BR' && (
                  <motion.span
                    layoutId="lang-active-pill"
                    className="absolute inset-0 rounded-full bg-[var(--accent-bg)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10">PT</span>
              </button>

              <button
                type="button"
                onClick={() => setLocale('en')}
                aria-pressed={locale === 'en'}
                className={`relative px-2.5 py-1 rounded-full transition-colors duration-200 cursor-pointer ${
                  locale === 'en'
                    ? 'text-[var(--accent-text)] font-semibold'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {locale === 'en' && (
                  <motion.span
                    layoutId="lang-active-pill"
                    className="absolute inset-0 rounded-full bg-[var(--accent-bg)]"
                    transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                  />
                )}
                <span className="relative z-10">EN</span>
              </button>
            </div>

            {/* Cinematic Light / Dark Mode Button (Visible on all viewports) */}
            <MagneticButton strength={0.2}>
              <button
                type="button"
                onClick={handleThemeClick}
                aria-label={
                  theme === 'dark' ? t.nav.switchThemeToLight : t.nav.switchThemeToDark
                }
                title={theme === 'dark' ? t.nav.switchThemeToLight : t.nav.switchThemeToDark}
                className="w-9 h-9 rounded-full bg-[var(--bg-primary)]/70 border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] flex items-center justify-center transition-colors duration-200 cursor-pointer"
              >
                <span ref={themeIconRef} className="inline-flex items-center justify-center">
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" />
                  ) : (
                    <Moon className="w-4 h-4" />
                  )}
                </span>
              </button>
            </MagneticButton>

            {/* Desktop Hire Me Pill CTA */}
            <div className="hidden sm:block">
              <MagneticButton strength={0.18}>
                <button
                  type="button"
                  onClick={() => navigate('/', { sectionId: 'contact' })}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] hover:opacity-90 text-xs font-mono-tech font-semibold uppercase tracking-wider transition-all cursor-pointer"
                >
                  <span data-i18n="nav-hire-cta">{t.nav.hireMe}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </MagneticButton>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden w-9 h-9 rounded-full bg-[var(--bg-primary)]/70 border border-[var(--border-subtle)] text-[var(--text-primary)] flex items-center justify-center cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden mt-2 rounded-3xl bg-[var(--bg-glass-heavy)] border border-[var(--border-subtle)] backdrop-blur-2xl p-5 space-y-3"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="grid grid-cols-1 gap-1">
                {navItems.map((item, idx) => {
                  const active = isNavItemActive(item.id);
                  return (
                    <Link
                      key={item.id}
                      to={item.to}
                      sectionId={item.sectionId}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl font-mono-tech text-xs uppercase tracking-widest transition-colors ${
                        active
                          ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                      }`}
                    >
                      <span data-i18n={`mobile-nav-${item.id}`}>{item.label}</span>
                      <span className="text-[10px] opacity-60">0{idx + 1}</span>
                    </Link>
                  );
                })}

                <Link
                  to="/curriculo"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl font-mono-tech text-xs uppercase tracking-widest transition-colors ${
                    currentPath === '/curriculo'
                      ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]'
                  }`}
                >
                  <span data-i18n="mobile-nav-resume">{t.nav.resume}</span>
                  <FileText className="w-3.5 h-3.5 opacity-70" />
                </Link>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-[11px] font-mono-tech text-[var(--text-secondary)]">
                  <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-pulse" />
                  <span data-i18n="mobile-status">{t.nav.available}</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/', { sectionId: 'contact' });
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] text-xs font-mono-tech font-semibold uppercase tracking-wider"
                >
                  <span>{t.nav.hireMe}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
