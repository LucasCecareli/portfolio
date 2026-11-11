import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { TerminalWidget } from '../components/TerminalWidget';
import { AnimatedCard } from '../components/AnimatedCard';
import { Link } from '../router';
import {
  GraduationCap,
  FolderGit2,
  Award,
  FileText,
  Mail,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../components/Icons';
import { motion } from 'framer-motion';

export const Home: React.FC = () => {
  const centralHubCards = [
    {
      title: 'Sobre Mim & Formação',
      subtitle: 'Ciência da Computação no Instituto Mauá de Tecnologia, pilares teóricos e visão de engenharia.',
      to: '/sobre',
      icon: GraduationCap,
      color: 'blue' as const,
      tag: 'Acadêmico & CS',
      badgeClass: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
    },
    {
      title: 'Projetos em Código',
      subtitle: 'Aplicações full-stack, microsserviços backend, algoritmos de alto desempenho e demos ao vivo.',
      to: '/projetos',
      icon: FolderGit2,
      color: 'emerald' as const,
      tag: 'Showcase Prático',
      badgeClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Certificações & Cursos',
      subtitle: 'Credenciais autenticadas (AWS, Harvard CS50, Meta, DeepLearning.AI) com IDs oficiais.',
      to: '/certificacoes',
      icon: Award,
      color: 'amber' as const,
      tag: 'Credenciais Oficiais',
      badgeClass: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Currículo Completo',
      subtitle: 'Resumo estruturado para recrutadores, competências técnicas e download instantâneo em PDF.',
      to: '/curriculo',
      icon: FileText,
      color: 'indigo' as const,
      tag: 'Download & Visualização',
      badgeClass: 'text-indigo-400 bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Entrar em Contato',
      subtitle: 'E-mail com cópia rápida, formulário direto, proposta de estágio e redes profissionais.',
      to: '/contato',
      icon: Mail,
      color: 'purple' as const,
      tag: 'Disponível para Hire',
      badgeClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="space-y-24 pb-20"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        {/* Glow lights */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-600/15 blur-[130px] rounded-full pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[380px] h-[320px] bg-indigo-600/12 blur-[110px] rounded-full pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Headline & Pitch */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 shadow-inner">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs font-mono text-slate-300">
                  {portfolioData.personal.degree} • {portfolioData.personal.institution}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
                Construindo software com{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                  arquitetura sólida
                </span>{' '}
                e design moderno.
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Olá! Sou o <strong className="text-white font-semibold">{portfolioData.personal.name}</strong>, 
                estudante de Ciência da Computação apaixonado por estruturas de dados, microsserviços, 
                sistemas eficientes e interfaces dinâmicas.
              </p>

              {/* Central Quick Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <Link
                  to="/projetos"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span>Explorar Projetos</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/curriculo"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all hover:scale-105 active:scale-95"
                >
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Ver Currículo</span>
                </Link>

                <Link
                  to="/certificacoes"
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 font-medium text-sm transition-all hover:scale-105 active:scale-95"
                >
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Certificações</span>
                </Link>
              </div>

              {/* Social Channels */}
              <div className="flex items-center gap-5 pt-3 text-slate-400">
                <a
                  href={portfolioData.personal.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
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
                >
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-500 transition-colors">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono">LinkedIn</span>
                </a>

                <Link
                  to="/contato"
                  className="flex items-center gap-2 hover:text-emerald-400 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 hover:border-slate-500 transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-mono">Contato</span>
                </Link>
              </div>
            </div>

            {/* Right Interactive Terminal Widget */}
            <div className="lg:col-span-5">
              <TerminalWidget />
            </div>

          </div>
        </div>
      </section>

      {/* Central Interactive Navigation Hub (Botões Centrais e Dinâmicos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">
            Navegação Rápida
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Explore as Seções do Portfólio
          </h2>
          <p className="text-slate-400 text-sm">
            Passe o mouse pelos cards para interagir e clique para navegar diretamente para a página desejada.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centralHubCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link key={card.title} to={card.to} className="block group">
                <AnimatedCard glowColor={card.color} className="p-7 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-xl border ${card.badgeClass}`}>
                        <Icon className="w-6 h-6 transition-transform group-hover:scale-110 duration-300" />
                      </div>
                      <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border ${card.badgeClass}`}>
                        {card.tag}
                      </span>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center justify-between">
                        <span>{card.title}</span>
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-400" />
                      </h3>
                      <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                        {card.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500 group-hover:text-slate-300 transition-colors">
                    <span>Acessar página</span>
                    <span className="text-blue-400 font-bold">Abrir →</span>
                  </div>
                </AnimatedCard>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Snapshot */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-950/30 via-slate-900/60 to-indigo-950/30 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Pronto para uma oportunidade em Engenharia de Software
            </h3>
            <p className="text-slate-400 text-sm max-w-xl">
              Foco em código limpo, arquitetura escalável e capacidade analítica comprovada em Ciência da Computação.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/projetos"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-500/25 transition-all hover:scale-105"
            >
              Ver Projetos
            </Link>
            <Link
              to="/contato"
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-sm border border-slate-700 transition-all"
            >
              Falar Comigo
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
};
