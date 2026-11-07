import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { GraduationCap, BookOpen, Layers, CheckCircle2, Award } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="py-20 relative border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Perfil Acadêmico & Técnico</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Fundamentos Sólidos em Ciência da Computação
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Mais do que apenas frameworks modernos, foco no entendimento profundo de como a computação funciona: 
            da gerência de memória e complexidade algorítmica até o deploy em nuvem.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Formação Universitária (Col-span 2) */}
          <div className="md:col-span-2 rounded-2xl bg-gradient-to-b from-[#0e1322] to-[#0a0e19] border border-slate-800 p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{portfolioData.personal.degree}</h3>
                  <p className="text-sm text-blue-400 font-mono">{portfolioData.personal.institution}</p>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed pt-2">
                {portfolioData.about.overview}
              </p>

              {/* Destaques acadêmicos */}
              <div className="pt-4">
                <h4 className="text-xs font-mono uppercase text-slate-400 mb-3 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Disciplinas & Fundamentos em Destaque:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {portfolioData.about.csFundamentals.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Status: Cursando</span>
              <span className="text-blue-400">{portfolioData.personal.graduationYear}</span>
            </div>
          </div>

          {/* Card 2: Estatísticas Rápidas */}
          <div className="rounded-2xl bg-[#0e1322] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                Resumo em Números
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-center">
                  <span className="block text-3xl font-extrabold text-blue-400 font-mono">4+</span>
                  <span className="text-xs text-slate-400">Certificações</span>
                </div>
                <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-center">
                  <span className="block text-3xl font-extrabold text-indigo-400 font-mono">10+</span>
                  <span className="text-xs text-slate-400">Projetos Feitos</span>
                </div>
                <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-center">
                  <span className="block text-3xl font-extrabold text-emerald-400 font-mono">5+</span>
                  <span className="text-xs text-slate-400">Linguagens</span>
                </div>
                <div className="p-4 rounded-xl bg-[#090d16] border border-slate-800 text-center">
                  <span className="block text-3xl font-extrabold text-cyan-400 font-mono">100%</span>
                  <span className="text-xs text-slate-400">Dedicação</span>
                </div>
              </div>
            </div>

            <div className="mt-6 p-3.5 rounded-xl bg-blue-950/30 border border-blue-900/40 text-blue-300 text-xs leading-relaxed">
              💡 <em>"A simplicidade é o pré-requisito para a confiabilidade."</em> — Edsger W. Dijkstra
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
