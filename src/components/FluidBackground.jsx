import { useEffect, useRef } from 'react';

export default function FluidBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.warn('WebGL not supported');
      return;
    }

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2 };
    let currentMouse = { x: width / 2, y: height / 2 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = height - e.clientY; // Flip Y for WebGL coordinates
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      gl.viewport(0, 0, width, height);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source (Liquid Aurora Shader)
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_theme; // 0 for dark, 1 for light

      float wave(vec2 p, float angle, float scale, float speed) {
        float a = angle * 0.01745329;
        vec2 dir = vec2(cos(a), sin(a));
        return sin(dot(p, dir) * scale + u_time * speed);
      }

      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        
        float distToMouse = length(p - mouse);
        float mouseForce = smoothstep(0.7, 0.0, distToMouse);
        
        // Liquid Domain Warping
        p.x += sin(p.y * 1.8 + u_time * 0.4) * 0.18 + mouseForce * (p.x - mouse.x) * 0.35;
        p.y += cos(p.x * 1.8 + u_time * 0.3) * 0.18 + mouseForce * (p.y - mouse.y) * 0.35;
        
        float w1 = wave(p, 40.0, 1.2, 0.35);
        float w2 = wave(p, 130.0, 1.8, 0.25);
        float w3 = wave(p, 230.0, 1.0, 0.5);
        float mixWave = (w1 + w2 + w3) / 3.0;
        
        // Themes Color Palettes
        vec3 color1, color2, base;
        
        if (u_theme < 0.5) {
          // Obsidian Dark Theme
          color1 = vec3(1.0, 0.3, 0.0);   // Coral Orange
          color2 = vec3(0.05, 0.72, 0.9); // Electric Cyan
          base = vec3(0.03, 0.03, 0.04);   // Obsidian Black
        } else {
          // Slate Light Theme
          color1 = vec3(1.0, 0.35, 0.1);  // Slightly softer coral
          color2 = vec3(0.02, 0.57, 0.7);  // Soft cyan
          base = vec3(0.97, 0.98, 0.99);   // Off-white
        }
        
        vec3 finalColor = base;
        
        // Layer gradient flows
        finalColor = mix(finalColor, color1, smoothstep(-0.5, 0.5, mixWave) * (u_theme < 0.5 ? 0.20 : 0.06));
        finalColor = mix(finalColor, color2, smoothstep(-0.5, 0.5, -mixWave) * (u_theme < 0.5 ? 0.16 : 0.05));
        
        // Spotlight glow effect
        if (u_theme < 0.5) {
          finalColor += vec3(1.0, 0.3, 0.0) * mouseForce * 0.06;
        } else {
          finalColor += vec3(0.02, 0.57, 0.7) * mouseForce * 0.02;
        }
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compilation helper
    const createShader = (gl, type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Quad geometry covering screen
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resLoc = gl.getUniformLocation(program, 'u_resolution');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const themeLoc = gl.getUniformLocation(program, 'u_theme');

    let startTime = performance.now();

    const render = () => {
      const time = (performance.now() - startTime) * 0.001;
      
      // Interpolate mouse coordinates to smooth movement (inertia)
      currentMouse.x += (mouse.x - currentMouse.x) * 0.08;
      currentMouse.y += (mouse.y - currentMouse.y) * 0.08;

      gl.uniform2f(resLoc, width, height);
      gl.uniform2f(mouseLoc, currentMouse.x, currentMouse.y);
      gl.uniform1f(timeLoc, time);

      // Detect theme status from HTML attribute
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      gl.uniform1f(themeLoc, isLight ? 1.0 : 0.0);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-canvas" style={{ filter: 'contrast(1.05)' }} />;
}
