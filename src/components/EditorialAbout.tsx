import React, { useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../router';
import {
  GraduationCap,
  CheckCircle2,
  ArrowUpRight,
  MapPin,
  Cpu,
  Target,
  Lightbulb,
  Calendar,
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialAbout: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const sectionRef = useRef<HTMLElement>(null);

  const hasPersonalPhoto = Boolean(
    portfolioData.personal.photoUrl && portfolioData.personal.photoUrl.trim().length > 0
  );

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-reveal-item',
        { opacity: 0, y: 26 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.09,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.about-chapter-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-chapters-grid',
            start: 'top 84%',
          },
        }
      );

      gsap.fromTo(
        '.about-timeline-node',
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-timeline-list',
            start: 'top 84%',
          },
        }
      );

      gsap.fromTo(
        '.about-pillar-card',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.08,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-pillars-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const chapters = [
    {
      ...t.about.chapters.whyTech,
      icon: Lightbulb,
    },
    {
      ...t.about.chapters.interests,
      icon: Cpu,
    },
    {
      ...t.about.chapters.goals,
      icon: Target,
    },
  ];

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

        {/* PART 1: Personal Narrative (Left 7 cols) + Flexible Portrait / Summary Module (Right 5 cols) */}
        <div className="editorial-grid items-start gap-10 lg:gap-12">
          {/* Left Column (7 cols): Who I Am */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="about-reveal-item space-y-4">
              <h2
                data-i18n="about-title"
                className="text-section-title text-[var(--text-primary)]"
              >
                {t.about.title}
              </h2>
              <p
                data-i18n="about-lead"
                className="text-editorial-lead text-[var(--text-primary)] font-medium"
              >
                {t.about.lead}
              </p>
            </div>

            <div className="about-reveal-item space-y-4 text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
              <p data-i18n="about-p1">{t.about.storyParagraph1}</p>
              <p data-i18n="about-p2">{t.about.storyParagraph2}</p>
            </div>

            {/* Personal Quote Block */}
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
          </div>

          {/* Right Column (5 cols): Prepared Personal Photograph Module + Key Summary Cards */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Flexible Personal Portrait / Editorial Profile Module */}
            {hasPersonalPhoto ? (
              <div
                className="about-reveal-item rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-4 overflow-hidden space-y-3"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-widest px-1">
                  <span>{t.about.photoFrame.label}</span>
                  <span>IMT · 2025—2029</span>
                </div>
                <div className="rounded-2xl bg-[var(--bg-primary)] overflow-hidden flex items-center justify-center">
                  <img
                    src={portfolioData.personal.photoUrl}
                    alt={portfolioData.personal.name}
                    className="w-full h-auto object-contain grayscale contrast-115"
                  />
                </div>
              </div>
            ) : (
              <div
                className="about-reveal-item p-6 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  <span>{t.about.photoFrame.label}</span>
                  <span>[LCR · IMT]</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-strong)] flex items-center justify-center shrink-0">
                    <span className="font-display font-extrabold text-lg text-[var(--text-primary)]">
                      LCR
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)] truncate">
                      {portfolioData.personal.name}
                    </h3>
                    <p className="font-mono-tech text-xs text-[var(--text-secondary)]">
                      {t.about.education.degree}
                    </p>
                    <p className="font-mono-tech text-[11px] text-[var(--text-muted)] mt-0.5">
                      {t.about.education.institution} · 2025—2029
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3 Verified Trajectory Summary Cards */}
            <div className="about-reveal-item space-y-3">
              {t.about.metrics.map((metric, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() =>
                    navigate('/', {
                      sectionId: idx === 1 ? 'projects' : 'skills',
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

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-display font-extrabold text-xl sm:text-2xl text-[var(--text-primary)]">
                      {metric.value}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PART 2: 3 Personal Narrative Chapters (Why Tech, Software & AI Interests, Professional Goals) */}
        <div className="about-chapters-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {chapters.map((chapter) => {
            const IconComponent = chapter.icon;
            return (
              <div
                key={chapter.index}
                className="about-chapter-card p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3">
                    <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                      [{chapter.index}]
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                      <IconComponent className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                    {chapter.title}
                  </h3>

                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                    {chapter.body}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* PART 3: Academic Degree Card & Study Pillars (Left 6 cols) + Academic & Practical Timeline 2025—2029 (Right 6 cols) */}
        <div className="editorial-grid items-start gap-10 lg:gap-12 pt-4">
          {/* Left Column (6 cols): Instituto Mauá de Tecnologia & 4 Study Pillars */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div
              className="about-reveal-item p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6"
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

            {/* 4 Study & Practice Pillars */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3
                  data-i18n="about-pillars-title"
                  className="font-display font-bold text-xl text-[var(--text-primary)]"
                >
                  {t.about.pillarsTitle}
                </h3>
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">01 — 04</span>
              </div>

              <div className="about-pillars-grid grid grid-cols-1 sm:grid-cols-2 gap-4">
                {t.about.pillars.map((pillar) => (
                  <div
                    key={pillar.index}
                    className="about-pillar-card p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors space-y-2.5"
                  >
                    <div className="flex items-center justify-between font-mono-tech text-xs text-[var(--text-muted)]">
                      <span>[{pillar.index}]</span>
                      <span>FOCUS</span>
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

          {/* Right Column (6 cols): Academic & Practical Timeline (2025 — 2029) */}
          <div className="col-span-12 lg:col-span-6">
            <div
              className="p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
                <div>
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] block">
                    {t.about.timeline.eyebrow}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mt-1">
                    {t.about.timeline.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>

              <div className="about-timeline-list relative pl-6 border-l border-[var(--border-strong)] space-y-6">
                {t.about.timeline.items.map((item, idx) => (
                  <div key={idx} className="about-timeline-node relative space-y-1.5">
                    {/* Timeline Node Dot */}
                    <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--accent-bg)] ring-4 ring-[var(--bg-surface)]" />

                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-mono-tech text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]">
                        {item.period}
                      </span>
                      <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] pt-0.5">
                      {item.title}
                    </h4>

                    <p className="font-mono-tech text-xs text-[var(--text-secondary)]">
                      {item.subtitle}
                    </p>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                      {item.description}
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
