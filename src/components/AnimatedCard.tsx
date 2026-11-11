import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'cyan' | 'purple';
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  glowColor = 'blue',
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const glowStyles = {
    blue: 'from-blue-600/30 via-indigo-600/20 to-cyan-500/20',
    indigo: 'from-indigo-600/30 via-purple-600/20 to-pink-500/20',
    emerald: 'from-emerald-600/30 via-teal-600/20 to-cyan-500/20',
    amber: 'from-amber-600/30 via-orange-600/20 to-yellow-500/20',
    cyan: 'from-cyan-600/30 via-blue-600/20 to-teal-500/20',
    purple: 'from-purple-600/30 via-pink-600/20 to-indigo-500/20',
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      className={`relative rounded-2xl bg-[#0c101c]/90 border border-slate-800 overflow-hidden cursor-pointer transition-colors duration-300 group ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.12), transparent 70%)`,
          }}
        />
      )}

      {/* Top glowing edge on hover */}
      <div
        className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${glowStyles[glowColor]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {children}
    </motion.div>
  );
};
