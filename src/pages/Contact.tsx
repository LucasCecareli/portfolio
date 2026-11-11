import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { AnimatedCard } from '../components/AnimatedCard';
import {
  MessageSquare,
  Mail,
  Copy,
  Check,
  Send,
  Sparkles,
  MapPin,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    
    const mailto = `mailto:${portfolioData.personal.email}?subject=Contato via Portfólio de ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message + '\n\nE-mail de retorno: ' + formState.email)}`;
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Vamos Conversar</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Entre em Contato
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Estou disponível para oportunidades de estágio, projetos desafiadores e conversas sobre tecnologia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Direct channels & Quick Copy */}
        <div className="lg:col-span-5 space-y-6">
          <AnimatedCard glowColor="blue" className="p-7 space-y-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              Canais Diretos
            </h2>

            {/* Quick Email Copy with confetti */}
            <div className="p-4 rounded-2xl bg-[#080b13] border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400">E-mail Profissional:</span>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs sm:text-sm font-mono text-slate-200 truncate">
                  {portfolioData.personal.email}
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono flex items-center gap-1.5 shrink-0 transition-all active:scale-95 shadow-md shadow-blue-500/25 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="space-y-3 pt-2">
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white text-xs font-mono transition-all group"
              >
                <div className="flex items-center gap-3">
                  <LinkedinIcon className="w-4 h-4 text-blue-400" />
                  <span>Conectar no LinkedIn</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </a>

              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-800 text-slate-200 hover:text-white text-xs font-mono transition-all group"
              >
                <div className="flex items-center gap-3">
                  <GithubIcon className="w-4 h-4 text-slate-400" />
                  <span>Ver perfil no GitHub</span>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-200 transition-colors" />
              </a>
            </div>

            {/* Location & Status Info */}
            <div className="pt-4 border-t border-slate-800/80 space-y-2 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-500" />
                <span>{portfolioData.personal.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Resposta rápida em menos de 24h</span>
              </div>
            </div>
          </AnimatedCard>
        </div>

        {/* Right Column: Message Form */}
        <div className="lg:col-span-7">
          <AnimatedCard glowColor="indigo" className="p-8 sm:p-10 space-y-6">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-400" />
              Enviar Mensagem Rápida
            </h2>

            {submitted && (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Seu aplicativo de e-mail foi aberto com os dados preenchidos para envio imediato!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Seu Nome / Recrutador</label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Ex: Ana Silva (Tech Lead)"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-slate-400">Seu E-mail Corporativo</label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="nome@empresa.com"
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-slate-400">Mensagem ou Proposta de Vaga</label>
                <textarea
                  rows={5}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Olá Lucas! Gostamos do seu perfil em Ciência da Computação e gostaríamos de bater um papo sobre uma vaga..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder:text-slate-600 text-sm focus:outline-none focus:border-blue-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Proposta por E-mail</span>
              </button>
            </form>
          </AnimatedCard>
        </div>

      </div>
    </motion.div>
  );
};
