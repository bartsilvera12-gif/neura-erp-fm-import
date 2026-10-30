import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetalleProducto } from '@/components/DetalleProducto';
import { listarProductos, obtenerProducto, productosRelacionados } from '@/lib/catalogo/servicio';
import { formatoPrecio, rutaProducto } from '@/lib/catalogo/tipos';

export const revalidate = 30;

/** Las que falten se arman al primer pedido: un producto nuevo no pide desplegar. */
export async function generateStaticParams() {
  return (await listarProductos()).map((p) => ({ slug: p.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obtenerProducto((await params).slug);
  if (!p) return {};
  return {
    title: p.nombre,
    description: `${p.nombre} · ${p.categoria}. ${formatoPrecio(p.precio)}. Consultá disponibilidad por WhatsApp.`,
    alternates: { canonical: rutaProducto(p) },
  };
}

export default async function PaginaProducto({ params }: Props) {
  const p = await obtenerProducto((await params).slug);
  if (!p) notFound();
  return <DetalleProducto producto={p} relacionados={await productosRelacionados(p)} />;
}
