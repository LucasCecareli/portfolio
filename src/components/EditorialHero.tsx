import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../router';
import { MagneticButton } from './MagneticButton';
import { TerminalWidget } from './TerminalWidget';
import { GithubIcon, LinkedinIcon } from './Icons';
import {
  ArrowDownRight,
  ArrowUpRight,
  FileText,
  Mail,
  Terminal,
  ShieldCheck,
  Compass,
  User,
} from 'lucide-react';
import gsap from 'gsap';

const INTRO_SESSION_KEY = 'lcr-intro-seen-v2_1';

function shouldRunIntroInitial(): boolean {
  if (typeof window === 'undefined') return false;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return false;
  try {
    return sessionStorage.getItem(INTRO_SESSION_KEY) !== '1';
  } catch {
    return false;
  }
}

/**
 * Isolated clock component so 1s interval ticks NEVER trigger re-renders of EditorialHero
 * while GSAP timelines are running.
 */
const LiveSaoPauloClock: React.FC = React.memo(() => {
  const [spTime, setSpTime] = useState<string>('');

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

  return (
    <span className="font-mono-tech text-[10px] text-[var(--text-muted)] tracking-wider">
      {spTime}
    </span>
  );
});

export const EditorialHero: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [activeRightTab, setActiveRightTab] = useState<'pass' | 'terminal'>('pass');
  const [introActive, setIntroActive] = useState<boolean>(shouldRunIntroInitial);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const introMetaRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const emblemRef = useRef<HTMLDivElement>(null);

  // Skip handler for Cinematic Intro
  const skipIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {
      // ignore
    }
    if (timelineRef.current) {
      timelineRef.current.progress(1);
    }
    setIntroActive(false);
  }, []);

  // Prevent user scroll via non-reflowing event listeners (avoids body overflow scrollbar shift!)
  // and listen for Escape key during the intro
  useEffect(() => {
    if (!introActive) return;

    const preventScroll = (e: Event) => {
      e.preventDefault();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        skipIntro();
        return;
      }
      const scrollKeys = ['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', ' ', 'Home', 'End'];
      if (scrollKeys.includes(e.key)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', onKeyDown, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [introActive, skipIntro]);

  // Synchronous pre-paint setup (useLayoutEffect) + Font-ready & rAF-synced 3.55s GSAP choreography
  useLayoutEffect(() => {
    if (!heroRef.current || !titleRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIntroActive(false);
      return;
    }

    let isCancelled = false;
    let rafId: number | null = null;

    const ctx = gsap.context(() => {
      const titleEl = titleRef.current!;
      const line1El = line1Ref.current;
      const line2El = line2Ref.current;
      const line3El = line3Ref.current;

      if (introActive) {
        try {
          sessionStorage.setItem(INTRO_SESSION_KEY, '1');
        } catch {
          // ignore
        }

        window.scrollTo(0, 0);

        // Pre-hide lines and supporting Hero elements BEFORE first browser paint so there is ZERO flash
        gsap.set('.hero-line-inner', { yPercent: 110, force3D: true });
        gsap.set('.intro-tech-line', { scaleX: 0, opacity: 0 });
        gsap.set('.intro-tech-text', { opacity: 0, y: 6 });
        gsap.set(
          [
            '.hero-reveal-badge',
            '.hero-reveal-sub',
            '.hero-reveal-cta',
            '.hero-reveal-meta',
          ],
          { opacity: 0, y: 18, force3D: true }
        );
        gsap.set('.hero-reveal-portrait-module', {
          opacity: 0,
          y: 22,
          scale: 0.985,
          force3D: true,
        });

        // Lock initial intro colors on the black #090909 stage without React state changes
        if (line1El && line2El && line3El) {
          gsap.set([line1El, line3El], { color: '#F5F5F5' });
          gsap.set(line2El, { color: '#A8A8B3' });
        }

        const computeAndPlaceStart = () => {
          gsap.set(titleEl, { x: 0, y: 0, scale: 1, clearProps: 'transform' });
          const rect = titleEl.getBoundingClientRect();
          const vw = document.documentElement.clientWidth || window.innerWidth;
          const vh = window.innerHeight;

          const maxScaleByWidth = (vw * (vw >= 1024 ? 0.76 : 0.86)) / Math.max(rect.width, 1);
          const targetStartScale = vw >= 1024 ? 1.3 : 1.12;
          const startScale = Math.max(1.04, Math.min(targetStartScale, maxScaleByWidth));

          const startX = Math.round((vw - rect.width * startScale) / 2 - rect.left);
          const startY = Math.round((vh - rect.height * startScale) / 2 - rect.top);

          gsap.set(titleEl, {
            x: startX,
            y: startY,
            scale: startScale,
            transformOrigin: '0% 0%',
            force3D: true,
          });
        };

        // Initial synchronous placement before paint
        computeAndPlaceStart();

        const startChoreography = () => {
          if (isCancelled) return;
          // Re-verify geometry now that web fonts (Syne 800) are 100% ready
          computeAndPlaceStart();

          const computedStyle = getComputedStyle(document.documentElement);
          const finalPrimaryColor =
            computedStyle.getPropertyValue('--text-primary').trim() || '#F5F5F5';
          const finalSecondaryColor =
            computedStyle.getPropertyValue('--text-secondary').trim() || '#A8A8B3';

          const tl = gsap.timeline({
            onComplete: () => {
              gsap.set(titleEl, { clearProps: 'transform' });
              if (line1El && line2El && line3El) {
                gsap.set([line1El, line2El, line3El], { clearProps: 'color' });
              }
              setIntroActive(false);
            },
          });

          timelineRef.current = tl;

          // ACT 1 (0.00s – 0.50s): Discrete visual preparation on black canvas
          tl.to(
            '.intro-tech-line',
            {
              scaleX: 1,
              opacity: 1,
              duration: 0.46,
              ease: 'power2.out',
            },
            0.04
          )
            .to(
              '.intro-tech-text',
              {
                opacity: 1,
                y: 0,
                duration: 0.42,
                stagger: 0.06,
                ease: 'power2.out',
              },
              0.1
            )
            // ACT 2 (0.50s – 1.70s): Progressive masked reveal of LUCAS / CECARELI / RIBEIRO.
            .to(
              '.hero-line-inner',
              {
                yPercent: 0,
                duration: 0.92,
                stagger: 0.14,
                ease: 'power3.out',
                force3D: true,
              },
              0.5
            )
            // ACT 3 (1.70s – 2.20s): Intentional 0.50s reading pause for the complete name
            // ACT 4 (2.20s – 3.55s): Smooth, continuous transformation into Hero position + coordinated reveal
            .to(
              introMetaRef.current,
              {
                opacity: 0,
                y: -8,
                duration: 0.36,
                ease: 'power2.inOut',
              },
              2.15
            )
            .to(
              titleEl,
              {
                x: 0,
                y: 0,
                scale: 1,
                duration: 1.24,
                ease: 'power3.inOut',
                force3D: true,
              },
              2.2
            )
            .to(
              backdropRef.current,
              {
                opacity: 0,
                duration: 0.95,
                ease: 'power2.inOut',
              },
              2.42
            );

          if (line1El && line2El && line3El) {
            tl.to(
              [line1El, line3El],
              {
                color: finalPrimaryColor,
                duration: 0.8,
                ease: 'power2.inOut',
              },
              2.5
            ).to(
              line2El,
              {
                color: finalSecondaryColor,
                duration: 0.8,
                ease: 'power2.inOut',
              },
              2.5
            );
          }

          // Supporting Hero elements enter smoothly as the name settles
          tl.to(
            '.hero-reveal-badge',
            {
              opacity: 1,
              y: 0,
              duration: 0.68,
              stagger: 0.06,
              ease: 'power3.out',
              force3D: true,
            },
            2.88
          )
            .to(
              '.hero-reveal-sub',
              {
                opacity: 1,
                y: 0,
                duration: 0.72,
                ease: 'power3.out',
                force3D: true,
              },
              2.96
            )
            .to(
              '.hero-reveal-cta',
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                stagger: 0.06,
                ease: 'power3.out',
                force3D: true,
              },
              3.04
            )
            .to(
              '.hero-reveal-meta',
              {
                opacity: 1,
                y: 0,
                duration: 0.68,
                ease: 'power3.out',
                force3D: true,
              },
              3.14
            )
            // Independent coordinated entrance for the Portrait / Identity module after the name transformation
            .to(
              '.hero-reveal-portrait-module',
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.82,
                ease: 'power3.out',
                force3D: true,
              },
              3.02
            );
        };

        // Wait for fonts to finish loading and start on a clean requestAnimationFrame boundary
        const fontsReadyPromise =
          typeof document !== 'undefined' && 'fonts' in document
            ? Promise.race([
                document.fonts.ready,
                new Promise((resolve) => window.setTimeout(resolve, 250)),
              ])
            : Promise.resolve();

        fontsReadyPromise.then(() => {
          if (isCancelled) return;
          rafId = window.requestAnimationFrame(() => {
            startChoreography();
          });
        });
      } else {
        // Subsequent internal route navigations within the same session
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        tl.fromTo(
          '.hero-reveal-badge',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.55, stagger: 0.05 },
          0.02
        )
          .fromTo(
            '.hero-line-inner',
            { yPercent: 105 },
            { yPercent: 0, duration: 0.75, stagger: 0.08, ease: 'power3.out' },
            0.06
          )
          .fromTo(
            '.hero-reveal-sub',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6 },
            0.22
          )
          .fromTo(
            '.hero-reveal-cta',
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.55, stagger: 0.05 },
            0.28
          )
          .fromTo(
            '.hero-reveal-portrait-module',
            { opacity: 0, y: 16, scale: 0.99 },
            { opacity: 1, y: 0, scale: 1, duration: 0.72 },
            0.24
          )
          .fromTo(
            '.hero-reveal-meta',
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.55 },
            0.36
          );
      }
    }, heroRef);

    return () => {
      isCancelled = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Interactive subtle 3D tilt for the secondary Identity Pass
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
      rotateY: x * 6,
      rotateX: -y * 6,
      transformPerspective: 950,
      duration: 0.4,
      ease: 'power3.out',
      overwrite: 'auto',
    });

    if (emblemRef.current) {
      gsap.to(emblemRef.current, {
        x: x * 10,
        y: y * 10,
        duration: 0.4,
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
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });
    if (emblemRef.current) {
      gsap.to(emblemRef.current, {
        x: 0,
        y: 0,
        duration: 0.65,
        ease: 'power3.out',
        overwrite: 'auto',
      });
    }
  };

  const hasEmail = Boolean(
    portfolioData.personal.email && portfolioData.personal.email.trim().length > 0
  );
  const hasLinkedin = Boolean(
    portfolioData.personal.linkedin && portfolioData.personal.linkedin.trim().length > 0
  );

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-16 sm:pt-36 sm:pb-24 flex flex-col justify-between overflow-hidden bg-architectural-grid border-b border-[var(--border-subtle)]"
    >
      {/* CINEMATIC INTRO STAGE BACKDROP (#090909) — Only mounted during initial ~3.55s sequence */}
      {introActive && (
        <div
          ref={backdropRef}
          className="fixed inset-0 z-[60] bg-[#090909] flex flex-col justify-between p-6 sm:p-12 select-none will-change-[opacity]"
        >
          {/* Top Technical Hairline & Discrete Index */}
          <div ref={introMetaRef} className="w-full max-w-[1360px] mx-auto space-y-3">
            <div className="flex items-center justify-between font-mono-tech text-[10px] sm:text-xs tracking-[0.24em] uppercase text-[#A8A8B3]">
              <span className="intro-tech-text">{t.intro.indexLabel}</span>
              <span className="intro-tech-text">{t.intro.locationLabel}</span>
            </div>
            <div className="intro-tech-line w-full h-[1px] bg-[#292929] origin-left will-change-transform" />
          </div>

          {/* Skip Intro Button */}
          <div className="w-full max-w-[1360px] mx-auto flex items-center justify-end">
            <button
              type="button"
              onClick={skipIntro}
              className="relative z-[80] px-3.5 py-1.5 rounded-full border border-[#292929] hover:border-[#F5F5F5] text-[#A8A8B3] hover:text-[#F5F5F5] font-mono-tech text-[10px] uppercase tracking-widest transition-colors cursor-pointer"
            >
              {t.intro.skipLabel}
            </button>
          </div>
        </div>
      )}

      {/* Monumental Background Outline Marquee */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 right-0 overflow-hidden opacity-55 select-none z-0"
      >
        <div className="animate-marquee-slow flex items-center gap-16 whitespace-nowrap">
          <span className="text-outline-monumental">
            LUCAS CECARELI RIBEIRO — CIÊNCIA DA COMPUTAÇÃO — IMT —
          </span>
          <span className="text-outline-monumental">
            LUCAS CECARELI RIBEIRO — CIÊNCIA DA COMPUTAÇÃO — IMT —
          </span>
        </div>
      </div>

      {/* Main 12-Column Editorial Grid */}
      <div className="editorial-container flex-1 flex items-center">
        <div className="editorial-grid items-center w-full gap-y-12">
          {/* Left Column (7 cols on lg): Personal Identity & Narrative */}
          <div className="col-span-12 lg:col-span-7 space-y-6 sm:space-y-7">
            {/* Top Academic & Period Pill */}
            <div className="hero-reveal-badge relative z-10 flex flex-wrap items-center gap-2.5">
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

            {/* Personal Eyebrow */}
            <div className="hero-reveal-badge relative z-10 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[var(--text-primary)]" />
              <span
                data-i18n="hero-greeting"
                className="font-mono-tech text-xs tracking-[0.24em] uppercase text-[var(--text-secondary)] font-semibold"
              >
                {t.hero.greeting}
              </span>
            </div>

            {/* PROTAGONIST FULL NAME HEADLINE — Single element with GPU-accelerated FLIP continuity */}
            <h1
              ref={titleRef}
              className={`text-hero-display tracking-tight will-change-transform ${
                introActive ? 'relative z-[70] pointer-events-none' : 'relative z-10'
              }`}
            >
              <span className="block overflow-hidden px-1 -mx-1 py-0.5">
                <span
                  ref={line1Ref}
                  data-i18n="hero-line-1"
                  className="hero-line-inner block text-[var(--text-primary)] will-change-transform"
                >
                  {t.hero.headlineLine1}
                </span>
              </span>
              <span className="block overflow-hidden px-1 -mx-1 py-0.5">
                <span
                  ref={line2Ref}
                  data-i18n="hero-line-2"
                  className="hero-line-inner block text-[var(--text-secondary)] will-change-transform"
                >
                  {t.hero.headlineLine2}
                </span>
              </span>
              <span className="block overflow-hidden px-1 -mx-1 py-0.5">
                <span
                  ref={line3Ref}
                  data-i18n="hero-line-3"
                  className="hero-line-inner block text-[var(--text-primary)] will-change-transform"
                >
                  {t.hero.headlineLine3}
                </span>
              </span>
            </h1>

            {/* Authentic Personal Trajectory Description */}
            <p
              data-i18n="hero-subtitle"
              className="hero-reveal-sub relative z-10 text-editorial-lead text-[var(--text-secondary)] max-w-xl font-normal"
            >
              {t.hero.subtitle}
            </p>

            {/* Primary & Secondary CTAs: Projetos, Sobre Mim, Contato, Currículo */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-1">
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
                    onClick={() => navigate('/', { sectionId: 'about' })}
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span data-i18n="hero-cta-about">{t.hero.ctaAbout}</span>
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
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full bg-transparent hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono-tech text-xs uppercase tracking-wider transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span data-i18n="hero-cta-resume">{t.hero.ctaResume}</span>
                  </Link>
                </MagneticButton>
              </div>
            </div>

            {/* Direct Verified Links Bar */}
            <div className="hero-reveal-meta relative z-10 pt-4 flex flex-wrap items-center gap-6 border-t border-[var(--border-subtle)]/80">
              {portfolioData.personal.github && (
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB / LUCASCECARELI</span>
                  <ArrowUpRight className="w-3 h-3 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              )}

              {hasLinkedin && (
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
              )}

              {hasEmail && (
                <a
                  href={`mailto:${portfolioData.personal.email}`}
                  className="inline-flex items-center gap-2 text-xs font-mono-tech text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
                >
                  <Mail className="w-4 h-4" />
                  <span>{portfolioData.personal.email}</span>
                </a>
              )}

              <span className="font-mono-tech text-[11px] text-[var(--text-muted)] uppercase tracking-wider">
                IMT · FEV 2025 — 2029
              </span>
            </div>
          </div>

          {/* Right Column (5 cols on lg): Secondary Editorial Identity & Future Portrait Module + CLI Switcher */}
          <div className="col-span-12 lg:col-span-5 hero-reveal-portrait-module relative z-10 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[420px] space-y-3">
              {/* Top Mode Switcher: Identity/Portrait vs CLI Terminal */}
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

                <LiveSaoPauloClock />
              </div>

              {activeRightTab === 'terminal' ? (
                <TerminalWidget />
              ) : (
                <div className="relative pt-3">
                  {/* Subtle Top Badge Clip */}
                  <div
                    aria-hidden="true"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 flex flex-col items-center z-20 pointer-events-none"
                  >
                    <div className="w-7 h-2.5 rounded-sm bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center">
                      <div className="w-2.5 h-0.5 rounded-full bg-[var(--bg-primary)]" />
                    </div>
                  </div>

                  {/* Editorial Identity & Future Portrait Module */}
                  <div
                    ref={cardRef}
                    onMouseMove={handleCardMouseMove}
                    onMouseLeave={handleCardMouseLeave}
                    className="relative rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] p-6 transition-colors duration-300 select-none overflow-hidden"
                    style={{
                      boxShadow: 'var(--shadow-card)',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-3.5 border-b border-[var(--border-subtle)]">
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

                    {/* Authorial Monogram Composition (Personal photograph is revealed exclusively in #about) */}
                    <div className="my-4 relative min-h-[195px] rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] overflow-hidden flex items-center justify-center">
                      <div className="absolute inset-0 bg-architectural-grid opacity-75" />

                      <div
                        ref={emblemRef}
                        className="relative z-10 flex flex-col items-center justify-center text-center p-5"
                      >
                        <div className="relative w-24 h-24 flex items-center justify-center">
                          <div className="absolute inset-0 rounded-full border border-dashed border-[var(--border-strong)] animate-[spin_36s_linear_infinite]" />
                          <div className="absolute inset-2.5 rounded-full border border-[var(--border-subtle)]" />
                          <div className="w-14 h-14 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-center shadow-md">
                            <span className="font-display font-extrabold text-lg tracking-tighter text-[var(--text-primary)]">
                              LCR
                            </span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-mono-tech text-[var(--text-muted)] tracking-widest uppercase">
                          <Compass className="w-3 h-3 text-[var(--text-secondary)]" />
                          <span>SÃO PAULO · IMT</span>
                        </div>
                      </div>

                      {/* Corner Technical Coordinates */}
                      <span className="absolute top-2.5 left-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        [LCR]
                      </span>
                      <span className="absolute top-2.5 right-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        FEV 2025
                      </span>
                      <span className="absolute bottom-2.5 left-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        B.SC. CS
                      </span>
                      <span className="absolute bottom-2.5 right-3 font-mono-tech text-[9px] text-[var(--text-muted)]">
                        2025—2029
                      </span>
                    </div>

                    {/* Identity Details & Current Focus */}
                    <div className="space-y-3.5">
                      <div>
                        <h2 className="font-display font-bold text-lg text-[var(--text-primary)] tracking-tight">
                          {portfolioData.personal.name}
                        </h2>
                        <p
                          data-i18n="id-role"
                          className="font-mono-tech text-xs text-[var(--text-secondary)] mt-0.5"
                        >
                          {t.hero.idCard.role} · {t.hero.idCard.institution}
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

                      <div className="pt-1.5 flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)]">
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
          <span>LUCAS CECARELI RIBEIRO</span>
        </div>

        <button
          type="button"
          onClick={() => navigate('/', { sectionId: 'about' })}
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
