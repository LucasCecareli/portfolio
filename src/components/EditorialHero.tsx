import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../router';
import { MagneticButton } from './MagneticButton';
import { TerminalWidget } from './TerminalWidget';
import { GithubIcon, LinkedinIcon } from './Icons';
import { ArrowDownRight, ArrowUpRight, FileText, Mail, Terminal, ShieldCheck, Compass } from 'lucide-react';
import gsap from 'gsap';

export const EditorialHero: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [activeRightTab, setActiveRightTab] = useState<'pass' | 'terminal'>('pass');
  const [spTime, setSpTime] = useState<string>('');

  const heroRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  // Live São Paulo time for the technical pass
  useEffect(() => {
    const updateClock = () => {
      try {
        const now = new Date();
        const formatter = new Intl.DateTimeFormat('pt-BR', {
          timeZone: 'America/Sao_Paulo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setSpTime(`${formatter.format(now)} BRT`);
      } catch {
        setSpTime('23°32′S 46°38′W');
      }
    };
    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  // GSAP Cinematic Entry Timeline
  useEffect(() => {
    if (!heroRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      tl.fromTo(
        '.hero-reveal-badge',
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.05
      )
        .fromTo(
          '.hero-line-inner',
          { yPercent: 112, rotateZ: 1.5 },
          {
            yPercent: 0,
            rotateZ: 0,
            duration: 1.05,
            stagger: 0.11,
            ease: 'power4.out',
          },
          0.15
        )
        .fromTo(
          '.hero-reveal-sub',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.48
        )
        .fromTo(
          '.hero-reveal-cta',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 },
          0.62
        )
        .fromTo(
          '.hero-reveal-card',
          { opacity: 0, y: 28, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' },
          0.32
        )
        .fromTo(
          '.hero-reveal-meta',
          { opacity: 0 },
          { opacity: 1, duration: 0.9 },
          0.85
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // Interactive 3D tilt for the Editorial Pass
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || activeRightTab !== 'pass') return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches)
    ) {
      return;
    }

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cardRef.current, {
      rotateY: x * 10,
      rotateX: -y * 10,
      transformPerspective: 900,
      duration: 0.45,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (emblemRef.current) {
      gsap.to(emblemRef.current, {
        x: x * 18,
        y: y * 18,
        duration: 0.45,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const handleCardMouseLeave = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotateY: 0,
      rotateX: 0,
      duration: 0.75,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    if (emblemRef.current) {
      gsap.to(emblemRef.current, {
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const hasPersonalPhoto = Boolean(
    portfolioData.personal.photoUrl && portfolioData.personal.photoUrl.trim().length > 0
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-between overflow-hidden bg-architectural-grid border-b border-[var(--border-subtle)]"
    >
      {/* Monumental Background Outline Marquee (Inspired by Richard reference 00:40) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden opacity-70 select-none z-0"
      >
        <div className="animate-marquee-slow flex items-center gap-16 whitespace-nowrap">
          <span className="text-outline-monumental">
            LUCAS RIBEIRO — COMPUTER SCIENCE — SOFTWARE ENGINEERING —
          </span>
          <span className="text-outline-monumental">
            LUCAS RIBEIRO — COMPUTER SCIENCE — SOFTWARE ENGINEERING —
          </span>
        </div>
      </div>

      {/* Main 12-Column Editorial Grid */}
      <div className="editorial-container relative z-10 flex-1 flex items-center">
        <div className="editorial-grid items-center w-full">
          {/* Left Column (7 cols on lg): Typography & Narrative */}
          <div className="col-span-12 lg:col-span-7 space-y-7">
            {/* Top Status & Academic Pill */}
            <div className="hero-reveal-badge flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--text-primary)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--text-primary)]" />
                </span>
                <span
                  data-i18n="hero-status"
                  className="font-mono-tech text-[10px] sm:text-[11px] tracking-widest uppercase text-[var(--text-primary)] font-medium"
                >
                  {t.hero.statusBadge}
                </span>
              </div>

              <span
                data-i18n="hero-inst"
                className="font-mono-tech text-[11px] text-[var(--text-secondary)] px-3 py-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-primary)]/60"
              >
                {t.hero.institutionBadge}
              </span>
            </div>

            {/* Name Eyebrow */}
            <div className="hero-reveal-badge flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--text-primary)]" />
              <span
                data-i18n="hero-greeting"
                className="font-mono-tech text-xs tracking-[0.24em] uppercase text-[var(--text-secondary)] font-semibold"
              >
                {t.hero.greeting}
              </span>
            </div>

            {/* Masked Display Headline (Staggered Line Reveal) */}
            <h1 className="text-hero-display tracking-tight">
              <span className="block overflow-hidden pb-1">
                <span
                  data-i18n="hero-line-1"
                  className="hero-line-inner block text-[var(--text-primary)]"
                >
                  {t.hero.headlineLine1}
                </span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span
                  data-i18n="hero-line-2"
                  className="hero-line-inner block text-[var(--text-secondary)]"
                >
                  {t.hero.headlineLine2}
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span
                  data-i18n="hero-line-3"
                  className="hero-line-inner block text-[var(--text-primary)]"
                >
                  {t.hero.headlineLine3}
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p
              data-i18n="hero-subtitle"
              className="hero-reveal-sub text-editorial-lead text-[var(--text-secondary)] max-w-xl font-normal"
            >
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <div className="hero-reveal-cta">
                <MagneticButton strength={0.2}>
                  <button
                    type="button"
                    onClick={() => navigate('/', { sectionId: 'projects' })}
                    className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <span data-i18n="hero-cta-projects">{t.hero.ctaProjects}</span>
                    <ArrowDownRight className="w-4 h-4" />
                  </button>
                </MagneticButton>
              </div>

              <div className="hero-reveal-cta">
                <MagneticButton strength={0.18}>
                  <button
                    type="button"
                    onClick={() => navigate('/', { sectionId: 'contact' })}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <span data-i18n="hero-cta-contact">{t.hero.ctaContact}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </MagneticButton>
              </div>

              <div className="hero-reveal-cta">
                <MagneticButton strength={0.18}>
                  <Link
                    to="/curriculo"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-transparent hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono-tech text-xs uppercase tracking-wider transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span data-i18n="hero-cta-resume">{t.hero.ctaResume}</span>
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Direct Tech & Social Bar */}
            <div className="hero-reveal-meta pt-4 flex flex-wrap items-center gap-6 border-t border-[var(--border-subtle)]/80">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <Mail className="w-4 h-4" />
                <span>{portfolioData.personal.email}</span>
              </a>
            </div>
          </div>

          {/* Right Column (5 cols on lg): Interactive Lanyard / Editorial Identity Pass + CLI Switcher */}
          <div className="col-span-12 lg:col-span-5 hero-reveal-card flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[440px] space-y-3">
              {/* Top Mode Switcher: Technical Pass vs CLI Terminal */}
              <div className="flex items-center justify-between px-1">
                <div className="inline-flex items-center p-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)]">
                  <button
                    type="button"
                    onClick={() => setActiveRightTab('pass')}
                    className={`px-3 py-1 rounded-full font-mono-tech text-[10px] uppercase tracking-wider transition-colors cursor-pointer ${
                      activeRightTab === 'pass'
                        ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <span data-i18n="hero-tab-id">{t.hero.cardTabIdentity}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveRightTab('terminal')}
                    className={`px-3 py-1 rounded-full font-mono-tech text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeRightTab === 'terminal'
                        ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <Terminal className="w-3 h-3" />
                    <span data-i18n="hero-tab-cli">{t.hero.cardTabTerminal}</span>
                  </button>
                </div>

                <span className="font-mono-tech text-[10px] text-[var(--text-muted)] tracking-wider">
                  {spTime}
                </span>
              </div>

              {activeRightTab === 'terminal' ? (
                <TerminalWidget />
              ) : (
                <div className="relative pt-5">
                  {/* Lanyard Strap Graphic (Inspired by rifqi.dev 3D card strap) */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
                  >
                    <div className="w-6 h-8 bg-[var(--bg-elevated)] border-x border-[var(--border-strong)] flex items-center justify-center">
                      <span className="font-mono-tech text-[7px] tracking-widest uppercase text-[var(--text-muted)] -rotate-90 whitespace-nowrap">
                        IMT·CS
                      </span>
                    </div>
                    <div className="w-8 h-3 rounded-sm bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center">
                      <div className="w-3 h-1 rounded-full bg-[var(--bg-primary)]" />
                    </div>
                  </div>

                  {/* Interactive 3D Editorial ID Card */}
                  <div
                    ref={cardRef}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="relative rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] p-6 sm:p-7 transition-colors duration-300 select-none overflow-hidden"
                    style={{
                      boxShadow: 'var(--shadow-card)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Top Lanyard Slot Cutout & Header */}
                    <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[var(--text-primary)]" />
                        <span
                          data-i18n="id-header"
                          className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-secondary)]"
                        >
                          {t.hero.idCard.headerLabel}
                        </span>
                      </div>
                      <span
                        data-i18n="id-code"
                        className="font-mono-tech text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                      >
                        {t.hero.idCard.code}
                      </span>
                    </div>

                    {/* Central Visual Canvas: Personal B&W Portrait OR Authorial Architectural Monogram */}
                    <div className="my-5 relative h-52 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center">
                      {/* Fine grid overlay inside pass */}
                      <div className="absolute inset-0 bg-architectural-grid opacity-80" />

                      {hasPersonalPhoto ? (
                        <img
                          src={portfolioData.personal.photoUrl}
                          alt={portfolioData.personal.name}
                          className="relative z-10 w-full h-full object-cover grayscale contrast-125"
                        />
                      ) : (
                        <div
                          ref={emblemRef}
                          className="relative z-10 flex flex-col items-center justify-center text-center p-4"
                        >
                          {/* Concentric Geometric Rings */}
                          <div className="relative w-28 h-28 flex items-center justify-center">
                            <div className="absolute inset-0 rounded-full border border-dashed border-[var(--border-strong)] animate-[spin_28s_linear_infinite]" />
                            <div className="absolute inset-3 rounded-full border border-[var(--border-subtle)]" />
                            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center shadow-lg">
                              <span className="font-display font-extrabold text-2xl tracking-tighter text-[var(--text-primary)]">
                                LR
                              </span>
                            </div>
                          </div>

                          <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono-tech text-[var(--text-muted)] tracking-widest uppercase">
                            <Compass className="w-3 h-3 text-[var(--text-secondary)]" />
                            <span>SÃO PAULO · 23.5505° S, 46.6333° W</span>
                          </div>
                        </div>
                      )}

                      {/* Corner Technical Crosshairs */}
                      <span className="absolute top-2.5 left-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        [01]
                      </span>
                      <span className="absolute top-2.5 right-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        SYS.ACTIVE
                      </span>
                      <span className="absolute bottom-2.5 left-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        B.SC. CS
                      </span>
                      <span className="absolute bottom-2.5 right-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        2023—2027
                      </span>
                    </div>

                    {/* Identity Details & Engineering Focus */}
                    <div className="space-y-4">
                      <div>
                        <h2 className="font-display font-bold text-xl text-[var(--text-primary)] tracking-tight">
                          {portfolioData.personal.name}
                        </h2>
                        <p
                          data-i18n="id-role"
                          className="font-mono-tech text-xs text-[var(--text-secondary)] mt-0.5"
                        >
                          {t.hero.idCard.role}
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                        <span
                          data-i18n="id-focus-label"
                          className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]"
                        >
                          {t.hero.idCard.focusLabel}
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {t.hero.idCard.focusItems.map((item, idx) => (
                            <div
                              key={idx}
                              className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-elevated)]/70 border border-[var(--border-subtle)] font-mono-tech text-[11px] text-[var(--text-primary)] truncate"
                            >
                              <span className="text-[var(--text-muted)] mr-1.5">0{idx + 1}</span>
                              <span data-i18n={`id-focus-${idx}`}>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)]">
                        <span data-i18n="id-hint">{t.hero.idCard.interactiveHint}</span>
                        <button
                          type="button"
                          onClick={() => setActiveRightTab('terminal')}
                          className="text-[var(--text-primary)] underline underline-offset-4 hover:opacity-80 cursor-pointer"
                        >
                          CLI →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator Bar */}
      <div className="editorial-container relative z-10 pt-10 flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono-tech text-[11px] text-[var(--text-muted)] uppercase tracking-widest">
          <span>00 / 05</span>
          <span>—</span>
          <span>INDEX</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/', { sectionId: 'bridge' })}
          className="inline-flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer group"
        >
          <span data-i18n="hero-scroll">{t.hero.scrollIndicator}</span>
          <span className="w-5 h-5 rounded-full border border-[var(--border-subtle)] flex items-center justify-center group-hover:translate-y-0.5 transition-transform">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};
