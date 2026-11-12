import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const StorytellingBridge: React.FC = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.bridge-word',
        { opacity: 0.15, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.bridge-line-progress',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 74%',
          },
        }
      );

      gsap.fromTo(
        '.bridge-step-card',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.bridge-steps-grid',
            start: 'top 84%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="bridge"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)] relative overflow-hidden"
    >
      <div className="editorial-container space-y-16">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <span
            data-i18n="bridge-eyebrow"
            className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {t.bridge.eyebrow}
          </span>
          <span className="font-mono-tech text-xs text-[var(--text-muted)]">
            BCC · IMT · 2025—2029
          </span>
        </div>

        {/* Monumental Process Flow — Calibrated fluid typography so edges never clip on desktop or mobile */}
        <div className="space-y-8 text-center w-full mx-auto px-2 sm:px-4">
          <div className="flex flex-col lg:flex-row lg:flex-nowrap items-center justify-center gap-x-3.5 gap-y-3 xl:gap-x-5 text-bridge-flow">
            <span
              data-i18n="bridge-left"
              className="bridge-word text-[var(--text-secondary)]"
            >
              {t.bridge.titleLeft}
            </span>
            <span className="bridge-word text-[var(--text-muted)] font-mono-tech text-xl sm:text-3xl">
              →
            </span>
            <span
              data-i18n="bridge-mid"
              className="bridge-word text-[var(--text-primary)] underline decoration-[var(--border-strong)] decoration-2 underline-offset-8"
            >
              {t.bridge.titleMiddle}
            </span>
            <span className="bridge-word text-[var(--text-muted)] font-mono-tech text-xl sm:text-3xl">
              →
            </span>
            <span
              data-i18n="bridge-right"
              className="bridge-word text-[var(--accent-text)] bg-[var(--accent-bg)] px-4 py-1.5 rounded-xl"
            >
              {t.bridge.titleRight}
            </span>
          </div>

          <p
            data-i18n="bridge-statement"
            className="text-editorial-lead text-[var(--text-secondary)] max-w-2xl mx-auto"
          >
            {t.bridge.statement}
          </p>

          {/* Animated Horizontal Vector Line */}
          <div className="max-w-xl mx-auto pt-2">
            <div className="h-[1px] w-full bg-[var(--border-subtle)] relative overflow-hidden">
              <div className="bridge-line-progress origin-left h-full w-full bg-[var(--text-primary)]" />
            </div>
          </div>
        </div>

        {/* 3 Architectural Pillars */}
        <div className="bridge-steps-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.bridge.steps.map((step) => (
            <div
              key={step.index}
              className="bridge-step-card p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors space-y-4"
            >
              <div className="flex items-center justify-between font-mono-tech text-xs">
                <span className="px-2.5 py-1 rounded-md bg-[var(--bg-elevated)] text-[var(--text-primary)] font-semibold">
                  {step.index}
                </span>
                <span
                  data-i18n={`bridge-step-lbl-${step.index}`}
                  className="tracking-widest uppercase text-[var(--text-muted)]"
                >
                  {step.label}
                </span>
              </div>

              <h3
                data-i18n={`bridge-step-title-${step.index}`}
                className="font-display font-bold text-xl text-[var(--text-primary)]"
              >
                {step.title}
              </h3>

              <p
                data-i18n={`bridge-step-desc-${step.index}`}
                className="text-sm text-[var(--text-secondary)] leading-relaxed"
              >
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
