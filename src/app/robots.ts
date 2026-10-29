import type { MetadataRoute } from 'next';
import { SITIO } from '@/lib/sitio';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: '/consultas/' },
    sitemap: new URL('/sitemap.xml', SITIO.url).toString(),
  };
}
