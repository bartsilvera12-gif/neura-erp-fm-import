'use client';

import Link from 'next/link';
import { useState } from 'react';
import { etiquetaDisponibilidad, etiquetaPrecio, rutaCategoria, type Producto } from '@/lib/catalogo/tipos';
import { ACENTO_VERDE, enlaceWhatsapp } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { mensajeProducto } from '@/lib/tienda/mensajes';
import { TarjetaProducto } from './TarjetaProducto';

const VISTAS = ['Vista frontal', 'Detalle de etiqueta', 'Packaging'];

export function DetalleProducto({ producto: p, relacionados }: { producto: Producto; relacionados: Producto[] }) {
  const { agregar } = useTienda();
  const [vista, setVista] = useState(0);
  const [cantidad, setCantidad] = useState(1);

  const info = [
    ['Descripción', 'A completar con la información del proveedor.'],
    ['Características', 'A completar.'],
    ['Presentación', p.presentacion],
    ['Marca', p.marca],
    ['Modo de uso', 'Según indicaciones del envase.'],
  ];

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <div className="ph ph-claro" style={{ aspectRatio: '4 / 5', padding: 18 }}>
              <span className="ph-texto" style={{ fontSize: 11 }}>Fotografía principal · {VISTAS[vista].toLowerCase()}</span>
            </div>
            <div className="miniaturas-galeria">
              {VISTAS.map((v, i) => (
                <button key={v} type="button" aria-label={v} aria-pressed={vista === i} onClick={() => setVista(i)}>
                  <span className="ph-texto" style={{ fontSize: 9.5, letterSpacing: '.06em', color: '#7a7468' }}>{v}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="sticky-escritorio" style={{ display: 'flex', flexDirection: 'column', gap: 22, position: 'sticky', top: 110 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="sobretitulo" style={{ letterSpacing: '.18em', color: 'var(--texto-3)' }}>{p.marca}</span>
              <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(38px,4.4vw,68px)', lineHeight: 0.98, letterSpacing: '-.015em' }}>{p.nombre}</h1>
              <span style={{ fontSize: 14, color: 'var(--texto-2)' }}>{p.categoria} · {p.tipo}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
              <div className="fila-ficha"><span style={{ color: 'var(--texto-3)' }}>Precio</span><span style={{ fontWeight: 600 }}>{etiquetaPrecio(p)}</span></div>
              <div className="fila-ficha"><span style={{ color: 'var(--texto-3)' }}>Disponibilidad</span><span>{etiquetaDisponibilidad(p)}</span></div>
              <label className="fila-ficha" style={{ padding: '10px 0' }}>
                <span style={{ color: 'var(--texto-3)' }}>Presentación</span>
                <select className="select" style={{ fontSize: 14 }}>
                  <option>{p.presentacion}</option>
                </select>
              </label>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'stretch' }}>
              <div className="contador" style={{ borderColor: 'var(--negro)' }}>
                <button type="button" onClick={() => setCantidad((c) => Math.max(1, c - 1))} aria-label="Restar" style={{ width: 48, height: 54 }}>−</button>
                <span>{cantidad}</span>
                <button type="button" onClick={() => setCantidad((c) => c + 1)} aria-label="Sumar" style={{ width: 48, height: 54 }}>+</button>
              </div>
              <button type="button" className="btn btn-negro" style={{ flex: 1, minWidth: 200, height: 56 }} onClick={() => agregar(p.slug, cantidad, p.nombre)}>
                Agregar a mi consulta
              </button>
            </div>
            <a href={enlaceWhatsapp(mensajeProducto(p, cantidad))} target="_blank" rel="noopener" className="btn btn-borde-negro" style={{ height: 54 }}>
              {ACENTO_VERDE && <span className="punto-verde" />}
              Consultar por WhatsApp
            </a>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5, color: 'var(--texto-3)' }}>
              Sin pagos en línea. Tu pedido queda sujeto a confirmación comercial de FM Importados.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)', marginTop: 8 }}>
              {info.map(([k, v]) => (
                <div key={k} className="fila-info"><span style={{ color: 'var(--texto-3)' }}>{k}</span><span>{v}</span></div>
              ))}
            </div>
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
