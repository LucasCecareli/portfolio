import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';

interface HistoryItem {
  command: string;
  output: React.ReactNode;
}

export const TerminalWidget: React.FC = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showWelcome, setShowWelcome] = useState(true);
  const terminalBodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    let output: React.ReactNode = '';

    switch (cleanCmd) {
      case 'help':
        output = (
          <div className="space-y-1.5 text-xs">
            <p className="text-[var(--text-primary)] font-semibold">{t.terminal.helpTitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[var(--text-secondary)]">
              <div>
                <span className="text-[var(--text-primary)] font-semibold">about</span> —{' '}
                {t.terminal.helpAbout}
              </div>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">projects</span> —{' '}
                {t.terminal.helpProjects}
              </div>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">skills</span> —{' '}
                {t.terminal.helpSkills}
              </div>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">contact</span> —{' '}
                {t.terminal.helpContact}
              </div>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">clear</span> —{' '}
                {t.terminal.helpClear}
              </div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'cat about.txt':
        output = (
          <div className="space-y-1 text-xs text-[var(--text-secondary)]">
            <p>
              <span className="text-[var(--text-primary)] font-semibold">NAME:</span>{' '}
              {portfolioData.personal.name}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">DEGREE:</span>{' '}
              {t.about.education.degree}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">INSTITUTION:</span>{' '}
              {t.about.education.institution}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">PERIOD:</span>{' '}
              {t.about.education.period}
            </p>
            <p className="text-[var(--text-muted)] pt-1 leading-relaxed">{t.about.lead}</p>
          </div>
        );
        break;

      case 'skills':
      case 'ls skills':
        output = (
          <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
            <p>
              <span className="text-[var(--text-primary)] font-semibold">
                {t.skills.categories.languages.title}:
              </span>{' '}
              {t.skills.categories.languages.items.map((i) => i.name).join(' · ')}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">
                {t.skills.categories.frameworks.title}:
              </span>{' '}
              {t.skills.categories.frameworks.items.map((i) => i.name).join(' · ')}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">
                {t.skills.categories.tools.title}:
              </span>{' '}
              {t.skills.categories.tools.items.map((i) => i.name).join(' · ')}
            </p>
          </div>
        );
        break;

      case 'projects':
      case 'ls projects':
        output = (
          <div className="space-y-1.5 text-xs text-[var(--text-secondary)]">
            {t.projects.items.map((p) => (
              <div
                key={p.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between py-1 border-b border-[var(--border-subtle)]/60"
              >
                <span className="text-[var(--text-primary)] font-medium">
                  {p.index}. {p.title}
                </span>
                <span className="text-[11px] text-[var(--text-muted)]">
                  [{p.categoryDisplay}]
                </span>
              </div>
            ))}
          </div>
        );
        break;

      case 'certs':
      case 'cat certs.json':
        output = (
          <div className="space-y-1 text-xs text-[var(--text-secondary)]">
            <p className="text-[var(--text-primary)] font-medium">
              {t.skills.certifications.emptyStateTitle}
            </p>
            <p className="text-[var(--text-muted)]">{t.skills.certifications.emptyStateBody}</p>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="space-y-1 text-xs text-[var(--text-secondary)]">
            {portfolioData.personal.github && (
              <p>
                <span className="text-[var(--text-primary)] font-semibold">GITHUB:</span>{' '}
                {portfolioData.personal.github}
              </p>
            )}
            <p>
              <span className="text-[var(--text-primary)] font-semibold">EMAIL:</span>{' '}
              {portfolioData.personal.email || t.contact.pendingChannel}
            </p>
            <p>
              <span className="text-[var(--text-primary)] font-semibold">LINKEDIN:</span>{' '}
              {portfolioData.personal.linkedin || t.contact.pendingChannel}
            </p>
          </div>
        );
        break;

      case 'clear':
        setShowWelcome(false);
        setHistory([]);
        setInput('');
        return;

      default:
        output = <p className="text-[var(--text-secondary)] text-xs">{t.terminal.unknownCmd}</p>;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInput('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const quickActions = [
    { label: 'about', cmd: 'about' },
    { label: 'projects', cmd: 'projects' },
    { label: 'skills', cmd: 'skills' },
    { label: 'contact', cmd: 'contact' },
    { label: 'clear', cmd: 'clear' },
  ];

  return (
    <div className="w-full rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] overflow-hidden flex flex-col h-[390px]">
      {/* Terminal Top Bar */}
      <div className="px-4 py-3 bg-[var(--bg-elevated)]/70 border-b border-[var(--border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/40" />
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--text-muted)]/25" />
          <span className="ml-2 text-[11px] font-mono-tech text-[var(--text-secondary)] flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[var(--text-primary)]" />
            lcr@imt-bcc:~
          </span>
        </div>
        <span className="text-[10px] font-mono-tech text-[var(--text-muted)] uppercase tracking-wider">
          Interactive Shell
        </span>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalBodyRef}
        className="flex-1 p-4 font-mono-tech text-xs overflow-y-auto space-y-3"
      >
        {showWelcome && (
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-bold">❯</span>
              <span className="text-[var(--text-primary)]">init --session</span>
            </div>
            <div className="pl-3.5 border-l border-[var(--border-subtle)] space-y-1 text-[var(--text-secondary)]">
              <p className="text-[var(--text-primary)] font-semibold">{t.terminal.welcomeTitle}</p>
              <p>{t.terminal.welcomeBody}</p>
              <p className="text-[var(--text-muted)] text-[11px]">{t.terminal.welcomeHint}</p>
            </div>
          </div>
        )}

        {history.map((item, index) => (
          <div key={index} className="space-y-1.5">
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <span className="text-[var(--text-primary)] font-bold">❯</span>
              <span className="text-[var(--text-primary)]">{item.command}</span>
            </div>
            <div className="pl-3.5 border-l border-[var(--border-subtle)]">{item.output}</div>
          </div>
        ))}
      </div>

      {/* Quick Command Pills */}
      <div className="px-4 py-2 bg-[var(--bg-subtle)] border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-1.5">
        <span className="text-[10px] font-mono-tech text-[var(--text-muted)] uppercase mr-1">
          {t.terminal.shortcutsLabel}
        </span>
        {quickActions.map((action) => (
          <button
            key={action.label}
            type="button"
            onClick={() => handleCommand(action.cmd)}
            className="px-2.5 py-0.5 rounded-full bg-[var(--bg-elevated)] hover:bg-[var(--accent-bg)] text-[var(--text-secondary)] hover:text-[var(--accent-text)] border border-[var(--border-subtle)] text-[11px] font-mono-tech transition-colors cursor-pointer"
          >
            {action.label}
          </button>
        ))}
      </div>

      {/* Command Input */}
      <form
        onSubmit={handleSubmit}
        className="p-2.5 bg-[var(--bg-surface)] border-t border-[var(--border-subtle)] flex items-center gap-2"
      >
        <span className="text-[var(--text-primary)] font-mono-tech font-bold pl-2 text-xs">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.terminal.placeholder}
          aria-label={t.terminal.placeholder}
          className="flex-1 bg-transparent text-[var(--text-primary)] placeholder:text-[var(--text-muted)] font-mono-tech text-xs focus:outline-none"
        />
        <button
          type="submit"
          aria-label="Run command"
          className="p-1.5 rounded-lg bg-[var(--accent-bg)] text-[var(--accent-text)] hover:opacity-85 transition-opacity cursor-pointer"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
