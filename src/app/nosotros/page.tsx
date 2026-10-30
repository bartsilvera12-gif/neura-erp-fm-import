import type { Metadata } from 'next';
import Link from 'next/link';
import { Foto, Pendiente } from '@/components/Pendiente';

export const metadata: Metadata = {
  title: 'Nosotros',
  description: 'FM Importados: perfumes, cosméticos y productos importados para compradores particulares y mayoristas.',
  alternates: { canonical: '/nosotros/' },
};

const LINEAS = [
  ['01', 'Perfumes', 'Fragancias para uso personal y para reventa.', '/perfumes/'],
  ['02', 'Cosmética', 'Cuidado y belleza en un solo lugar.', '/cosmetica/'],
  ['03', 'Importados', 'Una selección de productos para descubrir.', '/catalogo/'],
];

const PASOS = [
  ['Elegís', 'Recorré el catálogo y armá tu lista, sea un producto o varias cajas.'],
  ['Consultás', 'Tu lista nos llega por WhatsApp, ya escrita, sin pagar nada en la web.'],
  ['Coordinamos', 'Te confirmamos disponibilidad, precio y entrega directamente.'],
];

export default function PaginaNosotros() {
  return (
    <>
      <section className="fondo-negro nosotros-hero" data-screen-label="Nosotros · Hero">
        <div className="contenedor nosotros-hero-grilla">
          <div className="nosotros-hero-texto aparece">
            <span className="sobretitulo oro">Nosotros</span>
            <h1 className="serif">
              Importados para vos <em className="oro">y para tu negocio.</em>
            </h1>
            <p>
              FM Importados es una tienda dedicada a la comercialización de perfumes, cosméticos y productos importados, con atención tanto a compradores particulares como a clientes mayoristas.
            </p>
          </div>
          <div className="nosotros-hero-fotos">
            <Foto texto="Perfume sobre fondo cálido" src="/fotos/hero-perfume.webp" className="telon-y" />
            <Foto texto="Cajas de mercadería" src="/fotos/mayorista-volumen.webp" className="telon-y" style={{ '--retraso': '.2s' } as React.CSSProperties} />
          </div>
        </div>
      </section>

      <section className="fondo-marfil nosotros-seccion" data-screen-label="Nosotros · Qué vendemos">
        <div className="contenedor">
          <span className="sobretitulo oro-oscuro">Qué vendemos</span>
          <nav className="nosotros-lineas" aria-label="Líneas de producto">
            {LINEAS.map(([numero, titulo, bajada, href]) => (
              <Link key={href} href={href}>
                <span className="sobre-numero">{numero}</span>
                <span className="serif nosotros-linea-titulo">{titulo}</span>
                <span className="sobre-bajada">{bajada}</span>
                <span className="sobre-flecha">→</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="fondo-negro nosotros-seccion" data-screen-label="Nosotros · Cómo trabajamos">
        <div className="contenedor">
          <span className="sobretitulo oro">Cómo trabajamos</span>
          <h2 className="serif nosotros-subtitulo">
            Simple, directo <em className="oro">y por WhatsApp.</em>
          </h2>
          <ol className="nosotros-pasos">
            {PASOS.map(([titulo, texto], i) => (
              <li key={titulo}>
                <span className="serif nosotros-paso-numero">{i + 1}</span>
                <span className="serif nosotros-paso-titulo">{titulo}</span>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="nosotros-caminos" data-screen-label="Nosotros · Para quién">
        <Link href="/catalogo/">
          <img src="/fotos/hero-perfume.webp" alt="" className="foto-img" loading="lazy" />
          <span className="sobretitulo">Para compradores particulares</span>
          <span className="serif">Perfumes y cosmética para vos, al detalle. →</span>
        </Link>
        <Link href="/mayoristas/">
          <img src="/fotos/mayorista-empaques.webp" alt="" className="foto-img" loading="lazy" />
          <span className="sobretitulo">Para negocios</span>
          <span className="serif"><em>Mercadería para revendedores, emprendedores y comercios. →</em></span>
        </Link>
      </section>

      <section className="fondo-marfil" style={{ padding: 'clamp(28px,4vw,48px) var(--gutter)' }}>
        <div className="contenedor">
          <Pendiente grande>Fotos y texto provisionales · reemplazar por el local, el equipo y la historia real del negocio</Pendiente>
        </div>
      </section>
    </>
  );
}
