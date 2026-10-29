/**
 * Datos comerciales de FM Importados. Lo que está vacío todavía no lo confirmó
 * el cliente: la web lo muestra como "Por confirmar" en vez de inventarlo.
 */
export const SITIO = {
  nombre: 'FM Importados',
  descripcion:
    'Perfumes, cosméticos y productos importados en Paraguay. Compra por menor o por mayor para tu negocio.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://neura-erp-fm-import.vercel.app',
  /** Internacional sin signos, que es lo que pide wa.me */
  whatsapp: '595992782803',
  whatsappEtiqueta: '+595 992 782 803',
  telefono: '',
  correo: 'fmimportados2026@gmail.com',
  direccion: '',
  horarios: '',
  /** La cuenta todavía no existe: hay que crearla con el cliente. */
  instagram: 'https://www.instagram.com/fm_importadospy',
  instagramUsuario: '@fm_importadospy',
  facebook: '',
} as const;

/** Condiciones mayoristas. Vacías se muestran como "Se informa al cotizar". */
export const CONDICIONES_MAYORISTAS = {
  minimo: '',
  precios: '',
  pago: '',
  envios: '',
} as const;

/**
 * Marcas de "pendiente de confirmación" sobre textos y datos provisorios.
 * Se apaga cuando el cliente confirme el contenido real.
 */
export const MOSTRAR_PENDIENTES = true;

/** Punto verde del logo junto a lo mayorista. En el diseño quedó apagado. */
export const ACENTO_VERDE = false;

export function enlaceWhatsapp(texto?: string) {
  const base = `https://wa.me/${SITIO.whatsapp}`;
  return texto ? `${base}?text=${encodeURIComponent(texto)}` : base;
}

export const NAVEGACION = [
  { etiqueta: 'Inicio', href: '/' },
  { etiqueta: 'Catálogo', href: '/catalogo/' },
  { etiqueta: 'Perfumes', href: '/perfumes/' },
  { etiqueta: 'Cosmética', href: '/cosmetica/' },
  { etiqueta: 'Mayoristas', href: '/mayoristas/' },
  { etiqueta: 'Nosotros', href: '/nosotros/' },
  { etiqueta: 'Contacto', href: '/contacto/' },
] as const;
