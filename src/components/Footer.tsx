import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { ArrowUp, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06080e] py-12 text-slate-400 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <p className="font-semibold text-slate-200">
                {portfolioData.personal.name} • {new Date().getFullYear()}
              </p>
              <p className="text-xs text-slate-500 font-mono">
                {portfolioData.personal.degree} ({portfolioData.personal.institution})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-slate-500">
            <span>Construído com</span>
            <span className="text-blue-400">React 19</span>
            <span>•</span>
            <span className="text-cyan-400">Tailwind CSS</span>
            <span>•</span>
            <span className="text-indigo-400">TypeScript</span>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors flex items-center gap-1.5 font-mono text-xs"
            title="Voltar ao início"
          >
            <span>Topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
