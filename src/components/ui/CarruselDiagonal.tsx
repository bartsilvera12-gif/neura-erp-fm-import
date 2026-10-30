/**
 * Marquesina diagonal de fotos, adaptada de Great UI (MIT, Saurabh Sharma).
 * Sin JS: las filas se mueven solo con CSS y se pausan al pasar el mouse.
 */
export interface FotoCarrusel {
  src: string;
  alt: string;
}

function Fila({ fotos, segundos, invertir }: { fotos: FotoCarrusel[]; segundos: number; invertir: boolean }) {
  // Dos copias: la animación recorre el 50% y empalma sin salto.
  const copias = [0, 1];
  return (
    <div className="carrusel-fila">
      <div
        className={invertir ? 'carrusel-pista carrusel-derecha' : 'carrusel-pista'}
        style={{ '--segundos': `${segundos}s` } as React.CSSProperties}
      >
        {copias.map((copia) =>
          fotos.map((foto, i) => (
            <div key={`${copia}-${i}`} className="carrusel-tarjeta" aria-hidden={copia === 1}>
              <img src={foto.src} alt={copia === 0 ? foto.alt : ''} loading="lazy" />
            </div>
          )),
        )}
      </div>
    </div>
  );
}

export function CarruselDiagonal({ fotos, velocidad = 120 }: { fotos: FotoCarrusel[]; velocidad?: number }) {
  const fila = [...fotos, ...fotos, ...fotos];
  const inversa = [...fila].reverse();
  return (
    <div className="carrusel-diagonal">
      <div className="carrusel-filas">
        <Fila fotos={fila} segundos={velocidad} invertir={false} />
        <Fila fotos={inversa} segundos={velocidad - 15} invertir />
        <Fila fotos={fila} segundos={velocidad + 15} invertir={false} />
        <Fila fotos={inversa} segundos={velocidad - 6} invertir />
      </div>
    </div>
  );
}
