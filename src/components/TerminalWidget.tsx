import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
}

export const TerminalWidget: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-emerald-400 font-semibold">✦ Sistema inicializado com sucesso!</p>
          <p>
            Bem-vindo ao terminal interativo de <span className="text-cyan-300 font-semibold">{portfolioData.personal.name}</span>.
          </p>
          <p className="text-slate-400 text-xs">
            Digite <span className="text-amber-300 font-bold">help</span> ou clique nas sugestões abaixo para explorar.
          </p>
        </div>
      ),
    },
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let output: string | React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="space-y-1 text-xs sm:text-sm">
            <p className="text-cyan-300 font-semibold mb-1">Comandos disponíveis:</p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-300">
              <div><span className="text-amber-300 font-mono">about</span> : Sobre mim & Faculdade</div>
              <div><span className="text-amber-300 font-mono">skills</span> : Habilidades técnicas</div>
              <div><span className="text-amber-300 font-mono">projects</span> : Lista de projetos</div>
              <div><span className="text-amber-300 font-mono">certs</span> : Certificações</div>
              <div><span className="text-amber-300 font-mono">contact</span> : Informações de contato</div>
              <div><span className="text-amber-300 font-mono">clear</span> : Limpar a tela</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'cat about.txt':
        output = (
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p><span className="text-blue-400 font-semibold">Nome:</span> {portfolioData.personal.name}</p>
            <p><span className="text-blue-400 font-semibold">Curso:</span> {portfolioData.personal.degree}</p>
            <p><span className="text-blue-400 font-semibold">Instituição:</span> {portfolioData.personal.institution}</p>
            <p><span className="text-blue-400 font-semibold">Previsão:</span> {portfolioData.personal.graduationYear}</p>
            <p className="text-slate-400 mt-2 text-xs leading-relaxed">{portfolioData.about.overview}</p>
          </div>
        );
        break;

      case 'skills':
      case 'ls skills':
        output = (
          <div className="space-y-2 text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-300 font-medium">Stack Técnica:</p>
            <p><span className="text-emerald-400 font-mono">Linguagens:</span> {portfolioData.skills.linguagens.map(l => l.name).join(', ')}</p>
            <p><span className="text-blue-400 font-mono">Frameworks:</span> {portfolioData.skills.frameworks.map(f => f.name).join(', ')}</p>
            <p><span className="text-purple-400 font-mono">Ferramentas:</span> {portfolioData.skills.ferramentas.map(t => t.name).join(', ')}</p>
          </div>
        );
        break;

      case 'projects':
      case 'ls projects':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-300 font-medium">Projetos em Destaque:</p>
            {portfolioData.projects.map((p, idx) => (
              <div key={p.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-0.5 border-b border-slate-800/40">
                <span className="text-slate-200 font-medium">{idx + 1}. {p.title}</span>
                <span className="text-xs text-blue-400 font-mono">[{p.category}]</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'cat certs.json':
        output = (
          <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
            <p className="text-cyan-300 font-medium">Certificações Reconhecidas:</p>
            {portfolioData.certifications.map((c) => (
              <div key={c.id} className="py-0.5">
                <span className="text-emerald-300 font-mono">✓</span> {c.title} — <span className="text-slate-400 text-xs">({c.issuer})</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs sm:text-sm text-slate-300">
            <p><span className="text-blue-400">E-mail:</span> {portfolioData.personal.email}</p>
            <p><span className="text-blue-400">GitHub:</span> {portfolioData.personal.github}</p>
            <p><span className="text-blue-400">LinkedIn:</span> {portfolioData.personal.linkedin}</p>
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      default:
        output = (
          <p className="text-rose-400 text-xs sm:text-sm">
            Comando não reconhecido: "{cmd}". Digite <span className="text-amber-300 font-mono">help</span> para a lista de comandos válidos.
          </p>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const quickActions = [
    { label: 'cat about.txt', cmd: 'about' },
    { label: 'ls skills', cmd: 'skills' },
    { label: 'ls projects', cmd: 'projects' },
    { label: 'cat certs.json', cmd: 'certs' },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#0b0f19]/90 border border-slate-800/80 shadow-2xl overflow-hidden backdrop-blur-xl">
      {/* Terminal Title Bar */}
      <div className="bg-[#0f1422] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-xs font-mono text-slate-400 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-blue-400" />
            lucas@portfolio:~
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500 hidden sm:inline">bash / zsh v5.9</span>
      </div>

      {/* Terminal Body */}
      <div className="p-4 font-mono text-xs sm:text-sm max-h-72 sm:max-h-80 overflow-y-auto space-y-3">
        {history.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="text-emerald-400 font-semibold">$</span>
              <span className="text-slate-200">{item.command}</span>
            </div>
            <div className="pl-4 border-l border-slate-800/80">{item.output}</div>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick suggestions chips */}
      <div className="px-4 py-2 bg-[#090d16] border-t border-slate-800/50 flex flex-wrap items-center gap-2">
        <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-400" />
          atalhos:
        </span>
        {quickActions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleCommand(action.cmd)}
            className="px-2 py-1 rounded bg-slate-800/70 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-mono transition-colors"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Interactive Command Input */}
      <form onSubmit={handleSubmit} className="p-2 sm:p-3 bg-[#080b13] border-t border-slate-800 flex items-center gap-2">
        <span className="text-emerald-400 font-mono font-bold pl-2">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite um comando (ex: help, projects, certs)..."
          className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 font-mono text-xs sm:text-sm focus:outline-none"
        />
        <button
          type="submit"
          className="p-1.5 rounded-lg bg-blue-600/80 hover:bg-blue-600 text-white transition-colors"
          title="Executar comando"
        >
          <CornerDownLeft className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
