'use client';

import { formatoPrecio, type Producto } from '@/lib/catalogo/tipos';
import { useTienda } from '@/lib/tienda/contexto';

/** Precio del ERP dentro de páginas del servidor. */
export function PrecioVivo({ producto }: { producto: Producto }) {
  const { precio, disponible } = useTienda().vivo(producto);
  return <>{disponible ? formatoPrecio(precio) : 'Sin stock'}</>;
}
