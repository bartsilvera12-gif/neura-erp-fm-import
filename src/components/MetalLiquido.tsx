'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Metal líquido animado en WebGL, adaptado de LiquidMetalShader de 21st.dev con los
 * colores de la marca. Reacciona al puntero sobre el elemento padre, porque el
 * contenido del hero tapa al canvas. Sin WebGL queda el fondo del CSS.
 */
const VERTICES = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENTOS = `
precision highp float;

varying vec2 v_uv;
uniform vec2 u_resolution;
uniform vec2 u_pointer;
uniform float u_pointer_strength;
uniform float u_time;
uniform float u_distortion;
uniform float u_scale;
uniform vec3 u_base;
uniform vec3 u_metal;
uniform vec3 u_highlight;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + 1.0), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float value = 0.0;
  float weight = 0.52;
  mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);
  for (int octave = 0; octave < 4; octave++) {
    value += noise(p) * weight;
    p = rotation * p * 2.03 + 17.17;
    weight *= 0.5;
  }
  return value;
}

float liquidField(vec2 p, float time) {
  vec2 drift = vec2(time * 0.045, -time * 0.032);
  vec2 firstWarp = vec2(
    fbm(p * 0.72 + drift),
    fbm(p * 0.76 + vec2(5.2, 1.3) - drift.yx)
  );
  vec2 secondWarp = vec2(
    fbm(p * 0.78 + firstWarp * 2.7 + vec2(1.7, 9.2) + drift * 1.3),
    fbm(p * 0.74 + firstWarp * 2.5 + vec2(8.3, 2.8) - drift * 1.1)
  );
  return fbm(p * 0.68 + secondWarp * (2.75 * u_distortion));
}

void main() {
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = (v_uv - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0) * u_scale;
  vec2 delta = p - pointer;
  float pointerFalloff = exp(-dot(delta, delta) * 2.6);
  float distanceFromPointer = max(length(delta), 0.001);
  p += (delta / distanceFromPointer) * pointerFalloff * u_distortion * 0.16 * u_pointer_strength;

  float field = liquidField(p, u_time);
  float shadow = smoothstep(0.18, 0.42, field);
  float silver = smoothstep(0.38, 0.64, field);
  float specular = smoothstep(0.60, 0.82, field);
  vec3 color = mix(vec3(0.0), u_base, shadow);
  color = mix(color, u_metal, silver * 0.88);
  color = mix(color, u_highlight, specular * 0.94);

  float softReflection = smoothstep(0.0, 0.13, 0.13 - abs(field - 0.51));
  color = mix(color, u_highlight, softReflection * 0.12);
  color += (hash21(gl_FragCoord.xy + floor(u_time * 12.0)) - 0.5) * 0.004;

  float vignette = 1.0 - smoothstep(0.48, 1.08, length((v_uv - 0.5) * vec2(0.82, 1.0)));
  color *= 0.76 + vignette * 0.24;
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`;

const BASE = [0.078, 0.063, 0.043];
const METAL = [0.56, 0.42, 0.2];
const BRILLO = [0.95, 0.8, 0.48];
const VELOCIDAD = 0.72;
const DISTORSION = 0.6;
const ESCALA = 0.92;
const DENSIDAD = 1;

function compilar(gl: WebGLRenderingContext, tipo: number, fuente: string) {
  const shader = gl.createShader(tipo);
  if (!shader) return null;
  gl.shaderSource(shader, fuente);
  gl.compileShader(shader);
  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) return shader;
  gl.deleteShader(shader);
  return null;
}

export function MetalLiquido() {
  const raiz = useRef<HTMLDivElement>(null);
  const lienzo = useRef<HTMLCanvasElement>(null);
  const [conWebGL, setConWebGL] = useState(true);

  useEffect(() => {
    const div = raiz.current;
    const canvas = lienzo.current;
    const padre = div?.parentElement;
    if (!div || !canvas || !padre) return;
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false });
    if (!gl) return setConWebGL(false);

    const vs = compilar(gl, gl.VERTEX_SHADER, VERTICES);
    const fs = compilar(gl, gl.FRAGMENT_SHADER, FRAGMENTOS);
    const programa = gl.createProgram();
    const buffer = gl.createBuffer();
    if (!vs || !fs || !programa || !buffer) return setConWebGL(false);
    gl.attachShader(programa, vs);
    gl.attachShader(programa, fs);
    gl.linkProgram(programa);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(programa, gl.LINK_STATUS)) return setConWebGL(false);

    gl.useProgram(programa);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const posicion = gl.getAttribLocation(programa, 'a_position');
    gl.enableVertexAttribArray(posicion);
    gl.vertexAttribPointer(posicion, 2, gl.FLOAT, false, 0, 0);

    const u = (nombre: string) => gl.getUniformLocation(programa, nombre);
    gl.uniform1f(u('u_distortion'), DISTORSION);
    gl.uniform1f(u('u_scale'), ESCALA);
    gl.uniform3fv(u('u_base'), BASE);
    gl.uniform3fv(u('u_metal'), METAL);
    gl.uniform3fv(u('u_highlight'), BRILLO);
    const resolucion = u('u_resolution');
    const puntero = u('u_pointer');
    const fuerza = u('u_pointer_strength');
    const tiempo = u('u_time');

    const reducir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let cuadro: number | undefined;
    let transcurrido = 0;
    let ultimo = performance.now();
    let visible = true;
    const p = { x: 0.5, y: 0.5, f: 0, ax: 0.5, ay: 0.5, af: 0 };

    function dibujar(ahora: number) {
      cuadro = undefined;
      const delta = Math.min(Math.max((ahora - ultimo) / 1000, 0), 0.05);
      ultimo = ahora;
      if (!reducir) transcurrido += delta * VELOCIDAD;
      const suavizado = 1 - Math.exp(-delta * 8);
      p.ax += (p.x - p.ax) * suavizado;
      p.ay += (p.y - p.ay) * suavizado;
      p.af += ((reducir ? 0 : p.f) - p.af) * suavizado;

      const caja = div!.getBoundingClientRect();
      const ancho = Math.max(1, Math.round(caja.width * DENSIDAD));
      const alto = Math.max(1, Math.round(caja.height * DENSIDAD));
      if (canvas!.width !== ancho || canvas!.height !== alto) {
        canvas!.width = ancho;
        canvas!.height = alto;
      }
      gl!.viewport(0, 0, ancho, alto);
      gl!.uniform2f(resolucion, ancho, alto);
      gl!.uniform2f(puntero, p.ax, p.ay);
      gl!.uniform1f(fuerza, p.af);
      gl!.uniform1f(tiempo, transcurrido);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      if (visible && !reducir) cuadro = requestAnimationFrame(dibujar);
    }

    function invalidar() {
      if (cuadro !== undefined || !visible) return;
      ultimo = performance.now();
      cuadro = requestAnimationFrame(dibujar);
    }

    function alMover(e: PointerEvent) {
      const caja = div!.getBoundingClientRect();
      p.x = Math.min(Math.max((e.clientX - caja.left) / caja.width, 0), 1);
      p.y = 1 - Math.min(Math.max((e.clientY - caja.top) / caja.height, 0), 1);
      p.f = 1;
      invalidar();
    }

    function alSalir() {
      p.x = 0.5;
      p.y = 0.5;
      p.f = 0;
      invalidar();
    }

    function alPerderContexto(e: Event) {
      e.preventDefault();
      if (cuadro !== undefined) cancelAnimationFrame(cuadro);
      cuadro = undefined;
      setConWebGL(false);
    }

    const tamano = new ResizeObserver(invalidar);
    const enPantalla = new IntersectionObserver(([entrada]) => {
      visible = Boolean(entrada?.isIntersecting);
      if (visible) invalidar();
      else if (cuadro !== undefined) {
        cancelAnimationFrame(cuadro);
        cuadro = undefined;
      }
    });
    tamano.observe(div);
    enPantalla.observe(div);
    padre.addEventListener('pointermove', alMover);
    padre.addEventListener('pointerleave', alSalir);
    canvas.addEventListener('webglcontextlost', alPerderContexto);
    invalidar();

    return () => {
      if (cuadro !== undefined) cancelAnimationFrame(cuadro);
      tamano.disconnect();
      enPantalla.disconnect();
      padre.removeEventListener('pointermove', alMover);
      padre.removeEventListener('pointerleave', alSalir);
      canvas.removeEventListener('webglcontextlost', alPerderContexto);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(programa);
    };
  }, []);

  return (
    <div ref={raiz} aria-hidden="true" className="metal-liquido">
      {conWebGL && <canvas ref={lienzo} />}
    </div>
  );
}
