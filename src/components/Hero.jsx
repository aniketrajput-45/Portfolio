import { useState } from 'react';
import ChromeTorus from './ChromeTorus';

export default function Hero({ onNavClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section id="home" className="content-section">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag">JAVA &middot; MERN &middot; DSA</div>
          
          <h1 className="hero-name-wrap">
          <span className="hero-word-line">
            <span className="hero-word">ANIKET</span>
            <span className="hero-word">KUMAR</span>
          </span>
          <span className="hero-word-line">
            <span className="hero-word secondary">SINGH</span>
          </span>
        </h1>
        
        <div className="hero-title-wrap">
          <h2 className="hero-title">Turning complexity into beautiful simplicity.</h2>
        </div>
        
        <div className="hero-sub-wrap">
          <p className="hero-sub">
            Full Stack Developer building clean digital products that combine clarity, consistency, and craft. From robust backends to interactive interfaces, I construct cohesive software ecosystems.
          </p>
        </div>

          <div 
            className="hero-interactive"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            role="button"
            tabIndex={0}
            style={{ marginBottom: '3rem' }}
          >
            <span className="hover-me">
              {isHovered ? '// active' : '// hover me'}
            </span>
            <span className="meme-text">
              {isHovered 
                ? 'Debugging life with meme patches. 🩹' 
                : 'What goes on behind the scenes?'}
            </span>
          </div>

          <div>
            <button 
              className="btn-primary" 
              onClick={() => onNavClick('work')}
              style={{ padding: '16px 32px', borderRadius: '12px', fontSize: '1.05rem' }}
            >
              Discover my work
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{ marginLeft: '8px', verticalAlign: 'middle' }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <ChromeTorus />
        </div>
      </div>
    </section>
  );
}
