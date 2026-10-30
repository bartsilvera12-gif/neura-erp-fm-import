import { formatoPrecio, type Producto } from '@/lib/catalogo/tipos';
import type { LineaConsulta } from './almacenamiento';

/**
 * Textos que la web deja escritos en WhatsApp. La tienda no cobra ni reserva:
 * todo pedido termina en un chat y queda sujeto a confirmación comercial.
 */

export function mensajeProducto(p: Producto, cantidad: number) {
  return `Hola FM Importados, quiero consultar por: ${p.nombre}. Precio: ${formatoPrecio(p.precio)}. Cantidad: ${cantidad}. ¿Tienen disponibilidad?`;
}

export function mensajePedidoEnviado(numero: string) {
  return `Hola FM Importados, hice el pedido ${numero} en la web.`;
}

export interface DatosConsulta {
  mayorista: boolean;
  negocio: string;
  ciudad: string;
  observaciones: string;
}

export function mensajeConsulta(lineas: LineaConsulta[], productos: Producto[], d: DatosConsulta) {
  const detalle = lineas.map((l) => {
    const p = productos.find((x) => x.slug === l.slug);
    const precio = p && !d.mayorista ? ` · ${formatoPrecio(p.precio * l.cantidad)}` : '';
    return `• ${p?.nombre ?? l.slug} × ${l.cantidad}${precio}`;
  });
  const total = lineas.reduce((t, l) => t + (productos.find((x) => x.slug === l.slug)?.precio ?? 0) * l.cantidad, 0);
  return [
    'Hola FM Importados, quiero hacer una consulta.',
    `Tipo: ${d.mayorista ? 'Cotización mayorista' : 'Pedido minorista'}`,
    d.mayorista && d.negocio ? `Negocio: ${d.negocio}` : null,
    d.mayorista && d.ciudad ? `Ciudad: ${d.ciudad}` : null,
    '',
    ...detalle,
    d.mayorista ? null : `Subtotal estimado: ${formatoPrecio(total)}`,
    d.observaciones ? `\nObservaciones: ${d.observaciones}` : null,
    '',
    'Entiendo que el pedido queda sujeto a confirmación comercial.',
  ]
    .filter((x) => x !== null)
    .join('\n');
}

export interface SolicitudMayorista {
  nombre: string;
  negocio: string;
  ciudad: string;
  whatsapp: string;
  correo: string;
  productos: string;
  cantidad: string;
  mensaje: string;
}

export function mensajeMayorista(v: SolicitudMayorista) {
  return [
    'Hola FM Importados, quiero solicitar una cotización mayorista.',
    `Nombre: ${v.nombre}`,
    `Negocio: ${v.negocio}`,
    `Ciudad: ${v.ciudad}`,
    `WhatsApp: ${v.whatsapp}`,
    v.correo ? `Correo: ${v.correo}` : null,
    v.productos ? `\nProductos de interés:\n${v.productos}` : null,
    v.cantidad ? `Cantidad aproximada: ${v.cantidad}` : null,
    v.mensaje ? `\nMensaje: ${v.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n');
}
