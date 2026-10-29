'use client';

import Link from 'next/link';
import { useState } from 'react';
import { etiquetaPrecio, rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { useTienda } from '@/lib/tienda/contexto';

export function etiquetaAgregar(mayorista: boolean, enLista: boolean) {
  if (mayorista) return enLista ? 'Sumar a cotización' : 'Añadir a cotización';
  return enLista ? 'Sumar a mi consulta' : 'Agregar a mi consulta';
}

/** En modo mayorista la tarjeta deja elegir cantidad antes de sumar. */
export function TarjetaProducto({ producto: p, mayorista = false }: { producto: Producto; mayorista?: boolean }) {
  const { agregar, tiene } = useTienda();
  const [cantidad, setCantidad] = useState(1);
  const href = rutaProducto(p);

  return (
    <article className="tarjeta">
      <Link href={href} aria-label={p.nombre} className="tarjeta-foto">
        <div className="ph ph-claro">
          <span className="ph-texto" style={{ fontSize: 10.5, letterSpacing: '.06em' }}>{p.foto}</span>
        </div>
        <div className="ph ph-claro-b">
          <span className="ph-texto" style={{ fontSize: 10.5, letterSpacing: '.06em' }}>Segunda foto · detalle</span>
        </div>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        <span className="rotulo">{p.marca}</span>
        <Link href={href} className="tarjeta-nombre">{p.nombre}</Link>
        <span style={{ fontSize: 13, color: 'var(--texto-3)' }}>{p.presentacion}</span>
      </div>
      {mayorista && (
        <div className="contador">
          <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar">−</button>
          <span style={{ fontSize: 14 }}>{cantidad}</span>
          <button type="button" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar">+</button>
        </div>
      )}
      <div className="tarjeta-pie">
        <span style={{ fontSize: 13, fontWeight: 600 }}>{etiquetaPrecio(p)}</span>
        <button type="button" className="btn-texto" onClick={() => agregar(p.slug, mayorista ? cantidad : 1, p.nombre)}>
          {etiquetaAgregar(mayorista, tiene(p.slug))}
        </button>
      </div>
    </article>
  );
}
