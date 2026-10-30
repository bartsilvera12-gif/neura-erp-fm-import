'use client';

import Link from 'next/link';
import { useState } from 'react';
import { formatoPrecio, rutaCategoria, type Producto } from '@/lib/catalogo/tipos';
import { ACENTO_VERDE, enlaceWhatsapp } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { mensajeProducto } from '@/lib/tienda/mensajes';
import { TarjetaProducto } from './TarjetaProducto';

export function DetalleProducto({ producto: p, relacionados }: { producto: Producto; relacionados: Producto[] }) {
  const { agregar, vivo } = useTienda();
  const { precio, disponible } = vivo(p);
  const [cantidad, setCantidad] = useState(1);

  return (
    <section className="fondo-marfil" data-screen-label="Detalle de producto" style={{ padding: 'clamp(20px,3vw,40px) var(--gutter) clamp(56px,7vw,100px)' }}>
      <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <nav aria-label="Ruta" style={{ display: 'flex', gap: 10, flexWrap: 'wrap', fontSize: 12.5, color: 'var(--texto-3)' }}>
          <Link href="/catalogo/" style={{ textDecoration: 'none' }}>Catálogo</Link>
          <span>/</span>
          <Link href={rutaCategoria(p.categoria)} style={{ textDecoration: 'none' }}>{p.categoria}</Link>
          <span>/</span>
          <span style={{ color: 'var(--negro)' }} aria-current="page">{p.nombre}</span>
        </nav>

        <div className="ficha">
          <div className="ph ph-claro" style={{ aspectRatio: '4 / 5' }}>
            <img src={p.foto} alt={p.nombre} className="foto-img" style={{ objectFit: 'contain' }} />
          </div>

          <div className="sticky-escritorio" style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'sticky', top: 110 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(38px,4.4vw,68px)', lineHeight: 0.98, letterSpacing: '-.015em' }}>{p.nombre}</h1>
              <span style={{ fontSize: 14, color: 'var(--texto-2)' }}>{p.categoria}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
              <div className="fila-ficha"><span style={{ color: 'var(--texto-3)' }}>Precio</span><span style={{ fontWeight: 600 }}>{formatoPrecio(precio)}</span></div>
              <div className="fila-ficha"><span style={{ color: 'var(--texto-3)' }}>Disponibilidad</span><span>{disponible ? 'Disponible' : 'Sin stock'}</span></div>
              {p.presentacion && <div className="fila-ficha"><span style={{ color: 'var(--texto-3)' }}>Presentación</span><span>{p.presentacion}</span></div>}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'stretch' }}>
              <div className="contador" style={{ borderColor: 'var(--negro)' }}>
                <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar" style={{ width: 48, height: 54 }}>−</button>
                <span>{cantidad}</span>
                <button type="button" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar" style={{ width: 48, height: 54 }}>+</button>
              </div>
              <button type="button" disabled={!disponible} className="btn btn-negro" style={{ flex: 1, minWidth: 200, height: 56 }} onClick={() => agregar(p.slug, cantidad, p.nombre)}>
                {disponible ? 'Agregar al carrito' : 'Sin stock'}
              </button>
            </div>
            <a href={enlaceWhatsapp(mensajeProducto(p, cantidad))} target="_blank" rel="noopener" className="btn btn-borde-negro" style={{ height: 54 }}>
              {ACENTO_VERDE && <span className="punto-verde" />}
              Consultar por WhatsApp
            </a>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--texto-3)' }}>
              Sin pagos en línea. Tu pedido queda sujeto a confirmación comercial de FM Importados.
            </p>
          </div>
        </div>

        {relacionados.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginTop: 'clamp(48px,6vw,96px)' }}>
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(28px,3vw,44px)' }}>También en {p.categoria}</h2>
            <div className="grilla-productos de-4">
              {relacionados.map((r) => (
                <TarjetaProducto key={r.slug} producto={r} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
