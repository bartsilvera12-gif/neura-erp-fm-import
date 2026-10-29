import type { Metadata } from 'next';
import Link from 'next/link';
import { Foto, Pendiente } from '@/components/Pendiente';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'FM Importados: perfumes, cosméticos y productos importados para compradores particulares y mayoristas.',
  alternates: { canonical: '/nosotros/' },
};

export default function PaginaNosotros() {
  return (
    <section className="fondo-marfil" data-screen-label="Nosotros" style={{ padding: 'clamp(56px,8vw,120px) var(--gutter)' }}>
      <div className="contenedor-angosto" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,6vw,96px)' }}>
        <div className="grilla-flujo">
          <h1 className="sobretitulo oro-oscuro" style={{ margin: 0, fontWeight: 400 }}>Nosotros</h1>
          <p className="serif ancho aparece" style={{ margin: 0, fontSize: 'clamp(30px,3.8vw,60px)', lineHeight: 1.12, letterSpacing: '-.01em', textWrap: 'pretty' }}>
            FM Importados es una tienda dedicada a la comercialización de perfumes, cosméticos y productos importados, con atención tanto a compradores particulares como a clientes mayoristas.
          </p>
        </div>
        <div className="nosotros-fotos" style={{ display: 'grid', gap: 4 }}>
          <Foto texto="Fotografía real del local" clara className="telon-x" style={{ height: 'clamp(260px,38vw,560px)', alignItems: 'flex-start', padding: 16 }} />
          <Foto texto="Equipo o mostrador" clara b className="telon-y" style={{ height: 'clamp(260px,38vw,560px)', alignItems: 'flex-start', padding: 16, '--retraso': '.25s' } as React.CSSProperties} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,380px),1fr))', borderTop: '1px solid var(--negro)' }}>
          <Link href="/catalogo/" className="nosotros-enlace" style={{ paddingRight: 'clamp(0px,3vw,40px)' }}>
            <span className="sobretitulo" style={{ letterSpacing: '.18em' }}>Para compradores particulares</span>
            <span className="serif" style={{ fontSize: 'clamp(26px,2.6vw,38px)', lineHeight: 1.1 }}>Perfumes y cosmética para vos, al detalle. →</span>
          </Link>
          <Link href="/mayoristas/" className="nosotros-enlace">
            <span className="sobretitulo" style={{ letterSpacing: '.18em' }}>Para negocios</span>
            <span className="serif" style={{ fontSize: 'clamp(26px,2.6vw,38px)', lineHeight: 1.1 }}>
              <em>Mercadería para revendedores, emprendedores y comercios. →</em>
            </span>
          </Link>
        </div>
        <Pendiente grande>Texto provisional · ampliar con información real del negocio</Pendiente>
      </div>
    </section>
  );
}
