/**
 * Única capa que sabe que la lista de consultas vive en localStorage.
 *
 * Cuando los pedidos web entren al ERP se reimplementa acá y el resto de la
 * tienda no se entera. Ningún componente debería tocar localStorage directo.
 */
export interface LineaConsulta {
  slug: string;
  cantidad: number;
}

const CLAVE = 'fm_consultas';

export function leerConsultas(): LineaConsulta[] {
  try {
    const crudo = JSON.parse(localStorage.getItem(CLAVE) ?? '[]');
    if (!Array.isArray(crudo)) return [];
    return crudo
      .map((l) => ({ slug: String(l.slug ?? ''), cantidad: Number(l.cantidad ?? l.qty) || 1 }))
      .filter((l) => l.slug);
  } catch {
    return [];
  }
}

export function guardarConsultas(lineas: LineaConsulta[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(lineas));
  } catch {
    // Navegación privada o almacenamiento bloqueado: la lista dura lo que la pestaña.
  }
}
