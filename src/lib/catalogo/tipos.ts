export type Categoria = 'Perfumes' | 'Cosmética';

export interface Producto {
  slug: string;
  categoria: Categoria;
  nombre: string;
  /** Solo si el nombre del producto la trae, como "100 ml". */
  presentacion: string | null;
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

/** El catálogo todavía no publica precios ni stock: se confirman por WhatsApp. */
export const ETIQUETA_PRECIO = 'Consultar precio';
export const ETIQUETA_DISPONIBILIDAD = 'Disponibilidad a consultar';
