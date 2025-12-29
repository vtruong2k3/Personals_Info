import { useState } from 'react';
import ThreeBackground from './components/ThreeBackground';
import IntroOverlay from './components/IntroOverlay';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import ThemeToggle from './components/ThemeToggle';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [showContent, setShowContent] = useState(false);

  return (
    <div className="app-container">
      {/* 3D Background with Bloom */}
      <ThreeBackground />

      <AnimatePresence>
        {!showContent && (
          <IntroOverlay key="intro" onComplete={() => setShowContent(true)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className={`main-content ${!showContent ? 'hidden' : ''}`}>
        <Hero />
        <About />
        <Projects />
        <Contact />

        <footer className="footer">
          © {new Date().getFullYear()} Dark Futuristic Portfolio. Crafted with passion.
        </footer>
      </div>

      {/* Theme Toggle */}
      <ThemeToggle />
    </div>
  );
}

export default App;
