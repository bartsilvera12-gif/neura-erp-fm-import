import type { Metadata } from 'next';
import { Consultas } from '@/components/Consultas';
import { listarProductos } from '@/lib/catalogo/servicio';

export const revalidate = 30;

export const metadata: Metadata = {
  title: 'Tu carrito',
  robots: { index: false },
};

export default async function PaginaConsultas() {
  return <Consultas productos={await listarProductos()} />;
}
