import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { useLanguage } from '../context/LanguageContext';
import { Link } from '../router';
import { GithubIcon, LinkedinIcon } from './Icons';
import { MagneticButton } from './MagneticButton';
import {
  Mail,
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  Send,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const CURRENT_YEAR = new Date().getFullYear();

export const EditorialContact: React.FC = () => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const hasEmail = Boolean(
    portfolioData.personal.email && portfolioData.personal.email.trim().length > 0
  );
  const hasGithub = Boolean(
    portfolioData.personal.github && portfolioData.personal.github.trim().length > 0
  );
  const hasLinkedin = Boolean(
    portfolioData.personal.linkedin && portfolioData.personal.linkedin.trim().length > 0
  );

  const handleCopyEmail = () => {
    if (!hasEmail) return;
    navigator.clipboard.writeText(portfolioData.personal.email);
    setCopied(true);
    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.75 },
        colors: ['#F5F5F5', '#A1A1AA', '#292929'],
      });
    } catch {
      // ignore
    }
    window.setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.message) return;
    if (hasEmail) {
      const mailto = `mailto:${portfolioData.personal.email}?subject=Contato via Portfólio — ${encodeURIComponent(
        formState.name
      )}&body=${encodeURIComponent(
        formState.message + '\n\nE-mail de retorno: ' + formState.email
      )}`;
      window.location.href = mailto;
    }
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-32 bg-[var(--bg-primary)] border-b border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="editorial-container space-y-20">
        {/* Eyebrow */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
          <span
            data-i18n="contact-eyebrow"
            className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]"
          >
            {t.contact.eyebrow}
          </span>
          <span className="font-mono-tech text-xs text-[var(--text-muted)]">
            {portfolioData.personal.location}
          </span>
        </div>

        {/* Monumental Split Layout */}
        <div className="editorial-grid items-start gap-12">
          {/* Left Column (7 cols): Monumental Typography + Lead + Resume CTA */}
          <div className="col-span-12 lg:col-span-7 space-y-8">
            <h2 className="text-monumental tracking-tight uppercase">
              <span
                data-i18n="contact-line-1"
                className="block text-[var(--text-primary)]"
              >
                {t.contact.monumentalLine1}
              </span>
              <span
                data-i18n="contact-line-2"
                className="block text-[var(--text-secondary)]"
              >
                {t.contact.monumentalLine2}
              </span>
              <span
                data-i18n="contact-line-3"
                className="block text-[var(--text-primary)]"
              >
                {t.contact.monumentalLine3}
              </span>
            </h2>

            <div className="space-y-3 max-w-xl">
              <p
                data-i18n="contact-lead"
                className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]"
              >
                {t.contact.lead}
              </p>
              <p
                data-i18n="contact-desc"
                className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed"
              >
                {t.contact.description}
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <MagneticButton strength={0.2}>
                <Link
                  to="/curriculo"
                  className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
                >
                  <span data-i18n="contact-resume-btn">{t.contact.downloadResume}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>

              {hasEmail && (
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-5 py-4 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-elevated)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] font-mono-tech text-xs uppercase tracking-wider text-[var(--text-primary)] transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{t.contact.copiedEmail}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span data-i18n="contact-copy-btn">{t.contact.copyEmail}</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Right Column (5 cols): Verified Channels + Direct Message Trigger */}
          <div className="col-span-12 lg:col-span-5 space-y-4">
            {/* Card 01: GITHUB (Verified) */}
            {hasGithub && (
              <a
                href={portfolioData.personal.github}
                target="_blank"
                rel="noreferrer"
                className="block p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors relative group"
              >
                <span className="absolute top-4 right-5 font-mono-tech text-xs text-[var(--text-muted)]">
                  01
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
                      <GithubIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {t.contact.channels.githubLabel}
                      </span>
                      <span className="block font-mono-tech text-xs sm:text-sm text-[var(--text-primary)] truncate mt-0.5">
                        {portfolioData.personal.github.replace(/^https?:\/\//, '')}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-4" />
                </div>
              </a>
            )}

            {/* Card 02: EMAIL (Shows verified email if set, or clean pending status without fake placeholder) */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-colors relative">
              <span className="absolute top-4 right-5 font-mono-tech text-xs text-[var(--text-muted)]">
                02
              </span>
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    {t.contact.channels.emailLabel}
                  </span>
                  {hasEmail ? (
                    <a
                      href={`mailto:${portfolioData.personal.email}`}
                      className="block font-mono-tech text-xs sm:text-sm text-[var(--text-primary)] hover:underline truncate mt-0.5"
                    >
                      {portfolioData.personal.email}
                    </a>
                  ) : (
                    <span className="block font-mono-tech text-xs text-[var(--text-secondary)] mt-0.5">
                      {t.contact.pendingChannel}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Card 03: LINKEDIN (Shows verified URL if set, or clean pending status without fake placeholder) */}
            {hasLinkedin ? (
              <a
                href={portfolioData.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors relative group"
              >
                <span className="absolute top-4 right-5 font-mono-tech text-xs text-[var(--text-muted)]">
                  03
                </span>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
                      <LinkedinIcon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                        {t.contact.channels.linkedinLabel}
                      </span>
                      <span className="block font-mono-tech text-xs sm:text-sm text-[var(--text-primary)] truncate mt-0.5">
                        {portfolioData.personal.linkedin.replace(/^https?:\/\//, '')}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 mt-4" />
                </div>
              </a>
            ) : (
              <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-colors relative">
                <span className="absolute top-4 right-5 font-mono-tech text-xs text-[var(--text-muted)]">
                  03
                </span>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-primary)] shrink-0">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      {t.contact.channels.linkedinLabel}
                    </span>
                    <span className="block font-mono-tech text-xs text-[var(--text-secondary)] mt-0.5">
                      {t.contact.pendingChannel}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Wide Pill Button: WRITE A MESSAGE -> */}
            <button
              type="button"
              onClick={() => setDrawerOpen((prev) => !prev)}
              className="w-full py-4 px-6 rounded-full bg-transparent hover:bg-[var(--bg-surface)] border border-[var(--border-strong)] font-mono-tech text-xs font-semibold uppercase tracking-widest text-[var(--text-primary)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span data-i18n="contact-send-cta">{t.contact.sendMessageCta}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Expandable Direct Message Form */}
        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="p-8 sm:p-10 rounded-3xl bg-[var(--bg-surface)] border border-[var(--border-strong)] space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                      {t.contact.form.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                      {t.contact.form.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDrawerOpen(false)}
                    aria-label={t.contact.form.close}
                    className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {submitted && (
                  <div className="p-4 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--border-strong)] font-mono-tech text-xs text-[var(--text-primary)] flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{t.contact.form.successMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono-tech text-xs text-[var(--text-secondary)]">
                        {t.contact.form.nameLabel}
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder={t.contact.form.namePlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--border-focus)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="block font-mono-tech text-xs text-[var(--text-secondary)]">
                        {t.contact.form.emailLabel}
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder={t.contact.form.emailPlaceholder}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--border-focus)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono-tech text-xs text-[var(--text-secondary)]">
                      {t.contact.form.messageLabel}
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder={t.contact.form.messagePlaceholder}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-subtle)] focus:border-[var(--border-focus)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none resize-none"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] font-mono-tech text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{t.contact.form.submit}</span>
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Closing Editorial Banner */}
        <div className="pt-12 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p
            data-i18n="contact-closing"
            className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--text-primary)] tracking-tight"
          >
            {t.contact.closingBanner}
          </p>
          <span className="font-mono-tech text-xs text-[var(--text-muted)] uppercase tracking-widest">
            LUCAS CECARELI RIBEIRO · {CURRENT_YEAR}
          </span>
        </div>
      </div>
    </section>
  );
};
