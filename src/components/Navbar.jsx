import { useEffect, useRef, useState } from 'react';

export default function Navbar({ activeSection, onNavClick, theme, onToggleTheme }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  const navItems = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'work', label: 'WORK' },
    { id: 'contact', label: 'CONTACT' },
  ];

  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector(`.nav-link[data-id="${activeSection}"]`);
    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1
      });
    } else {
      setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeSection]);

  // Handle window resizing to keep indicator aligned
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const activeEl = containerRef.current.querySelector(`.nav-link[data-id="${activeSection}"]`);
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeSection]);

  return (
    <header className="header">
      <div className="nav-container">
        <a href="#home" className="logo" onClick={(e) => { e.preventDefault(); onNavClick('home'); }}>
          ANIKET
        </a>

        <nav style={{ position: 'relative' }}>
          <ul className="nav-menu" ref={containerRef}>
            {navItems.map((item) => (
              <li key={item.id}>
                <span
                  data-id={item.id}
                  className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => onNavClick(item.id)}
                >
                  {item.label}
                </span>
              </li>
            ))}
            <div
              className="nav-indicator"
              style={{
                left: `${indicatorStyle.left}px`,
                width: `${indicatorStyle.width}px`,
                opacity: indicatorStyle.opacity,
              }}
            />
          </ul>
        </nav>

        <button
          className="theme-toggle-btn"
          onClick={onToggleTheme}
          aria-label="Toggle theme"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            // Sun icon (click to make light)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            // Moon icon (click to make dark)
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
}
