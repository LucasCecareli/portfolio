import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowUpRight, Award } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialSkillsAndCerts: React.FC = () => {
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
        '.skill-domain-col',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-matrix-grid',
            start: 'top 82%',
          },
        }
      );

      gsap.fromTo(
        '.cert-editorial-card',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-editorial-grid',
            start: 'top 82%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const skillDomains = [
    t.skills.categories.languages,
    t.skills.categories.frameworks,
    t.skills.categories.tools,
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]"
    >
      <div className="editorial-container space-y-24">
        {/* Part 1: Categorized Technical Stack Matrix */}
        <div className="space-y-12">
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <span
              data-i18n="skills-eyebrow"
              className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              {t.skills.eyebrow}
            </span>
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">STACK // 01—03</span>
          </div>

          <div className="max-w-3xl space-y-3">
            <h2
              data-i18n="skills-title"
              className="text-section-title text-[var(--text-primary)]"
            >
              {t.skills.title}
            </h2>
            <p
              data-i18n="skills-subtitle"
              className="text-editorial-lead text-[var(--text-secondary)]"
            >
              {t.skills.subtitle}
            </p>
          </div>

          {/* 3-Column Architectural Stack Table */}
          <div className="skills-matrix-grid grid grid-cols-1 lg:grid-cols-3 gap-6">
            {skillDomains.map((domain) => (
              <div
                key={domain.index}
                className="skill-domain-col rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-7 sm:p-8 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 font-mono-tech text-xs text-[var(--text-muted)]">
                    <span>DOMAIN {domain.index}</span>
                    <span>[{domain.items.length}]</span>
                  </div>

                  <h3
                    data-i18n={`skill-dom-title-${domain.index}`}
                    className="font-display font-bold text-xl text-[var(--text-primary)]"
                  >
                    {domain.title}
                  </h3>

                  <div className="divide-y divide-[var(--border-subtle)] pt-2">
                    {domain.items.map((item, idx) => (
                      <div
                        key={item.name}
                        className="py-3.5 flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                            0{idx + 1}
                          </span>
                          <span className="font-medium text-sm sm:text-base text-[var(--text-primary)] group-hover:translate-x-1 transition-transform">
                            {item.name}
                          </span>
                        </div>
                        <span
                          data-i18n={`skill-meta-${domain.index}-${idx}`}
                          className="font-mono-tech text-[11px] px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)]"
                        >
                          {item.meta}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Part 2: Verified Certifications & Official Credentials */}
        <div id="certifications" className="space-y-12 pt-8 border-t border-[var(--border-subtle)]">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)]">
                <Award className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span data-i18n="certs-eyebrow">{t.skills.certifications.eyebrow}</span>
              </div>
              <h3
                data-i18n="certs-title"
                className="font-display font-bold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
              >
                {t.skills.certifications.title}
              </h3>
              <p
                data-i18n="certs-subtitle"
                className="text-sm sm:text-base text-[var(--text-secondary)]"
              >
                {t.skills.certifications.subtitle}
              </p>
            </div>

            <span className="font-mono-tech text-xs text-[var(--text-muted)]">
              [04 VERIFIED CREDENTIALS]
            </span>
          </div>

          <div className="certs-editorial-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.skills.certifications.items.map((cert) => (
              <article
                key={cert.id}
                className="cert-editorial-card p-7 sm:p-8 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all flex flex-col justify-between space-y-6 group"
                style={{ boxShadow: 'var(--shadow-card)' }}
              >
                <div className="space-y-5">
                  {/* Top Bar: Index + Issuer + Year */}
                  <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-3 font-mono-tech text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[var(--text-primary)] font-bold">[{cert.index}]</span>
                      <span className="text-[var(--text-secondary)]">{cert.issuer}</span>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                      {cert.issueDate}
                    </span>
                  </div>

                  {/* Certificate Title */}
                  <h4
                    data-i18n={`cert-title-${cert.id}`}
                    className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)] leading-snug"
                  >
                    {cert.title}
                  </h4>

                  {/* Official Verification ID Box */}
                  {cert.credentialId && (
                    <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-center justify-between font-mono-tech text-xs">
                      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                        <ShieldCheck className="w-4 h-4 text-[var(--text-primary)]" />
                        <span>{t.skills.certifications.idLabel}:</span>
                      </div>
                      <code className="text-[var(--text-primary)] font-semibold">
                        {cert.credentialId}
                      </code>
                    </div>
                  )}

                  {/* Certified Skills */}
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((sk) => (
                      <span
                        key={sk}
                        className="px-3 py-1 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono-tech text-[11px] text-[var(--text-secondary)]"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Official Verification Link */}
                {cert.credentialUrl && (
                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] hover:opacity-75 transition-opacity"
                    >
                      <span data-i18n={`cert-verify-${cert.id}`}>
                        {t.skills.certifications.verifyLabel}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <span className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase">
                      OFFICIAL LINK
                    </span>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
