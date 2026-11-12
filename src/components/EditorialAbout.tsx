import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../router';
import { GraduationCap, CheckCircle2, ArrowUpRight, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialAbout: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal-item',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-pillar-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-pillars-grid',
            start: 'top 84%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]"
    >
      <div className="editorial-container space-y-20">
        {/* Top Eyebrow */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <span
            data-i18n="about-eyebrow"
            className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {t.about.eyebrow}
          </span>
          <span className="font-mono-tech text-xs text-[var(--text-muted)]">
            {t.about.education.location}
          </span>
        </div>

        {/* Asymmetric 12-Col Editorial Composition */}
        <div className="editorial-grid items-start gap-10 lg:gap-12">
          {/* Left Column (5 cols): Editorial Narrative, Philosophy & Metric Cards */}
          <div className="col-span-12 lg:col-span-5 space-y-8">
            <div className="about-reveal-item space-y-4">
              <h2
                data-i18n="about-title"
                className="text-section-title text-[var(--text-primary)]"
              >
                {t.about.title}
              </h2>
              <p
                data-i18n="about-lead"
                className="text-editorial-lead text-[var(--text-secondary)]"
              >
                {t.about.lead}
              </p>
            </div>

            {/* Dijkstra Quote Block */}
            <blockquote className="about-reveal-item p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
              <p
                data-i18n="about-quote"
                className="font-display text-base sm:text-lg text-[var(--text-primary)] italic leading-snug"
              >
                {t.about.quote}
              </p>
              <footer className="font-mono-tech text-xs text-[var(--text-muted)] text-right">
                {t.about.quoteAuthor}
              </footer>
            </blockquote>

            {/* 3 Horizontal Metric Cards (Inspired by rifqi.dev 00:12) */}
            <div className="about-reveal-item space-y-3">
              {t.about.metrics.map((metric, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    navigate('/', {
                      sectionId: idx === 0 ? 'projects' : 'skills',
                    })
                  }
                  className="w-full p-5 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all flex items-center justify-between text-left group cursor-pointer"
                >
                  <div className="space-y-1">
                    <span
                      data-i18n={`about-metric-lbl-${idx}`}
                      className="block font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold"
                    >
                      {metric.label}
                    </span>
                    <span
                      data-i18n={`about-metric-sub-${idx}`}
                      className="block font-mono-tech text-[11px] text-[var(--text-muted)]"
                    >
                      {metric.sub}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                      {metric.value}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (7 cols): Academic Institution Card & 6 Core CS Pillars */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            {/* Academic Degree Card — Instituto Mauá de Tecnologia */}
            <div
              className="about-reveal-item p-7 sm:p-9 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent-bg)] text-[var(--accent-text)] flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <span
                      data-i18n="about-edu-label"
                      className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] block"
                    >
                      {t.about.education.label}
                    </span>
                    <h3
                      data-i18n="about-edu-degree"
                      className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]"
                    >
                      {t.about.education.degree}
                    </h3>
                  </div>
                </div>

                <span
                  data-i18n="about-edu-period"
                  className="self-start sm:self-auto px-3.5 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-primary)]"
                >
                  {t.about.education.period}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono-tech text-[var(--text-secondary)]">
                <span data-i18n="about-edu-inst" className="font-semibold text-[var(--text-primary)]">
                  {t.about.education.institution}
                </span>
                <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t.about.education.location}</span>
                </span>
              </div>

              <p
                data-i18n="about-edu-desc"
                className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
              >
                {t.about.education.description}
              </p>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {t.about.education.highlights.map((hl, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] text-xs sm:text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                    <span data-i18n={`about-edu-hl-${idx}`}>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6 Core Computer Science Pillars */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  data-i18n="about-pillars-title"
                  className="font-display font-bold text-xl text-[var(--text-primary)]"
                >
                  {t.about.pillarsTitle}
                </h3>
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">01 — 06</span>
              </div>

              <div className="about-pillars-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.about.pillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="about-pillar-card p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-xs text-[var(--text-muted)]">
                      <span>[{pillar.index}]</span>
                      <span>CS CORE</span>
                    </div>
                    <h4
                      data-i18n={`about-pillar-t-${pillar.index}`}
                      className="font-display font-bold text-base text-[var(--text-primary)]"
                    >
                      {pillar.title}
                    </h4>
                    <p
                      data-i18n={`about-pillar-d-${pillar.index}`}
                      className="text-xs text-[var(--text-secondary)] leading-relaxed"
                    >
                      {pillar.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
