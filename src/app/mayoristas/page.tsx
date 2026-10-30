import type { Metadata } from 'next';
import { FormularioMayorista, ListaVolumen } from '@/components/Mayoristas';
import { Pendiente } from '@/components/Pendiente';
import { listarProductos } from '@/lib/catalogo/servicio';
import { ACENTO_VERDE, CONDICIONES_MAYORISTAS } from '@/lib/sitio';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Mayoristas',
  description: 'Propuesta mayorista de perfumes, cosméticos y productos importados para revendedores, emprendedores y comercios.',
  alternates: { canonical: '/mayoristas/' },
};

const ESTANTE = [
  [78, 'Cajas y empaques', '/fotos/mayorista-empaques.webp'],
  [100, 'Mercadería por volumen', '/fotos/mayorista-volumen.webp'],
  [64, 'Perfumes en caja', '/fotos/hero-packaging.webp'],
  [88, 'Cosmética', '/fotos/cosmetica-envases.webp'],
  [72, 'Packaging', '/fotos/compra-personal.webp'],
] as const;

const CONDICIONES = [
  ['Mínimo de compra', CONDICIONES_MAYORISTAS.minimo],
  ['Precios mayoristas', CONDICIONES_MAYORISTAS.precios],
  ['Formas de pago', CONDICIONES_MAYORISTAS.pago],
  ['Envíos', CONDICIONES_MAYORISTAS.envios],
];

export default async function PaginaMayoristas() {
  const productos = await listarProductos();
  return (
    <>
      <section className="fondo-negro" data-screen-label="Mayoristas · Hero" style={{ padding: 'clamp(40px,6vw,88px) var(--gutter) clamp(48px,6vw,88px)', overflow: 'hidden' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column' }}>
          <span className="sobretitulo oro" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
            {ACENTO_VERDE && <span className="punto-verde" />}Tu negocio también tiene lugar en FM.
          </span>
          <h1 className="serif" style={{ position: 'relative', zIndex: 2, margin: 0, fontSize: 'clamp(50px,8.4vw,150px)', lineHeight: 0.88, letterSpacing: '-.025em', maxWidth: 1200 }}>
            Productos para <em className="oro-3d">abastecer</em> tu negocio.
          </h1>
          <div className="estante">
            {ESTANTE.map(([alto, texto, foto], i) => (
              <div key={texto} className="ph" style={{ height: `${alto}%`, '--retraso': `${(0.1 + i * 0.08).toFixed(2)}s` } as React.CSSProperties}>
                <img src={foto} alt={texto} className="foto-img" />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', borderTop: '1px solid var(--linea-oscura)', paddingTop: 28 }}>
            <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: 'var(--gris-claro)' }}>
              Conocé nuestra propuesta mayorista de perfumes, cosméticos y productos importados.
            </p>
            <a href="#formulario-mayorista" className="btn btn-oro" style={{ padding: '17px 28px' }}>Solicitar información mayorista</a>
          </div>
        </div>
      </section>

      <section className="seccion fondo-marfil" data-screen-label="Mayoristas · Cómo funciona">
        <div className="contenedor grilla-flujo">
          <span className="sobretitulo oro-oscuro">Cómo comprar por mayor</span>
          <p className="serif ancho" style={{ margin: 0, fontSize: 'clamp(28px,3.4vw,54px)', lineHeight: 1.18, letterSpacing: '-.01em', textWrap: 'pretty' }}>
            Explorás el catálogo <span className="oro">→</span> seleccionás productos <span className="oro">→</span> indicás cantidades aproximadas{' '}
            <span className="oro">→</span> solicitás tu cotización <span className="oro">→</span> <em>FM Importados te contacta con las condiciones.</em>
          </p>
        </div>
      </section>

      <section className="fondo-crema" data-screen-label="Mayoristas · Condiciones" style={{ padding: '0 var(--gutter) var(--seccion)' }}>
        <div className="contenedor grilla-flujo de-340" style={{ paddingTop: 'clamp(48px,6vw,88px)', borderTop: '1px solid var(--negro)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(32px,3.4vw,52px)', lineHeight: 1 }}>Condiciones comerciales</h2>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'var(--texto-2)', maxWidth: 380 }}>
              Las condiciones mayoristas se informan al solicitar tu cotización.
            </p>
          </div>
          <div className="ancho" style={{ display: 'flex', flexDirection: 'column' }}>
            {CONDICIONES.map(([k, v]) => (
              <div key={k} className="fila-dato" style={{ gridTemplateColumns: 'minmax(0,1fr) minmax(0,1.2fr)' }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>{k}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', fontSize: 15, color: 'var(--texto-2)' }}>
                  {v || 'Se informa al cotizar'}
                  {!v && <Pendiente />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="fondo-crema" data-screen-label="Mayoristas · Lista por volumen" style={{ padding: '0 var(--gutter) var(--seccion)' }}>
        <ListaVolumen productos={productos} />
      </section>

      <section id="formulario-mayorista" className="seccion fondo-negro" data-screen-label="Mayoristas · Formulario" style={{ scrollMarginTop: 60 }}>
        <FormularioMayorista productos={productos} />
      </section>
    </>
  );
}
