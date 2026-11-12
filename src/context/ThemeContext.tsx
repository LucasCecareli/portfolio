import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';

export type ThemeMode = 'dark' | 'light';

interface ThemeContextValue {
  theme: ThemeMode;
  isTransitioning: boolean;
  toggleTheme: (event?: React.MouseEvent<HTMLElement>) => void;
  setTheme: (next: ThemeMode, event?: React.MouseEvent<HTMLElement>) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'dark',
  isTransitioning: false,
  toggleTheme: () => {},
  setTheme: () => {},
});

const STORAGE_KEY = 'portfolio-theme';

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'dark';
  try {
    const domTheme = document.documentElement.getAttribute('data-theme');
    if (domTheme === 'light' || domTheme === 'dark') return domTheme;
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
  } catch {
    // fallback
  }
  return 'dark';
}

function applyThemeToDOM(mode: ThemeMode) {
  const root = document.documentElement;
  root.setAttribute('data-theme', mode);
  root.style.colorScheme = mode;
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', mode === 'dark' ? '#090909' : '#F8F8F6');
  }
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const lockRef = useRef(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    applyThemeToDOM(theme);
  }, [theme]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const performThemeChange = useCallback(
    (nextTheme: ThemeMode, event?: React.MouseEvent<HTMLElement>) => {
      if (lockRef.current || nextTheme === theme) return;

      const prefersReducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      try {
        localStorage.setItem(STORAGE_KEY, nextTheme);
      } catch {
        // ignore storage quota errors
      }

      if (prefersReducedMotion) {
        applyThemeToDOM(nextTheme);
        setThemeState(nextTheme);
        return;
      }

      lockRef.current = true;
      setIsTransitioning(true);

      // Determine origin coordinates for radial reveal (default to top-right header area)
      let x = window.innerWidth - 64;
      let y = 36;
      if (event && event.currentTarget) {
        const rect = event.currentTarget.getBoundingClientRect();
        x = rect.left + rect.width / 2;
        y = rect.top + rect.height / 2;
      } else if (event && typeof event.clientX === 'number' && event.clientX > 0) {
        x = event.clientX;
        y = event.clientY;
      }

      const maxRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const docWithVT = document as Document & {
        startViewTransition?: (cb: () => void) => {
          ready: Promise<void>;
          finished: Promise<void>;
        };
      };

      const unlock = () => {
        lockRef.current = false;
        setIsTransitioning(false);
        document.documentElement.classList.remove('theme-transitioning');
      };

      if (typeof docWithVT.startViewTransition === 'function') {
        try {
          const transition = docWithVT.startViewTransition(() => {
            applyThemeToDOM(nextTheme);
            setThemeState(nextTheme);
          });

          transition.ready
            .then(() => {
              document.documentElement.animate(
                {
                  clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${Math.ceil(maxRadius)}px at ${x}px ${y}px)`,
                  ],
                },
                {
                  duration: 1020,
                  easing: 'cubic-bezier(0.76, 0, 0.24, 1)',
                  pseudoElement: '::view-transition-new(root)',
                }
              );
            })
            .catch(() => {
              // Fallback if pseudoElement animation is interrupted
            });

          transition.finished.finally(() => {
            unlock();
          });
          return;
        } catch {
          // Fallback to progressive CSS interpolation below
        }
      }

      // Progressive CSS custom property interpolation fallback (950ms)
      document.documentElement.classList.add('theme-transitioning');
      applyThemeToDOM(nextTheme);
      setThemeState(nextTheme);

      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => {
        unlock();
      }, 980);
    },
    [theme]
  );

  const toggleTheme = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      const next: ThemeMode = theme === 'dark' ? 'light' : 'dark';
      performThemeChange(next, event);
    },
    [theme, performThemeChange]
  );

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isTransitioning,
        toggleTheme,
        setTheme: performThemeChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
