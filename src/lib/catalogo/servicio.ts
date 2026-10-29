import { PRODUCTOS_MUESTRA } from './mock';
import type { Categoria, Producto } from './tipos';

/**
 * Único punto por donde la web lee productos.
 *
 * Hoy resuelve contra los productos de muestra, pero ya devuelve promesas: es la
 * firma que va a necesitar cuando el catálogo salga del schema del ERP. Ese día
 * se reimplementa este archivo y las páginas quedan igual.
 */
export async function listarProductos(categoria?: Categoria): Promise<Producto[]> {
  return categoria ? PRODUCTOS_MUESTRA.filter((p) => p.categoria === categoria) : PRODUCTOS_MUESTRA;
}

export async function obtenerProducto(slug: string): Promise<Producto | null> {
  return PRODUCTOS_MUESTRA.find((p) => p.slug === slug) ?? null;
}

export async function productosRelacionados(p: Producto, cantidad = 4): Promise<Producto[]> {
  return PRODUCTOS_MUESTRA.filter((x) => x.categoria === p.categoria && x.slug !== p.slug).slice(0, cantidad);
}

/** Los cuatro de la portada, como en el diseño: dos perfumes y dos cosméticos intercalados. */
export async function productosDestacados(): Promise<Producto[]> {
  return [0, 8, 3, 10].map((i) => PRODUCTOS_MUESTRA[i]);
}
