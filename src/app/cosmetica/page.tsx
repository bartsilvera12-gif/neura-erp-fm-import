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
            <Foto texto="Envases sobre fondo claro" src="/fotos/cosmetica-envases.webp" clara className="telon-y" style={{ height: 'clamp(220px,34vw,480px)' }} />
            <Foto texto="Colores de producto" src="/fotos/categoria-cosmetica.webp" clara b className="telon-y" style={{ height: 'clamp(160px,24vw,340px)', '--retraso': '.22s' } as React.CSSProperties} />
            <Foto texto="Detalle de textura" src="/fotos/cosmetica-textura.webp" clara className="telon-y" style={{ height: 'clamp(200px,29vw,410px)', '--retraso': '.34s' } as React.CSSProperties} />
          </div>
        </div>
      </section>
      <section className="fondo-marfil" data-screen-label="Cosmética · Productos" style={{ padding: '0 var(--gutter) var(--seccion)' }}>
        <div className="contenedor" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
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
