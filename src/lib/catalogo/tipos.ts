export type Categoria = 'Perfumes' | 'Cosmética';

export interface Producto {
  slug: string;
  sku: string;
  categoria: Categoria;
  nombre: string;
  /** Solo si el nombre del producto la trae, como "100 ml". */
  presentacion: string | null;
  /** Precio de venta por menor, en guaraníes. */
  precio: number;
  /** URL pública de la foto en Storage. */
  foto: string;
}

export const CATEGORIAS: Categoria[] = ['Perfumes', 'Cosmética'];

export function rutaCategoria(c: Categoria) {
  return c === 'Perfumes' ? '/perfumes/' : '/cosmetica/';
}

export function rutaProducto(p: Pick<Producto, 'slug'>) {
  return `/producto/${p.slug}/`;
}

/** Sin Intl: el servidor y el navegador tienen que escribirlo igual. */
export function formatoPrecio(n: number) {
  return `Gs. ${String(n).replace(/\B(?=(\d{3})+$)/g, '.')}`;
}

export const ETIQUETA_PRECIO_MAYOR = 'Se informa al cotizar';

/** El stock no se publica: se confirma por WhatsApp. */
export const ETIQUETA_DISPONIBILIDAD = 'Disponibilidad a consultar';
