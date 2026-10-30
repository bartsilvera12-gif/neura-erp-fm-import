'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ETIQUETA_PRECIO_MAYOR, formatoPrecio, rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { enlaceWhatsapp } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { mensajeConsulta, mensajePedidoEnviado } from '@/lib/tienda/mensajes';
import { crearPedido, type PedidoCreado } from '@/lib/tienda/pedidos';
import { resumenLista } from './Mayoristas';

/**
 * El carrito. No cobra: crea un pedido en el ERP, que FM Importados confirma a
 * mano. WhatsApp queda como alternativa.
 */
export function Consultas({ productos }: { productos: Producto[] }) {
  const { lineas, unidades, lista, cambiar, quitar, vaciar, vivo } = useTienda();
  const [mayorista, setMayorista] = useState(false);
  const [negocio, setNegocio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [observaciones, setObservaciones] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [envio, setEnvio] = useState(false);
  const [direccion, setDireccion] = useState('');
  const [trampa, setTrampa] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');
  const [creado, setCreado] = useState<PedidoCreado | null>(null);

  const items = lineas.flatMap((l) => {
    const p = productos.find((x) => x.slug === l.slug);
    return p ? [{ ...l, p }] : [];
  });

  const confirmar = async () => {
    setError('');
    setEnviando(true);
    try {
      const pedido = await crearPedido({
        nombre,
        telefono,
        negocio,
        ciudad,
        direccion,
        observaciones,
        tipo: mayorista ? 'mayorista' : 'minorista',
        modo: envio ? 'envio' : 'retiro',
        sitio: trampa,
        items: items.map(({ p, cantidad }) => ({ sku: p.sku, cantidad })),
      });
      setCreado(pedido);
      vaciar();
      window.scrollTo({ top: 0 });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No pudimos registrar el pedido.');
      document.getElementById('datos-pedido')?.scrollIntoView({ block: 'center' });
    } finally {
      setEnviando(false);
    }
  };

  const enviarWhatsapp = () =>
    window.open(enlaceWhatsapp(mensajeConsulta(lineas, productos, { mayorista, negocio, ciudad, observaciones })), '_blank');

  return (
    <section className="fondo-marfil" data-screen-label="Lista de consultas" style={{ padding: `clamp(40px,6vw,88px) var(--gutter) ${items.length ? 120 : 100}px` }}>
      <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(28px,4vw,48px)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20, flexWrap: 'wrap' }}>
          <h1 className="serif aparece" style={{ margin: 0, fontSize: 'clamp(44px,6vw,96px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            Tu <em className="oro-oscuro">carrito</em>
          </h1>
          <span style={{ fontSize: 14, color: 'var(--texto-3)' }}>{lista && !creado ? resumenLista(lineas.length, unidades) : ''}</span>
        </div>

        {creado && (
          <div style={{ borderTop: '1px solid var(--negro)', padding: '48px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p className="serif" style={{ margin: 0, fontSize: 'clamp(28px,3vw,44px)' }}>Recibimos tu pedido {creado.numero}.</p>
            <p style={{ margin: 0, fontSize: 16, color: 'var(--texto-2)' }}>
              Total estimado: {formatoPrecio(creado.total)}. Te vamos a contactar para confirmarlo.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={enlaceWhatsapp(mensajePedidoEnviado(creado.numero))} target="_blank" rel="noopener" className="btn btn-negro">Avisar por WhatsApp</a>
              <Link href="/catalogo/" className="btn btn-borde-negro">Seguir viendo</Link>
            </div>
          </div>
        )}

        {lista && !items.length && !creado && (
          <div style={{ borderTop: '1px solid var(--negro)', padding: '48px 0', display: 'flex', flexDirection: 'column', gap: 18 }}>
            <p className="serif" style={{ margin: 0, fontSize: 'clamp(24px,2.6vw,36px)' }}>Todavía no agregaste productos.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/catalogo/" className="btn btn-negro">Explorar catálogo</Link>
              <Link href="/mayoristas/" className="btn btn-borde-negro">Comprar por mayor</Link>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <div className="carrito-cuerpo">
            <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
              {items.map(({ p, cantidad }) => (
                <div key={p.slug} className="linea-carrito">
                  <Link href={rutaProducto(p)} className="miniatura" aria-label={p.nombre}>{p.foto && <img src={p.foto} alt="" loading="lazy" />}</Link>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
                    <Link href={rutaProducto(p)} className="serif" style={{ fontSize: 21, lineHeight: 1.1, textDecoration: 'none', color: 'var(--negro)' }}>{p.nombre}</Link>
                    <span style={{ fontSize: 12.5, color: 'var(--texto-3)' }}>{[p.categoria, p.presentacion, mayorista ? null : formatoPrecio(vivo(p).precio)].filter(Boolean).join(' · ')}</span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                      <div className="contador">
                        <button type="button" onClick={() => cambiar(p.slug, -1)} aria-label="Restar">−</button>
                        <span style={{ minWidth: 36 }}>{cantidad}</span>
                        <button type="button" onClick={() => cambiar(p.slug, 1)} aria-label="Sumar">+</button>
                      </div>
                      <button
                        type="button"
                        onClick={() => quitar(p.slug)}
                        style={{ height: 44, background: 'transparent', border: 'none', padding: 0, fontSize: 12, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--texto-3)', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: 4 }}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <span style={{ fontSize: 13, color: 'var(--texto-3)', whiteSpace: 'nowrap' }} className="solo-escritorio">{mayorista ? ETIQUETA_PRECIO_MAYOR : formatoPrecio(vivo(p).precio * cantidad)}</span>
                </div>
              ))}
            </div>

            <aside className="fondo-negro sticky-escritorio" style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 'clamp(22px,2.6vw,36px)', position: 'sticky', top: 110 }}>
              <span id="datos-pedido" className="rotulo" style={{ color: 'var(--gris-medio)' }}>Tipo de pedido</span>
              <div className="tipo-consulta" role="group" aria-label="Tipo de consulta">
                <button type="button" aria-pressed={!mayorista} onClick={() => setMayorista(false)}>Pedido minorista</button>
                <button type="button" aria-pressed={mayorista} onClick={() => setMayorista(true)} className="mayor">Cotización mayorista</button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Nombre y apellido" aria-label="Nombre y apellido" autoComplete="name" className="campo-oscuro" />
                <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Teléfono o WhatsApp" aria-label="Teléfono o WhatsApp" type="tel" autoComplete="tel" className="campo-oscuro" />
                {mayorista && <input value={negocio} onChange={(e) => setNegocio(e.target.value)} placeholder="Nombre del negocio" aria-label="Nombre del negocio" className="campo-oscuro" />}
                <input value={trampa} onChange={(e) => setTrampa(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ display: 'none' }} />
              </div>
              <div className="tipo-consulta" role="group" aria-label="Entrega">
                <button type="button" aria-pressed={!envio} onClick={() => setEnvio(false)}>Retiro</button>
                <button type="button" aria-pressed={envio} onClick={() => setEnvio(true)}>Envío</button>
              </div>
              {envio && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} placeholder="Ciudad" aria-label="Ciudad" className="campo-oscuro" />
                  <input value={direccion} onChange={(e) => setDireccion(e.target.value)} placeholder="Dirección" aria-label="Dirección" autoComplete="street-address" className="campo-oscuro" />
                </div>
              )}
              <textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)} rows={3} placeholder="Observaciones (opcional)" aria-label="Observaciones" className="campo-oscuro" />
              <div style={{ display: 'flex', flexDirection: 'column', fontSize: 14 }}>
                {[
                  ['Productos', lineas.length],
                  ['Unidades', unidades],
                  ['Subtotal estimado', mayorista ? ETIQUETA_PRECIO_MAYOR : formatoPrecio(items.reduce((t, i) => t + vivo(i.p).precio * i.cantidad, 0))],
                ].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--linea-oscura)' }}>
                    <span style={{ color: 'var(--gris-medio)' }}>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
              {error && <p role="alert" style={{ margin: 0, fontSize: 14, color: 'var(--oro)' }}>{error}</p>}
              <button type="button" onClick={confirmar} disabled={enviando} className="btn btn-oro solo-escritorio" style={{ height: 56 }}>{enviando ? 'Enviando…' : 'Confirmar pedido'}</button>
              <button type="button" onClick={enviarWhatsapp} className="btn-texto" style={{ alignSelf: 'center', color: 'var(--crema)' }}>Prefiero consultar por WhatsApp</button>
              <p style={{ margin: 0, fontSize: 12.5, lineHeight: 1.5, color: 'var(--gris-medio)' }}>
                El pedido no es un pago ni una reserva. El pedido queda sujeto a confirmación comercial.
              </p>
            </aside>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="barra-envio solo-movil">
          <button type="button" onClick={confirmar} disabled={enviando} className="btn btn-oro" style={{ width: '100%', height: 54, letterSpacing: '.12em' }}>
            {enviando ? 'Enviando…' : `Confirmar pedido · ${unidades} u.`}
          </button>
        </div>
      )}
    </section>
  );
}
