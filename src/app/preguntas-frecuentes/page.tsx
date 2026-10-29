import type { Metadata } from 'next';
import Link from 'next/link';
import { Preguntas, type Pregunta } from '@/components/Preguntas';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes',
  description: 'Cómo comprar por menor o por mayor en FM Importados, cotizaciones y contacto.',
  alternates: { canonical: '/preguntas-frecuentes/' },
};

const PREGUNTAS: Pregunta[] = [
  { q: '¿Venden por mayor y por menor?', a: 'Sí. FM Importados atiende a compradores particulares y a clientes mayoristas: revendedores, emprendedores y comercios.' },
  { q: '¿Cómo puedo consultar precios mayoristas?', a: 'Completá el formulario de la página Mayoristas o armá tu lista con cantidades aproximadas y enviala por WhatsApp. Las condiciones se informan al cotizar.' },
  { q: '¿Cómo realizo un pedido?', a: 'Agregá productos a tu lista de consultas, ajustá cantidades y enviá el resumen por WhatsApp. La web no procesa pagos: el pedido queda sujeto a confirmación comercial.' },
  { q: '¿Puedo consultar disponibilidad?', a: 'Sí. Desde cada producto podés usar "Consultar por WhatsApp" o incluirlo en tu lista de consultas.' },
  { q: '¿Cómo me comunico con la tienda?', a: 'A través de los canales publicados en la página de Contacto.', pendiente: true },
  { q: '¿Cómo solicito una cotización?', a: 'En tu lista de consultas elegí "Cotización mayorista", completá los datos de tu negocio y enviá la lista por WhatsApp.' },
  { q: '¿Realizan envíos?', a: 'La información sobre envíos se publicará cuando esté definida. Mientras tanto, podés consultarnos por tu caso.', pendiente: true },
];

export default function PaginaPreguntas() {
  return (
    <section className="fondo-marfil" data-screen-label="Preguntas frecuentes" style={{ padding: 'clamp(56px,8vw,120px) var(--gutter)' }}>
      <div className="contenedor-angosto grilla-flujo de-340" style={{ gap: 'clamp(32px,5vw,80px)', alignItems: 'start' }}>
        <div className="sticky-escritorio" style={{ display: 'flex', flexDirection: 'column', gap: 18, position: 'sticky', top: 120 }}>
          <h1 className="serif" style={{ margin: 0, fontSize: 'clamp(44px,5.4vw,88px)', lineHeight: 0.92, letterSpacing: '-.02em' }}>
            Preguntas <em className="oro-oscuro">frecuentes</em>
          </h1>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: 'var(--texto-2)', maxWidth: 340 }}>¿No encontrás tu respuesta? Escribinos y te ayudamos.</p>
          <Link href="/contacto/" className="enlace-linea">Ir a contacto →</Link>
        </div>
        <Preguntas preguntas={PREGUNTAS} />
      </div>
    </section>
  );
}
