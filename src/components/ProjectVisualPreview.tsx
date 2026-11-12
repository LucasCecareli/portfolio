import React from 'react';
import {
  HeartPulse,
  CalendarClock,
  Trophy,
  Sparkles,
  CheckCircle2,
  Clock,
  Activity,
  HelpCircle,
  Wallet,
} from 'lucide-react';

interface ProjectVisualPreviewProps {
  projectId: string;
  title: string;
  categoryDisplay: string;
  image?: string;
  inDevelopment?: boolean;
  inDevelopmentLabel?: string;
}

export const ProjectVisualPreview: React.FC<ProjectVisualPreviewProps> = ({
  projectId,
  title,
  categoryDisplay,
  image,
  inDevelopment,
  inDevelopmentLabel = 'EM DESENVOLVIMENTO',
}) => {
  if (image && image.trim().length > 0) {
    return (
      <img
        src={image}
        alt={title}
        loading="lazy"
        className="w-full h-full object-cover grayscale-[25%] contrast-[1.05] group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-700 ease-out"
      />
    );
  }

  return (
    <div className="relative w-full h-full bg-[var(--bg-primary)] bg-architectural-grid p-5 sm:p-7 flex flex-col justify-between overflow-hidden select-none group-hover:scale-[1.015] transition-transform duration-700 ease-out">
      {/* Subtle Top System Coordinates */}
      <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] text-[var(--text-muted)] uppercase tracking-widest">
        <span>{categoryDisplay}</span>
        {inDevelopment ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-semibold text-[9px]">
            <Clock className="w-2.5 h-2.5" />
            {inDevelopmentLabel}
          </span>
        ) : (
          <span>SYS // {projectId.toUpperCase()}</span>
        )}
      </div>

      {/* Bespoke Interactive Wireframe Diagram per Real Project */}
      <div className="relative z-10 my-auto py-3">
        {projectId === 'proj-1' && (
          /* ELO — Hackathon de Saúde & Tecnologia */
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 sm:col-span-5 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] flex items-center justify-center text-[var(--text-primary)]">
                  <HeartPulse className="w-4 h-4" />
                </div>
                <span className="font-mono-tech text-[9px] px-2 py-0.5 rounded-full bg-[var(--bg-elevated)] text-[var(--text-secondary)]">
                  HACKATHON · NOV 2026
                </span>
              </div>
              <div className="font-display font-extrabold text-xl text-[var(--text-primary)] tracking-tight">
                ELO
              </div>
              <div className="font-mono-tech text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Conexão Digital em Saúde & Tecnologia
              </div>
            </div>

            <div className="col-span-12 sm:col-span-7 space-y-2">
              {[
                { code: '01', label: 'Triagem & Jornada do Paciente', status: 'ACTIVE' },
                { code: '02', label: 'Conexão & Acompanhamento Digital', status: 'SYNC' },
                { code: '03', label: 'Interface Acessível & Prototipação', status: 'READY' },
              ].map((node) => (
                <div
                  key={node.code}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)]/90 border border-[var(--border-subtle)] flex items-center justify-between font-mono-tech text-[11px]"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-[var(--text-muted)]">[{node.code}]</span>
                    <span className="text-[var(--text-primary)] truncate">{node.label}</span>
                  </div>
                  <Activity className="w-3.5 h-3.5 text-[var(--text-secondary)] shrink-0" />
                </div>
              ))}
            </div>
          </div>
        )}

        {projectId === 'proj-2' && (
          /* Sistema de Agendamento de Laboratórios */
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <CalendarClock className="w-4 h-4 text-[var(--text-primary)]" />
                <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                  Controle de Salas & Horários
                </span>
              </div>
              <span className="font-mono-tech text-[10px] text-[var(--text-muted)]">
                LAB_SCHEDULER // 2025
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5 font-mono-tech text-[10px]">
              {[
                { room: 'LAB 01 · COMP', slot: '08:00 — 10:00', state: 'RESERVADO', filled: true },
                { room: 'LAB 02 · REDES', slot: '10:00 — 12:00', state: 'DISPONÍVEL', filled: false },
                { room: 'LAB 03 · SISTEMAS', slot: '14:00 — 16:00', state: 'RESERVADO', filled: true },
              ].map((item) => (
                <div
                  key={item.room}
                  className={`p-3 rounded-xl border space-y-1.5 ${
                    item.filled
                      ? 'bg-[var(--bg-elevated)] border-[var(--border-strong)]'
                      : 'bg-[var(--bg-surface)] border-[var(--border-subtle)]'
                  }`}
                >
                  <div className="text-[var(--text-primary)] font-semibold truncate">
                    {item.room}
                  </div>
                  <div className="text-[var(--text-muted)] text-[9px]">{item.slot}</div>
                  <div className="inline-flex items-center gap-1 text-[9px] text-[var(--text-secondary)]">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>{item.state}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {projectId === 'proj-3' && (
          /* Jogo Educacional — Show do Milhão */
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-4 h-4 text-[var(--text-primary)]" />
                <span className="font-display font-bold text-sm text-[var(--text-primary)]">
                  Rodada Progressiva · Quiz Educacional
                </span>
              </div>
              <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--text-primary)]">
                NÍVEL 04 / 05
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 font-mono-tech text-[10px]">
              {[
                { opt: 'A', label: 'Alternativa de Verificação 01', active: false },
                { opt: 'B', label: 'Resposta Correta Validada ✓', active: true },
                { opt: 'C', label: 'Alternativa de Verificação 03', active: false },
                { opt: 'D', label: 'Auxílio: Cartas / Pular Rodada', active: false },
              ].map((choice) => (
                <div
                  key={choice.opt}
                  className={`px-3 py-2.5 rounded-xl border flex items-center gap-2.5 ${
                    choice.active
                      ? 'bg-[var(--accent-bg)] text-[var(--accent-text)] border-[var(--accent-bg)] font-semibold'
                      : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
                  }`}
                >
                  <span className="w-5 h-5 rounded-md border border-current flex items-center justify-center text-[9px] shrink-0">
                    {choice.opt}
                  </span>
                  <span className="truncate">{choice.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {projectId === 'proj-4' && (
          /* Velore — Assistente Pessoal Financeiro (Em Desenvolvimento) */
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-12 sm:col-span-5 p-4 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-strong)] space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)]">
                  <Wallet className="w-4 h-4" />
                </div>
                <Sparkles className="w-4 h-4 text-[var(--text-primary)]" />
              </div>
              <div className="font-display font-extrabold text-xl text-[var(--text-primary)] tracking-tight">
                VELORE
              </div>
              <div className="font-mono-tech text-[10px] text-[var(--text-secondary)] leading-relaxed">
                Assistente Pessoal Financeiro
              </div>
            </div>

            <div className="col-span-12 sm:col-span-7 space-y-2">
              {[
                { step: 'WIP · 01', text: 'Arquitetura & Organização Financeira' },
                { step: 'WIP · 02', text: 'Acompanhamento de Fluxo Pessoal' },
                { step: 'WIP · 03', text: 'Estudos de Assistência com IA' },
              ].map((row) => (
                <div
                  key={row.step}
                  className="px-3.5 py-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-between font-mono-tech text-[10px]"
                >
                  <span className="text-[var(--text-primary)] truncate">{row.text}</span>
                  <span className="text-[var(--text-muted)] ml-2 shrink-0">[{row.step}]</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 pt-3 border-t border-[var(--border-subtle)]/80 flex items-center justify-between font-mono-tech text-[10px] text-[var(--text-muted)]">
        <span className="inline-flex items-center gap-1.5">
          <HelpCircle className="w-3 h-3" />
          <span>LUCAS CECARELI RIBEIRO · IMT</span>
        </span>
        <span className="text-[var(--text-primary)] font-semibold group-hover:underline">
          INSPECIONAR →
        </span>
      </div>
    </div>
  );
};
