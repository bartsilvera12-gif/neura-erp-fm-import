'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { rutaProducto, type Producto } from '@/lib/catalogo/tipos';
import { ACENTO_VERDE, NAVEGACION } from '@/lib/sitio';
import { useTienda } from '@/lib/tienda/contexto';
import { IconoCarrito, Logo } from './Iconos';

function activo(ruta: string, href: string) {
  if (href === '/') return ruta === '/';
  if (href === '/catalogo/') return ruta.startsWith('/catalogo') || ruta.startsWith('/producto');
  return ruta.startsWith(href.replace(/\/$/, ''));
}

export function Encabezado() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const ruta = usePathname();
  const { unidades } = useTienda();
  const [scroll, setScroll] = useState(false);
  const [menu, setMenu] = useState(false);
  const [buscando, setBuscando] = useState(false);
  const [q, setQ] = useState('');
  const campo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const alScroll = () => setScroll(window.scrollY > 24);
    alScroll();
    window.addEventListener('scroll', alScroll, { passive: true });
    return () => window.removeEventListener('scroll', alScroll);
  }, []);

  // Cambiar de página cierra el menú y el buscador
  useEffect(() => {
    setMenu(false);
    setBuscando(false);
  }, [ruta]);

  useEffect(() => {
    if (!menu && !buscando) return;
    const alTeclado = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        setBuscando(false);
      }
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', alTeclado);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', alTeclado);
    };
  }, [menu, buscando]);

  const abrirBusqueda = () => {
    setMenu(false);
    setBuscando(true);
    setTimeout(() => campo.current?.focus(), 50);
  };

  // El catálogo pesa: se trae recién cuando alguien abre el buscador.
  useEffect(() => {
    if (!buscando || productos.length) return;
    fetch('/catalogo.json')
      .then((r) => r.json())
      .then(setProductos)
      .catch(() => {});
  }, [buscando, productos.length]);

  const termino = q.trim().toLowerCase();
  const resultados = termino
    ? productos.filter((p) => `${p.nombre} ${p.categoria}`.toLowerCase().includes(termino)).slice(0, 6)
    : [];

  const carrito = (
    <Link href="/consultas/" aria-label="Carrito" title="Carrito" className="icono-btn carrito" aria-current={ruta.startsWith('/consultas') ? 'page' : undefined}>
      <IconoCarrito />
      <span className="burbuja">{unidades}</span>
    </Link>
  );
  const lupa = (
    <button type="button" onClick={abrirBusqueda} aria-label="Buscar" title="Buscar" className="icono-btn">
      <span className="lupa" />
    </button>
  );

  return (
    <>
      <header className={scroll ? 'encabezado con-scroll' : 'encabezado'}>
        <div className="enc-escritorio">
          <Link href="/" aria-label="FM Importados · Inicio" className="marca">
            <Logo />
            <span className="marca-texto">
              <span className="serif" style={{ fontSize: 19, letterSpacing: '.02em' }}>FM Importados</span>
              <span style={{ fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--gris-medio)' }}>Por menor · Por mayor</span>
            </span>
          </Link>
          <nav aria-label="Principal" className="nav-principal">
            {NAVEGACION.filter((n) => n.href !== '/contacto/').map((n) => (
              <div key={n.href} className="nav-item">
                <Link href={n.href} className="nav-enlace" aria-current={activo(ruta, n.href) ? 'page' : undefined}>
                  <span>{n.etiqueta}</span>
                  {ACENTO_VERDE && n.href === '/mayoristas/' && <span className="punto-verde" style={{ width: 5, height: 5 }} />}
                </Link>
                {n.href === '/catalogo/' && (
                  <div className="desplegable">
                    <div>
                      <Link href="/perfumes/" className="serif" style={{ fontSize: 22, padding: '12px 0', borderBottom: '1px solid var(--linea-oscura)' }}>Perfumes</Link>
                      <Link href="/cosmetica/" className="serif" style={{ fontSize: 22, padding: '12px 0', borderBottom: '1px solid var(--linea-oscura)' }}>Cosmética</Link>
                      <Link href="/catalogo/" style={{ fontSize: 11, letterSpacing: '.16em', textTransform: 'uppercase', padding: '14px 0 4px', color: 'var(--oro)' }}>Ver todo el catálogo →</Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="enc-acciones">
            {lupa}
            {carrito}
            <Link href="/contacto/" className="btn-contacto" aria-current={ruta.startsWith('/contacto') ? 'page' : undefined}>Contacto</Link>
          </div>
        </div>

        <div className="enc-compacto">
          <Link href="/" aria-label="FM Importados · Inicio" className="marca">
            <Logo />
          </Link>
          <div className="enc-acciones">
            {lupa}
            {carrito}
            <button type="button" onClick={() => setMenu(true)} aria-label="Menú" aria-expanded={menu} className="hamburguesa">
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {menu && (
        <div className="capa" role="dialog" aria-modal="true" aria-label="Menú" style={{ display: 'flex', flexDirection: 'column', padding: '16px 24px 32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 56 }}>
            <span className="capa-rotulo">Menú</span>
            <button type="button" onClick={() => setMenu(false)} className="capa-cerrar">Cerrar</button>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', marginTop: 24 }}>
            {NAVEGACION.map((n) => (
              <Link key={n.href} href={n.href} className="menu-enlace" aria-current={activo(ruta, n.href) ? 'page' : undefined}>
                <span>{n.etiqueta}</span>
                {ACENTO_VERDE && n.href === '/mayoristas/' && (
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: 'var(--verde)' }}>Para negocios</span>
                )}
              </Link>
            ))}
            <Link href="/preguntas-frecuentes/" style={{ padding: '18px 0', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#b3ac9e', textDecoration: 'none' }}>
              Preguntas frecuentes
            </Link>
          </nav>
        </div>
      )}

      {buscando && (
        <div className="capa busqueda" role="dialog" aria-modal="true" aria-label="Buscar">
          <div style={{ maxWidth: 980, margin: '0 auto', padding: 'clamp(24px,6vh,72px) clamp(20px,4vw,48px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <span className="capa-rotulo">Buscar en FM Importados</span>
              <button type="button" onClick={() => setBuscando(false)} className="capa-cerrar">Cerrar</button>
            </div>
            <input
              ref={campo}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Perfume, cosmético, marca…"
              aria-label="Buscar productos"
              className="serif"
              style={{ width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid var(--linea-oscura-2)', padding: '12px 0 18px', color: 'var(--crema)', fontSize: 'clamp(30px,5vw,56px)', outline: 'none' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: 12 }}>
              {resultados.map((p) => (
                <Link key={p.slug} href={rutaProducto(p)} className="resultado">
                  <span className="miniatura"><img src={p.foto} alt="" loading="lazy" /></span>
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
                    <span className="serif" style={{ fontSize: 21 }}>{p.nombre}</span>
                    <span style={{ fontSize: 12, color: 'var(--gris)' }}>{p.categoria}</span>
                  </span>
                  <span style={{ fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--oro)' }}>Ver →</span>
                </Link>
              ))}
              {termino && !resultados.length && (
                <p style={{ color: 'var(--gris)', fontSize: 15, padding: '18px 0' }}>
                  Sin resultados para esa búsqueda. Probá con otra palabra o consultanos por WhatsApp.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
