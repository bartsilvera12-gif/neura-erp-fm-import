'use client';

import Link from 'next/link';
import { rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { TarjetaProducto } from './TarjetaProducto';
import { VerMas } from './VerMas';

/** Fragancias para descubrir y la grilla completa. */
export function Perfumes({ perfumes }: { perfumes: Producto[] }) {
  const conFoto = perfumes.filter((p) => p.foto);
  const destacados = conFoto.filter((p) => p.destacado);
  const descubrir = (destacados.length >= 4 ? destacados : [conFoto[60], conFoto[150], conFoto[280], conFoto[420]]).filter(Boolean).slice(0, 4);

  return (
    <>
      <section className="fondo-negro" data-screen-label="Perfumes · Fragancias para descubrir" style={{ padding: 'clamp(56px,7vw,100px) var(--gutter)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(34px,4vw,60px)', lineHeight: 1 }}>Fragancias para descubrir</h2>
          <div className="descubrir">
            {descubrir.map((p) => (
              <Link key={p.slug} href={rutaProducto(p)} className="descubrir-item">
                <span className="zoom-fondo" />
                <img src={p.foto ?? ''} alt="" className="item-foto" loading="lazy" />
                <span style={{ position: 'absolute', left: 18, right: 18, bottom: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 12 }}>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="item-tipo">{p.categoria}</span>
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
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--texto-3)' }}>{perfumes.length} productos</span>
          </div>
          <VerMas items={perfumes}>
            {(visibles) => (
              <div className="grilla-productos de-4">
                {visibles.map((p) => (
                  <TarjetaProducto key={p.slug} producto={p} />
                ))}
              </div>
            )}
          </VerMas>
        </div>
      </section>
    </>
  );
}
