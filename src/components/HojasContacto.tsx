'use client';

import { Fragment, useRef } from 'react';

/** Alto del encabezado compacto + pestaña: donde se frena cada hoja al apilarse. */
const TOPE = 72 + 36;

/**
 * Contacto en el celular: tres hojas que se apilan como fichas al desplazarse.
 * Tocar una pestaña lleva hasta esa hoja.
 */
export function HojasContacto({ hojas }: { hojas: { pestana: string; fondo: string; color: string; contenido: React.ReactNode }[] }) {
  const anclas = useRef<(HTMLDivElement | null)[]>([]);

  const ir = (i: number) => {
    const el = anclas.current[i];
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - TOPE - i * 8 + 1, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', maxWidth: 1528, margin: 'clamp(40px,5vw,72px) auto 0', padding: '0 16px' }}>
      {/* Sin envoltorio por hoja: el sticky necesita que todas compartan este contenedor */}
      {hojas.map((h, i) => (
        <Fragment key={h.pestana}>
          <div ref={(el) => { anclas.current[i] = el; }} style={{ height: 0 }} />
          <div className="hoja" style={{ top: TOPE + i * 8, zIndex: i + 1, background: h.fondo, color: h.color, marginTop: i ? 56 : 36 }}>
            <button type="button" className="hoja-pestana" onClick={() => ir(i)} style={{ left: `calc(16px + ${i} * (100% - 32px) / 3)` }}>
              {h.pestana}
            </button>
            {h.contenido}
          </div>
        </Fragment>
      ))}
    </div>
  );
}
