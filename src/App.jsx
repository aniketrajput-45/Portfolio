import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import ParticlesBackground from './components/ParticlesBackground';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Work from './components/Work';
import Contact from './components/Contact';
import ProjectModal from './components/ProjectModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Sync theme with HTML attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Tracking page scroll percentage for timeline fill
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy & Scroll fade-in / block reveal animations
  useEffect(() => {
    const sections = document.querySelectorAll('.content-section');
    
    // Observer for Scrollspy
    const spyOptions = {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    };

    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, spyOptions);

    // Observer for Fade-in & Block Reveal animations
    const animationOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.05
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // Trigger any block-reveal elements inside this section
          const reveals = entry.target.querySelectorAll('.block-reveal');
          reveals.forEach((el) => el.classList.add('is-visible'));

          animationObserver.unobserve(entry.target); // Animates only once
        }
      });
    }, animationOptions);

    sections.forEach((section) => {
      spyObserver.observe(section);
      
      // Initialize layout fade-in classes
      section.classList.add('fade-in-section');
      animationObserver.observe(section);
    });

    return () => {
      spyObserver.disconnect();
      animationObserver.disconnect();
    };
  }, []);

  return (
    <div className="app-container">
      <CustomCursor />
      <ParticlesBackground />
      
      {/* Yasio vertical track indicator */}
      <div className="timeline-track-container">
        <div className="timeline-track-fill" style={{ height: `${scrollProgress}%` }}></div>
      </div>

      <Navbar 
        activeSection={activeSection} 
        onNavClick={handleNavClick} 
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero onNavClick={handleNavClick} />
        <About />
        <Skills />
        <Work onSelectProject={setSelectedProject} />
        <Contact />
      </main>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">ANIKET KUMAR SINGH &copy; 2026</div>
          <div style={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>
            Built with React &amp; CSS Variables
          </div>
        </div>
      </footer>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </div>
  );
}
