import { useEffect, useRef, useState } from 'react';

export default function PhysicsCanvas() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = 360);

    const handleResize = () => {
      width = canvas.width = container.offsetWidth;
      height = canvas.height = 360;
    };

    window.addEventListener('resize', handleResize);

    // Mouse coordinates tracker
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouse.current = { x: -1000, y: -1000 };
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Skill Badge Labels
    const skills = [
      'Java', 'MERN Stack', 'React.js', 'Node.js', 'Express', 
      'DSA', 'OOP', 'MongoDB', 'MySQL', 'Git', 'GitHub', 'VS Code', 'Postman'
    ];

    // Physics Engine Rigid Bodies
    const bodies = skills.map((skill, index) => {
      // Calculate dimensions based on text length
      const paddingX = 22;
      const paddingY = 10;
      
      // Approximate text width using font measurements
      const textWidth = skill.length * 9 + 10;
      const bWidth = textWidth + paddingX * 2;
      const bHeight = 15 + paddingY * 2;

      return {
        label: skill,
        w: bWidth,
        h: bHeight,
        radius: Math.max(bWidth, bHeight) / 2, // Approximate collision radius
        x: Math.random() * (width - bWidth) + bWidth / 2,
        y: Math.random() * -150 - bHeight, // Spawn above screen
        vx: (Math.random() - 0.5) * 4,
        vy: Math.random() * 2 + 1,
        mass: bWidth * bHeight,
      };
    });

    const gravity = 0.28;
    const friction = 0.985;
    const bounce = 0.52; // restitution bounciness

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const isLight = document.documentElement.getAttribute('data-theme') === 'light';

      // 1. Update velocities and positions
      bodies.forEach((b) => {
        b.vy += gravity;
        b.vx *= friction;
        b.vy *= friction;

        b.x += b.vx;
        b.y += b.vy;

        // 2. Boundary Collisions (Walls & Floor)
        // Left wall
        if (b.x - b.w / 2 < 0) {
          b.x = b.w / 2;
          b.vx = -b.vx * bounce;
        }
        // Right wall
        if (b.x + b.w / 2 > width) {
          b.x = width - b.w / 2;
          b.vx = -b.vx * bounce;
        }
        // Floor
        if (b.y + b.h / 2 > height) {
          b.y = height - b.h / 2;
          b.vy = -b.vy * bounce;
          b.vx *= 0.9; // Extra friction on floor slide
        }
        // Ceiling
        if (b.y - b.h / 2 < 0) {
          b.y = b.h / 2;
          b.vy = -b.vy * bounce;
        }

        // 3. Mouse Interaction (Repulsion force)
        const dx = b.x - mouse.current.x;
        const dy = b.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const effectRadius = 110;

        if (dist < effectRadius) {
          const force = (effectRadius - dist) * 0.15;
          const angle = Math.atan2(dy, dx);
          // Apply repulsion acceleration
          b.vx += Math.cos(angle) * force * 0.08;
          b.vy += Math.sin(angle) * force * 0.08;
        }
      });

      // 4. Rigid Body Collisions (Elastic overlap resolution)
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist && dist > 0) {
            // Overlap depth resolution
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push bodies apart proportionally to prevent embedding
            b1.x -= nx * overlap * 0.5;
            b1.y -= ny * overlap * 0.5;
            b2.x += nx * overlap * 0.5;
            b2.y += ny * overlap * 0.5;

            // Compute relative velocity in normal direction
            const rvx = b2.vx - b1.vx;
            const rvy = b2.vy - b1.vy;
            const velAlongNormal = rvx * nx + rvy * ny;

            // Swap velocities if they are moving towards each other
            if (velAlongNormal < 0) {
              const impulse = -(1 + bounce) * velAlongNormal / (1 / b1.mass + 1 / b2.mass);
              const ix = impulse * nx;
              const iy = impulse * ny;

              b1.vx -= (1 / b1.mass) * ix;
              b1.vy -= (1 / b1.mass) * iy;
              b2.vx += (1 / b2.mass) * ix;
              b2.vy += (1 / b2.mass) * iy;
            }
          }
        }
      }

      // 5. Draw Bodies
      bodies.forEach((b) => {
        // Draw capsules
        ctx.beginPath();
        const rad = b.h / 2;
        ctx.roundRect(b.x - b.w / 2, b.y - b.h / 2, b.w, b.h, rad);

        if (isLight) {
          ctx.fillStyle = '#ffffff';
          ctx.strokeStyle = '#101010';
        } else {
          ctx.fillStyle = '#151515';
          ctx.strokeStyle = '#262626';
        }
        
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();

        // Draw label text
        ctx.fillStyle = isLight ? '#101010' : '#f7f7f7';
        ctx.font = '13px "Spline Sans Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x, b.y + 1); // Slight vertical offset alignment
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div ref={containerRef} style={{ width: '100%', position: 'relative' }}>
      <div 
        style={{
          fontFamily: '"Spline Sans Mono", monospace',
          fontSize: '0.75rem',
          color: 'var(--text-secondary)',
          textTransform: 'uppercase',
          marginBottom: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>[ Skills Interactive Physics Sandbox ]</span>
        <span>Hover cursor to scatter badges</span>
      </div>
      <canvas 
        ref={canvasRef} 
        style={{ 
          border: '1px solid var(--border)',
          borderRadius: '12px',
          background: 'var(--surface)',
          display: 'block',
          cursor: 'grab',
        }} 
      />
    </div>
  );
}
