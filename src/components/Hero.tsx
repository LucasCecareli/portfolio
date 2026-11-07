import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { TerminalWidget } from './TerminalWidget';
import { Mail, ChevronRight, Sparkles } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline and Pitch */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono text-slate-300">
                {portfolioData.personal.degree} • {portfolioData.personal.institution}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Construindo software com{' '}
              <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                arquitetura sólida
              </span>{' '}
              e design moderno.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Olá! Sou o <strong className="text-white font-semibold">{portfolioData.personal.name}</strong>, 
              estudante de Ciência da Computação apaixonado por estruturas de dados, microsserviços, 
              sistemas eficientes e interfaces dinâmicas.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projetos"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ver Projetos Concluídos</span>
                <ChevronRight className="w-4 h-4" />
              </a>

              <a
                href="#certificacoes"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-200 font-medium text-sm transition-all hover:scale-[1.02]"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Certificações Oficiais</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-5 pt-3 text-slate-400">
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-white transition-colors"
                title="GitHub"
              >
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-500 transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <span className="text-xs font-mono">GitHub</span>
              </a>

              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
                title="LinkedIn"
              >
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-500 transition-colors">
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-xs font-mono">LinkedIn</span>
              </a>

              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                title="E-mail"
              >
                <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-500 transition-colors">
                  <Mail className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-xs font-mono">E-mail</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Terminal Widget */}
          <div className="lg:col-span-5">
            <TerminalWidget />
          </div>

        </div>
      </div>
    </section>
  );
};
