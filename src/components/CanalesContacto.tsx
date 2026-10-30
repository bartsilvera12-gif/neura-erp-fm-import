import Link from 'next/link';
import { enlaceWhatsapp, SITIO } from '@/lib/sitio';
import { IconoInstagram } from './Iconos';

const FILAS: { clave: string; valor: string; href?: string }[] = [
  { clave: 'WhatsApp', valor: SITIO.whatsapp && SITIO.whatsappEtiqueta, href: SITIO.whatsapp && enlaceWhatsapp() },
  { clave: 'Teléfono', valor: SITIO.telefono },
  { clave: 'Correo', valor: SITIO.correo, href: SITIO.correo && `mailto:${SITIO.correo}` },
  { clave: 'Dirección', valor: SITIO.direccion },
  { clave: 'Horarios', valor: SITIO.horarios },
  { clave: 'Instagram', valor: SITIO.instagramUsuario, href: SITIO.instagram },
  { clave: 'Facebook', valor: SITIO.facebook, href: SITIO.facebook },
];

/** Lo que no está cargado en sitio.ts no se muestra. */
export function CanalesContacto() {
  return (
    <div className="ancho" style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--negro)' }}>
      {FILAS.filter((f) => f.valor).map((f) => (
        <div key={f.clave} className="fila-dato">
          <span className="sobretitulo" style={{ letterSpacing: '.18em', color: 'var(--texto-3)' }}>{f.clave}</span>
          <span className="dato-valor">
            {f.href ? (
              <a href={f.href} target={f.href.startsWith('mailto') ? undefined : '_blank'} rel="noopener">{f.valor}</a>
            ) : (
              <span>{f.valor}</span>
            )}
          </span>
        </div>
      ))}
      {SITIO.instagram && (
        <a href={SITIO.instagram} target="_blank" rel="noopener" className="btn btn-negro" style={{ alignSelf: 'flex-start', marginTop: 28, height: 52, padding: '0 20px', gap: 12 }}>
          <IconoInstagram />
          Seguinos en Instagram
        </a>
      )}
      <Link href="/preguntas-frecuentes/" className="enlace-linea" style={{ marginTop: 20 }}>Ver preguntas frecuentes →</Link>
    </div>
  );
}
