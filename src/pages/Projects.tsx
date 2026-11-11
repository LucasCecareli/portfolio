import React, { useState } from 'react';
import { portfolioData, type Project } from '../data/portfolioData';
import { AnimatedCard } from '../components/AnimatedCard';
import { FolderGit2, ExternalLink, Sparkles, X } from 'lucide-react';
import { GithubIcon } from '../components/Icons';
import { motion } from 'framer-motion';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['Todos', 'Full-Stack', 'Backend', 'IA / Dados', 'Sistemas / C++'];

  const filteredProjects = selectedCategory === 'Todos'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
          <FolderGit2 className="w-3.5 h-3.5" />
          <span>Showcase Prático</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Projetos & Aplicações
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Sistemas desenvolvidos do zero aplicando arquitetura limpa, computação concorrente, microsserviços e alta performance.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 scale-105'
                : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <AnimatedCard
            key={project.id}
            glowColor="blue"
            className="flex flex-col justify-between"
          >
            <div>
              {/* Image Preview with overlay */}
              <div className="relative h-52 sm:h-60 overflow-hidden bg-slate-900">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-transparent" />
                
                {/* Category Pill */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#090d16]/85 border border-slate-700/80 text-xs font-mono text-cyan-300 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>

                {/* Metrics Badge */}
                {project.metrics && (
                  <div className="absolute top-4 right-4">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-950/85 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-emerald-400" />
                      {project.metrics}
                    </span>
                  </div>
                )}
              </div>

              {/* Text content */}
              <div className="p-6 sm:p-7 space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions bar */}
            <div className="p-6 pt-0 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <button
                onClick={() => setActiveModalProject(project)}
                className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Ver arquitetura & detalhes</span>
                <span>→</span>
              </button>

              <div className="flex items-center gap-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                  title="Código no GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/25 transition-all hover:scale-105"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* Interactive Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-[#0e1322] border border-slate-700 rounded-3xl p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
            
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                Arquitetura do Projeto • {activeModalProject.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {activeModalProject.title}
              </h3>
            </div>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed max-h-[60vh] overflow-y-auto pr-2">
              <p>{activeModalProject.longDescription || activeModalProject.description}</p>
              
              {activeModalProject.metrics && (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300 text-xs font-mono">
                  <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Destaque de desempenho: {activeModalProject.metrics}</span>
                </div>
              )}

              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase text-slate-400">Tecnologias Envolvidas:</h4>
                <div className="flex flex-wrap gap-2">
                  {activeModalProject.technologies.map((t) => (
                    <span key={t} className="px-3 py-1 rounded-lg bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
              <a
                href={activeModalProject.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-medium transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Repositório GitHub</span>
              </a>
              {activeModalProject.liveUrl && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-500/25 transition-all"
                >
                  <span>Abrir Demonstração</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};
