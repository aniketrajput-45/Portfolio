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

    // Torus Geometry Parameters
    const R = 80;  // Major radius
    const r = 38;  // Minor tube radius
    const thetaSteps = 24;
    const phiSteps = 42;
    const vertices = [];

    // Generate Torus point vertices and normals
    for (let i = 0; i < thetaSteps; i++) {
      const theta = (i / thetaSteps) * Math.PI * 2;
      for (let j = 0; j < phiSteps; j++) {
        const phi = (j / phiSteps) * Math.PI * 2;

        // Position coordinates
        const x = (R + r * Math.cos(theta)) * Math.cos(phi);
        const y = (R + r * Math.cos(theta)) * Math.sin(phi);
        const z = r * Math.sin(theta);

        // Surface normals (used for reflective chrome specular calculations)
        const nx = Math.cos(theta) * Math.cos(phi);
        const ny = Math.cos(theta) * Math.sin(phi);
        const nz = Math.sin(theta);

        vertices.push({ x, y, z, nx, ny, nz, theta, phi });
      }
    }

    const fov = 350;
    const lightSource = { x: 1, y: 1, z: -1 }; // Light source pointing from top-right-front
    
    // Normalize light source vector
    const len = Math.sqrt(lightSource.x ** 2 + lightSource.y ** 2 + lightSource.z ** 2);
    lightSource.x /= len;
    lightSource.y /= len;
    lightSource.z /= len;

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.01;

      // Smooth mouse coordinates tracking (spring inertia)
      mouse.x += (targetMouse.current.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.current.y - mouse.y) * 0.08;

      // Calculate rotations: combine automatic rotation with mouse offsets
      const rotY = time * 0.5 + mouse.x * 0.8;
      const rotX = time * 0.35 + mouse.y * 0.8;
      const rotZ = time * 0.2;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);
      const cosZ = Math.cos(rotZ), sinZ = Math.sin(rotZ);

      // Rotate, project, and shade each vertex
      const projected = vertices.map((v) => {
        // 1. Rotate Y-axis
        let x1 = v.x * cosY - v.z * sinY;
        let z1 = v.x * sinY + v.z * cosY;
        let y1 = v.y;
        
        let nx1 = v.nx * cosY - v.nz * sinY;
        let nz1 = v.nx * sinY + v.nz * cosY;
        let ny1 = v.ny;

        // 2. Rotate X-axis
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;
        
        let ny2 = ny1 * cosX - nz1 * sinX;
        let nz2 = ny1 * sinX + nz1 * cosX;
        let nx2 = nx1;

        // 3. Rotate Z-axis
        let x3 = x2 * cosZ - y2 * sinZ;
        let y3 = x2 * sinZ + y2 * cosZ;
        let z3 = z2;

        let nx3 = nx2 * cosZ - ny2 * sinZ;
        let ny3 = nx2 * sinZ + ny2 * cosZ;
        let nz3 = nz2;

        // Shift depth z so geometry floats in front of camera
        const depthZ = z3 + 200;
        
        // 4. Perspective Projection
        const scale = fov / (fov + depthZ);
        const screenX = x3 * scale + width / 2;
        const screenY = y3 * scale + height / 2;

        // 5. Specular Chrome Shading Calculation (Phong reflection model simulation)
        // Dot product between rotated normals and light source
        const dotProduct = nx3 * lightSource.x + ny3 * lightSource.y + nz3 * lightSource.z;
        const shade = Math.max(0, dotProduct);
        
        // Specular highlight (reflected vector dot viewer vector)
        // Viewer is looking along positive Z direction (0, 0, 1)
        const rx = 2 * dotProduct * nx3 - lightSource.x;
        const ry = 2 * dotProduct * ny3 - lightSource.y;
        const rz = 2 * dotProduct * nz3 - lightSource.z;
        const spec = Math.pow(Math.max(0, rz), 16); // High exponent for sharp metallic chrome reflection

        return {
          x: screenX,
          y: screenY,
          z: depthZ,
          scale,
          shade,
          spec,
        };
      });

      // Depth sort vertices (Painter's algorithm: draw back to front)
      const sorted = [...projected].sort((a, b) => b.z - a.z);

      // Render vertices as chrome point particles
      sorted.forEach((p) => {
        if (p.z <= 0) return;

        // Base color theme HSL values
        // For dark mode, base color is metallic dark silver-blue
        // High specularity blends in bright white light reflections
        const isLight = document.documentElement.getAttribute('data-theme') === 'light';
        
        let r, g, b;
        if (isLight) {
          // Chrome under light mode (reflective silver-gray with bright orange hint)
          r = Math.floor(180 + p.shade * 50 + p.spec * 75);
          g = Math.floor(190 + p.shade * 40 + p.spec * 65);
          b = Math.floor(210 + p.shade * 30 + p.spec * 45);
        } else {
          // Chrome under dark mode (high contrast black metallic with neon violet/coral sheen)
          r = Math.floor(20 + p.shade * 140 + p.spec * 235);
          g = Math.floor(15 + p.shade * 40 + p.spec * 240);
          b = Math.floor(40 + p.shade * 100 + p.spec * 215);
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.5, 2.2 * p.scale), 0, Math.PI * 2);
        ctx.fill();
        
        // Draw tiny glow dot for the specular highlights
        if (p.spec > 0.8) {
          ctx.fillStyle = isLight ? 'rgba(255, 77, 0, 0.4)' : 'rgba(26, 224, 255, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
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
        filter: 'drop-shadow(0 0 20px rgba(255, 77, 0, 0.1))',
      }}
    />
  );
}
