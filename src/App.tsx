import { RouterProvider, useRouter } from './router';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Projects } from './pages/Projects';
import { Certifications } from './pages/Certifications';
import { Resume } from './pages/Resume';
import { Contact } from './pages/Contact';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const { currentPath } = useRouter();

  const renderPage = () => {
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
    <div className="min-h-screen bg-[#07090e] text-slate-100 bg-grid-pattern relative selection:bg-blue-600 selection:text-white flex flex-col justify-between">
      {/* Top subtle radial glow */}
      <div className="fixed top-0 left-0 right-0 h-96 bg-radial-glow pointer-events-none -z-10" />

      {/* Persistent Navigation */}
      <Navbar />

      {/* Dynamic Animated Page Routing */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </main>

      {/* Persistent Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;
