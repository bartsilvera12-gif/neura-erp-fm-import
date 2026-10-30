import PRODUCTOS_JSON from './productos.json';
import type { Categoria, Producto } from './tipos';

const PRODUCTOS = PRODUCTOS_JSON as Producto[];

/**
 * Único punto por donde la web lee productos. El catálogo sale del ERP con
 * scripts/exportar-catalogo.mjs y queda fijo en el build.
 */
export async function listarProductos(categoria?: Categoria): Promise<Producto[]> {
  return categoria ? PRODUCTOS.filter((p) => p.categoria === categoria) : PRODUCTOS;
}

export async function obtenerProducto(slug: string): Promise<Producto | null> {
  return PRODUCTOS.find((p) => p.slug === slug) ?? null;
}

export async function productosRelacionados(p: Producto, cantidad = 4): Promise<Producto[]> {
  const misma = PRODUCTOS.filter((x) => x.categoria === p.categoria);
  const i = misma.findIndex((x) => x.slug === p.slug);
  return Array.from({ length: Math.min(cantidad, misma.length - 1) }, (_, n) => misma[(i + n + 1) % misma.length]);
}

/** Los cuatro de la portada: dos perfumes y dos cosméticos intercalados. */
export async function productosDestacados(): Promise<Producto[]> {
  const perfumes = PRODUCTOS.filter((p) => p.categoria === 'Perfumes');
  const cosmetica = PRODUCTOS.filter((p) => p.categoria === 'Cosmética');
  return [perfumes[40], cosmetica[0], perfumes[200], cosmetica[1]].filter(Boolean);
}
