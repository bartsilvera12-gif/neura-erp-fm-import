'use client';

import Script from 'next/script';
import { useEffect, useRef } from 'react';

/**
 * El frasco que rocía al tocarlo o al desplazarse. Es el custom element
 * <perfume-spray>, basado en el del prototipo, en public/frasco-perfume.js.
 * Se crea a mano porque React no tiene que manejar lo que pasa adentro.
 */
export function FrascoPerfume() {
  const caja = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.createElement('perfume-spray');
    el.style.cssText = 'position:absolute;inset:0';
    caja.current?.appendChild(el);
    return () => el.remove();
  }, []);

  return (
    <>
      <Script src="/frasco-perfume.js" strategy="afterInteractive" />
      <div ref={caja} style={{ position: 'absolute', inset: 0 }} />
    </>
  );
}
