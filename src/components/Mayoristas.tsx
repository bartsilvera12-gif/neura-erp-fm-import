'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CATEGORIAS, rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { enlaceWhatsapp } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { mensajeMayorista, type SolicitudMayorista } from '@/lib/tienda/mensajes';
import { etiquetaAgregar } from './TarjetaProducto';
import { VerMas } from './VerMas';

export function resumenLista(lineas: number, unidades: number) {
  if (!lineas) return 'Tu lista está vacía';
  return `${lineas} ${lineas === 1 ? 'producto' : 'productos'} · ${unidades} unidades en tu lista`;
}

export function ListaVolumen({ productos }: { productos: Producto[] }) {
  const { lineas, unidades, agregar, tiene } = useTienda();
  const [categoria, setCategoria] = useState('Todos');
  const [cantidades, setCantidades] = useState<Record<string, number>>({});
  const cantidad = (slug: string) => cantidades[slug] ?? 1;
  const cambiar = (slug: string, d: number) => setCantidades((c) => ({ ...c, [slug]: Math.max(1, cantidad(slug) + d) }));

  return (
    <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(32px,3.4vw,52px)', lineHeight: 1 }}>Armá tu lista por volumen</h2>
          <p style={{ margin: 0, fontSize: 15, color: 'var(--texto-2)' }}>Elegí productos, indicá cantidades aproximadas y sumalos a tu cotización.</p>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Todos', ...CATEGORIAS].map((c) => (
            <button key={c} type="button" className="chip" aria-pressed={categoria === c} onClick={() => setCategoria(c)}>
              {c}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
        <VerMas key={categoria} items={productos.filter((p) => categoria === 'Todos' || p.categoria === categoria)} tanda={12}>
          {(visibles) =>
            visibles.map((p) => {
            const enLista = tiene(p.slug);
            return (
              <div key={p.slug} className="fila-volumen">
                <Link href={rutaProducto(p)} className="miniatura" aria-label={p.nombre}><img src={p.foto} alt="" loading="lazy" /></Link>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0 }}>
                  <Link href={rutaProducto(p)} className="serif" style={{ fontSize: 20, textDecoration: 'none', color: 'var(--negro)' }}>{p.nombre}</Link>
                  <span style={{ fontSize: 12.5, color: 'var(--texto-3)' }}>{[p.categoria, p.presentacion].filter(Boolean).join(' · ')}</span>
                </div>
                <div className="contador">
                  <button type="button" onClick={() => cambiar(p.slug, -1)} aria-label="Restar">−</button>
                  <span>{cantidad(p.slug)}</span>
                  <button type="button" onClick={() => cambiar(p.slug, 1)} aria-label="Sumar">+</button>
                </div>
                <button type="button" className={enLista ? 'btn-sumar en-lista' : 'btn-sumar'} onClick={() => agregar(p.slug, cantidad(p.slug), p.nombre)}>
                  {etiquetaAgregar(true, enLista)}
                </button>
              </div>
            );
          })
          }
        </VerMas>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', background: 'var(--negro)', color: 'var(--crema)', padding: '18px 22px' }}>
        <span style={{ fontSize: 15 }}>{resumenLista(lineas.length, unidades)}</span>
        <div style={{ display: 'flex', gap: 18, flexWrap: 'wrap', fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase' }}>
          <Link href="/catalogo/?modo=mayor" style={{ color: 'var(--gris-claro)', textDecoration: 'none' }}>Ver catálogo completo</Link>
          <Link href="/consultas/" style={{ color: 'var(--oro)', textDecoration: 'none' }}>Revisar lista de cotización →</Link>
        </div>
      </div>
    </div>
  );
}

const CAMPOS: { clave: keyof SolicitudMayorista; etiqueta: string; tipo: 'text' | 'tel' | 'email' | 'area'; ayuda?: string; ancho?: boolean }[] = [
  { clave: 'nombre', etiqueta: 'Nombre y apellido', tipo: 'text' },
  { clave: 'negocio', etiqueta: 'Nombre del negocio', tipo: 'text' },
  { clave: 'ciudad', etiqueta: 'Ciudad', tipo: 'text' },
  { clave: 'whatsapp', etiqueta: 'WhatsApp', tipo: 'tel' },
  { clave: 'correo', etiqueta: 'Correo electrónico (opcional)', tipo: 'email', ancho: true },
  { clave: 'productos', etiqueta: 'Productos de interés', tipo: 'area', ayuda: 'Perfumes, cosmética, productos específicos…', ancho: true },
  { clave: 'cantidad', etiqueta: 'Cantidad aproximada', tipo: 'text', ayuda: 'Ej.: unidades o cajas por producto', ancho: true },
  { clave: 'mensaje', etiqueta: 'Mensaje', tipo: 'area', ancho: true },
];

const VACIO: SolicitudMayorista = { nombre: '', negocio: '', ciudad: '', whatsapp: '', correo: '', productos: '', cantidad: '', mensaje: '' };

export function FormularioMayorista({ productos }: { productos: Producto[] }) {
  const { lineas, avisar } = useTienda();
  const [v, setV] = useState(VACIO);
  const [error, setError] = useState('');
  const [enviado, setEnviado] = useState(false);

  const usarLista = () => {
    const texto = lineas
      .map((l) => {
        const p = productos.find((x) => x.slug === l.slug);
        return p ? `${p.nombre} × ${l.cantidad}` : '';
      })
      .filter(Boolean)
      .join('\n');
    if (!texto) return avisar('Tu lista de cotización está vacía');
    setV((x) => ({ ...x, productos: texto }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    if (!v.nombre || !v.negocio || !v.ciudad || !v.whatsapp) {
      setError('Completá nombre, negocio, ciudad y WhatsApp para continuar.');
      return;
    }
    window.open(enlaceWhatsapp(mensajeMayorista(v)), '_blank');
    setEnviado(true);
  };

  return (
    <div className="contenedor" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', gap: 'clamp(32px,5vw,96px)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(38px,4.6vw,72px)', lineHeight: 0.95, letterSpacing: '-.015em' }}>
          Solicitá tu <em className="oro">cotización</em> mayorista.
        </h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: 'var(--gris-claro)', maxWidth: 420 }}>
          Al enviar, se abre WhatsApp con tu solicitud ya redactada. La consulta llega a FM Importados cuando confirmás el envío del mensaje.
        </p>
        <button type="button" onClick={usarLista} className="btn-texto" style={{ alignSelf: 'flex-start', marginTop: 8, color: 'var(--crema)', borderBottomColor: 'var(--linea-oscura-2)', letterSpacing: '.14em' }}>
          Usar mi lista de cotización ({lineas.length})
        </button>
      </div>
      <form onSubmit={enviar} noValidate style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,240px),1fr))', gap: '22px 28px' }}>
        {CAMPOS.map((c) => (
          <label key={c.clave} style={{ gridColumn: c.ancho ? '1 / -1' : 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span className="rotulo" style={{ letterSpacing: '.16em', color: 'var(--gris-medio)' }}>{c.etiqueta}</span>
            {c.tipo === 'area' ? (
              <textarea
                rows={3}
                className="campo-oscuro"
                placeholder={c.ayuda}
                value={v[c.clave]}
                onChange={(e) => {
                  setV({ ...v, [c.clave]: e.target.value });
                  setError('');
                }}
              />
            ) : (
              <input
                type={c.tipo}
                className="campo-oscuro"
                placeholder={c.ayuda}
                value={v[c.clave]}
                onChange={(e) => {
                  setV({ ...v, [c.clave]: e.target.value });
                  setError('');
                }}
              />
            )}
          </label>
        ))}
        <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: 12, marginTop: 8 }}>
          {error && <span role="alert" style={{ fontSize: 14, color: '#e0a46a' }}>{error}</span>}
          <button type="submit" className="btn btn-oro" style={{ height: 56, fontSize: 12.5 }}>Solicitar cotización mayorista</button>
          {enviado && (
            <span style={{ fontSize: 14, lineHeight: 1.5, color: 'var(--gris-claro)' }}>
              Abrimos WhatsApp con tu solicitud. Revisá el mensaje y envialo desde ahí para que llegue a FM Importados.
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
