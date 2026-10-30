'use client';

import { useState, type ReactNode } from 'react';

/** Listas largas: muestra de a tandas para no cargar 500 fotos de golpe. */
export function VerMas<T>({ items, tanda = 24, children }: { items: T[]; tanda?: number; children: (visibles: T[]) => ReactNode }) {
  const [cantidad, setCantidad] = useState(tanda);
  const resto = items.length - cantidad;

  return (
    <>
      {children(items.slice(0, cantidad))}
      {resto > 0 && (
        <button type="button" className="btn btn-borde-negro" style={{ alignSelf: 'center', marginTop: 16 }} onClick={() => setCantidad((c) => c + tanda)}>
          Ver más ({resto})
        </button>
      )}
    </>
  );
}
