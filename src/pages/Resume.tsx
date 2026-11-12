import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../router';
import {
  Download,
  Printer,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Mail,
  MapPin,
  ArrowUpRight,
  ArrowLeft,
  Check,
  FolderGit2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Resume: React.FC = () => {
  const { t } = useLanguage();
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPDF = () => {
    setDownloaded(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#F5F5F5', '#A1A1AA', '#292929'],
      });
    } catch {
      // ignore
    }
    window.print();
    window.setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen pt-28 pb-24 bg-[var(--bg-primary)]"
    >
      <div className="editorial-container max-w-5xl space-y-12">
        {/* Top Back Navigation & Action Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-5 no-print">
          <Link
            to="/"
            sectionId="home"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span data-i18n="resume-back">{t.nav.backToHome}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleDownloadPDF}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
            >
              {downloaded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>{t.resume.downloadedPdf}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span data-i18n="resume-dl-btn">{t.resume.downloadPdf}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] font-mono-tech text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span data-i18n="resume-print-btn">{t.resume.printVersion}</span>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="space-y-3 no-print">
          <span
            data-i18n="resume-eyebrow"
            className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {t.resume.eyebrow}
          </span>
          <h1
            data-i18n="resume-title"
            className="text-section-title text-[var(--text-primary)]"
          >
            {t.resume.title}
          </h1>
          <p
            data-i18n="resume-subtitle"
            className="text-editorial-lead text-[var(--text-secondary)] max-w-2xl"
          >
            {t.resume.subtitle}
          </p>
        </div>

        {/* Structured CV Document Sheet */}
        <div
          className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] p-8 sm:p-12 space-y-10"
          style={{ boxShadow: 'var(--shadow-card)' }}
        >
          {/* CV Header */}
          <div className="border-b border-[var(--border-subtle)] pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h2 className="font-display font-extrabold text-3xl text-[var(--text-primary)]">
                {portfolioData.personal.name}
              </h2>
              <p
                data-i18n="resume-role"
                className="font-mono-tech text-sm text-[var(--text-secondary)]"
              >
                {t.hero.idCard.role}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono-tech text-[var(--text-muted)] pt-1">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {t.about.education.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {portfolioData.personal.email}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2.5 text-xs font-mono-tech">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] flex items-center gap-2 transition-colors"
              >
                <span>GitHub</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] text-[var(--text-primary)] flex items-center gap-2 transition-colors"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Academic & Professional Summary */}
          <div className="space-y-3">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-[var(--text-primary)]" />
              <span data-i18n="resume-sum-title">{t.resume.summaryTitle}</span>
            </h3>
            <p
              data-i18n="resume-sum-body"
              className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
            >
              {t.about.lead}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-[var(--text-primary)]" />
              <span data-i18n="resume-edu-title">{t.resume.educationTitle}</span>
            </h3>

            <div className="p-6 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <h4
                  data-i18n="resume-edu-deg"
                  className="font-display font-bold text-lg text-[var(--text-primary)]"
                >
                  {t.about.education.degree}
                </h4>
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                  {t.about.education.period}
                </span>
              </div>
              <p className="font-mono-tech text-xs text-[var(--text-secondary)]">
                {t.about.education.institution}
              </p>
              <ul className="pt-2 space-y-1.5 text-xs sm:text-sm text-[var(--text-secondary)]">
                {t.about.education.highlights.map((hl, i) => (
                  <li key={i}>• {hl}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Selected Projects */}
          <div className="space-y-4">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[var(--text-primary)]" />
              <span data-i18n="resume-proj-title">{t.resume.projectsTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {t.projects.items.map((proj) => (
                <div
                  key={proj.id}
                  className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="font-display font-bold text-base text-[var(--text-primary)]">
                      {proj.title}
                    </h4>
                    <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                      {proj.year}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {proj.description}
                  </p>
                  <p className="font-mono-tech text-[11px] text-[var(--text-primary)] pt-1">
                    {proj.technologies.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-4">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <Code2 className="w-4 h-4 text-[var(--text-primary)]" />
              <span data-i18n="resume-skills-title">{t.resume.skillsTitle}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono-tech text-xs">
              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-[var(--text-primary)] font-bold block">
                  {t.skills.categories.languages.title}:
                </span>
                <p className="text-[var(--text-secondary)]">
                  {t.skills.categories.languages.items.map((l) => l.name).join(', ')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-[var(--text-primary)] font-bold block">
                  {t.skills.categories.frameworks.title}:
                </span>
                <p className="text-[var(--text-secondary)]">
                  {t.skills.categories.frameworks.items.map((f) => f.name).join(', ')}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2">
                <span className="text-[var(--text-primary)] font-bold block">
                  {t.skills.categories.tools.title}:
                </span>
                <p className="text-[var(--text-secondary)]">
                  {t.skills.categories.tools.items.map((tool) => tool.name).join(', ')}
                </p>
              </div>
            </div>
          </div>

          {/* Verified Certifications */}
          <div className="space-y-4">
            <h3 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
              <Award className="w-4 h-4 text-[var(--text-primary)]" />
              <span data-i18n="resume-certs-title">{t.resume.certificationsTitle}</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {t.skills.certifications.items.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] flex items-start justify-between gap-3"
                >
                  <div>
                    <h4 className="font-bold text-[var(--text-primary)]">{cert.title}</h4>
                    <span className="text-[var(--text-secondary)] font-mono-tech text-[11px]">
                      {cert.issuer} ({cert.issueDate}) · {cert.credentialId}
                    </span>
                  </div>
                  <span className="font-mono-tech text-[10px] px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-primary)] shrink-0">
                    {t.resume.verifiedBadge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
