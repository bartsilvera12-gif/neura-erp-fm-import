# FM Importados

Tienda de perfumes y cosméticos, venta mayorista y minorista. El proyecto tiene dos partes:

- **Web** (este repo): multipágina y sin pasarela de pago. Los pedidos y cotizaciones se cierran por WhatsApp.
- **ERP** (pendiente): retail. Módulos: Dashboard, Caja, Inventario, Gastos, Compras, Reportes, Presupuestos y Clientes.

## Web

Next.js + TypeScript + Tailwind, exportada como sitio estático (`output: 'export'`), igual que la web de Total.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # genera /out
```

### Dónde está cada cosa

- `src/lib/sitio.ts`: datos comerciales (WhatsApp, correo, redes, condiciones mayoristas). Lo que está vacío se muestra como "Por confirmar".
- `src/lib/catalogo/servicio.ts`: único punto por donde la web lee productos. Hoy devuelve los productos de muestra de `mock.ts`; cuando el catálogo salga del ERP se reimplementa este archivo.
- `src/lib/tienda/almacenamiento.ts`: única capa que sabe que la lista de consultas vive en `localStorage`.
- `src/lib/tienda/mensajes.ts`: los textos que la web deja escritos en WhatsApp.
- `public/frasco-perfume.js`: la animación del frasco, el custom element del prototipo sin cambios.
- `prototipo/`: diseño original exportado de Claude Design (`FM Importados.dc.html` es la versión vigente).

### Publicar

- **Vercel** despliega desde `main` (QA).
- **Hostinger** despliega desde `master` (producción). Sirve la raíz del repo y el `.htaccess` la mapea a `/out`, así que después de tocar el código hay que correr `npm run build` y commitear `/out`.

Hay que pushear a las dos ramas.

### Pendiente del cliente

- Catálogo real: productos, marcas, presentaciones y fotos.
- Redes sociales: `@fm_importadospy` todavía no existe.
- Confirmar el logo.
- Teléfono, dirección, horarios y condiciones mayoristas (mínimo, precios, pago y envíos).
- Cuando todo eso esté confirmado, poner `MOSTRAR_PENDIENTES = false` en `sitio.ts`.
