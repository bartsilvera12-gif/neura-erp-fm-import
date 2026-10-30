import type { MetadataRoute } from 'next';
import { listarProductos } from '@/lib/catalogo/servicio';
import { rutaProducto } from '@/lib/catalogo/tipos';
import { SITIO } from '@/lib/sitio';

export const revalidate = 30;


const PAGINAS = ['/', '/catalogo/', '/perfumes/', '/cosmetica/', '/mayoristas/', '/nosotros/', '/contacto/', '/preguntas-frecuentes/'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const productos = await listarProductos();
  return [...PAGINAS, ...productos.map(rutaProducto)].map((ruta) => ({ url: new URL(ruta, SITIO.url).toString() }));
}
