import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Cpu, Code2, Database } from 'lucide-react';

export const TechStackSection: React.FC = () => {
  return (
    <section id="habilidades" className="py-20 relative border-t border-slate-800/60 bg-[#080b13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            <span>Tecnologias & Ferramentas</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Stack Técnica & Ecossistema
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Ferramentas modernas e linguagens que utilizo no dia a dia para desenvolver sistemas robustos.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Linguagens */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Linguagens de Programação</h3>
                  <p className="text-xs text-slate-400">Base lógica e computacional</p>
                </div>
              </div>

              <div className="space-y-3">
                {portfolioData.skills.linguagens.map((lang) => (
                  <div
                    key={lang.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                  >
                    <span className="font-medium text-sm text-slate-200">{lang.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-300 font-mono">
                      {lang.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Frameworks & Libs */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">Frameworks & Web</h3>
                  <p className="text-xs text-slate-400">Construção de aplicações modernas</p>
                </div>
              </div>

              <div className="space-y-3">
                {portfolioData.skills.frameworks.map((fw) => (
                  <div
                    key={fw.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                  >
                    <span className="font-medium text-sm text-slate-200">{fw.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-indigo-500/15 text-indigo-300 font-mono">
                      {fw.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Ferramentas & DevOps */}
          <div className="p-6 rounded-2xl bg-[#0c101c] border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                  <Database className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">DevOps & Bancos de Dados</h3>
                  <p className="text-xs text-slate-400">Infraestrutura, dados e versionamento</p>
                </div>
              </div>

              <div className="space-y-3">
                {portfolioData.skills.ferramentas.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition-colors"
                  >
                    <span className="font-medium text-sm text-slate-200">{tool.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-500/15 text-cyan-300 font-mono">
                      {tool.category}
                    </span>
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
