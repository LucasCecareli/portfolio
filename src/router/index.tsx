import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type RoutePath =
  | '/'
  | '/sobre'
  | '/projetos'
  | '/certificacoes'
  | '/curriculo'
  | '/contato'
  | string;

interface RouterContextType {
  currentPath: string;
  activeSection: string;
  setActiveSection: (section: string) => void;
  navigate: (to: string, options?: { sectionId?: string }) => void;
  scrollToSection: (sectionId: string) => void;
}

const RouterContext = createContext<RouterContextType>({
  currentPath: typeof window !== 'undefined' ? window.location.pathname || '/' : '/',
  activeSection: 'home',
  setActiveSection: () => {},
  navigate: () => {},
  scrollToSection: () => {},
});

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname || '/' : '/'
  );
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    if (sectionId === 'home') {
      setActiveSection('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      setActiveSection(sectionId);
      const headerOffset = sectionId === 'about' ? 0 : 72;
      const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - headerOffset);
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  const navigate = useCallback(
    (to: string, options?: { sectionId?: string }) => {
      if (options?.sectionId) {
        if (currentPath === '/') {
          scrollToSection(options.sectionId);
          return;
        }
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        const targetId = options.sectionId;
        let attempts = 0;
        const tryScroll = () => {
          attempts += 1;
          const el = targetId === 'home' ? document.body : document.getElementById(targetId);
          if (el || attempts >= 8) {
            scrollToSection(targetId);
          } else {
            window.setTimeout(tryScroll, 70);
          }
        };
        window.setTimeout(tryScroll, 90);
        return;
      }

      if (to !== currentPath) {
        window.history.pushState({}, '', to);
        setCurrentPath(to);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (to === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    },
    [currentPath, scrollToSection]
  );

  return (
    <RouterContext.Provider
      value={{
        currentPath,
        activeSection,
        setActiveSection,
        navigate,
        scrollToSection,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => useContext(RouterContext);

interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'className'> {
  to: string;
  sectionId?: string;
  children: React.ReactNode;
  className?: string | ((props: { isActive: boolean }) => string);
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({
  to,
  sectionId,
  children,
  className,
  onClick,
  ...rest
}) => {
  const { currentPath, navigate } = useRouter();
  const isActive = currentPath === to;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    navigate(to, sectionId ? { sectionId } : undefined);
    onClick?.();
  };

  const computedClassName = typeof className === 'function' ? className({ isActive }) : className;

  return (
    <a href={to} onClick={handleClick} className={computedClassName} {...rest}>
      {children}
    </a>
  );
};
