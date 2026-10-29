import type { Metadata } from 'next';
import { Foto } from '@/components/Pendiente';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { listarProductos } from '@/lib/catalogo/servicio';

export const metadata: Metadata = {
  title: 'Cosmética',
  description: 'Cuidado y belleza en un solo lugar. Productos cosméticos importados.',
  alternates: { canonical: '/cosmetica/' },
};

export default async function PaginaCosmetica() {
  const cosmetica = await listarProductos('Cosmética');
  return (
    <>
      <section className="fondo-marfil" data-screen-label="Cosmética · Hero" style={{ padding: 'clamp(48px,7vw,104px) var(--gutter) clamp(40px,5vw,72px)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(32px,4vw,56px)' }}>
          <div className="aparece" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,420px),1fr))', gap: 24, alignItems: 'end' }}>
            <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(48px,6.4vw,104px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
              Cuidado y belleza <em className="oro-oscuro">en un solo lugar.</em>
            </h1>
            <p style={{ margin: 0, maxWidth: 420, justifySelf: 'end', fontSize: 17, lineHeight: 1.55, color: 'var(--texto-2)' }}>
              Explorá nuestra selección de productos cosméticos y encontrá lo que necesitás.
            </p>
          </div>
          <div className="mosaico-hero">
            <Foto texto="Envases · fondo claro" clara className="telon-y" style={{ height: 'clamp(220px,34vw,480px)' }} />
            <Foto texto="Colores de producto" clara b className="telon-y" style={{ height: 'clamp(160px,24vw,340px)', '--retraso': '.22s' } as React.CSSProperties} />
            <Foto texto="Detalle de textura" clara className="telon-y" style={{ height: 'clamp(200px,29vw,410px)', '--retraso': '.34s' } as React.CSSProperties} />
          </div>
        </div>
      </section>
      <section className="fondo-marfil" data-screen-label="Cosmética · Productos" style={{ padding: '0 var(--gutter) var(--seccion)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', borderTop: '1px solid var(--negro)', borderBottom: '1px solid var(--linea-clara)', padding: '16px 0' }}>
            <span className="rotulo" style={{ marginRight: 8 }}>Subcategorías</span>
            <span style={{ height: 36, display: 'flex', alignItems: 'center', padding: '0 14px', background: 'var(--negro)', color: 'var(--crema)', fontSize: 13 }}>Toda la cosmética</span>
            <span style={{ fontSize: 13, color: 'var(--texto-3)' }}>Las subcategorías se incorporan cuando se confirme el catálogo.</span>
          </div>
          <div className="grilla-productos de-4">
            {cosmetica.map((p) => (
              <TarjetaProducto key={p.slug} producto={p} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
