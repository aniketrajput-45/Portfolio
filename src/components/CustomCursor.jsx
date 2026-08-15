import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState([
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  
  const requestRef = useRef(null);

  useEffect(() => {
    // Check if user is on a touch device
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouch(touchDevice);
    if (touchDevice) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  // Trail rendering loop with fluid spring-lag physics
  useEffect(() => {
    if (isTouch) return;

    const updateTrail = () => {
      setTrail((prev) => {
        const next = [...prev];
        
        // Lead node follows position with ease
        const dx0 = position.x - next[0].x;
        const dy0 = position.y - next[0].y;
        next[0] = { x: next[0].x + dx0 * 0.32, y: next[0].y + dy0 * 0.32 };

        // Successive nodes follow the node immediately in front of them
        for (let i = 1; i < next.length; i++) {
          const dx = next[i - 1].x - next[i].x;
          const dy = next[i - 1].y - next[i].y;
          next[i] = { x: next[i].x + dx * 0.22, y: next[i].y + dy * 0.22 };
        }
        return next;
      });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position, isTouch]);

  // Hover detection logic
  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e) => {
      const target = e.target;
      if (!target) return;

      const interactiveParent = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('.project-item') ||
        target.closest('.skill-card') ||
        target.closest('.hero-interactive') ||
        target.closest('.nav-link') ||
        target.closest('.logo') ||
        target.closest('.social-link-item') ||
        target.getAttribute('role') === 'button';

      setIsHovered(!!interactiveParent);
    };

    window.addEventListener('mouseover', handleMouseOver);
    return () => window.removeEventListener('mouseover', handleMouseOver);
  }, [isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* SVG gooey liquid mercury filter */}
      <svg style={{ position: 'fixed', width: 0, height: 0, pointerEvents: 'none' }} aria-hidden="true">
        <defs>
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -8" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      {/* Background Spotlight Glow */}
      <div 
        className="bg-spotlight"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Custom Core Precise Dot */}
      <div 
        className={`cursor-dot ${isHovered ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Gooey Trail nodes */}
      <div className="cursor-goo-container">
        {trail.map((node, index) => (
          <div
            key={index}
            className={`cursor-trail-node ${isHovered ? 'hover' : ''}`}
            style={{
              left: `${node.x}px`,
              top: `${node.y}px`,
              transform: `translate(-50%, -50%) scale(${1 - index * 0.15})`,
              zIndex: 9998 - index,
            }}
          />
        ))}
      </div>
    </>
  );
}
