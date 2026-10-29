export type Categoria = 'Perfumes' | 'Cosmética';

export interface Producto {
  slug: string;
  categoria: Categoria;
  /** Eau de Parfum, Eau de Toilette… En cosmética, la subcategoría. */
  tipo: string;
  nombre: string;
  marca: string;
  presentacion: string;
  /** Sin precio publicado se muestra "Consultar precio". */
  precio: string | null;
  disponibilidad: string | null;
  /** Qué foto va en el lugar del placeholder, mientras no haya fotos reales. */
  foto: string;
}

export const CATEGORIAS: Categoria[] = ['Perfumes', 'Cosmética'];

export function rutaCategoria(c: Categoria) {
  return c === 'Perfumes' ? '/perfumes/' : '/cosmetica/';
}

export function rutaProducto(p: Pick<Producto, 'slug'>) {
  return `/producto/${p.slug}/`;
}

export function etiquetaPrecio(p: Producto) {
  return p.precio ?? 'Consultar precio';
}

export function etiquetaDisponibilidad(p: Producto) {
  return p.disponibilidad ?? 'Disponibilidad a consultar';
}
