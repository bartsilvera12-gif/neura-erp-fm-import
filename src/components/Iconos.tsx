export function IconoCarrito() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.3a1 1 0 0 0 1-.8L21 7H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17.5" cy="20" r="1.4" />
    </svg>
  );
}

export function IconoInstagram() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconoWhatsapp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20l1.2-3.6A8 8 0 1 1 8 19.2z" />
      <path d="M9.2 9.2c.2 2.4 2.2 4.6 4.8 5.2l1.2-1.2 1.8.8-.4 1.6c-3.8.4-8-3.6-7.6-7.6l1.6-.4.8 1.8z" strokeWidth="1.2" />
    </svg>
  );
}

export function IconoCorreo() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </svg>
  );
}

export function Logo({ alt = 'FM Importados', tamano }: { alt?: string; tamano?: number }) {
  return (
    <span className="logo" style={tamano ? { width: tamano, height: tamano } : undefined}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/assets/logo.jpeg" alt={alt} />
    </span>
  );
}
