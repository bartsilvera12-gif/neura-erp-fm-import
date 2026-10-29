import Link from 'next/link';
import { FrascoPerfume } from '@/components/FrascoPerfume';
import { Logo } from '@/components/Iconos';
import { Foto } from '@/components/Pendiente';
import { TarjetaProducto } from '@/components/TarjetaProducto';
import { listarProductos, productosDestacados } from '@/lib/catalogo/servicio';
import { rutaProducto } from '@/lib/catalogo/tipos';
import { ACENTO_VERDE } from '@/lib/sitio';

const retraso = (s: number) => ({ '--retraso': `${s}s` }) as React.CSSProperties;

export default async function Inicio() {
  const [perfumes, destacados] = await Promise.all([listarProductos('Perfumes'), productosDestacados()]);

  return (
    <>
      {/* Escritorio: el titular con fotos intercaladas y la barra de dos formas de compra */}
      <section className="hero fondo-negro solo-escritorio" data-screen-label="Inicio · Showroom">
        <div className="hero-cuerpo">
          <h1>
            <span className="hero-linea aparece" style={retraso(0.2)}>
              <span>Lo que</span>
              <span className="hero-foto a ph telon-y" style={retraso(0.1)}>
                <img src="/fotos/hero-perfume.webp" alt="" className="foto-img" />
              </span>
            </span>
            <span className="hero-linea sangria aparece" style={retraso(0.35)}>
              <span className="hero-foto b ph ph-b telon-y" style={retraso(0.25)}>
                <img src="/fotos/hero-packaging.webp" alt="" className="foto-img" />
              </span>
              <span>buscás.</span>
            </span>
            <span className="hero-linea hero-bajada sangria aparece" style={retraso(0.5)}>
              <span>Para vos</span>
              <span className="hero-foto c ph telon-y" style={retraso(0.4)}>
                <img src="/fotos/hero-cosmetica.webp" alt="" className="foto-img" />
              </span>
              <span>o para tu negocio.</span>
            </span>
          </h1>
          <div className="sangria aparece" style={{ ...retraso(0.7), display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <p style={{ margin: 0, maxWidth: 400, fontSize: 15, lineHeight: 1.55, color: 'var(--gris-claro)', textWrap: 'pretty' }}>
              Perfumes, cosméticos y productos importados. Una selección para comprar al detalle o abastecer tu negocio.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/catalogo/" className="btn btn-crema">Explorar catálogo</Link>
              <Link href="/mayoristas/" className="btn btn-borde-oro">Comprar por mayor</Link>
            </div>
          </div>
        </div>
        <div className="hero-barra">
          <Link href="/catalogo/" className="foco foco-p">
            <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="foco-titulo">COMPRA PERSONAL</span>
              <span className="foco-sub">
                <span>Por menor · catálogo completo</span>
                <span>Encontrá tu próximo favorito.</span>
              </span>
            </span>
            <span className="foco-flecha">→</span>
          </Link>
          <Link href="/mayoristas/" className="foco foco-m">
            <span style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span className="foco-titulo">
                COMPRA MAYORISTA
                {ACENTO_VERDE && <span className="punto-verde" style={{ width: 7, height: 7 }} />}
              </span>
              <span className="foco-sub">
                <span>Por mayor · revendedores y comercios</span>
                <span>Productos para hacer crecer tu negocio.</span>
              </span>
            </span>
            <span className="foco-flecha">→</span>
          </Link>
        </div>
      </section>

      {/* Celular */}
      <section className="hero-movil fondo-negro solo-movil" data-screen-label="Inicio · Hero mobile">
        <div className="aparece" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <p className="serif" style={{ margin: 0, fontSize: 'clamp(56px,17vw,76px)', lineHeight: 0.86, letterSpacing: '-.02em', textTransform: 'uppercase' }}>
            Lo que<br />buscás.
          </p>
          <p className="serif oro" style={{ margin: 0, fontStyle: 'italic', fontSize: 'clamp(20px,5.8vw,26px)', lineHeight: 1.05, textTransform: 'uppercase' }}>
            Para vos o para tu negocio.
          </p>
        </div>
        <div className="mosaico-movil">
          <Foto texto="Perfume" src="/fotos/hero-perfume.webp" className="telon-y" />
          <Foto texto="Cosmética" src="/fotos/hero-cosmetica.webp" b className="telon-x" style={retraso(0.12)} />
          <Foto texto="Packaging" src="/fotos/hero-packaging.webp" className="telon-x" style={retraso(0.24)} />
        </div>
        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: 'var(--gris-claro)' }}>
          Perfumes, cosméticos y productos importados. Una selección para comprar al detalle o abastecer tu negocio.
        </p>
        <div className="tarjetas-compra">
          <Link href="/catalogo/" style={{ background: 'var(--crema)', color: 'var(--negro)' }}>
            <span className="rotulo-fila" style={{ color: 'var(--texto-3)' }}>Compra personal<span style={{ fontSize: 16, color: 'var(--negro)' }}>→</span></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="serif" style={{ fontSize: 23, lineHeight: 1 }}>Explorar catálogo</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.35, color: 'var(--texto-2)' }}>Encontrá tu próximo favorito.</span>
            </span>
          </Link>
          <Link href="/mayoristas/" style={{ border: '1px solid var(--oro)', color: 'var(--crema)', padding: 13 }}>
            <span className="rotulo-fila oro">Compra mayorista<span style={{ fontSize: 16 }}>→</span></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <span className="serif" style={{ fontStyle: 'italic', fontSize: 23, lineHeight: 1 }}>Comprar por mayor</span>
              <span style={{ fontSize: 12.5, lineHeight: 1.35, color: 'var(--gris-claro)' }}>Productos para hacer crecer tu negocio.</span>
            </span>
          </Link>
        </div>
      </section>

      <section className="fondo-marfil" data-screen-label="Inicio · Formas de comprar" style={{ padding: 'clamp(72px,9vw,140px) 0 0' }}>
        <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 var(--gutter)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, textAlign: 'center' }}>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(34px,4vw,64px)', lineHeight: 1.02, letterSpacing: '-.015em', textWrap: 'balance' }}>
            Una tienda. <em>Diferentes formas de comprar.</em>
          </h2>
          <p style={{ margin: 0, maxWidth: 520, fontSize: 17, lineHeight: 1.55, color: 'var(--texto-2)', textWrap: 'balance' }}>
            Desde ese perfume que estabas buscando hasta productos para abastecer tu negocio.
          </p>
        </div>
        <div className="division">
          <Link href="/catalogo/" className="division-lado">
            <span className="division-fondo">
              <img src="/fotos/compra-personal.webp" alt="" className="foto-img" loading="lazy" />
            </span>
            <span className="rotulo oro-oscuro" style={{ position: 'relative', fontWeight: 600, letterSpacing: '.2em', color: 'var(--oro-oscuro)' }}>Compra personal</span>
            <span className="division-grande"><span>POR</span><span>MENOR</span></span>
            <span className="division-pie">
              <span style={{ fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.4, color: '#3d3a33' }}>Encontrá tu próximo favorito.</span>
              <span>Catálogo →</span>
            </span>
          </Link>
          <Link href="/mayoristas/" className="division-lado">
            <span className="division-fondo" />
            <span className="division-foto">Fotografía · mercadería por volumen</span>
            <span className="rotulo" style={{ position: 'relative', fontWeight: 600, letterSpacing: '.2em', color: 'var(--oro-oscuro)' }}>Compra mayorista</span>
            <span className="division-grande" style={{ fontStyle: 'italic' }}><span>POR</span><span>MAYOR</span></span>
            <span className="division-pie">
              <span style={{ fontSize: 'clamp(13px,1.1vw,15px)', lineHeight: 1.4, color: '#3d3a33' }}>Productos para hacer crecer tu negocio.</span>
              <span>Mayoristas →</span>
            </span>
          </Link>
          <span className="division-barra">/</span>
        </div>
      </section>

      <section className="frasco-seccion fondo-negro solo-escritorio" data-screen-label="Inicio · Frasco">
        <FrascoPerfume />
        <div className="frasco-texto">
          <span className="sobretitulo oro">Perfumes</span>
          <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(40px,5.4vw,88px)', lineHeight: 0.95, letterSpacing: '-.02em' }}>
            Una fragancia empieza <em className="oro">en el aire.</em>
          </h2>
          <span className="capa-rotulo" style={{ letterSpacing: '.1em' }}>Tocá el frasco o desplazate</span>
        </div>
      </section>

      <section className="seccion fondo-negro" data-screen-label="Inicio · Selección de perfumes">
        <div className="contenedor-angosto" style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <span className="sobretitulo oro">Perfumes</span>
              <h2 className="serif solo-escritorio" style={{ margin: 0, fontSize: 'clamp(36px,4vw,60px)', lineHeight: 1 }}>Selección de perfumes</h2>
              <h2 className="serif solo-movil" style={{ margin: 0, fontSize: 'clamp(36px,4.4vw,68px)', lineHeight: 1, letterSpacing: '-.015em' }}>
                Una fragancia empieza <em className="oro">en el aire.</em>
              </h2>
            </div>
            <Link href="/perfumes/" className="enlace-linea borde-oro">Ver todos los perfumes →</Link>
          </div>
          <div className="seleccion">
            <div className="seleccion-panel solo-movil">
              <FrascoPerfume />
              <span className="capa-rotulo" style={{ position: 'absolute', left: 18, top: 16, pointerEvents: 'none', fontSize: 10, letterSpacing: '.1em' }}>Tocá el frasco</span>
            </div>
            {perfumes.slice(0, 5).map((p) => (
              <Link key={p.slug} href={rutaProducto(p)} className="seleccion-item">
                <span className="zoom-fondo" />
                <span className="ph-texto item-foto">{p.foto}</span>
                <span className="item-pie">
                  <span style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <span className="item-tipo">{p.tipo}</span>
                    <span className="item-nombre">{p.nombre}</span>
                  </span>
                  <span style={{ fontSize: 12, color: 'var(--oro)', whiteSpace: 'nowrap' }}>Consultar precio</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seccion fondo-crema" data-screen-label="Inicio · Categorías">
        <div className="contenedor-angosto">
          <span className="sobretitulo oro-oscuro" style={{ marginBottom: 24 }}>Explorá por categoría</span>
          <div style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
            {[
              ['Perfumes', '/perfumes/', 'Un perfume para cada estilo.', '/fotos/categoria-perfumes.webp'],
              ['Cosmética', '/cosmetica/', 'Cuidado y belleza en un solo lugar.', '/fotos/categoria-cosmetica.webp'],
            ].map(([nombre, href, bajada, foto]) => (
              <Link key={href} href={href} className="categoria-fila">
                <span className="categoria-foto ph ph-claro-b">
                  <img src={foto} alt="" className="foto-img" loading="lazy" />
                </span>
                <span style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <span className="categoria-nombre">{nombre}</span>
                  <span style={{ fontSize: 15, color: 'var(--texto-2)' }}>{bajada}</span>
                </span>
                <span className="categoria-flecha">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="fondo-negro" data-screen-label="Inicio · Mayoristas" style={{ paddingBottom: 'var(--seccion)' }}>
        <div className="franja-fotos">
          <Foto texto="Mercadería en caja" src="/fotos/mayorista-empaques.webp" />
          <Foto texto="Empaques" src="/fotos/hero-packaging.webp" b />
          <Foto texto="Surtido por volumen" />
        </div>
        <div className="contenedor-angosto" style={{ padding: '0 var(--gutter)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,440px),1fr))', gap: 'clamp(28px,5vw,80px)', alignItems: 'end' }}>
          <h2 className="serif" style={{ margin: 'clamp(-48px,-4vw,-24px) 0 0', position: 'relative', fontSize: 'clamp(42px,6vw,96px)', lineHeight: 0.95, letterSpacing: '-.02em', textTransform: 'uppercase', textWrap: 'balance' }}>
            Tu negocio también tiene <em className="oro">lugar</em> en FM.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 22, paddingBottom: 8 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: 'var(--gris-claro)', maxWidth: 460 }}>
              Para revendedores, emprendedores y comercios. Armá tu lista de productos, indicá cantidades aproximadas y pedí tu cotización.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link href="/mayoristas/" className="btn btn-oro">Conocer la propuesta mayorista</Link>
              <Link href="/catalogo/?modo=mayor" className="enlace-linea" style={{ alignSelf: 'center', borderBottomColor: 'var(--linea-oscura-2)', padding: '14px 4px' }}>
                Catálogo en modo mayorista
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="seccion fondo-marfil" data-screen-label="Inicio · Cosmética">
        <div className="contenedor-angosto" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,360px),1fr))', gap: 'clamp(28px,4vw,64px)', alignItems: 'center' }}>
          <div className="mosaico-cosmetica">
            <Foto texto="Envases sobre fondo claro" src="/fotos/cosmetica-envases.webp" clara style={{ gridRow: '1 / 3', aspectRatio: '3 / 4.4' }} />
            <Foto texto="Textura y color" src="/fotos/cosmetica-textura.webp" clara b style={{ aspectRatio: '1 / 1', marginTop: '40%' }} />
            <Foto texto="Detalle de packaging" src="/fotos/mayorista-empaques.webp" clara style={{ aspectRatio: '1 / 1' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 520 }}>
            <span className="sobretitulo oro-oscuro">Cosmética</span>
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(38px,4.4vw,68px)', lineHeight: 1, letterSpacing: '-.015em' }}>Cuidado y belleza en un solo lugar.</h2>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: 'var(--texto-2)' }}>
              Explorá nuestra selección de productos cosméticos y encontrá lo que necesitás.
            </p>
            <Link href="/cosmetica/" className="enlace-linea" style={{ marginTop: 8 }}>Ver cosmética →</Link>
          </div>
        </div>
      </section>

      <section className="seccion fondo-crema" data-screen-label="Inicio · Destacados" style={{ borderTop: '1px solid #e3dccd' }}>
        <div className="contenedor-angosto" style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
            <h2 className="serif" style={{ margin: 0, fontSize: 'clamp(32px,3.4vw,52px)', lineHeight: 1 }}>Productos destacados</h2>
            <Link href="/catalogo/" className="enlace-linea">Ir al catálogo →</Link>
          </div>
          <div className="grilla-productos de-4">
            {destacados.map((p) => (
              <TarjetaProducto key={p.slug} producto={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="fondo-marfil" data-screen-label="Inicio · Sobre FM" style={{ padding: 'clamp(72px,10vw,150px) var(--gutter)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, textAlign: 'center' }}>
          <Link href="/nosotros/" aria-label="Conocer FM Importados">
            <Logo alt="" tamano={64} />
          </Link>
          <p className="serif" style={{ margin: 0, fontSize: 'clamp(26px,3vw,42px)', lineHeight: 1.25, textWrap: 'balance' }}>
            FM Importados es una tienda dedicada a la comercialización de perfumes, cosméticos y productos importados, con atención tanto a compradores particulares como a clientes mayoristas.
          </p>
          <Link href="/nosotros/" className="enlace-linea" style={{ alignSelf: 'center' }}>Conocer FM Importados</Link>
        </div>
      </section>
    </>
  );
}
