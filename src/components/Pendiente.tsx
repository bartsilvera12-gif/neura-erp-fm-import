import { MOSTRAR_PENDIENTES } from '@/lib/sitio';

/** Marca de contenido provisorio. Desaparece toda junta con MOSTRAR_PENDIENTES. */
export function Pendiente({ children = 'Pendiente de confirmación', grande = false }: { children?: React.ReactNode; grande?: boolean }) {
  if (!MOSTRAR_PENDIENTES) return null;
  return <span className={grande ? 'pendiente pendiente-grande' : 'pendiente'}>{children}</span>;
}

/** Lugar reservado para una foto. Con `src` muestra la foto; sin ella, el rótulo de lo que falta. */
export function Foto({
  texto,
  src,
  clara = false,
  b = false,
  className = '',
  style,
}: {
  texto: string;
  src?: string;
  clara?: boolean;
  b?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const fondo = clara ? (b ? 'ph-claro-b' : 'ph-claro') : b ? 'ph-b' : '';
  return (
    <div className={`ph ${fondo} ${className}`} style={style}>
      {src ? <img src={src} alt={texto} className="foto-img" loading="lazy" /> : <span className="ph-texto">{texto}</span>}
    </div>
  );
}
