import React, { useLayoutEffect, useRef } from 'react';
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
  const stagePinRef = useRef<HTMLDivElement>(null);

  // Stage Refs: Fixed Outer Portrait Container + Horizontal Mask + Narrative
  const eyebrowWrapRef = useRef<HTMLDivElement>(null);
  const photoStageWrapRef = useRef<HTMLDivElement>(null);
  const photoMaskRef = useRef<HTMLDivElement>(null);
  const photoInnerRef = useRef<HTMLDivElement>(null);

  // Personal Narrative Refs (Right Column in Pinned Stage)
  const titleWrapRef = useRef<HTMLDivElement>(null);
  const p1WrapRef = useRef<HTMLDivElement>(null);
  const p2WrapRef = useRef<HTMLDivElement>(null);
  const p3WrapRef = useRef<HTMLDivElement>(null);
  const quoteWrapRef = useRef<HTMLDivElement>(null);

  const hasPersonalPhoto = Boolean(
    (portfolioData.personal.photoDarkUrl && portfolioData.personal.photoDarkUrl.trim().length > 0) ||
      (portfolioData.personal.photoUrl && portfolioData.personal.photoUrl.trim().length > 0)
  );

  useLayoutEffect(() => {
    if (!sectionRef.current || !stagePinRef.current) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      if (photoMaskRef.current) {
        gsap.set(photoMaskRef.current, {
          clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
          webkitClipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
        });
      }
      if (photoInnerRef.current) {
        gsap.set(photoInnerRef.current, { scale: 1 });
      }
      return;
    }

    const mm = gsap.matchMedia();

    const ctx = gsap.context(() => {
      // =====================================================================
      // 1. DESKTOP (>= 1024px): MONUMENTAL PORTRAIT CONTINUOUS MASK REVEAL
      //    - Outer photo container remains 100% static in size and position.
      //    - Single continuous horizontal clip-path reveal with ease: 'none'
      //      so the opening responds 1:1 to Lenis-smoothed scroll.
      //    - Coordinated entrance of personal narrative beside the portrait.
      // =====================================================================
      mm.add('(min-width: 1024px)', () => {
        gsap.set(photoStageWrapRef.current, { opacity: 1, y: 0 });
        gsap.set(photoMaskRef.current, {
          clipPath: 'inset(0% 38% 0% 38% round 1.25rem)',
          webkitClipPath: 'inset(0% 38% 0% 38% round 1.25rem)',
        });
        gsap.set(photoInnerRef.current, { scale: 1.03 });

        gsap.set(eyebrowWrapRef.current, { opacity: 0.45, y: 8 });
        gsap.set(titleWrapRef.current, { opacity: 0, y: 22 });
        gsap.set(p1WrapRef.current, { opacity: 0, y: 18 });
        gsap.set(p2WrapRef.current, { opacity: 0, y: 18 });
        gsap.set(p3WrapRef.current, { opacity: 0, y: 16 });
        gsap.set(quoteWrapRef.current, { opacity: 0, y: 14 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stagePinRef.current,
            start: 'top top',
            end: '+=78%',
            pin: true,
            scrub: 0.14,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Continuous horizontal mask opening (0.00 -> 0.62) with ease: 'none'
        tl.to(
          photoMaskRef.current,
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
            webkitClipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
            duration: 0.62,
            ease: 'none',
          },
          0.0
        );

        tl.to(
          photoInnerRef.current,
          {
            scale: 1,
            duration: 0.62,
            ease: 'none',
          },
          0.0
        );

        // Coordinated personal narrative entrance alongside mask expansion
        tl.to(
          eyebrowWrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.18,
            ease: 'power2.out',
          },
          0.04
        );

        tl.to(
          titleWrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.18
        );

        tl.to(
          p1WrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.3
        );

        tl.to(
          p2WrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.42
        );

        tl.to(
          p3WrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.22,
            ease: 'power2.out',
          },
          0.54
        );

        tl.to(
          quoteWrapRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.2,
            ease: 'power2.out',
          },
          0.66
        );

        // Clean reading hold (0.86 -> 1.00) with full portrait & narrative before unpin
        tl.to({}, { duration: 0.14 }, 0.86);
      });

      // =====================================================================
      // 2. MOBILE & TABLET (< 1024px): NATURAL SCROLL + CONTINUOUS MASK REVEAL
      // =====================================================================
      mm.add('(max-width: 1023px)', () => {
        gsap.set(eyebrowWrapRef.current, { opacity: 1, y: 0 });
        gsap.set(photoStageWrapRef.current, { opacity: 1, y: 0 });
        gsap.set(photoMaskRef.current, {
          clipPath: 'inset(0% 28% 0% 28% round 1.25rem)',
          webkitClipPath: 'inset(0% 28% 0% 28% round 1.25rem)',
        });
        gsap.set(photoInnerRef.current, { scale: 1.03 });

        const mobilePhotoTl = gsap.timeline({
          scrollTrigger: {
            trigger: photoStageWrapRef.current,
            start: 'top 86%',
            end: 'top 24%',
            scrub: 0.14,
            invalidateOnRefresh: true,
          },
        });

        mobilePhotoTl
          .to(
            photoMaskRef.current,
            {
              clipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
              webkitClipPath: 'inset(0% 0% 0% 0% round 1.25rem)',
              ease: 'none',
              duration: 1,
            },
            0
          )
          .to(
            photoInnerRef.current,
            {
              scale: 1,
              ease: 'none',
              duration: 1,
            },
            0
          );

        const mobileNarrativeTargets = [
          titleWrapRef.current,
          p1WrapRef.current,
          p2WrapRef.current,
          p3WrapRef.current,
          quoteWrapRef.current,
        ].filter(Boolean);

        gsap.fromTo(
          mobileNarrativeTargets,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: titleWrapRef.current,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      // =====================================================================
      // 3. CONTINUITY CHAPTERS & TIMELINE REVEALS (BELOW OPENING STAGE)
      // =====================================================================
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

    return () => {
      mm.revert();
      ctx.revert();
    };
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
      aria-labelledby="about-main-heading"
      className="border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] relative"
    >
      {/* =====================================================================
          PART 1: MONUMENTAL PHOTOGRAPHIC PROTAGONIST & CONTINUOUS MASK REVEAL
          Desktop: Pinned Asymmetric Stage (~53% Left Portrait / ~47% Right Narrative)
          Mobile & Tablet: Natural Scroll with Reversible Horizontal Mask
          ===================================================================== */}
      <div
        ref={stagePinRef}
        className="min-h-screen flex items-center pt-[86px] pb-10 lg:pt-[84px] lg:pb-6 relative overflow-hidden"
      >
        <div className="editorial-container relative z-10 w-full">
          {/* Asymmetric Editorial Grid: Left ~53% Monumental Photograph / Right ~47% Clean Personal Narrative */}
          <div className="grid grid-cols-1 lg:grid-cols-[53%_1fr] items-center gap-8 lg:gap-11 xl:gap-14">
            {/* LEFT COLUMN (~53% on Desktop): Monumental Portrait with Fixed Outer Container & Continuous Horizontal Mask */}
            <div ref={photoStageWrapRef} className="w-full">
              <figure className="w-full max-w-[min(520px,calc(74vh*0.76))] lg:max-w-[calc(min(80vh,100vh-7.5rem)*0.86)] xl:max-w-[calc(min(82vh,100vh-7.5rem)*0.86)] mx-auto lg:mx-0 space-y-2">
                {/* HORIZONTAL APERTURE MASK CONTAINER (Fixed outer geometry, opens continuously from center outward) */}
                <div
                  ref={photoMaskRef}
                  className="relative w-full aspect-[3/4] lg:aspect-auto lg:h-[min(80vh,calc(100vh-7.5rem))] xl:h-[min(82vh,calc(100vh-7.5rem))] rounded-[1.25rem] overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-subtle)] will-change-[clip-path]"
                  style={{
                    clipPath: 'inset(0% 38% 0% 38% round 1.25rem)',
                    WebkitClipPath: 'inset(0% 38% 0% 38% round 1.25rem)',
                    boxShadow: 'var(--shadow-card)',
                  }}
                >
                  {/* Inner Scalable Portrait Layer (Subtle scale 1.03 -> 1.0 during reveal) */}
                  <div
                    ref={photoInnerRef}
                    className="w-full h-full relative will-change-transform"
                  >
                    {hasPersonalPhoto ? (
                      <>
                        {/* Dark Mode Portrait Layer (Synchronized with [data-theme="dark"] & View Transitions) */}
                        <picture className="theme-portrait-dark absolute inset-0 block w-full h-full">
                          {portfolioData.personal.photoDarkWebpUrl && (
                            <source
                              srcSet={portfolioData.personal.photoDarkWebpUrl}
                              type="image/webp"
                            />
                          )}
                          <img
                            src={
                              portfolioData.personal.photoDarkUrl || portfolioData.personal.photoUrl
                            }
                            alt={portfolioData.personal.photoAlt || portfolioData.personal.name}
                            width={1089}
                            height={1444}
                            loading="eager"
                            decoding="async"
                            onLoad={() => ScrollTrigger.refresh()}
                            style={{
                              objectPosition:
                                portfolioData.personal.photoObjectPosition || 'center 32%',
                            }}
                            className="w-full h-full object-cover select-none"
                          />
                        </picture>

                        {/* Light Mode Portrait Layer (Synchronized with [data-theme="light"] & View Transitions) */}
                        <picture className="theme-portrait-light absolute inset-0 block w-full h-full">
                          {portfolioData.personal.photoLightWebpUrl && (
                            <source
                              srcSet={portfolioData.personal.photoLightWebpUrl}
                              type="image/webp"
                            />
                          )}
                          <img
                            src={
                              portfolioData.personal.photoLightUrl ||
                              portfolioData.personal.photoDarkUrl ||
                              portfolioData.personal.photoUrl
                            }
                            alt={portfolioData.personal.photoAlt || portfolioData.personal.name}
                            width={1086}
                            height={1448}
                            loading="eager"
                            decoding="async"
                            onLoad={() => ScrollTrigger.refresh()}
                            style={{
                              objectPosition:
                                portfolioData.personal.photoObjectPosition || 'center 32%',
                            }}
                            className="w-full h-full object-cover select-none"
                          />
                        </picture>
                      </>
                    ) : (
                      /* Minimalist Monochromatic Portrait Stage (Neutral Geometric Placeholder) */
                      <div className="w-full h-full flex flex-col justify-between p-7 sm:p-8 bg-[var(--bg-surface)] relative overflow-hidden select-none">
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background:
                              'radial-gradient(circle at 50% 42%, var(--spotlight-color) 0%, transparent 72%)',
                          }}
                        />

                        <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em]">
                          <span>{portfolioData.personal.monogram}</span>
                          <span>IMT · 2025—2029</span>
                        </div>

                        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-8">
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-[var(--border-strong)] bg-[var(--bg-primary)]/60 flex items-center justify-center">
                            <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tighter text-[var(--text-primary)]">
                              {portfolioData.personal.monogram}
                            </span>
                          </div>

                          <div className="text-center mt-5 space-y-1">
                            <p className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] tracking-tight">
                              {portfolioData.personal.name}
                            </p>
                            <p
                              data-i18n="about-photo-status"
                              className="font-mono-tech text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]"
                            >
                              {t.about.photoFrame.status}
                            </p>
                          </div>
                        </div>

                        <div className="relative z-10 border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between font-mono-tech text-[10px] text-[var(--text-muted)]">
                          <span>SÃO PAULO, BR</span>
                          <span>3 : 4</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quiet Editorial Caption */}
                <figcaption className="flex items-center justify-between font-mono-tech text-[11px] text-[var(--text-muted)] px-1">
                  <span data-i18n="about-photo-caption" className="truncate">
                    {t.about.photoFrame.caption}
                  </span>
                  <span className="shrink-0 ml-2">BCC · IMT</span>
                </figcaption>
              </figure>
            </div>

            {/* RIGHT COLUMN (~47% on Desktop): Clean, Balanced Personal Narrative */}
            <div className="w-full space-y-5 lg:space-y-6 xl:space-y-7">
              {/* Discrete Editorial Eyebrow */}
              <div
                ref={eyebrowWrapRef}
                className="flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-3"
              >
                <span
                  data-i18n="about-stage-eyebrow"
                  className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[var(--text-muted)]"
                >
                  {t.about.stageEyebrow}
                </span>
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                  {t.about.education.location}
                </span>
              </div>

              {/* Expressive Editorial Heading ("Muito além do código." / "Far beyond code.") */}
              <div ref={titleWrapRef}>
                <h2
                  id="about-main-heading"
                  data-i18n="about-title"
                  className="font-display font-extrabold text-[clamp(2.1rem,3.6vw+0.4rem,3.75rem)] leading-[1.03] tracking-[-0.03em] text-[var(--text-primary)]"
                >
                  {t.about.title}
                </h2>
              </div>

              {/* Main Personal Presentation Lead */}
              <div ref={p1WrapRef}>
                <p
                  data-i18n="about-lead"
                  className="text-editorial-lead text-[var(--text-primary)] font-medium leading-relaxed"
                >
                  {t.about.lead}
                </p>
              </div>

              {/* Personal Philosophy Complement */}
              <div ref={p2WrapRef}>
                <p
                  data-i18n="about-p1"
                  className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed"
                >
                  {t.about.storyParagraph1}
                </p>
              </div>

              {/* Practical Academic & Project Context (IMT, Hackathon ELO, Velore) */}
              <div ref={p3WrapRef}>
                <p
                  data-i18n="about-p2"
                  className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
                >
                  {t.about.storyParagraph2}
                </p>
              </div>

              {/* Personal Quote & Signature Block */}
              <div ref={quoteWrapRef} className="pt-1">
                <blockquote className="pl-4 sm:pl-5 py-1.5 border-l border-[var(--border-strong)] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p
                    data-i18n="about-quote"
                    className="font-display text-sm sm:text-base text-[var(--text-primary)] italic leading-snug"
                  >
                    {t.about.quote}
                  </p>
                  <footer className="font-mono-tech text-[11px] text-[var(--text-muted)] shrink-0">
                    {t.about.quoteAuthor}
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================================
          PART 2 & PART 3: CREDENTIAL METRICS, PERSONAL NARRATIVE CHAPTERS,
          ACADEMIC DEGREE (IMT 2025–2029), FOCUS PILLARS & TIMELINE
          ===================================================================== */}
      <div className="editorial-container py-20 sm:py-28 space-y-16 sm:space-y-20 border-t border-[var(--border-subtle)]">
        {/* Verified Academic & Practical Metadata Strip (Relocated from Pinned Stage for Visual Clarity) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.about.metrics.map((metric, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() =>
                navigate('/', {
                  sectionId: idx === 1 ? 'projects' : 'skills',
                })
              }
              className="p-5 sm:p-6 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center justify-between w-full mb-2 gap-2">
                <span className="font-display font-extrabold text-xl sm:text-2xl whitespace-nowrap tracking-tight text-[var(--text-primary)]">
                  {metric.value}
                </span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
              </div>
              <div>
                <span
                  data-i18n={`about-metric-lbl-${idx}`}
                  className="block font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-semibold"
                >
                  {metric.label}
                </span>
                <span
                  data-i18n={`about-metric-sub-${idx}`}
                  className="block font-mono-tech text-[11px] text-[var(--text-muted)] mt-0.5 truncate"
                >
                  {metric.sub}
                </span>
              </div>
            </button>
          ))}
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

                  <h3
                    data-i18n={`about-chapter-title-${chapter.index}`}
                    className="font-display font-bold text-xl text-[var(--text-primary)]"
                  >
                    {chapter.title}
                  </h3>

                  <p
                    data-i18n={`about-chapter-body-${chapter.index}`}
                    className="text-sm text-[var(--text-secondary)] leading-relaxed"
                  >
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
              className="p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6"
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
                  <span
                    data-i18n="about-timeline-eyebrow"
                    className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] block"
                  >
                    {t.about.timeline.eyebrow}
                  </span>
                  <h3
                    data-i18n="about-timeline-title"
                    className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] mt-1"
                  >
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
                      <span
                        data-i18n={`about-tl-period-${idx}`}
                        className="font-mono-tech text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                      >
                        {item.period}
                      </span>
                      <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                        0{idx + 1}
                      </span>
                    </div>

                    <h4
                      data-i18n={`about-tl-title-${idx}`}
                      className="font-display font-bold text-base sm:text-lg text-[var(--text-primary)] pt-0.5"
                    >
                      {item.title}
                    </h4>

                    <p
                      data-i18n={`about-tl-sub-${idx}`}
                      className="font-mono-tech text-xs text-[var(--text-secondary)]"
                    >
                      {item.subtitle}
                    </p>

                    <p
                      data-i18n={`about-tl-desc-${idx}`}
                      className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed"
                    >
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
