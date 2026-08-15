import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
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

  // Trail rendering loop
  useEffect(() => {
    if (isTouch) return;

    const updateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.16,
          y: prev.y + dy * 0.16,
        };
      });
      requestRef.current = requestAnimationFrame(updateTrail);
    };

    requestRef.current = requestAnimationFrame(updateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position, isTouch]);

  // Hover selector handler
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
      {/* Background Spotlight Glow */}
      <div 
        className="bg-spotlight"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
      
      {/* Custom Cursor Dot */}
      <div 
        className={`cursor-dot ${isHovered ? 'hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />

      {/* Trailing Outer Ring */}
      <div 
        className={`cursor-ring ${isHovered ? 'hover' : ''}`}
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
        }}
      />
    </>
  );
}
