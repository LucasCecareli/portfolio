import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function getInitialCursorEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isFinePointer && !prefersReducedMotion;
}

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isHovered, setIsHovered] = useState(false);
  const [isEnabled] = useState<boolean>(getInitialCursorEnabled);

  useEffect(() => {
    if (!isEnabled || !dotRef.current || !ringRef.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    const xDot = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' });
    const yDot = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' });
    const xRing = gsap.quickTo(ring, 'x', { duration: 0.32, ease: 'power3.out' });
    const yRing = gsap.quickTo(ring, 'y', { duration: 0.32, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        const lbl = labeledEl.getAttribute('data-cursor-label') || '';
        setCursorLabel(lbl);
        setIsHovered(true);
        return;
      }

      const interactiveEl = target.closest('a, button, input, textarea, [data-cursor="pointer"]');
      setCursorLabel('');
      setIsHovered(Boolean(interactiveEl));
    };

    const onMouseDown = () => {
      gsap.to(ring, { scale: 0.85, duration: 0.15 });
    };

    const onMouseUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden hidden lg:block no-print">
      {/* Center precision dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--text-primary)] transition-transform duration-200 ${
          cursorLabel ? 'w-1.5 h-1.5 opacity-0' : isHovered ? 'w-2 h-2 scale-125' : 'w-1.5 h-1.5'
        }`}
      />

      {/* Trailing outer ring / contextual pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${
          cursorLabel
            ? 'px-3.5 py-1.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] shadow-xl border border-[var(--border-strong)] scale-100'
            : isHovered
            ? 'w-11 h-11 rounded-full border border-[var(--text-primary)] bg-[var(--text-primary)]/5'
            : 'w-8 h-8 rounded-full border border-[var(--text-secondary)]/45'
        }`}
      >
        {cursorLabel && (
          <span className="font-mono-tech text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">
            {cursorLabel}
          </span>
        )}
      </div>
    </div>
  );
};
