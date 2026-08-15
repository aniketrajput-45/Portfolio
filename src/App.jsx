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
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulated Olha-style loader count progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 400); // slight pause at 100%
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4; // organic speed loading
        return Math.min(prev + step, 100);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

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
    if (!isLoaded) return;
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
      rootMargin: '0px 0px -20px 0px', // More forgiving trigger boundary
      threshold: 0
    };

    const animationObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          const reveals = entry.target.querySelectorAll('.block-reveal');
          reveals.forEach((el) => el.classList.add('is-visible'));

          animationObserver.unobserve(entry.target);
        }
      });
    }, animationOptions);

    // Check if element is in viewport on page load
    const checkInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
      );
    };

    // Run layout initialization with a tiny delay to ensure browser reflow has completed
    const timer = setTimeout(() => {
      sections.forEach((section) => {
        spyObserver.observe(section);
        
        // Exclude the hero section from the initial fade-in hide state so above-the-fold content is instantly visible
        if (section.id === 'home') {
          section.classList.add('is-visible');
          const reveals = section.querySelectorAll('.block-reveal');
          reveals.forEach((el) => el.classList.add('is-visible'));
        } else {
          section.classList.add('fade-in-section');
          
          if (checkInViewport(section)) {
            section.classList.add('is-visible');
            const reveals = section.querySelectorAll('.block-reveal');
            reveals.forEach((el) => el.classList.add('is-visible'));
          } else {
            animationObserver.observe(section);
          }
        }
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      spyObserver.disconnect();
      animationObserver.disconnect();
    };
  }, [isLoaded]);

  return (
    <>
      {/* Olha-style Typographic Preloader overlay */}
      {!isLoaded && (
        <div className={`loader-overlay ${loadingProgress === 100 ? 'fade-out' : ''}`}>
          <div className="loader-counter">
            {String(loadingProgress).padStart(3, '0')}%
          </div>
        </div>
      )}

      <div className={`app-container ${isLoaded ? 'is-loaded' : ''}`}>
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
  </>
  );
}
