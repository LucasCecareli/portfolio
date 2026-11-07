import React, { useState } from 'react';
import { portfolioData, type Project } from '../data/portfolioData';
import { FolderGit2, ExternalLink, Sparkles, X } from 'lucide-react';
import { GithubIcon } from './Icons';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['Todos', 'Full-Stack', 'Backend', 'IA / Dados', 'Sistemas / C++'];

  const filteredProjects = selectedCategory === 'Todos'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === selectedCategory);

  return (
    <section id="projetos" className="py-20 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Portfólio de Código</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Projetos Concluídos & Em Destaque
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Aplicações reais aplicando arquitetura de software, boas práticas e resolução de problemas técnicos.
          </p>
        </div>

        {/* Categories Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-[#0c101c] border border-slate-800/90 overflow-hidden flex flex-col justify-between hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-950/20 transition-all duration-300"
            >
              <div>
                {/* Project Image Preview */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-900">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c101c] via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-mono text-cyan-300 backdrop-blur-md">
                      {project.category}
                    </span>
                  </div>

                  {/* Metrics Badge (if available) */}
                  {project.metrics && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-[11px] font-mono text-emerald-300 backdrop-blur-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        {project.metrics}
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs font-mono border border-slate-700/40"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-slate-800/60 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Ver arquitetura & detalhes →
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                    title="Ver código no GitHub"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-500/20 transition-all"
                    >
                      <span>Live Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for Project Deep Dive */}
        {activeModalProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
            <div className="relative w-full max-w-2xl bg-[#0e1322] border border-slate-700 rounded-2xl p-6 sm:p-8 overflow-hidden shadow-2xl space-y-6">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalProject(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider">
                  Detalhes Técnicos do Projeto
                </span>
                <h3 className="text-2xl font-bold text-white">
                  {activeModalProject.title}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>{activeModalProject.longDescription || activeModalProject.description}</p>
                
                {activeModalProject.metrics && (
                  <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-2 text-emerald-300 text-xs font-mono">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Métrica de destaque: {activeModalProject.metrics}</span>
                  </div>
                )}

                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-400 mb-2">Tecnologias Utilizadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProject.technologies.map(t => (
                      <span key={t} className="px-3 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-200 text-xs font-mono">
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-medium"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Repositório GitHub</span>
                </a>
                {activeModalProject.liveUrl && (
                  <a
                    href={activeModalProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    <span>Abrir Projeto</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
