import type { Metadata } from 'next';
import { Catalogo } from '@/components/Catalogo';
import { listarProductos } from '@/lib/catalogo/servicio';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Catálogo',
  description: 'Perfumes y cosmética importados. Comprá por menor o armá tu lista de cotización mayorista.',
  alternates: { canonical: '/catalogo/' },
};

export default async function PaginaCatalogo() {
  return <Catalogo productos={await listarProductos()} />;
}
