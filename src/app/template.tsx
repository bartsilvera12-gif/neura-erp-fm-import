/** Se vuelve a montar en cada navegación: es lo que da el fundido entre páginas. */
export default function Plantilla({ children }: { children: React.ReactNode }) {
  return <main className="transicion">{children}</main>;
}
