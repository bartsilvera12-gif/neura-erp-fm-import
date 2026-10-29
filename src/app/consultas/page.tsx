import type { Metadata } from 'next';
import { Consultas } from '@/components/Consultas';
import { listarProductos } from '@/lib/catalogo/servicio';

export const metadata: Metadata = {
  title: 'Mi lista de consultas',
  robots: { index: false },
};

export default async function PaginaConsultas() {
  return <Consultas productos={await listarProductos()} />;
}
