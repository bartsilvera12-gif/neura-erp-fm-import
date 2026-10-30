'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ETIQUETA_PRECIO_MAYOR, formatoPrecio, rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { useTienda } from '@/lib/tienda/contexto';

export function etiquetaAgregar(mayorista: boolean, enLista: boolean) {
  if (mayorista) return enLista ? 'Sumar a cotización' : 'Añadir a cotización';
  return enLista ? 'Sumar al carrito' : 'Agregar al carrito';
}

/** En modo mayorista la tarjeta deja elegir cantidad antes de sumar. */
export function TarjetaProducto({ producto: p, mayorista = false }: { producto: Producto; mayorista?: boolean }) {
  const { agregar, tiene, vivo } = useTienda();
  const { precio, disponible } = vivo(p);
  const [cantidad, setCantidad] = useState(1);
  const href = rutaProducto(p);

  return (
    <article className="tarjeta">
      <Link href={href} aria-label={p.nombre} className="tarjeta-foto">
        <div className="ph ph-claro">
          {p.foto ? <img src={p.foto} alt={p.nombre} className="foto-img" loading="lazy" /> : <span className="ph-texto">Foto próximamente</span>}
        </div>
      </Link>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
        {p.marca && <span className="rotulo">{p.marca}</span>}
        <Link href={href} className="tarjeta-nombre">{p.nombre}</Link>
        {p.presentacion && <span style={{ fontSize: 13, color: 'var(--texto-3)' }}>{p.presentacion}</span>}
      </div>
      {mayorista && (
        <div className="contador">
          <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar">−</button>
          <span style={{ fontSize: 14 }}>{cantidad}</span>
          <button type="button" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar">+</button>
        </div>
      )}
      <div className="tarjeta-pie">
        <span style={{ fontSize: 13, fontWeight: 600 }}>{mayorista ? ETIQUETA_PRECIO_MAYOR : formatoPrecio(precio)}
          {!mayorista && p.precio_anterior && <s style={{ marginLeft: 6, fontWeight: 400, color: 'var(--texto-3)' }}>{formatoPrecio(p.precio_anterior)}</s>}
        </span>
        {disponible ? (
          <button type="button" className="btn-texto" onClick={() => agregar(p.slug, mayorista ? cantidad : 1, p.nombre)}>
            {etiquetaAgregar(mayorista, tiene(p.slug))}
          </button>
        ) : (
          <span style={{ fontSize: 13, color: 'var(--texto-3)' }}>Sin stock</span>
        )}
      </div>
    </article>
  );
}
