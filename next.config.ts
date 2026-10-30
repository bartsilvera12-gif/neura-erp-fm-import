import type { NextConfig } from 'next';

/**
 * Corre como servidor en Coolify: las páginas se arman con el catálogo del ERP y
 * se refrescan solas, sin desplegar.
 */
const config: NextConfig = {
  output: 'standalone',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default config;
