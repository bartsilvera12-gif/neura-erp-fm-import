import Link from 'next/link';
import { enlaceWhatsapp, SITIO } from '@/lib/sitio';
import { IconoCorreo, IconoInstagram, IconoWhatsapp, Logo } from './Iconos';

export function Pie() {
  const correo = `mailto:${SITIO.correo}`;
  return (
    <section className="fondo-negro" style={{ padding: 'var(--seccion) var(--gutter) clamp(40px,5vw,64px)' }}>
      <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(48px,6vw,96px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 32, alignItems: 'end' }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(44px,6vw,100px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            ¿Para vos o <em className="oro">para tu negocio?</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--linea-oscura)' }}>
            <Link href="/catalogo/" className="cta-enlace">Explorar catálogo<span>→</span></Link>
            <Link href="/mayoristas/" className="cta-enlace">Comprar por mayor<span>→</span></Link>
          </div>
        </div>

        <footer style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))', gap: 36, paddingTop: 40, borderTop: '1px solid var(--linea-oscura)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Link href="/" aria-label="FM Importados · Inicio" style={{ alignSelf: 'flex-start' }}>
              <Logo tamano={76} />
            </Link>
            <span style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--gris)', maxWidth: 240 }}>
              Perfumes, cosméticos y productos importados. Por menor y por mayor.
            </span>
          </div>
          <nav aria-label="Tienda" className="pie-enlaces">
            <span className="rotulo oro" style={{ marginBottom: 4 }}>Tienda</span>
            <Link href="/catalogo/">Catálogo</Link>
            <Link href="/perfumes/">Perfumes</Link>
            <Link href="/cosmetica/">Cosmética</Link>
            <Link href="/consultas/">Mi lista de consultas</Link>
          </nav>
          <nav aria-label="FM Importados" className="pie-enlaces">
            <span className="rotulo oro" style={{ marginBottom: 4 }}>FM Importados</span>
            <Link href="/mayoristas/">Mayoristas</Link>
            <Link href="/nosotros/">Nosotros</Link>
            <Link href="/preguntas-frecuentes/">Preguntas frecuentes</Link>
            <Link href="/contacto/">Contacto</Link>
          </nav>
          <div className="pie-enlaces">
            <span className="rotulo oro" style={{ marginBottom: 4 }}>Contacto</span>
            <a href={enlaceWhatsapp()} target="_blank" rel="noopener">WhatsApp {SITIO.whatsappEtiqueta}</a>
            <a href={correo}>{SITIO.correo}</a>
            <div style={{ display: 'flex', gap: 10, marginTop: 6 }}>
              <a href={SITIO.instagram} target="_blank" rel="noopener" aria-label="Instagram de FM Importados" title={SITIO.instagramUsuario} className="red-social"><IconoInstagram /></a>
              <a href={enlaceWhatsapp()} target="_blank" rel="noopener" aria-label="WhatsApp de FM Importados" title={SITIO.whatsappEtiqueta} className="red-social"><IconoWhatsapp /></a>
              <a href={correo} aria-label="Correo de FM Importados" title={SITIO.correo} className="red-social"><IconoCorreo /></a>
            </div>
          </div>
        </footer>

        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', fontSize: 12, color: 'var(--gris)' }}>
          <span>© 2026 FM Importados</span>
          <span>Sin pagos en línea. Pedidos y cotizaciones sujetos a confirmación comercial.</span>
          <a href="https://neura.com.py" target="_blank" rel="noopener" className="enlace-linea" style={{ color: 'var(--gris-claro)', borderBottomColor: 'var(--linea-oscura-2)', paddingBottom: 2, fontSize: 12, letterSpacing: 0, textTransform: 'none' }}>
            Desarrollado por Neura
          </a>
        </div>
      </div>
    </section>
  );
}
