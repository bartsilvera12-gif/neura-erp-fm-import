import { SITIO } from '@/lib/sitio';

export interface NuevoPedido {
  nombre: string;
  telefono: string;
  negocio: string;
  ciudad: string;
  direccion: string;
  observaciones: string;
  tipo: 'minorista' | 'mayorista';
  modo: 'retiro' | 'envio';
  /** Campo trampa para bots: una persona lo deja vacío. */
  sitio: string;
  items: { sku: string; cantidad: number }[];
}

export interface PedidoCreado {
  numero: string;
  total: number;
}

/** Crea el pedido en el ERP. El precio final lo calcula el ERP, no el navegador. */
export async function crearPedido(pedido: NuevoPedido): Promise<PedidoCreado> {
  const r = await fetch(`${SITIO.erpUrl}/api/public/pedido-web`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  }).catch(() => null);
  const cuerpo = await r?.json().catch(() => null);
  if (!r?.ok || !cuerpo?.success) {
    throw new Error(cuerpo?.error ?? 'No pudimos registrar el pedido. Probá de nuevo o escribinos por WhatsApp.');
  }
  return cuerpo.data;
}
