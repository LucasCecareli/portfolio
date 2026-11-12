import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

function getInitialCursorEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  const isFinePointer = window.matchMedia('(pointer: fine)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return isFinePointer && !isCoarsePointer && !prefersReducedMotion;
}

export const CustomCursor: React.FC = () => {
  const posRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const [cursorLabel, setCursorLabel] = useState<string>('');
  const [isInteractive, setIsInteractive] = useState(false);
  const [isEnabled] = useState<boolean>(getInitialCursorEnabled);

  useEffect(() => {
    if (!isEnabled || !posRef.current) return;

    const posEl = posRef.current;

    // Ultra-responsive 1:1 tracking with minimal smoothing (0.035s) and NO CSS transition on transform
    const xTo = gsap.quickTo(posEl, 'x', { duration: 0.035, ease: 'power3.out' });
    const yTo = gsap.quickTo(posEl, 'y', { duration: 0.035, ease: 'power3.out' });

    let lastLabel = '';
    let lastInteractive = false;

    const onMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const labeledEl = target.closest('[data-cursor-label]') as HTMLElement | null;
      if (labeledEl) {
        const nextLabel = labeledEl.getAttribute('data-cursor-label') || '';
        if (nextLabel !== lastLabel || !lastInteractive) {
          lastLabel = nextLabel;
          lastInteractive = true;
          setCursorLabel(nextLabel);
          setIsInteractive(true);
        }
        return;
      }

      const interactiveEl = target.closest('a, button, [role="button"], [data-cursor="pointer"]');
      const nextInteractive = Boolean(interactiveEl);

      if (lastLabel !== '' || nextInteractive !== lastInteractive) {
        lastLabel = '';
        lastInteractive = nextInteractive;
        setCursorLabel('');
        setIsInteractive(nextInteractive);
      }
    };

    const onMouseDown = () => {
      if (badgeRef.current) {
        gsap.to(badgeRef.current, { scale: 0.9, duration: 0.1, overwrite: 'auto' });
      }
    };

    const onMouseUp = () => {
      if (badgeRef.current) {
        gsap.to(badgeRef.current, { scale: 1, duration: 0.14, overwrite: 'auto' });
      }
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
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden hidden lg:block no-print"
    >
      {/* Position wrapper: ONLY updated by GSAP transform (zero CSS transition conflict) */}
      <div
        ref={posRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 will-change-transform"
      >
        {/* Visual indicator: native cursor stays 100% intact; effects appear only on interactive elements */}
        <div
          ref={badgeRef}
          className={`pointer-events-none flex items-center justify-center transition-[opacity,transform,background-color,border-color] duration-150 ease-out ${
            cursorLabel
              ? 'opacity-100 scale-100 px-3.5 py-1.5 rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)] shadow-xl border border-[var(--border-strong)] translate-y-7'
              : isInteractive
              ? 'opacity-100 scale-100 w-9 h-9 rounded-full border border-[var(--text-primary)]/45 bg-[var(--text-primary)]/[0.04]'
              : 'opacity-0 scale-75 w-6 h-6 rounded-full border border-transparent'
          }`}
        >
          {cursorLabel && (
            <span className="font-mono-tech text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap">
              {cursorLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
