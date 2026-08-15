import { useEffect, useRef, useState } from 'react';

export default function ChromeTorus() {
  const canvasRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });

  // Track mouse coordinates for interactive parallax
  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      targetMouse.current = { x, y };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let width = (canvas.width = 380);
    let height = (canvas.height = 380);

    // Torus Knot (2, 3) Geometry Setup
    const steps = 300;
    const vertices = [];
    const pKnot = 2;
    const qKnot = 3;

    // Generate knot path coordinates
    for (let i = 0; i < steps; i++) {
      const phi = (i / steps) * Math.PI * 2;
      
      // Parametric formulas for a Trefoil Knot
      const rKnot = 2.0 + Math.cos(qKnot * phi);
      const x = rKnot * Math.cos(pKnot * phi) * 42;
      const y = rKnot * Math.sin(pKnot * phi) * 42;
      const z = -Math.sin(qKnot * phi) * 42;

      vertices.push({ x, y, z });
    }

    const fov = 350;
    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008; // Graceful, slower rotation

      // Smooth mouse coordinates tracking (spring inertia)
      mouse.x += (targetMouse.current.x - mouse.x) * 0.06;
      mouse.y += (targetMouse.current.y - mouse.y) * 0.06;

      // Rotations: combine automatic rotation with mouse offsets
      const rotY = time * 0.45 + mouse.x * 0.7;
      const rotX = time * 0.3 + mouse.y * 0.7;
      const rotZ = time * 0.15;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      // Rotate and project each point
      const projected = vertices.map((v) => {
        // 1. Rotate Y-axis
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        let y1 = v.y;

        // 2. Rotate X-axis
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        // 3. Rotate Z-axis
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        // Depth positioning (shift back into view coordinate system)
        const depthZ = z3 + 180;
        
        // Perspective Projection
        const scale = fov / (fov + depthZ);
        const screenX = x3 * scale + width / 2;
        const screenY = y3 * scale + height / 2;

        return {
          x: screenX,
          y: screenY,
          z: depthZ,
          scale,
        };
      });

      // Painter's Algorithm: Depth sort back-to-front to build solid volume overlay
      const sorted = [...projected].sort((a, b) => b.z - a.z);

      // Render overlapping shaded spheres to create a continuous chrome tube
      sorted.forEach((p) => {
        if (p.z <= 0) return;

        // Set radius based on perspective scale (tube thickness)
        const radius = Math.max(1.5, 17 * p.scale);
        
        // Radial gradient simulating phong lighting & environment reflection on metallic surface
        const grad = ctx.createRadialGradient(
          p.x - radius * 0.32, p.y - radius * 0.32, 0,
          p.x, p.y, radius
        );
        
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        if (isLight) {
          // Grayscale chrome under light mode (charcoal/dark metal reflections)
          grad.addColorStop(0, '#ffffff');       // specular reflection highlight
          grad.addColorStop(0.15, '#e5e7eb');    // light silver sheen
          grad.addColorStop(0.5, '#6b7280');     // charcoal body
          grad.addColorStop(0.85, '#1f2937');    // dark core reflection
          grad.addColorStop(1, '#dbdbdb');       // ambient shadow boundary
        } else {
          // Grayscale chrome under dark mode (bright reflective silver metal)
          grad.addColorStop(0, '#ffffff');       // specular reflection highlight
          grad.addColorStop(0.1, '#f3f4f6');     // bright silver highlights
          grad.addColorStop(0.45, '#9ca3af');    // metallic silver body
          grad.addColorStop(0.82, '#171717');    // dark core body
          grad.addColorStop(1, '#09090b');       // deep black boundary edge
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [mouse]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        width: '380px',
        height: '380px',
        maxWidth: '100%',
        filter: 'drop-shadow(0 0 20px rgba(120, 120, 120, 0.12))',
      }}
    />
  );
}
