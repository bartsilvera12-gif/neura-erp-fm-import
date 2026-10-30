/**
 * Genera el respaldo src/lib/catalogo/productos.json, que la web usa solo si el ERP
 * no responde. El catálogo en vivo sale de /api/public/catalogo.
 *
 * Este repo es público: la consulta pide solo lo que se puede mostrar, nunca
 * costos ni stock exacto. Publica perfumes y cosmética con foto y stock.
 *
 *   DATABASE_URL=postgres://… node scripts/exportar-catalogo.mjs
 */
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const URL_FOTOS = 'https://api.neura.com.py/storage/v1/object/public/productos-imagenes/';
const CATEGORIAS = { PERFUMES: 'Perfumes', 'COSMÉTICA': 'Cosmética' };

if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL');

const consulta = `
  SELECT coalesce(json_agg(x ORDER BY x.nombre, x.sku), '[]')
  FROM (
    SELECT p.sku, p.nombre, c.nombre AS categoria, p.imagen_path, round(p.precio_venta)::bigint AS precio
    FROM fmimport.productos p
    JOIN fmimport.categorias_productos c ON c.id = p.categoria_principal_id
    WHERE p.sku LIKE 'FM-%'
      AND p.activo
      AND p.stock_actual > 0
      AND p.imagen_path IS NOT NULL
      AND c.nombre IN ('PERFUMES', 'COSMÉTICA')
  ) x`;

const salida = execFileSync('psql', [process.env.DATABASE_URL, '-At', '-c', consulta], {
  encoding: 'utf8',
  env: { ...process.env, PGOPTIONS: '-c default_transaction_read_only=on' },
  maxBuffer: 1 << 26,
});

const aSlug = (s) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const productos = JSON.parse(salida).map((f) => {
  const ml = f.nombre.match(/(\d+)\s?ML\b/i);
  return {
    // El SKU va en el slug porque hay nombres repetidos.
    slug: aSlug(`${f.nombre} ${f.sku}`),
    sku: f.sku,
    categoria: CATEGORIAS[f.categoria],
    nombre: f.nombre.trim().replace(/\s+/g, ' '),
    presentacion: ml ? `${ml[1]} ml` : null,
    precio: Number(f.precio),
    foto: URL_FOTOS + f.imagen_path,
  };
});

writeFileSync(new URL('../src/lib/catalogo/productos.json', import.meta.url), JSON.stringify(productos, null, 0).replace(/\},\{/g, '},\n{') + '\n');
console.log(`${productos.length} productos`);
