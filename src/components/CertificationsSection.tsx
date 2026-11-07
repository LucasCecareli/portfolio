import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Award, ExternalLink, ShieldCheck, Cloud, Code, Layout, Cpu } from 'lucide-react';

export const CertificationsSection: React.FC = () => {
  // Helper to render appropriate icon
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
    <section id="certificacoes" className="py-20 relative border-t border-slate-800/60 bg-[#080b13]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            <span>Validação de Conhecimento</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Certificações Oficiais Concluídas
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Certificados com credenciais autenticadas comprovando competência técnica em cloud, engenharia de software e IA.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {portfolioData.certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl bg-[#0c101c] border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 hover:shadow-xl hover:shadow-indigo-950/10 transition-all duration-300 group"
            >
              <div className="space-y-4">
                {/* Header: Icon + Issuer + Date */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-105 transition-transform">
                      {getIcon(cert.icon)}
                    </div>
                    <div>
                      <span className="text-xs font-mono text-slate-400">{cert.issuer}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {cert.title}
                      </h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
                    {cert.issueDate}
                  </span>
                </div>

                {/* Credential ID */}
                {cert.credentialId && (
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>ID: <code className="text-slate-300 bg-slate-900 px-1.5 py-0.5 rounded">{cert.credentialId}</code></span>
                  </div>
                )}

                {/* Skills tags */}
                <div className="pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {cert.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-md bg-slate-800/60 border border-slate-700/40 text-slate-300 text-xs font-mono"
                      >
                        ✓ {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {cert.credentialUrl && (
                <div className="pt-5 mt-4 border-t border-slate-800/60">
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <span>Verificar Credencial Oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
