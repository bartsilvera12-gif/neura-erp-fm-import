import type { NextConfig } from 'next';

/**
 * Export estático: Hostinger sirve archivos, no corre Node. Igual que en Total,
 * no hay rutas de API, server actions ni middleware.
 *
 * `trailingSlash` escribe cada ruta como carpeta con su index.html, que es lo que
 * Apache entiende sin configuración extra.
 */
const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default config;
