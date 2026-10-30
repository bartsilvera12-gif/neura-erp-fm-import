import { listarProductos } from '@/lib/catalogo/servicio';

export const dynamic = 'force-static';

/** Lo que usa el buscador del encabezado. */
export async function GET() {
  return Response.json(await listarProductos());
}
