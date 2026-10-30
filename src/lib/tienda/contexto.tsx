'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Producto } from '@/lib/catalogo/tipos';
import { SITIO } from '@/lib/sitio';
import { guardarConsultas, leerConsultas, type LineaConsulta } from './almacenamiento';

interface Tienda {
  lineas: LineaConsulta[];
  unidades: number;
  /** false hasta leer localStorage: evita mostrar "lista vacía" por un instante. */
  lista: boolean;
  agregar: (slug: string, cantidad: number, nombre: string) => void;
  cambiar: (slug: string, delta: number) => void;
  quitar: (slug: string) => void;
  vaciar: () => void;
  tiene: (slug: string) => boolean;
  avisar: (texto: string) => void;
  /** Precio y disponibilidad del ERP; sin respuesta, lo del build. */
  vivo: (p: Pick<Producto, 'sku' | 'precio'>) => { precio: number; disponible: boolean };
  /** El catálogo recién leído del ERP: incluye lo publicado hace segundos. */
  productosVivos: Producto[];
}

const Contexto = createContext<Tienda | null>(null);

export function ProveedorTienda({ children }: { children: React.ReactNode }) {
  const [lineas, setLineas] = useState<LineaConsulta[]>([]);
  const [lista, setLista] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const ruta = usePathname();
  const temporizador = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [catalogo, setCatalogo] = useState<Record<string, { precio: number; disponible: boolean }>>({});
  const [productosVivos, setProductosVivos] = useState<Producto[]>([]);

  useEffect(() => {
    setLineas(leerConsultas());
    setLista(true);
    fetch(`${SITIO.erpUrl}/api/public/catalogo`)
      .then((r) => r.json())
      .then((j) => {
        if (!j?.success) return;
        setCatalogo(j.data);
        setProductosVivos(j.productos ?? []);
      })
      .catch(() => {});
  }, []);

  const actualizar = useCallback((f: (l: LineaConsulta[]) => LineaConsulta[]) => {
    setLineas((prev) => {
      const nuevas = f(prev);
      guardarConsultas(nuevas);
      return nuevas;
    });
  }, []);

  const avisar = useCallback((texto: string) => {
    clearTimeout(temporizador.current);
    setAviso(texto);
    temporizador.current = setTimeout(() => setAviso(null), 2600);
  }, []);

  const valor = useMemo<Tienda>(
    () => ({
      lineas,
      lista,
      unidades: lineas.reduce((a, l) => a + l.cantidad, 0),
      agregar: (slug, cantidad, nombre) => {
        actualizar((prev) => {
          const i = prev.findIndex((l) => l.slug === slug);
          if (i < 0) return [...prev, { slug, cantidad }];
          return prev.map((l, j) => (j === i ? { ...l, cantidad: l.cantidad + cantidad } : l));
        });
        avisar(`${nombre} · ${cantidad} u. agregadas`);
      },
      cambiar: (slug, delta) =>
        actualizar((prev) =>
          prev.map((l) => (l.slug === slug ? { ...l, cantidad: Math.max(1, l.cantidad + delta) } : l)),
        ),
      quitar: (slug) => actualizar((prev) => prev.filter((l) => l.slug !== slug)),
      vaciar: () => actualizar(() => []),
      vivo: (p) => catalogo[p.sku] ?? { precio: p.precio, disponible: true },
      productosVivos,
      tiene: (slug) => lineas.some((l) => l.slug === slug),
      avisar,
    }),
    [lineas, lista, actualizar, avisar, catalogo, productosVivos],
  );

  return (
    <Contexto.Provider value={valor}>
      {children}
      {aviso && (
        <div role="status" className={ruta.startsWith('/consultas') && lineas.length ? 'aviso sobre-barra' : 'aviso'}>
          <span>{aviso}</span>
          <Link href="/consultas/">Ver carrito →</Link>
        </div>
      )}
    </Contexto.Provider>
  );
}

export function useTienda() {
  const t = useContext(Contexto);
  if (!t) throw new Error('useTienda va dentro de ProveedorTienda');
  return t;
}
