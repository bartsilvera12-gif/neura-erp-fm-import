import { listarProductos } from '@/lib/catalogo/servicio';

export const revalidate = 30;


/** Lo que usa el buscador del encabezado. */
export async function GET() {
  return Response.json(await listarProductos());
}
