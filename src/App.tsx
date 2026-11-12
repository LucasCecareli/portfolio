import { RouterProvider, useRouter } from './router';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Certifications } from './pages/Certifications';
import { Resume } from './pages/Resume';
import { Contact } from './pages/Contact';
import { ProjectCaseStudy } from './pages/ProjectCaseStudy';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
    if (currentPath.startsWith('/projetos/')) {
      const projectId = currentPath.replace('/projetos/', '').trim();
      return <ProjectCaseStudy key={`case-${projectId}`} projectId={projectId} />;
    }

    switch (currentPath) {
      case '/sobre':
        return <About key="sobre" />;
      case '/projetos':
        return <Projects key="projetos" />;
      case '/certificacoes':
        return <Certifications key="certificacoes" />;
      case '/curriculo':
        return <Resume key="curriculo" />;
      case '/contato':
        return <Contact key="contato" />;
      case '/':
      default:
        return <Home key="home" />;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative flex flex-col justify-between selection:bg-[var(--accent-bg)] selection:text-[var(--accent-text)]">
      {/* Custom Minimalist Contextual Cursor (Desktop Fine Pointer) */}
      <CustomCursor />

      {/* Persistent Floating Pill Navigation */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RouterProvider>
          <SmoothScroll>
            <AppContent />
          </SmoothScroll>
        </RouterProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
