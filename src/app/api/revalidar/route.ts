import { revalidatePath, revalidateTag } from 'next/cache';

/** El ERP llama acá al guardar un producto: la web muestra el cambio al instante. */
export async function POST(request: Request) {
  const token = process.env.REVALIDAR_TOKEN;
  if (!token || request.headers.get('x-revalidar-token') !== token) {
    return Response.json({ ok: false }, { status: 401 });
  }
  revalidateTag('catalogo', { expire: 0 });
  revalidatePath('/', 'layout');
  return Response.json({ ok: true });
}
