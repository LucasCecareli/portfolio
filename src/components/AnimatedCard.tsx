import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'cyan' | 'purple' | 'mono';
  onClick?: () => void;
  hoverLift?: boolean;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  onClick,
  hoverLift = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={hoverLift ? { y: -4 } : undefined}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={`relative rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] overflow-hidden transition-colors duration-300 group ${className}`}
      style={{ boxShadow: 'var(--shadow-card)' }}
    >
      {/* Subtle Monochromatic Cursor Spotlight */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(460px circle at ${mousePos.x}px ${mousePos.y}px, var(--spotlight-color), transparent 70%)`,
          }}
        />
      )}

      {/* Top Precision Hairline Accent on Hover */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--text-primary)]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};
