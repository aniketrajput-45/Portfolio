import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer({ onNavClick }) {
  const [time, setTime] = useState('');
  const footerRef = useRef(null);

  // Live timezone clock
  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      const formatter = new Intl.DateTimeFormat([], options);
      setTime(formatter.format(new Date()));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP ScrollTrigger for giant text reveal
  useEffect(() => {
    const chars = gsap.utils.toArray('.footer-char');
    const anim = gsap.fromTo(chars, 
      { y: '100%', rotate: 4 },
      {
        y: '0%',
        rotate: 0,
        stagger: 0.015,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          end: 'bottom bottom',
          scrub: 1.5,
        }
      }
    );

    return () => {
      if (anim.scrollTrigger) anim.scrollTrigger.kill();
      anim.kill();
    };
  }, []);

  const name = "ANIKET KUMAR SINGH";

  return (
    <footer className="footer-section" id="footer" ref={footerRef}>
      <div className="footer-container">
        <div className="footer__wrapper">
          
          {/* Main contact links */}
          <div className="footer-contact-row">
            <a href="mailto:rajputaniket7234@gmail.com" className="footer-email footer-line-animation">
              rajputaniket7234@gmail.com
            </a>
          </div>

          {/* Social connections */}
          <div className="footer__social">
            <a href="https://github.com/aniketrajput-45" target="_blank" rel="noopener noreferrer" className="link-line">
              github
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginLeft: '6px', verticalAlign: 'middle' }}>
                <path d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/aniket-kumar-singh-ba572b370/" target="_blank" rel="noopener noreferrer" className="link-line">
              linkedin
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 21 21" fill="none" style={{ marginLeft: '6px', verticalAlign: 'middle' }}>
                <path d="M1.81213 19.1203L19.4395 1.43779M5.76584 1.24781L19.6484 1.2279L19.6922 15.1104" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>

          {/* Pages and physical location */}
          <div className="footer-pages-location">
            <div className="footer-pages">
              <span onClick={() => onNavClick('about')} className="footer-nav-link">[ ABOUT ME ]</span>
              <span onClick={() => onNavClick('skills')} className="footer-nav-link">[ SERVICES ]</span>
              <span onClick={() => onNavClick('work')} className="footer-nav-link">[ WORKS ]</span>
            </div>
            <div className="footer-location">
              <p>Address:</p>
              <p>Bihar, India</p>
            </div>
          </div>

          {/* Large visual header title split into spans */}
          <h2 className="footer-title">
            {name.split("").map((char, index) => (
              <span key={index} className="footer-char-wrapper">
                <span className="footer-char">
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h2>

          {/* Bottom metadata details row */}
          <div className="footer-reserved">
            <div className="footer-reserved__time">
              {time} IST (INDIA)
            </div>
            <div className="footer-reserved__dev">
              development - <span>ANIKET</span>
            </div>
            <div className="footer-reserved__reserved">
              &copy; 2026 All right reserved. Aniket Kumar Singh
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
