import Link from 'next/link';

export default function NoEncontrada() {
  return (
    <section className="fondo-marfil" style={{ padding: 'clamp(72px,10vw,150px) var(--gutter)' }}>
      <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <span className="sobretitulo oro-oscuro">Error 404</span>
        <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(44px,6vw,96px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
          Esta página <em className="oro-oscuro">no existe.</em>
        </h1>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-negro">Volver al inicio</Link>
          <Link href="/catalogo/" className="btn btn-borde-negro">Explorar catálogo</Link>
        </div>
      </div>
    </section>
  );
}
