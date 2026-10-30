import { SITIO } from '@/lib/sitio';
import RESPALDO from './productos.json';
import type { Categoria, Producto } from './tipos';

/** Cada cuánto, como mucho, la web vuelve a pedirle el catálogo al ERP. */
const REFRESCO_SEGUNDOS = 30;

/**
 * Único punto por donde la web lee productos. El catálogo sale del ERP: lo que se
 * tilda en el producto es lo que se ve acá. Si el ERP no responde, la web sigue
 * con la última copia guardada en el repo en vez de quedar vacía.
 */
async function catalogo(fresco = false): Promise<Producto[]> {
  try {
    const r = await fetch(
      // `no-store` tira error en páginas con revalidate: la URL distinta saltea la copia.
      `${SITIO.erpUrl}/api/public/catalogo${fresco ? `?t=${Date.now()}` : ''}`,
      { next: { revalidate: REFRESCO_SEGUNDOS, tags: ['catalogo'] } },
    );
    const j = await r.json();
    if (r.ok && j?.success && Array.isArray(j.productos)) return j.productos as Producto[];
  } catch {
    // cae al respaldo
  }
  return RESPALDO as unknown as Producto[];
}

export async function listarProductos(categoria?: Categoria): Promise<Producto[]> {
  const productos = await catalogo();
  return categoria ? productos.filter((p) => p.categoria === categoria) : productos;
}

export async function obtenerProducto(slug: string): Promise<Producto | null> {
  const guardado = (await catalogo()).find((p) => p.slug === slug);
  // Un producto recién creado puede no estar en la copia de los últimos segundos.
  return guardado ?? (await catalogo(true)).find((p) => p.slug === slug) ?? null;
}

export async function productosRelacionados(p: Producto, cantidad = 4): Promise<Producto[]> {
  const misma = (await catalogo()).filter((x) => x.categoria === p.categoria);
  const i = misma.findIndex((x) => x.slug === p.slug);
  return Array.from({ length: Math.min(cantidad, misma.length - 1) }, (_, n) => misma[(i + n + 1) % misma.length]);
}

/** Primero lo marcado como destacado en el ERP. */
export async function productosDestacados(cantidad = 4): Promise<Producto[]> {
  const productos = await catalogo();
  const marcados = productos.filter((p) => p.destacado);
  const conFoto = productos.filter((p) => p.foto && !p.destacado);
  const perfumes = conFoto.filter((p) => p.categoria === 'Perfumes');
  const cosmetica = conFoto.filter((p) => p.categoria === 'Cosmética');
  // Si hay menos marcados que lugares, se completa para que la grilla no quede con huecos.
  return [...marcados, ...[perfumes[40], cosmetica[0], perfumes[200], cosmetica[1]].filter(Boolean)].slice(0, cantidad);
}
