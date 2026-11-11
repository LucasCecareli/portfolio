import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { AnimatedCard } from '../components/AnimatedCard';
import {
  Award,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Cloud,
  Code,
  Layout,
  Cpu,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Certifications: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-6 h-6 text-amber-400" />;
      case 'Code':
        return <Code className="w-6 h-6 text-rose-400" />;
      case 'Layout':
        return <Layout className="w-6 h-6 text-blue-400" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-emerald-400" />;
      default:
        return <Award className="w-6 h-6 text-indigo-400" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-16"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider">
          <Award className="w-3.5 h-3.5" />
          <span>Credenciais Oficiais</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Certificações & Cursos
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Validação formal de competências técnicas internacionais com identificador de autenticidade (ID) e links diretos.
        </p>
      </div>

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {portfolioData.certifications.map((cert) => (
          <AnimatedCard
            key={cert.id}
            glowColor="amber"
            className="p-7 sm:p-8 flex flex-col justify-between"
          >
            <div className="space-y-5">
              {/* Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="p-3.5 rounded-2xl bg-[#090d16] border border-slate-800 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(cert.icon)}
                  </div>
                  <div>
                    <span className="text-xs font-mono text-slate-400 block">{cert.issuer}</span>
                    <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {cert.title}
                    </h2>
                  </div>
                </div>

                <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400 shrink-0">
                  {cert.issueDate}
                </span>
              </div>

              {/* Credential ID */}
              {cert.credentialId && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs font-mono text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    Credencial: <code className="text-blue-300 font-bold">{cert.credentialId}</code>
                  </span>
                </div>
              )}

              {/* Skills checklist */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-mono uppercase text-slate-400">Competências Certificadas:</span>
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-300 text-xs font-mono flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Official Link */}
            {cert.credentialUrl && (
              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors group/btn"
                >
                  <span>Validar Credencial Oficial na Plataforma</span>
                  <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                </a>
              </div>
            )}
          </AnimatedCard>
        ))}
      </div>

      {/* Trust Banner */}
      <div className="p-8 rounded-3xl bg-[#090d16] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 shrink-0">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Compromisso com Aprendizado Contínuo</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Mais certificações e especializações em arquitetura em nuvem e sistemas inteligentes em andamento.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
