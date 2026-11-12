import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useRouter } from '../router';
import { GithubIcon } from './Icons';
import { ArrowUpRight, ArrowRight, Layers, Sparkles, Clock } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { ProjectVisualPreview } from './ProjectVisualPreview';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const EditorialProjects: React.FC = () => {
  const { t } = useLanguage();
  const { navigate } = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const sectionRef = useRef<HTMLElement>(null);

  const categories = [
    { key: 'ALL', label: t.projects.filterAll },
    { key: 'Saúde & Tecnologia', label: 'Saúde & Tech' },
    { key: 'Aplicações & Sistemas', label: 'Sistemas' },
    { key: 'Jogos & Educação', label: 'Educação' },
    { key: 'Em Desenvolvimento', label: t.projects.inDevelopmentBadge },
  ];

  const filteredProjects =
    selectedCategory === 'ALL'
      ? t.projects.items
      : t.projects.items.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    if (!sectionRef.current) return;
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const spreads = gsap.utils.toArray<HTMLElement>('.project-editorial-spread');
      spreads.forEach((spread) => {
        gsap.fromTo(
          spread,
          { opacity: 0, y: 36 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: spread,
              start: 'top 84%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [selectedCategory]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 sm:py-32 border-b border-[var(--border-subtle)] bg-[var(--bg-primary)]"
    >
      <div className="editorial-container space-y-16">
        {/* Top Section Header & Filter Bar */}
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
            <span
              data-i18n="projects-eyebrow"
              className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
            >
              {t.projects.eyebrow}
            </span>
            <span className="font-mono-tech text-xs text-[var(--text-muted)]">
              [{filteredProjects.length.toString().padStart(2, '0')} /{' '}
              {t.projects.items.length.toString().padStart(2, '0')}]
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7 space-y-3">
              <h2
                data-i18n="projects-title"
                className="text-section-title text-[var(--text-primary)]"
              >
                {t.projects.title}
              </h2>
              <p
                data-i18n="projects-subtitle"
                className="text-editorial-lead text-[var(--text-secondary)] max-w-2xl"
              >
                {t.projects.subtitle}
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="lg:col-span-5 flex flex-wrap lg:justify-end gap-2">
              {categories.map((cat) => {
                const active = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    type="button"
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`px-3.5 py-2 rounded-full font-mono-tech text-xs uppercase tracking-wider transition-all cursor-pointer border ${
                      active
                        ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] border-[var(--accent-bg)] font-semibold'
                        : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border-[var(--border-subtle)] hover:border-[var(--border-strong)]'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Editorial Case Study Spreads */}
        <div className="divide-y divide-[var(--border-subtle)] border-t border-b border-[var(--border-subtle)]">
          {filteredProjects.map((project, idx) => {
            const isEven = idx % 2 === 1;
            const hasGithub = Boolean(project.githubUrl && project.githubUrl.trim().length > 0);
            const hasLive = Boolean(project.liveUrl && project.liveUrl.trim().length > 0);

            return (
              <article
                key={project.id}
                className="project-editorial-spread py-12 sm:py-16 lg:py-20 group"
              >
                <div className="editorial-grid items-center gap-8 lg:gap-12">
                  {/* Narrative & Metadata Column (5 cols) */}
                  <div
                    className={`col-span-12 lg:col-span-5 space-y-6 ${
                      isEven ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    {/* Index + Category + Year/InDevelopment */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-display font-extrabold text-2xl sm:text-3xl text-[var(--text-primary)]">
                          {project.index}
                        </span>
                        <span className="w-4 h-[1px] bg-[var(--border-strong)]" />
                        <span
                          data-i18n={`proj-cat-${project.id}`}
                          className="font-mono-tech text-xs uppercase tracking-wider text-[var(--text-secondary)]"
                        >
                          {project.categoryDisplay}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {project.inDevelopment && (
                          <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)]">
                            <Clock className="w-2.5 h-2.5" />
                            <span>{t.projects.inDevelopmentBadge}</span>
                          </span>
                        )}
                        <span className="font-mono-tech text-xs px-2.5 py-0.5 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)]">
                          {project.year}
                        </span>
                      </div>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-[var(--text-primary)] tracking-tight leading-[1.08]">
                      <button
                        type="button"
                        onClick={() => navigate(`/projetos/${project.id}`)}
                        className="text-left hover:opacity-80 transition-opacity cursor-pointer"
                      >
                        <span data-i18n={`proj-title-${project.id}`}>{project.title}</span>
                      </button>
                    </h3>

                    {/* Description */}
                    <p
                      data-i18n={`proj-desc-${project.id}`}
                      className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
                    >
                      {project.description}
                    </p>

                    {/* Project Context Highlight */}
                    {project.metrics && (
                      <div className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <Sparkles className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                          <span
                            data-i18n={`proj-metric-${project.id}`}
                            className="font-mono-tech text-xs text-[var(--text-primary)] font-medium"
                          >
                            {project.metrics}
                          </span>
                        </div>
                        <span className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] hidden sm:inline">
                          {t.projects.metricsLabel}
                        </span>
                      </div>
                    )}

                    {/* Domain / Focus Pills */}
                    <div className="space-y-2">
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {t.projects.technologiesLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-subtle)] font-mono-tech text-xs text-[var(--text-secondary)] group-hover:border-[var(--border-strong)] transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Coordinated Actions */}
                    <div className="pt-3 flex flex-wrap items-center gap-3">
                      <MagneticButton strength={0.18}>
                        <button
                          type="button"
                          onClick={() => navigate(`/projetos/${project.id}`)}
                          className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                        >
                          <span data-i18n={`proj-btn-case-${project.id}`}>
                            {t.projects.viewCaseStudy}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </MagneticButton>

                      {hasLive && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider transition-colors"
                        >
                          <span data-i18n={`proj-btn-demo-${project.id}`}>
                            {t.projects.viewLiveDemo}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {hasGithub && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={`${project.title} — ${t.projects.viewRepository}`}
                          title={t.projects.viewRepository}
                          className="w-10 h-10 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] flex items-center justify-center transition-colors"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Interactive Visual Preview Column (7 cols) */}
                  <div
                    className={`col-span-12 lg:col-span-7 ${
                      isEven ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div
                      role="button"
                      tabIndex={0}
                      data-cursor-label={t.projects.cursorLabel}
                      onClick={() => navigate(`/projetos/${project.id}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          navigate(`/projetos/${project.id}`);
                        }
                      }}
                      className="relative rounded-2xl sm:rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] group-hover:border-[var(--border-strong)] overflow-hidden cursor-pointer transition-all duration-500"
                      style={{ boxShadow: 'var(--shadow-card)' }}
                    >
                      {/* Window Telemetry Header */}
                      <div className="px-4 py-3 bg-[var(--bg-elevated)]/80 border-b border-[var(--border-subtle)] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/50" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/35" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/20" />
                          <span className="ml-2 font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
                            PROJECT_{project.index} // {project.title.toUpperCase()}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--text-secondary)]">
                          <Layers className="w-3 h-3" />
                          <span>{project.year}</span>
                        </div>
                      </div>

                      {/* Bespoke Interactive Visual Preview or Project Image */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-[var(--bg-primary)]">
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
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
