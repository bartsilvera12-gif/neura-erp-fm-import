import type { Metadata } from 'next';
import Link from 'next/link';
import { CanalesContacto } from '@/components/CanalesContacto';
import { HojasContacto } from '@/components/HojasContacto';
import { enlaceWhatsapp } from '@/lib/sitio';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Hablemos de lo que estás buscando. WhatsApp, correo y redes de FM Importados.',
  alternates: { canonical: '/contacto/' },
};

const titulo = (
  <>
    Hablemos de lo que <em className="oro">estás buscando.</em>
  </>
);
const estiloTitulo = { margin: 0, fontSize: 'clamp(48px,7.4vw,124px)', lineHeight: 0.92, letterSpacing: '-.02em', maxWidth: 1100 };
const estiloHoja = { margin: 0, fontSize: 'clamp(46px,7.4vw,124px)', lineHeight: 0.92, letterSpacing: '-.02em' };
const botonHoja = { height: 52, padding: '0 22px' };

export default function PaginaContacto() {
  return (
    <>
      {/* Escritorio */}
      <div className="solo-escritorio">
        <section className="fondo-negro" data-screen-label="Contacto" style={{ padding: 'clamp(56px,8vw,120px) var(--gutter) 0' }}>
          <div className="contenedor">
            <h1 className="serif aparece" style={{ ...estiloTitulo, marginBottom: 'clamp(40px,5vw,72px)' }}>{titulo}</h1>
          </div>
          <div className="contacto-opciones">
            <Link href="/catalogo/">
              <span className="sobretitulo" style={{ letterSpacing: '.18em', color: 'var(--gris)' }}>Por menor</span>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
                <span className="serif" style={{ fontSize: 'clamp(34px,3.8vw,60px)', lineHeight: 1 }}>Quiero comprar para mí</span>
                <span className="oro" style={{ fontSize: 28 }}>→</span>
              </span>
            </Link>
            <Link href="/mayoristas/">
              <span className="sobretitulo" style={{ letterSpacing: '.18em', color: '#3a2f18' }}>Por mayor</span>
              <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 20 }}>
                <span className="serif" style={{ fontStyle: 'italic', fontSize: 'clamp(34px,3.8vw,60px)', lineHeight: 1 }}>Quiero comprar para mi negocio</span>
                <span style={{ fontSize: 28 }}>→</span>
              </span>
            </Link>
          </div>
        </section>
        <section className="fondo-crema" style={{ padding: 'clamp(56px,7vw,100px) var(--gutter)' }}>
          <div className="contenedor grilla-flujo de-320">
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(30px,3vw,46px)', lineHeight: 1 }}>Canales de atención</h2>
            <CanalesContacto />
          </div>
        </section>
      </div>

      {/* Celular */}
      <section className="fondo-negro solo-movil" data-screen-label="Contacto" style={{ padding: 'clamp(48px,7vw,104px) 0 clamp(48px,6vw,96px)' }}>
        <div style={{ padding: '0 var(--gutter)' }}>
          <h1 className="serif aparece" style={estiloTitulo}>{titulo}</h1>
        </div>
        <HojasContacto
          hojas={[
            {
              pestana: 'Por menor',
              fondo: 'var(--negro-3)',
              color: 'var(--crema)',
              contenido: (
                <div className="hoja-cuerpo">
                  <span className="sobretitulo" style={{ color: 'var(--gris)' }}>Compra personal</span>
                  <h2 className="serif" style={estiloHoja}>Quiero comprar para mí</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid var(--linea-oscura)', paddingTop: 22 }}>
                    <span style={{ fontSize: 17, color: 'var(--gris-claro)' }}>Encontrá tu próximo favorito.</span>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link href="/catalogo/" className="btn btn-crema" style={botonHoja}>Explorar catálogo →</Link>
                      <a href={enlaceWhatsapp()} target="_blank" rel="noopener" className="btn" style={{ ...botonHoja, borderColor: 'var(--linea-oscura-2)', color: 'var(--crema)' }}>WhatsApp</a>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              pestana: 'Por mayor',
              fondo: 'var(--oro)',
              color: 'var(--negro)',
              contenido: (
                <div className="hoja-cuerpo">
                  <span className="sobretitulo" style={{ color: '#3a2f18' }}>Compra mayorista</span>
                  <h2 className="serif" style={{ ...estiloHoja, fontStyle: 'italic' }}>Quiero comprar para mi negocio</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, borderTop: '1px solid rgba(12,11,9,.35)', paddingTop: 22 }}>
                    <span style={{ fontSize: 17, color: '#2a2416' }}>Productos para hacer crecer tu negocio.</span>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      <Link href="/mayoristas/" className="btn btn-negro" style={botonHoja}>Ver propuesta mayorista →</Link>
                      <Link href="/consultas/" className="btn btn-borde-negro" style={botonHoja}>Mi cotización</Link>
                    </div>
                  </div>
                </div>
              ),
            },
            {
              pestana: 'Canales',
              fondo: 'var(--crema)',
              color: 'var(--negro)',
              contenido: (
                <div className="hoja-cuerpo grilla-flujo de-320" style={{ display: 'grid', justifyContent: 'stretch', alignContent: 'start', paddingBottom: 'clamp(48px,6vw,96px)' }}>
                  <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(30px,3vw,46px)', lineHeight: 1 }}>Canales de atención</h2>
                  <CanalesContacto />
                </div>
              ),
            },
          ]}
        />
      </section>
    </>
  );
}
