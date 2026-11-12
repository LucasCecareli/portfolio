import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../router';
import { ArrowUp } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-primary)] py-16 text-[var(--text-secondary)] border-t border-[var(--border-subtle)] no-print">
      <div className="editorial-container space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand Column (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] flex items-center justify-center font-display font-extrabold text-[11px]">
                LCR
              </span>
              <span className="font-display font-bold text-base tracking-wider uppercase text-[var(--text-primary)]">
                {portfolioData.personal.name}
              </span>
            </div>
            <p
              data-i18n="footer-inst"
              className="font-mono-tech text-xs text-[var(--text-muted)] max-w-sm leading-relaxed"
            >
              {t.about.education.degree} · {t.about.education.institution} (2025—2029)
            </p>
          </div>

          {/* Navigation Column (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h3
              data-i18n="footer-nav-heading"
              className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-muted)]"
            >
              {t.footer.navigationHeading}
            </h3>
            <ul className="space-y-2 text-xs font-mono-tech">
              <li>
                <Link
                  to="/"
                  sectionId="home"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  sectionId="about"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  sectionId="projects"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.projects}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  sectionId="skills"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.skills}
                </Link>
              </li>
              <li>
                <Link
                  to="/curriculo"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.resume}
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  sectionId="contact"
                  className="hover:text-[var(--text-primary)] transition-colors"
                >
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Focus Areas Column (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h3
              data-i18n="footer-focus-heading"
              className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-muted)]"
            >
              {t.footer.focusHeading}
            </h3>
            <ul className="space-y-2 text-xs font-mono-tech text-[var(--text-secondary)]">
              {t.footer.focusItems.map((item, idx) => (
                <li key={idx} data-i18n={`footer-focus-${idx}`}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-xs text-[var(--text-muted)]">
          <span data-i18n="footer-built">
            © {CURRENT_YEAR} — {t.footer.builtWith}
          </span>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={t.footer.backToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <span data-i18n="footer-top">{t.footer.backToTop}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
