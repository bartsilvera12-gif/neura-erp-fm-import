import type { Categoria, Producto } from './tipos';

/**
 * Productos de muestra del prototipo. Se van cuando el catálogo salga del ERP:
 * nadie fuera de servicio.ts debería importar este archivo.
 */
const FILAS: [string, Categoria, string, string, string][] = [
  ['fragancia-muestra-a', 'Perfumes', 'Eau de Parfum', 'Fragancia de muestra A', 'Frasco · fondo limpio'],
  ['fragancia-muestra-b', 'Perfumes', 'Eau de Toilette', 'Fragancia de muestra B', 'Frasco y caja'],
  ['fragancia-muestra-c', 'Perfumes', 'Eau de Parfum', 'Fragancia de muestra C', 'Detalle de etiqueta'],
  ['fragancia-muestra-d', 'Perfumes', 'Eau de Cologne', 'Fragancia de muestra D', 'Frasco · luz lateral'],
  ['fragancia-muestra-e', 'Perfumes', 'Eau de Toilette', 'Fragancia de muestra E', 'Frasco · fondo limpio'],
  ['fragancia-muestra-f', 'Perfumes', 'Eau de Parfum', 'Fragancia de muestra F', 'Frasco y caja'],
  ['fragancia-muestra-g', 'Perfumes', 'Eau de Parfum', 'Fragancia de muestra G', 'Detalle de tapa'],
  ['fragancia-muestra-h', 'Perfumes', 'Eau de Toilette', 'Fragancia de muestra H', 'Frasco · fondo limpio'],
  ['cosmetico-muestra-a', 'Cosmética', 'Tipo a confirmar', 'Cosmético de muestra A', 'Envase · fondo claro'],
  ['cosmetico-muestra-b', 'Cosmética', 'Tipo a confirmar', 'Cosmético de muestra B', 'Envase y caja'],
  ['cosmetico-muestra-c', 'Cosmética', 'Tipo a confirmar', 'Cosmético de muestra C', 'Textura / color'],
  ['cosmetico-muestra-d', 'Cosmética', 'Tipo a confirmar', 'Cosmético de muestra D', 'Envase · fondo claro'],
  ['cosmetico-muestra-e', 'Cosmética', 'Tipo a confirmar', 'Cosmético de muestra E', 'Detalle de etiqueta'],
];

export const PRODUCTOS_MUESTRA: Producto[] = FILAS.map(([slug, categoria, tipo, nombre, foto]) => ({
  slug,
  categoria,
  tipo,
  nombre,
  foto,
  marca: 'Marca a confirmar',
  presentacion: 'Presentación a confirmar',
  precio: null,
  disponibilidad: null,
}));
