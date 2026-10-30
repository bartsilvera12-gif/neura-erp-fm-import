import type { Metadata } from 'next';
import { Perfumes } from '@/components/Perfumes';
import { listarProductos } from '@/lib/catalogo/servicio';

export const metadata: Metadata = {
  title: 'Perfumes',
  description: 'Un perfume para cada estilo. Fragancias importadas por menor y por mayor.',
  alternates: { canonical: '/perfumes/' },
};

export default async function PaginaPerfumes() {
  const perfumes = await listarProductos('Perfumes');
  return (
    <>
      <section className="fondo-negro" data-screen-label="Perfumes · Hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="telon-y" style={{ position: 'relative', height: 'clamp(440px,74vh,760px)' }}>
          <div className="ph" style={{ position: 'absolute', inset: 0 }}>
            <img src="/fotos/categoria-perfumes.webp" alt="" className="foto-img" />
          </div>
          {/* La foto es clara: sin este velo las letras finas del título se pierden. */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(12,11,9,.92) 0%, rgba(12,11,9,.72) 42%, rgba(12,11,9,.18) 78%, transparent 100%)' }} />
        </div>
        <div className="aparece" style={{ '--retraso': '.5s', position: 'absolute', left: 0, right: 0, bottom: 0, padding: '0 var(--gutter) clamp(20px,3vw,40px)' } as React.CSSProperties}>
          <span className="sobretitulo oro" style={{ marginBottom: 14, display: 'block', fontSize: 13, color: 'var(--oro)' }}>Perfumes</span>
          <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(52px,9.4vw,168px)', lineHeight: 0.86, letterSpacing: '-.025em', textTransform: 'uppercase', fontWeight: 500, textShadow: '0 2px 24px rgba(0,0,0,.55)' }}>
            Un perfume<br />
            <em>para cada estilo.</em>
          </h1>
        </div>
      </section>
      <Perfumes perfumes={perfumes} />
    </>
  );
}
