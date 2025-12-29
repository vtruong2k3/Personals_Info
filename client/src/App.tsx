import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import ThreeBackground from './components/ThreeBackground';
import IntroOverlay from './components/IntroOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import ProjectsPage from './components/ProjectsPage';
import AdminPanel from './components/admin/AdminPanel';
import ThemeToggle from './components/ThemeToggle';
import { AnimatePresence, motion } from 'framer-motion';
import { Home as HomeIcon, BookOpen, Code, User, Mail } from 'lucide-react';

function HomePage({ showContent }: { showContent: boolean }) {
  return (
    <div className={`main-content ${!showContent ? 'hidden' : ''}`}>
      <Hero />
      <About />
      <Projects />
      <Contact />

      <footer className="footer">
        © {new Date().getFullYear()} Dark Futuristic Portfolio. Crafted with passion.
      </footer>
    </div>
  );
}

function Navigation() {
  const location = useLocation();

  const scrollToSection = (sectionId: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link
          to="/"
          className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        >
          <HomeIcon size={20} />
          <span>Home</span>
        </Link>

        <button
          onClick={() => scrollToSection('about')}
          className="nav-link nav-button"
        >
          <User size={20} />
          <span>About</span>
        </button>

        <Link
          to="/projects"
          className={`nav-link ${location.pathname === '/projects' ? 'active' : ''}`}
        >
          <Code size={20} />
          <span>Projects</span>
        </Link>

        <Link
          to="/blogs"
          className={`nav-link ${location.pathname.startsWith('/blog') ? 'active' : ''}`}
        >
          <BookOpen size={20} />
          <span>Blog</span>
        </Link>



        <button
          onClick={() => scrollToSection('contact')}
          className="nav-link nav-button"
        >
          <Mail size={20} />
          <span>Contact</span>
        </button>
      </div>
    </nav>
  );
}

function AppContent() {
  const [showContent, setShowContent] = useState(false);
  const location = useLocation();

  return (
    <div className="app-container">
      {/* 3D Background with Bloom */}
      <ThreeBackground />

      <AnimatePresence>
        {!showContent && location.pathname === '/' && (
          <IntroOverlay key="intro" onComplete={() => setShowContent(true)} />
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navigation />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<HomePage showContent={showContent} />} />
        <Route path="/projects" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ProjectsPage />
          </motion.div>
        } />
        <Route path="/blogs" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Blogs />
          </motion.div>
        } />
        <Route path="/blog/:slug" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BlogDetail />
          </motion.div>
        } />
        <Route path="/admin" element={
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <AdminPanel />
          </motion.div>
        } />
      </Routes>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

