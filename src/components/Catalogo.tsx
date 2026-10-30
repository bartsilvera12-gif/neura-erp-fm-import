'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { Producto } from '@/lib/catalogo/tipos';
import { ACENTO_VERDE } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { TarjetaProducto } from './TarjetaProducto';
import { VerMas } from './VerMas';

type Orden = 'az' | 'za' | 'cat' | 'barato' | 'caro';

export function Catalogo({ productos }: { productos: Producto[] }) {
  const { unidades } = useTienda();
  const [mayorista, setMayorista] = useState(false);
  const [q, setQ] = useState('');
  const [categoria, setCategoria] = useState('Todos');
  const [orden, setOrden] = useState<Orden>('az');

  // /catalogo/?modo=mayor llega desde Inicio y Mayoristas. Se lee en el navegador
  // porque la página es estática.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('modo') === 'mayor') setMayorista(true);
  }, []);

  const lista = useMemo(() => {
    const t = q.trim().toLowerCase();
    return productos
      .filter(
        (p) =>
          (categoria === 'Todos' || p.categoria === categoria) &&
          (!t || `${p.nombre} ${p.categoria}`.toLowerCase().includes(t)),
      )
      .sort((a, b) =>
        orden === 'barato'
          ? a.precio - b.precio
          : orden === 'caro'
            ? b.precio - a.precio
            : orden === 'za'
              ? b.nombre.localeCompare(a.nombre)
              : orden === 'cat'
                ? a.categoria.localeCompare(b.categoria) || a.nombre.localeCompare(b.nombre)
                : a.nombre.localeCompare(b.nombre),
      );
  }, [productos, q, categoria, orden]);

  const limpiar = () => {
    setQ('');
    setCategoria('Todos');
  };

  return (
    <>
      <section className="fondo-negro" data-screen-label="Catálogo · Encabezado" style={{ padding: 'clamp(48px,7vw,104px) var(--gutter) 0' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h1 className="serif aparece" style={{ margin: 0, fontSize: 'clamp(48px,7vw,112px)', lineHeight: 0.92, letterSpacing: '-.02em', maxWidth: 900 }}>
              Explorá nuestra <em className="oro">selección</em>
            </h1>
            <div role="group" aria-label="Modo de compra" className="modo">
              <button type="button" aria-pressed={!mayorista} onClick={() => setMayorista(false)}>Por menor</button>
              <button type="button" aria-pressed={mayorista} onClick={() => setMayorista(true)} className="mayor">Por mayor</button>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, borderBottom: '1px solid var(--linea-oscura-2)' }}>
            <span style={{ width: 14, height: 14, border: '1.3px solid var(--gris)', borderRadius: '50%', flex: 'none' }} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre o categoría"
              aria-label="Buscar en el catálogo"
              style={{ flex: 1, minWidth: 0, background: 'transparent', border: 'none', padding: '18px 0', color: 'var(--crema)', fontSize: 18, outline: 'none' }}
            />
            <span className="capa-rotulo" style={{ letterSpacing: 0, textTransform: 'none', whiteSpace: 'nowrap' }}>
              {lista.length} {lista.length === 1 ? 'producto' : 'productos'}
            </span>
          </div>
        </div>
      </section>

      {mayorista && (
        <div style={{ background: 'var(--negro-2)', color: 'var(--crema)', padding: '14px var(--gutter)' }}>
          <div className="contenedor" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', fontSize: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {ACENTO_VERDE && <span className="punto-verde" />}
              Modo mayorista: indicá cantidades y armá tu lista de cotización. Las condiciones se informan al cotizar.
            </span>
            <Link href="/consultas/" style={{ fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--oro)', textDecoration: 'none' }}>
              Ver mi lista ({unidades}) →
            </Link>
          </div>
        </div>
      )}

      <section data-screen-label="Catálogo · Grilla" style={{ padding: 'clamp(32px,4vw,56px) var(--gutter) var(--seccion)' }}>
        <div className="contenedor catalogo-cuerpo">
          <aside className="filtros">
            <div>
              <span className="rotulo">Categoría</span>
              <div className="chips">
                {['Todos', ...new Set(productos.map((p) => p.categoria))].map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="chip"
                    aria-pressed={categoria === c}
                    onClick={() => setCategoria(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="rotulo">Ordenar</span>
              <select value={orden} onChange={(e) => setOrden(e.target.value as Orden)} aria-label="Ordenar" className="select">
                <option value="az">Nombre A–Z</option>
                <option value="za">Nombre Z–A</option>
                <option value="cat">Por categoría</option>
                <option value="barato">Menor precio</option>
                <option value="caro">Mayor precio</option>
              </select>
            </div>
          </aside>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, minWidth: 0 }}>
            <VerMas key={`${q}|${categoria}|${orden}`} items={lista}>
              {(visibles) => (
                <div className="grilla-productos">
                  {visibles.map((p) => (
                    <TarjetaProducto key={p.slug} producto={p} mayorista={mayorista} />
                  ))}
                </div>
              )}
            </VerMas>
            {!lista.length && (
              <div style={{ padding: '64px 0', borderTop: '1px solid var(--linea-clara)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                <span className="serif" style={{ fontSize: 30 }}>No encontramos productos con esos filtros.</span>
                <button type="button" onClick={limpiar} className="btn-texto" style={{ alignSelf: 'flex-start' }}>Limpiar filtros</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
