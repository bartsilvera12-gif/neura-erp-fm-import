/** Sale de las categorías del ERP. */
export type Categoria = string;

export interface Producto {
  slug: string;
  sku: string;
  categoria: Categoria;
  nombre: string;
  marca?: string | null;
  descripcion?: string | null;
  /** Solo si el nombre del producto la trae, como "100 ml". */
  presentacion: string | null;
  /** Precio final, en guaraníes. Con oferta vigente, ya descontado. */
  precio: number;
  /** El precio sin oferta, para mostrarlo tachado. */
  precio_anterior?: number | null;
  disponible?: boolean;
  destacado?: boolean;
  /** URL pública de la foto en Storage. */
  foto: string | null;
}

export function rutaCategoria(c: Categoria) {
  return c === 'Perfumes' ? '/perfumes/' : c === 'Cosmética' ? '/cosmetica/' : '/catalogo/';
}

export function rutaProducto(p: Pick<Producto, 'slug'>) {
  return `/producto/${p.slug}/`;
}

/** Sin Intl: el servidor y el navegador tienen que escribirlo igual. */
export function formatoPrecio(n: number) {
  return `Gs. ${String(n).replace(/\B(?=(\d{3})+$)/g, '.')}`;
}

export const ETIQUETA_PRECIO_MAYOR = 'Se informa al cotizar';
