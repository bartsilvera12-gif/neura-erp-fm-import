import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { DetalleProducto } from '@/components/DetalleProducto';
import { listarProductos, obtenerProducto, productosRelacionados } from '@/lib/catalogo/servicio';
import { rutaProducto } from '@/lib/catalogo/tipos';

/** Export estático: una página por producto, generada en el build. */
export async function generateStaticParams() {
  return (await listarProductos()).map((p) => ({ slug: p.slug }));
}
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await obtenerProducto((await params).slug);
  if (!p) return {};
  return {
    title: p.nombre,
    description: `${p.nombre} · ${p.categoria}. Consultá precio y disponibilidad por WhatsApp.`,
    alternates: { canonical: rutaProducto(p) },
  };
}

export default async function PaginaProducto({ params }: Props) {
  const p = await obtenerProducto((await params).slug);
  if (!p) notFound();
  return <DetalleProducto producto={p} relacionados={await productosRelacionados(p)} />;
}
