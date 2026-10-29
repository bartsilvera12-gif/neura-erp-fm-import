'use client';

import Link from 'next/link';
import { useState } from 'react';
import { rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { TarjetaProducto } from './TarjetaProducto';

/** Barra de tipos (fija al desplazarse), fragancias para descubrir y la grilla filtrada. */
export function Perfumes({ perfumes }: { perfumes: Producto[] }) {
  const [tipo, setTipo] = useState('Todos');
  const tipos = ['Todos', ...new Set(perfumes.map((p) => p.tipo))];
  const lista = perfumes.filter((p) => tipo === 'Todos' || p.tipo === tipo);
  const descubrir = [perfumes[5], perfumes[2], perfumes[6], perfumes[1]].filter(Boolean);

  return (
    <>
      <div className="barra-tipos fondo-negro">
        <div className="contenedor">
          <span className="rotulo" style={{ color: 'var(--gris)', flex: 'none' }}>Tipo</span>
          {tipos.map((t) => (
            <button key={t} type="button" aria-pressed={tipo === t} onClick={() => setTipo(t)}>
              {t}
            </button>
          ))}
          <span style={{ flex: 'none', width: 1, height: 22, background: 'var(--linea-oscura)' }} />
          <span style={{ flex: 'none', fontSize: 12, color: 'var(--gris)' }}>
            Marca · Presentación · Precio · Disponibilidad: disponibles con el catálogo real
          </span>
        </div>
      </div>

      <section className="fondo-negro" data-screen-label="Perfumes · Fragancias para descubrir" style={{ padding: 'clamp(56px,7vw,100px) var(--gutter)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(34px,4vw,60px)', lineHeight: 1 }}>Fragancias para descubrir</h2>
          <div className="descubrir">
            {descubrir.map((p) => (
              <Link key={p.slug} href={rutaProducto(p)} className="descubrir-item">
                <span className="zoom-fondo" />
                <span className="ph-texto item-foto">{p.foto}</span>
                <span style={{ position: 'absolute', left: 18, right: 18, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="item-tipo">{p.tipo}</span>
                    <span className="item-nombre">{p.nombre}</span>
                  </span>
                  <span style={{ fontSize: 18, color: 'var(--oro)' }}>→</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="fondo-crema" data-screen-label="Perfumes · Todos" style={{ padding: 'clamp(56px,7vw,100px) var(--gutter)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, flexWrap: 'wrap' }}>
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(28px,3vw,44px)' }}>Todos los perfumes</h2>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--texto-3)' }}>{lista.length} productos</span>
          </div>
          <div className="grilla-productos de-4">
            {lista.map((p) => (
              <TarjetaProducto key={p.slug} producto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
