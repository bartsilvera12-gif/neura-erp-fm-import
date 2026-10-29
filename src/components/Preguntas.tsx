'use client';

import { useState } from 'react';
import { Pendiente } from './Pendiente';

export interface Pregunta {
  q: string;
  a: string;
  /** Respuesta que depende de una política que el cliente todavía no definió. */
  pendiente?: boolean;
}

export function Preguntas({ preguntas }: { preguntas: Pregunta[] }) {
  const [abierta, setAbierta] = useState(0);
  return (
    <div className="faq-lista" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
      {preguntas.map((p, i) => {
        const abre = abierta === i;
        return (
          <div key={p.q} className="pregunta" style={{ borderBottom: '1px solid var(--linea-clara)' }}>
            <button type="button" aria-expanded={abre} aria-controls={`respuesta-${i}`} onClick={() => setAbierta(abre ? -1 : i)}>
              <span className="serif" style={{ fontSize: 'clamp(21px,2vw,28px)', lineHeight: 1.2 }}>{p.q}</span>
              <span className="pregunta-mas">+</span>
            </button>
            <div id={`respuesta-${i}`} className={abre ? 'respuesta abierta' : 'respuesta'}>
              <div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '0 0 26px', maxWidth: 640 }}>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#4d4941' }}>{p.a}</p>
                  {p.pendiente && <Pendiente>Política pendiente de confirmación</Pendiente>}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
