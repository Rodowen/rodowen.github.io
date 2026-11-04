import { useEffect, useState } from 'react';

type SceneId = 'insumos' | 'masa' | 'horno' | 'cajas' | 'entrega' | 'cupo' | 'mobile';

type Frame = {
  id: SceneId;
  device: 'Escritorio' | 'Celular';
  kicker: string;
  distance: string;
  large: string;
  person: string;
  clear: string;
};

const FRAMES: Frame[] = [
  {
    id: 'insumos',
    device: 'Escritorio',
    kicker: 'Insumos',
    distance: '11 m. La cámara está a 3 m de altura, fuera de la nave, y mira la pila. El techo entra solo como una franja de teja.',
    large: 'Los sacos de harina, con el cuello atado, más la caja de fruta y la balanza.',
    person: 'Jefa de calidad, a la derecha de los sacos, de cuerpo entero y en tres cuartos. Cabe en un cuarto del cuadro.',
    clear: 'Los sacos, la balanza y la gorra. La tarjeta queda abajo a la izquierda.',
  },
  {
    id: 'masa',
    device: 'Escritorio',
    kicker: 'Producción',
    distance: '11 m, la misma altura, un tramo más adelante. Se sigue viendo la misma nave.',
    large: 'La mesa de madera y los montones de masa.',
    person: 'Maestro panadero, a la derecha de la mesa, de cuerpo entero, con las manos en la masa.',
    clear: 'La masa y las manos.',
  },
  {
    id: 'horno',
    device: 'Escritorio',
    kicker: 'Hornos',
    distance: '12 m. La boca del horno queda al centro del motivo, no en la cara de nadie.',
    large: 'Dos bocas encendidas y los panetones que enfrían al lado.',
    person: 'Hornero, a la derecha del horno, de cuerpo entero, con la pala hacia el fuego.',
    clear: 'El fuego y la gorra.',
  },
  {
    id: 'cajas',
    device: 'Escritorio',
    kicker: 'Las cajas',
    distance: '11 m, lo bastante cerca para leer las tres caras y lo bastante lejos para ver la mesa.',
    large: 'Tres pilas: Selecto 900 g, Premium 1 kg y Tu marca.',
    person: 'Empaque, a la derecha, de cuerpo entero, cerrando una caja.',
    clear: 'Las tres etiquetas.',
  },
  {
    id: 'entrega',
    device: 'Escritorio',
    kicker: 'Entrega',
    distance: '15 m. Cabe el camión de costado, el portalón y la nave detrás.',
    large: 'El camión con la caja abierta, al final de la planta.',
    person: 'Despacho, en el portalón, de cuerpo entero, con una caja en alto.',
    clear: 'El camión y la caja.',
  },
  {
    id: 'cupo',
    device: 'Escritorio',
    kicker: 'Cupo',
    distance: '7 m. Entran juntos el muelle, la persona de los pies a la gorra y la caja. No es un retrato.',
    large: 'La caja ofrecida, con la etiqueta que se lee, dentro del portalón.',
    person: 'Despacho queda detrás de la caja, en tres cuartos y de cuerpo entero. La planta sigue detrás.',
    clear: 'La etiqueta, la gorra y el portalón. La tarjeta no sube sobre la caja.',
  },
  {
    id: 'mobile',
    device: 'Celular',
    kicker: 'Cupo',
    distance: '10 m y un poco más alta, para dejar el muelle en la mitad de arriba.',
    large: 'El portalón, la caja entera y un tramo del camión.',
    person: 'Despacho se ve de la gorra a las manos, por encima de la tarjeta.',
    clear: 'La etiqueta completa. La tarjeta va abajo y no corta el muelle.',
  },
];

type Props = {
  onEnter: () => void;
};

export function Storyboard({ onEnter }: Props) {
  const [index, setIndex] = useState(0);
  const frame = FRAMES[index];

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setIndex((current) => Math.min(FRAMES.length - 1, current + 1));
      if (event.key === 'ArrowLeft') setIndex((current) => Math.max(0, current - 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main className="board" data-boards="open">
      <header className="board-top">
        <div>
          <p className="font-display text-3xl leading-none text-paper">Orindale</p>
          <p className="mt-1 text-xs tracking-wide text-gold-bright">Encuadres · planta de Puente Piedra · campaña 2026</p>
        </div>
        <p className="text-sm text-cream">
          {index + 1} / {FRAMES.length}
        </p>
      </header>
      <div className="board-layout">
        <figure className="board-figure">
          <div className={frame.id === 'mobile' ? 'board-stage is-mobile' : 'board-stage'}>
            <Shot id={frame.id} />
            <div className="board-card-ghost">
              <span>Tarjeta</span>
              <strong>{frame.id === 'mobile' ? 'Abajo. El muelle queda arriba.' : frame.id === 'cupo' ? 'A la izquierda. La caja queda libre.' : 'No tapa el motivo.'}</strong>
            </div>
          </div>
          <figcaption className="sr-only">
            {frame.kicker}. {frame.distance}
          </figcaption>
        </figure>
        <aside className="board-notes">
          <p className="text-xs font-semibold tracking-wide text-gold-bright">
            {frame.device} · {frame.kicker}
          </p>
          <h1 className="font-display mt-1 text-4xl leading-none text-paper">{frame.kicker}</h1>
          <dl>
            <div>
              <dt>Distancia de cámara</dt>
              <dd>{frame.distance}</dd>
            </div>
            <div>
              <dt>Qué es grande</dt>
              <dd>{frame.large}</dd>
            </div>
            <div>
              <dt>Dónde está la persona</dt>
              <dd>{frame.person}</dd>
            </div>
            <div>
              <dt>La tarjeta no tapa</dt>
              <dd>{frame.clear}</dd>
            </div>
          </dl>
          <p className="board-rule">Una sola nave: recibo, masa, hornos, cajas, camión y la caja en el muelle. Gente chica. Techo en franja.</p>
        </aside>
      </div>
      <footer className="board-foot">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Encuadres">
          {FRAMES.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              onClick={() => setIndex(itemIndex)}
              className={itemIndex === index ? 'board-tab is-on' : 'board-tab'}
            >
              {item.id === 'mobile' ? 'Celular' : item.kicker}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="board-step" onClick={() => setIndex((current) => Math.max(0, current - 1))} disabled={index === 0}>
            Anterior
          </button>
          <button
            type="button"
            className="board-step"
            onClick={() => setIndex((current) => Math.min(FRAMES.length - 1, current + 1))}
            disabled={index === FRAMES.length - 1}
          >
            Siguiente
          </button>
          <button type="button" className="board-enter" onClick={onEnter}>
            Ver la planta
          </button>
        </div>
      </footer>
    </main>
  );
}

function Shot({ id }: { id: SceneId }) {
  if (id === 'mobile') return <MobileShot />;
  return (
    <svg className="shot" viewBox="0 0 960 600" role="img" aria-hidden="true">
      <defs>
        <linearGradient id="plaster" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f7eee4" />
          <stop offset="100%" stopColor="#e4d0b8" />
        </linearGradient>
        <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a56b3e" />
          <stop offset="100%" stopColor="#6e4328" />
        </linearGradient>
        <radialGradient id="glow" cx="68%" cy="42%" r="48%">
          <stop offset="0%" stopColor="#3a2c22" />
          <stop offset="62%" stopColor="#14110e" />
        </radialGradient>
        <filter id="soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>
      <rect width="960" height="600" fill="#14110e" />
      <rect width="960" height="600" fill="url(#glow)" />
      <Hall />
      {id === 'insumos' ? <InsumosArt /> : null}
      {id === 'masa' ? <MasaArt /> : null}
      {id === 'horno' ? <HornoArt /> : null}
      {id === 'cajas' ? <CajasArt /> : null}
      {id === 'entrega' ? <EntregaArt /> : null}
      {id === 'cupo' ? <CupoArt /> : null}
      <Chip>{labelFor(id)}</Chip>
    </svg>
  );
}

function labelFor(id: SceneId) {
  const meters: Record<SceneId, string> = {
    insumos: '11 m',
    masa: '11 m',
    horno: '12 m',
    cajas: '11 m',
    entrega: '15 m',
    cupo: '7 m · el muelle entero',
    mobile: '10 m',
  };
  return meters[id];
}

function Chip({ children }: { children: string }) {
  return (
    <g>
      <rect x="28" y="24" width={children.length > 8 ? 196 : 72} height="28" rx="14" fill="#14110e" opacity="0.82" />
      <text x="42" y="43" fill="#e4b15a" fontFamily="Manrope, sans-serif" fontSize="13" fontWeight="700">
        {children}
      </text>
    </g>
  );
}

function Hall() {
  const windows = [250, 340, 430, 530, 630, 730, 820];
  return (
    <g>
      <ellipse cx="620" cy="548" rx="390" ry="36" fill="#1c1612" />
      <polygon points="120,455 900,405 940,520 90,575" fill="url(#floor)" />
      <polygon points="120,455 900,405 900,418 120,468" fill="#5a3824" />
      {Array.from({ length: 9 }, (_, i) => (
        <line key={i} x1={150 + i * 86} y1={448 - i * 4} x2={170 + i * 88} y2={545 - i * 2} stroke="#5c3b28" strokeWidth="3" opacity="0.45" />
      ))}
      <polygon points="160,214 860,176 900,405 120,455" fill="url(#plaster)" />
      <polygon points="160,214 860,176 860,196 160,232" fill="#eadccb" />
      <polygon points="145,210 875,168 860,176 160,214" fill="#7d3024" />
      <polygon points="145,196 875,152 875,168 145,210" fill="#c4623f" />
      {Array.from({ length: 18 }, (_, i) => (
        <line key={i} x1={160 + i * 40} y1={204 - i * 2.2} x2={168 + i * 40} y2={168 - i * 2.2} stroke="#9a3d2c" strokeWidth="2" />
      ))}
      <rect x="748" y="118" width="22" height="58" rx="3" fill="#e7d3bc" />
      <rect x="742" y="112" width="34" height="10" rx="2" fill="#c4ae96" />
      {windows.map((x) => (
        <g key={x}>
          <rect x={x} y={236 + (x - 250) * -0.04} width="36" height="52" rx="8" fill="#4a3428" />
          <rect x={x + 5} y={242 + (x - 250) * -0.04} width="26" height="40" rx="4" fill="#ffd7a8" />
          <rect x={x + 5} y={242 + (x - 250) * -0.04} width="26" height="40" rx="4" fill="#ff9a3c" opacity="0.35" filter="url(#soft)" />
        </g>
      ))}
      <text x="210" y="300" fill="#1a140f" fontFamily="Fraunces, Georgia, serif" fontSize="22">
        ORINDALE
      </text>
      <text x="212" y="318" fill="#8a5a32" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700">
        PUENTE PIEDRA
      </text>
    </g>
  );
}

function Person({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="4" rx="26" ry="7" fill="#000" opacity="0.28" />
      <rect x="-16" y="-58" width="11" height="54" rx="4" fill="#3a2c26" />
      <rect x="5" y="-58" width="11" height="54" rx="4" fill="#3a2c26" />
      <rect x="-18" y="-10" width="15" height="8" rx="3" fill="#241c16" />
      <rect x="4" y="-10" width="15" height="8" rx="3" fill="#241c16" />
      <rect x="-22" y="-112" width="44" height="58" rx="12" fill="#f4ecdf" />
      <path d="M-16 -106 h32 v46 h-32 z" fill="#3c2a22" />
      <rect x="-20" y="-78" width="9" height="36" rx="4" fill="#f4ecdf" />
      <rect x="11" y="-78" width="9" height="36" rx="4" fill="#f4ecdf" />
      <circle cx="-16" cy="-40" r="6" fill="#e4b48f" />
      <circle cx="16" cy="-40" r="6" fill="#e4b48f" />
      <circle cx="0" cy="-128" r="16" fill="#e4b48f" />
      <circle cx="-5" cy="-130" r="1.7" fill="#2a211c" />
      <circle cx="5" cy="-130" r="1.7" fill="#2a211c" />
      <ellipse cx="0" cy="-140" rx="18" ry="7" fill="#f7f4ee" />
      <path d="M-16 -140 Q0 -162 16 -140" fill="#f7f4ee" />
    </g>
  );
}

function Sack({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-20 0 Q-24 -46 -8 -70 Q0 -82 8 -70 Q24 -46 20 0 Z" fill="#f0e2cc" />
      <path d="M-20 0 Q-24 -46 -8 -70 Q-16 -40 -14 -8 Z" fill="#d9c4a8" />
      <path d="M-6 -70 Q0 -86 6 -70 Q2 -76 0 -74 Q-2 -76 -6 -70" fill="#c9b496" />
      <ellipse cx="0" cy="2" rx="20" ry="6" fill="#c4ae90" />
    </g>
  );
}

function InsumosArt() {
  return (
    <g>
      <Sack x={470} y={500} />
      <Sack x={520} y={492} s={1.05} />
      <Sack x={575} y={498} s={0.92} />
      <Sack x={500} y={455} s={0.86} />
      <Sack x={548} y={450} s={0.8} />
      <g transform="translate(640 478)">
        <rect x="-28" y="-16" width="56" height="28" rx="3" fill="#7a4e32" />
        <circle cx="-12" cy="-22" r="8" fill="#c23b3b" />
        <circle cx="4" cy="-26" r="7" fill="#3f8f45" />
        <circle cx="14" cy="-16" r="7" fill="#e4b15a" />
        <circle cx="-2" cy="-14" r="6" fill="#d4652a" />
      </g>
      <g transform="translate(420 505)">
        <rect x="-16" y="-34" width="6" height="34" fill="#8d8882" />
        <ellipse cx="0" cy="-36" rx="16" ry="5" fill="#d9d4cc" />
        <ellipse cx="22" cy="0" rx="12" ry="4" fill="#c5c0b8" />
      </g>
      <g transform="translate(700 430)">
        <rect x="0" y="0" width="70" height="28" rx="3" fill="#f3d56a" />
        <rect x="8" y="-24" width="54" height="22" rx="3" fill="#f6e08a" />
      </g>
      <Person x={760} y={520} />
      <TinyBay x={860} y={470} kind="mesa" />
    </g>
  );
}

function MasaArt() {
  return (
    <g>
      <TinyBay x={300} y={500} kind="sacos" />
      <g transform="translate(560 500)">
        <rect x="-150" y="-18" width="280" height="22" rx="4" fill="#8d5a38" />
        <rect x="-140" y="4" width="10" height="36" fill="#5c3b28" />
        <rect x="110" y="4" width="10" height="36" fill="#5c3b28" />
        <ellipse cx="-80" cy="-36" rx="34" ry="18" fill="#f0d7b0" />
        <ellipse cx="-10" cy="-40" rx="38" ry="20" fill="#f3dcc0" />
        <ellipse cx="70" cy="-34" rx="32" ry="16" fill="#e8c99a" />
      </g>
      <Person x={790} y={515} />
      <TinyBay x={880} y={455} kind="horno" />
    </g>
  );
}

function HornoArt() {
  return (
    <g>
      <TinyBay x={280} y={505} kind="mesa" />
      <g transform="translate(520 455)">
        <rect x="0" y="0" width="110" height="130" rx="8" fill="#3a2e28" />
        <path d="M18 78 Q55 20 92 78 V112 H18 Z" fill="#ff7a32" />
        <path d="M18 78 Q55 20 92 78 V112 H18 Z" fill="#ffb15a" opacity="0.45" filter="url(#soft)" />
        <rect x="130" y="16" width="100" height="114" rx="8" fill="#3a2e28" />
        <path d="M148 92 Q180 46 212 92 V124 H148 Z" fill="#ff6a28" />
      </g>
      <g transform="translate(760 500)">
        <rect x="0" y="0" width="70" height="8" rx="2" fill="#5c3b28" />
        <rect x="8" y="-8" width="16" height="10" rx="3" fill="#f7f1e6" />
        <circle cx="16" cy="-12" r="8" fill="#c4844a" />
        <rect x="36" y="-8" width="16" height="10" rx="3" fill="#f7f1e6" />
        <circle cx="44" cy="-12" r="8" fill="#c4844a" />
      </g>
      <line x1="690" y1="470" x2="610" y2="430" stroke="#8d5a38" strokeWidth="6" strokeLinecap="round" />
      <Person x={800} y={520} />
    </g>
  );
}

function CajasArt() {
  return (
    <g>
      <TinyBay x={250} y={500} kind="horno" />
      <Stack x={470} y={500} fill="#f4efe6" ink="#1a140f" title="Selecto" sub="900 g" />
      <Stack x={590} y={488} fill="#6e2430" ink="#f4efe6" title="Premium" sub="1 kg" tall />
      <Stack x={700} y={500} fill="#e7d3ae" ink="#1a140f" title="Tu marca" sub="maquila" />
      <Person x={820} y={518} />
    </g>
  );
}

function Stack({
  x,
  y,
  fill,
  ink,
  title,
  sub,
  tall,
}: {
  x: number;
  y: number;
  fill: string;
  ink: string;
  title: string;
  sub: string;
  tall?: boolean;
}) {
  const h = tall ? 92 : 78;
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y={-h - 8} width="86" height="16" rx="2" fill={fill} opacity="0.85" />
      <rect x="0" y={-h} width="92" height={h} rx="4" fill={fill} />
      <rect x="10" y={-h + 28} width="72" height="6" fill="#e4b15a" />
      <text x="46" y={-h + 22} textAnchor="middle" fill={ink} fontFamily="Fraunces, Georgia, serif" fontSize="13">
        {title}
      </text>
      <text x="46" y={-h + 52} textAnchor="middle" fill={ink} fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700">
        {sub}
      </text>
    </g>
  );
}

function EntregaArt() {
  return (
    <g>
      <TinyBay x={230} y={500} kind="cajas" />
      <Portal x={430} />
      <Truck x={560} y={500} />
      <Person x={500} y={515} scale={0.92} />
      <g transform="translate(548 430)">
        <rect width="36" height="44" rx="3" fill="#f4efe6" />
        <text x="18" y="20" textAnchor="middle" fill="#1a140f" fontFamily="Fraunces, Georgia, serif" fontSize="8">
          Selecto
        </text>
      </g>
    </g>
  );
}

function CupoArt() {
  return (
    <g>
      <polygon points="360,250 520,230 520,470 340,490" fill="#f3e6d4" />
      <polygon points="350,246 530,222 520,230 360,250" fill="#c4623f" />
      <Portal x={390} />
      <Truck x={620} y={490} />
      <Person x={470} y={500} />
      <g transform="translate(520 390)">
        <rect width="78" height="96" rx="4" fill="#f4efe6" />
        <rect x="8" y="40" width="62" height="7" fill="#c8882a" />
        <text x="39" y="28" textAnchor="middle" fill="#1a140f" fontFamily="Fraunces, Georgia, serif" fontSize="13">
          SELECTO
        </text>
        <text x="39" y="64" textAnchor="middle" fill="#1a140f" fontFamily="Manrope, sans-serif" fontSize="11" fontWeight="700">
          900 g
        </text>
        <text x="39" y="80" textAnchor="middle" fill="#5e5348" fontFamily="Manrope, sans-serif" fontSize="9">
          pasas y frutas
        </text>
      </g>
    </g>
  );
}

function Portal({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 250)`}>
      <rect width="16" height="230" fill="#5c3b28" />
      <rect x="150" width="16" height="220" fill="#5c3b28" />
      <rect y="-8" width="166" height="14" fill="#7a4e32" />
    </g>
  );
}

function Truck({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="-70" width="250" height="78" rx="8" fill="#1a140f" />
      <rect x="168" y="-118" width="96" height="78" rx="10" fill="#241c16" />
      <rect x="188" y="-104" width="46" height="28" rx="3" fill="#f3e2c4" />
      <rect x="8" y="-78" width="230" height="5" fill="#e4b15a" />
      <rect x="20" y="-52" width="40" height="32" rx="2" fill="#f4efe6" />
      <rect x="68" y="-48" width="36" height="28" rx="2" fill="#6e2430" />
      <circle cx="60" cy="12" r="16" fill="#14110e" />
      <circle cx="150" cy="12" r="16" fill="#14110e" />
      <circle cx="220" cy="12" r="16" fill="#14110e" />
    </g>
  );
}

function TinyBay({ x, y, kind }: { x: number; y: number; kind: 'mesa' | 'horno' | 'sacos' | 'cajas' }) {
  if (kind === 'sacos') {
    return (
      <g opacity="0.85">
        <Sack x={x} y={y} s={0.55} />
        <Sack x={x + 24} y={y} s={0.5} />
      </g>
    );
  }
  if (kind === 'mesa') {
    return <rect x={x} y={y} width="70" height="12" rx="2" fill="#8d5a38" opacity="0.8" />;
  }
  if (kind === 'horno') {
    return (
      <g>
        <rect x={x} y={y - 36} width="36" height="40" rx="3" fill="#3a2e28" />
        <rect x={x + 8} y={y - 18} width="16" height="14" fill="#ff7a32" />
      </g>
    );
  }
  return (
    <g>
      <rect x={x} y={y - 28} width="18" height="28" fill="#f4efe6" />
      <rect x={x + 22} y={y - 34} width="18" height="34" fill="#6e2430" />
    </g>
  );
}

function MobileShot() {
  return (
    <svg className="shot" viewBox="0 0 390 693" role="img" aria-hidden="true">
      <rect width="390" height="693" fill="#14110e" />
      <polygon points="36,168 350,148 362,360 24,384" fill="#f3e6d4" />
      <polygon points="30,156 356,134 350,148 36,168" fill="#c4623f" />
      <rect x="64" y="196" width="14" height="150" fill="#5c3b28" />
      <rect x="300" y="188" width="14" height="146" fill="#5c3b28" />
      <rect x="168" y="250" width="176" height="62" rx="6" fill="#1a140f" />
      <rect x="262" y="220" width="64" height="46" rx="6" fill="#241c16" />
      <Person x={132} y={360} scale={1.05} />
      <g transform="translate(186 248)">
        <rect width="92" height="108" rx="4" fill="#f4efe6" />
        <rect x="10" y="46" width="72" height="8" fill="#c8882a" />
        <text x="46" y="32" textAnchor="middle" fill="#1a140f" fontFamily="Fraunces, Georgia, serif" fontSize="14">
          SELECTO
        </text>
        <text x="46" y="72" textAnchor="middle" fill="#1a140f" fontFamily="Manrope, sans-serif" fontSize="12" fontWeight="700">
          900 g
        </text>
      </g>
      <Chip>8 m</Chip>
    </svg>
  );
}
