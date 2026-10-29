import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Hanken_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { Encabezado } from '@/components/Encabezado';
import { Pie } from '@/components/Pie';
import { listarProductos } from '@/lib/catalogo/servicio';
import { SITIO } from '@/lib/sitio';
import { ProveedorTienda } from '@/lib/tienda/contexto';
import './globals.css';

const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-bodoni',
  display: 'swap',
});

const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-hanken',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-plex-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: {
    default: `${SITIO.nombre} · Perfumes, cosmética y productos importados`,
    template: `%s · ${SITIO.nombre}`,
  },
  description: SITIO.descripcion,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'es_PY',
    siteName: SITIO.nombre,
    title: `${SITIO.nombre} · Perfumes, cosmética y productos importados`,
    description: SITIO.descripcion,
    url: SITIO.url,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0c0b09',
  width: 'device-width',
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const productos = await listarProductos();
  return (
    <html lang="es-PY" className={`${bodoni.variable} ${hanken.variable} ${mono.variable}`}>
      <body>
        <ProveedorTienda>
          <div className="sitio">
            <Encabezado productos={productos} />
            {children}
            <Pie />
          </div>
        </ProveedorTienda>
      </body>
    </html>
  );
}
