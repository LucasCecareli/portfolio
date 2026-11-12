import React, { useRef } from 'react';
import gsap from 'gsap';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  as?: 'div' | 'span';
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.24,
  as: Component = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(pointer: fine)').matches)
    ) {
      return;
    }

    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);

    gsap.to(ref.current, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.35,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.55,
      ease: 'elastic.out(1, 0.4)',
      overwrite: 'auto',
    });
  };

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block ${className}`}
    >
      {children}
    </Component>
  );
};
