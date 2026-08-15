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

    // Fragment Shader Source (Interactive Liquid Glass/Chrome Shader)
    const fsSource = `
      precision mediump float;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      uniform float u_time;
      uniform float u_theme;

      // Pseudo-random hash helper for simplex-like noise
      vec3 hash(vec3 p) {
        p = vec3(dot(p, vec3(127.1, 311.7, 74.7)),
                 dot(p, vec3(269.5, 183.3, 246.1)),
                 dot(p, vec3(113.5, 271.9, 124.3)));
        return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
      }

      // Value noise algorithm
      float noise(vec3 p) {
        vec3 i = floor(p);
        vec3 f = fract(p);
        vec3 u = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(dot(hash(i + vec3(0.0,0.0,0.0)), f - vec3(0.0,0.0,0.0)),
                           dot(hash(i + vec3(1.0,0.0,0.0)), f - vec3(1.0,0.0,0.0)), u.x),
                       mix(dot(hash(i + vec3(0.0,1.0,0.0)), f - vec3(0.0,1.0,0.0)),
                           dot(hash(i + vec3(1.0,1.0,0.0)), f - vec3(1.0,1.0,0.0)), u.x), u.y),
                   mix(mix(dot(hash(i + vec3(0.0,0.0,1.0)), f - vec3(0.0,0.0,1.0)),
                           dot(hash(i + vec3(1.0,0.0,1.0)), f - vec3(1.0,0.0,1.0)), u.x),
                       mix(dot(hash(i + vec3(0.0,1.0,1.0)), f - vec3(0.0,1.0,1.0)),
                           dot(hash(i + vec3(1.0,1.0,1.0)), f - vec3(1.0,1.0,1.0)), u.x), u.y), u.z);
      }

      // 4-octave Fractional Brownian Motion
      float fbm(vec3 p) {
        float v = 0.0;
        float a = 0.5;
        vec3 shift = vec3(100.0);
        for (int i = 0; i < 4; i++) {
          v += a * noise(p);
          p = p * 2.0 + shift;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        vec2 mouse = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        
        // Mouse coordinate spotlight trigger
        float distToMouse = length(p - mouse);
        float mouseForce = smoothstep(0.6, 0.0, distToMouse);
        
        // Warping coordinates for fluid effect
        vec3 p3 = vec3(p * 1.8, u_time * 0.12);
        
        // Domain warping for liquid movement
        float n1 = fbm(p3);
        float n2 = fbm(p3 + vec3(n1 * 1.2, n1 * 0.8, 0.0) + vec3(mouse * mouseForce * 1.8, 0.0));
        float n3 = fbm(p3 + vec3(n2 * 1.8, n2 * 1.2, 0.05));
        
        // Surface normal calculation from the noise slope
        float eps = 0.02;
        float h_l = fbm(p3 - vec3(eps, 0.0, 0.0));
        float h_r = fbm(p3 + vec3(eps, 0.0, 0.0));
        float h_d = fbm(p3 - vec3(0.0, eps, 0.0));
        float h_u = fbm(p3 + vec3(0.0, eps, 0.0));
        
        // Calculate standard surface normal
        vec3 normal = normalize(vec3(h_l - h_r, h_d - h_u, 0.12));
        
        // Phong reflection vectors
        vec3 lightDir = normalize(vec3(1.0, 1.0, 0.8));
        vec3 viewDir = vec3(0.0, 0.0, 1.0);
        vec3 halfDir = normalize(lightDir + viewDir);
        
        float specular = pow(max(0.0, dot(normal, halfDir)), 32.0); // Wet shiny specularity
        float fresnel = pow(1.0 - max(0.0, dot(normal, viewDir)), 3.5); // Fresnel refraction edges
        
        // Color setups
        vec3 baseColor, accentCoral, accentCyan;
        if (u_theme < 0.5) {
          baseColor = vec3(0.02, 0.02, 0.03); // Obsidian dark
          accentCoral = vec3(1.0, 0.25, 0.0);  // Deep glowing coral
          accentCyan = vec3(0.0, 0.72, 0.95);  // Electric cyan glass
        } else {
          baseColor = vec3(0.96, 0.97, 0.98); // Off-white light
          accentCoral = vec3(1.0, 0.35, 0.1);
          accentCyan = vec3(0.02, 0.57, 0.7);
        }
        
        // Map noise to colors
        vec3 liquidColor = baseColor;
        liquidColor = mix(liquidColor, accentCoral, smoothstep(0.0, 0.6, n3) * (u_theme < 0.5 ? 0.38 : 0.08));
        liquidColor = mix(liquidColor, accentCyan, smoothstep(-0.6, 0.2, n3) * (u_theme < 0.5 ? 0.28 : 0.07));
        
        // Add glass specular shine & refraction rims
        vec3 glassHighlight = vec3(1.0) * (specular * (u_theme < 0.5 ? 0.40 : 0.20));
        vec3 glassRim = (u_theme < 0.5 ? accentCyan : accentCoral) * (fresnel * 0.18);
        
        vec3 finalColor = liquidColor + glassHighlight + glassRim;
        
        // Add custom spotlight glow around cursor
        finalColor += vec3(1.0, 0.3, 0.0) * mouseForce * (u_theme < 0.5 ? 0.08 : 0.02);
        
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

  return <canvas ref={canvasRef} className="particles-canvas" style={{ filter: 'contrast(1.08) brightness(0.98)' }} />;
}
