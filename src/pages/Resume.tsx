import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import {
  FileText,
  Download,
  Printer,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  Mail,
  MapPin,
  ExternalLink,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const Resume: React.FC = () => {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPDF = () => {
    setDownloaded(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    // Trigger window.print() or file download
    window.print();
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35 }}
      className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 space-y-12"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-wider">
          <FileText className="w-3.5 h-3.5" />
          <span>Documento Oficial</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Currículo & Trajetória
        </h1>
        <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
          Visão condensada da formação acadêmica, habilidades técnicas e conquistas para recrutadores e tech leads.
        </p>

        {/* Action Buttons: Central, Visible & Functional */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            onClick={handleDownloadPDF}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Salvo / Imprimindo...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Baixar Currículo em PDF</span>
              </>
            )}
          </button>

          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-medium text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>Versão para Impressão</span>
          </button>
        </div>
      </div>

      {/* Structured CV Document Container */}
      <div className="rounded-3xl bg-[#0c101c] border border-slate-800 p-8 sm:p-12 space-y-12 shadow-2xl relative">
        
        {/* CV Top Header */}
        <div className="border-b border-slate-800 pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-white">
              {portfolioData.personal.name}
            </h2>
            <p className="text-blue-400 font-mono text-sm sm:text-base">
              {portfolioData.personal.role}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-500" />
                {portfolioData.personal.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" />
                {portfolioData.personal.email}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5 text-xs font-mono">
            <a
              href={portfolioData.personal.github}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-between gap-2"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
            <a
              href={portfolioData.personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-between gap-2"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </a>
          </div>
        </div>

        {/* Resumo Profissional */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>Resumo Profissional & Acadêmico</span>
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {portfolioData.about.overview}
          </p>
        </div>

        {/* Formação Acadêmica */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            <span>Formação Acadêmica</span>
          </h3>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="text-base font-bold text-white">{portfolioData.personal.degree}</h4>
              <span className="text-xs font-mono text-blue-400">{portfolioData.personal.graduationYear}</span>
            </div>
            <p className="text-sm font-medium text-slate-400">{portfolioData.personal.institution}</p>
            <div className="pt-2 text-xs text-slate-300 space-y-1">
              <p>• Foco em fundamentos da computação: Algoritmos Avançados, Estruturas de Dados, Sistemas Concorrentes, Redes e Teoria dos Grafos.</p>
              <p>• Resolução de desafios de programação e projetos integradores com tecnologias modernas.</p>
            </div>
          </div>
        </div>

        {/* Habilidades Técnicas */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span>Competências & Tecnologias</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-blue-400 font-bold block">Linguagens:</span>
              <p className="text-slate-300">
                {portfolioData.skills.linguagens.map((l) => l.name).join(', ')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-indigo-400 font-bold block">Frameworks:</span>
              <p className="text-slate-300">
                {portfolioData.skills.frameworks.map((f) => f.name).join(', ')}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 space-y-2">
              <span className="text-cyan-400 font-bold block">DevOps & Dados:</span>
              <p className="text-slate-300">
                {portfolioData.skills.ferramentas.map((t) => t.name).join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Certificações Oficiais */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono uppercase tracking-wider text-blue-400 flex items-center gap-2">
            <Award className="w-4 h-4" />
            <span>Certificações em Destaque</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {portfolioData.certifications.map((cert) => (
              <div key={cert.id} className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-bold text-white">{cert.title}</h4>
                  <span className="text-slate-400">{cert.issuer} ({cert.issueDate})</span>
                </div>
                {cert.credentialId && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/20">
                    Verificado
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
