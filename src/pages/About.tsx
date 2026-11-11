import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { AnimatedCard } from '../components/AnimatedCard';
import {
  GraduationCap,
  BookOpen,
  Layers,
  CheckCircle2,
  Award,
  Code2,
  Cpu,
  Database,
  Terminal,
  Compass,
  Sparkles,
  GitBranch
} from 'lucide-react';
import { motion } from 'framer-motion';

export const About: React.FC = () => {
  const csCorePillars = [
    {
      title: 'Estruturas de Dados & Algoritmos',
      description: 'Grafos (Dijkstra, BFS/DFS), Árvores balanceadas (AVL, Red-Black), tabelas hash e análise de complexidade assintótica Big-O.',
      icon: Code2,
      color: 'blue' as const,
    },
    {
      title: 'Sistemas Operacionais & Concorrência',
      description: 'Gerenciamento de memória (Virtual Memory, Paging), processos, threads, mutexes, semáforos e prevenção de deadlocks.',
      icon: Terminal,
      color: 'emerald' as const,
    },
    {
      title: 'Redes de Computadores & Protocolos',
      description: 'Camadas OSI/TCP-IP, roteamento, WebSockets, HTTP/2 e 3, RESTful APIs, gRPC e comunicação cliente-servidor.',
      icon: Compass,
      color: 'cyan' as const,
    },
    {
      title: 'Bancos de Dados & Modelagem',
      description: 'Normalização relacional (PostgreSQL/MySQL), modelagem documental (MongoDB), transações ACID, índices e queries eficientes.',
      icon: Database,
      color: 'purple' as const,
    },
    {
      title: 'Arquitetura de Software & Clean Code',
      description: 'Princípios SOLID, separação de responsabilidades (Clean Architecture), Design Patterns e cobertura de testes.',
      icon: Layers,
      color: 'indigo' as const,
    },
    {
      title: 'DevOps & Containers',
      description: 'Containerização com Docker, automação de pipelines CI/CD, ambientes isolados no Linux e deploy em nuvem.',
      icon: GitBranch,
      color: 'amber' as const,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-20"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Perfil & Trajetória</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Sobre Mim & Formação Acadêmica
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          A união entre fundamentos sólidos de computação e a prática diária construindo software escalável.
        </p>
      </div>

      {/* Bento Grid: Universidade & Destaques */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Main University Card */}
        <div className="lg:col-span-8">
          <AnimatedCard glowColor="blue" className="p-8 sm:p-10 h-full flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{portfolioData.personal.degree}</h2>
                    <p className="text-sm text-blue-400 font-mono">{portfolioData.personal.institution}</p>
                  </div>
                </div>

                <span className="self-start sm:self-auto text-xs font-mono px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300">
                  {portfolioData.personal.graduationYear}
                </span>
              </div>

              <p className="text-slate-300 text-base leading-relaxed">
                {portfolioData.about.overview}
              </p>

              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-blue-400" />
                  Disciplinas Fundamentais em Destaque:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {portfolioData.about.csFundamentals.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span>Local: {portfolioData.personal.location}</span>
              <span className="text-emerald-400">Status: Cursando com alto desempenho</span>
            </div>
          </AnimatedCard>
        </div>

        {/* Stats & CS Philosophy */}
        <div className="lg:col-span-4 space-y-6">
          <AnimatedCard glowColor="indigo" className="p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              Métricas Acadêmicas & Código
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-[#080b13] border border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-blue-400 font-mono">4+</span>
                <span className="text-xs text-slate-400">Certificações</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080b13] border border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-indigo-400 font-mono">10+</span>
                <span className="text-xs text-slate-400">Projetos Feitos</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080b13] border border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-emerald-400 font-mono">5+</span>
                <span className="text-xs text-slate-400">Linguagens</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#080b13] border border-slate-800 text-center">
                <span className="block text-2xl font-extrabold text-cyan-400 font-mono">100%</span>
                <span className="text-xs text-slate-400">Dedicação</span>
              </div>
            </div>
          </AnimatedCard>

          <AnimatedCard glowColor="purple" className="p-6">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" />
              Minha Filosofia
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
              "Computação não é sobre computadores, assim como a astronomia não é sobre telescópios."
            </p>
            <span className="block text-right text-xs text-slate-500 font-mono mt-2">
              — Edsger W. Dijkstra
            </span>
          </AnimatedCard>
        </div>

      </div>

      {/* Core Pillars of Computer Science */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
            Pilares da Computação
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Fundamentos Teóricos & Técnicos
          </h2>
          <p className="text-slate-400 text-sm">
            O conhecimento essencial que me permite aprender qualquer nova linguagem ou framework em poucos dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {csCorePillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <AnimatedCard key={pillar.title} glowColor={pillar.color} className="p-6">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </AnimatedCard>
            );
          })}
        </div>
      </div>

      {/* Tech Stack Interactive Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono text-indigo-400 uppercase tracking-widest">
            Habilidades Práticas
          </span>
          <h2 className="text-3xl font-bold text-white tracking-tight">
            Linguagens & Tecnologias
          </h2>
          <p className="text-slate-400 text-sm">
            Ferramentas que utilizo no dia a dia para desenvolvimento e projetos práticos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Linguagens */}
          <AnimatedCard glowColor="blue" className="p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-blue-400" />
              Linguagens de Programação
            </h3>
            <div className="space-y-2.5">
              {portfolioData.skills.linguagens.map((l) => (
                <div key={l.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <span className="text-sm font-medium text-slate-200">{l.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 font-mono">{l.level}</span>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* Frameworks */}
          <AnimatedCard glowColor="indigo" className="p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-400" />
              Frameworks & Web
            </h3>
            <div className="space-y-2.5">
              {portfolioData.skills.frameworks.map((f) => (
                <div key={f.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <span className="text-sm font-medium text-slate-200">{f.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-mono">{f.category}</span>
                </div>
              ))}
            </div>
          </AnimatedCard>

          {/* DevOps & Ferramentas */}
          <AnimatedCard glowColor="cyan" className="p-6">
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              DevOps & Bancos de Dados
            </h3>
            <div className="space-y-2.5">
              {portfolioData.skills.ferramentas.map((t) => (
                <div key={t.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <span className="text-sm font-medium text-slate-200">{t.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 font-mono">{t.category}</span>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </motion.div>
  );
};
