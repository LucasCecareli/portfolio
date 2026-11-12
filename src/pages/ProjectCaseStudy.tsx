import React, { useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter, Link } from '../router';
import { GithubIcon } from '../components/Icons';
import { ProjectVisualPreview } from '../components/ProjectVisualPreview';
import {
  ArrowLeft,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
  Code2,
  Layers,
  Sparkles,
  Cpu,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectCaseStudyProps {
  projectId: string;
}

export const ProjectCaseStudy: React.FC<ProjectCaseStudyProps> = ({ projectId }) => {
  const { t } = useLanguage();
  const { navigate } = useRouter();

  const projectIndex = t.projects.items.findIndex((p) => p.id === projectId);
  const project = projectIndex >= 0 ? t.projects.items[projectIndex] : t.projects.items[0];

  const prevProject =
    t.projects.items[(projectIndex - 1 + t.projects.items.length) % t.projects.items.length];
  const nextProject = t.projects.items[(projectIndex + 1) % t.projects.items.length];

  const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
  const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [projectId]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen pt-28 pb-24 bg-[var(--bg-primary)]"
    >
      <div className="editorial-container space-y-16">
        {/* Top Back Navigation Bar */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-5">
          <button
            type="button"
            onClick={() => navigate('/', { sectionId: 'projects' })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span data-i18n="case-back">{t.projects.caseStudy.backButton}</span>
          </button>

          <div className="flex items-center gap-2 font-mono-tech text-xs text-[var(--text-muted)]">
            <span>PROJECT</span>
            <span>/</span>
            <span className="text-[var(--text-primary)] font-semibold">{project.index}</span>
          </div>
        </div>

        {/* Hero Split Layout */}
        <div className="editorial-grid items-start gap-10 lg:gap-12">
          {/* Left Column (6 cols) */}
          <div className="col-span-12 lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-secondary)]">
                  {project.categoryDisplay}
                </span>
                <span className="px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-muted)]">
                  {project.year}
                </span>
                {project.inDevelopment && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold">
                    <Clock className="w-3 h-3" />
                    <span>{t.projects.inDevelopmentBadge}</span>
                  </span>
                )}
              </div>

              <h1
                data-i18n={`case-title-${project.id}`}
                className="text-section-title text-[var(--text-primary)]"
              >
                {project.title}
              </h1>

              <p
                data-i18n={`case-longdesc-${project.id}`}
                className="text-editorial-lead text-[var(--text-secondary)]"
              >
                {project.longDescription}
              </p>
            </div>

            {/* Key Counters Row */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-display font-extrabold text-2xl text-[var(--text-primary)]">
                    {project.technologies.length}
                  </span>
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)] uppercase">
                    {t.projects.technologiesLabel}
                  </span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                  <Layers className="w-5 h-5" />
                </div>
                <div>
                  <span className="block font-display font-extrabold text-2xl text-[var(--text-primary)]">
                    {project.features.length}
                  </span>
                  <span className="font-mono-tech text-[11px] text-[var(--text-muted)] uppercase">
                    {t.projects.caseStudy.featuresTitle}
                  </span>
                </div>
              </div>
            </div>

            {/* Status & Context Highlight */}
            {project.metrics && (
              <div className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] space-y-1.5">
                <div className="flex items-center gap-2 font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                  <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>{t.projects.caseStudy.resultsTitle}</span>
                </div>
                <p
                  data-i18n={`case-metric-${project.id}`}
                  className="font-display font-bold text-lg text-[var(--text-primary)]"
                >
                  {project.metrics}
                </p>
              </div>
            )}

            {/* Direct Action Buttons (Only shown when real URLs are configured) */}
            {(hasLive || hasGithub) && (
              <div className="flex flex-wrap items-center gap-3.5">
                {hasLive && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    <span>{t.projects.viewLiveDemo}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}

                {hasGithub && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>{t.projects.viewRepository}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            )}

            {/* Focus & Domain Tags */}
            <div className="space-y-3 pt-2">
              <h2 className="font-mono-tech text-xs uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span>{t.projects.technologiesLabel}</span>
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (6 cols): Preview Frame & Key Features Card */}
          <div className="col-span-12 lg:col-span-6 space-y-6">
            <div
              className="rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden"
              style={{ boxShadow: 'var(--shadow-card)' }}
            >
              <div className="px-4 py-3 bg-[var(--bg-elevated)] border-b border-[var(--border-subtle)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/50" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/35" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/20" />
                </div>
                <span className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                  {project.title}
                </span>
              </div>

              <div className="aspect-[16/10] bg-[var(--bg-primary)] overflow-hidden">
                <ProjectVisualPreview
                  projectId={project.id}
                  title={project.title}
                  categoryDisplay={project.categoryDisplay}
                  image={project.image}
                  inDevelopment={project.inDevelopment}
                  inDevelopmentLabel={t.projects.inDevelopmentBadge}
                />
              </div>
            </div>

            {/* Key Project Highlights Box */}
            <div className="p-7 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-4">
              <h2
                data-i18n="case-features-heading"
                className="font-display font-bold text-xl text-[var(--text-primary)] flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{t.projects.caseStudy.featuresTitle}</span>
              </h2>
              <ul className="space-y-3">
                {project.features.map((feat, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-[var(--text-secondary)]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0 mt-0.5" />
                    <span data-i18n={`case-feat-${project.id}-${idx}`}>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Deep-Dive Project Breakdown: Context, Objective, Approach */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border-subtle)]">
          <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">01 / CONTEXT</span>
            <h3
              data-i18n="case-prob-title"
              className="font-display font-bold text-xl text-[var(--text-primary)]"
            >
              {t.projects.caseStudy.problemTitle}
            </h3>
            <p
              data-i18n={`case-prob-${project.id}`}
              className="text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              {project.problem}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">02 / TARGET</span>
            <h3
              data-i18n="case-obj-title"
              className="font-display font-bold text-xl text-[var(--text-primary)]"
            >
              {t.projects.caseStudy.objectiveTitle}
            </h3>
            <p
              data-i18n={`case-obj-${project.id}`}
              className="text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              {project.objective}
            </p>
          </div>

          <div className="p-7 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-3">
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">03 / APPROACH</span>
            <h3
              data-i18n="case-sol-title"
              className="font-display font-bold text-xl text-[var(--text-primary)]"
            >
              {t.projects.caseStudy.solutionTitle}
            </h3>
            <p
              data-i18n={`case-sol-${project.id}`}
              className="text-sm text-[var(--text-secondary)] leading-relaxed"
            >
              {project.solution}
            </p>
          </div>
        </div>

        {/* Development Stages */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-6">
          <h3
            data-i18n="case-proc-title"
            className="font-display font-bold text-2xl text-[var(--text-primary)]"
          >
            {t.projects.caseStudy.processTitle}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {project.process.map((stepText, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] space-y-2"
              >
                <span className="font-mono-tech text-xs text-[var(--text-muted)]">
                  STAGE 0{idx + 1}
                </span>
                <p
                  data-i18n={`case-proc-${project.id}-${idx}`}
                  className="text-sm text-[var(--text-secondary)] leading-relaxed"
                >
                  {stepText}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Next / Previous Case Study Navigation */}
        <div className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to={`/projetos/${prevProject.id}`}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-between group"
          >
            <div className="space-y-1">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                <span>{t.projects.caseStudy.prevProject}</span>
              </span>
              <p className="font-display font-bold text-lg text-[var(--text-primary)]">
                {prevProject.title}
              </p>
            </div>
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">
              {prevProject.index}
            </span>
          </Link>

          <Link
            to={`/projetos/${nextProject.id}`}
            className="p-6 rounded-2xl bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors flex items-center justify-between text-right group"
          >
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">
              {nextProject.index}
            </span>
            <div className="space-y-1">
              <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center justify-end gap-1.5">
                <span>{t.projects.caseStudy.nextProject}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
              <p className="font-display font-bold text-lg text-[var(--text-primary)]">
                {nextProject.title}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
