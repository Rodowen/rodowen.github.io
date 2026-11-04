import { useEffect, useState } from 'react';

type Frame = {
  id: string;
  device: 'Escritorio' | 'Celular';
  kicker: string;
  large: string;
  person: string;
  prop: string;
  clear: string;
  scene: 'insumos' | 'masa' | 'horno' | 'cajas' | 'entrega' | 'cupo' | 'mobile';
};

const FRAMES: Frame[] = [
  {
    id: 'insumos',
    device: 'Escritorio',
    kicker: 'Insumos',
    large: 'Los sacos de harina, de tela y con el cuello atado, ocupan el centro derecho.',
    person: 'La jefa de calidad está a la derecha de los sacos, de frente en tres cuartos, con gorra y mandil oscuro.',
    prop: 'El saco de harina.',
    clear: 'Su cara, la primera fila de sacos y el dial de la balanza.',
    scene: 'insumos',
  },
  {
    id: 'masa',
    device: 'Escritorio',
    kicker: 'Producción',
    large: 'La mesa de madera con los montones de masa.',
    person: 'El maestro panadero está a la derecha de la mesa, tres cuartos, con las manos en la masa.',
    prop: 'La masa.',
    clear: 'La masa y las manos.',
    scene: 'masa',
  },
  {
    id: 'horno',
    device: 'Escritorio',
    kicker: 'Hornos',
    large: 'La boca del horno, encendida, al centro derecho.',
    person: 'El hornero está a la derecha del horno, tres cuartos, con la pala hacia el fuego.',
    prop: 'La boca del horno.',
    clear: 'El fuego y la gorra.',
    scene: 'horno',
  },
  {
    id: 'cajas',
    device: 'Escritorio',
    kicker: 'Las cajas',
    large: 'Tres pilas con la cara legible: Selecto 900 g, Premium 1 kg y Tu marca.',
    person: 'Empaque está a la derecha, tres cuartos, cerrando una caja.',
    prop: 'Las cajas.',
    clear: 'Las tres caras.',
    scene: 'cajas',
  },
  {
    id: 'entrega',
    device: 'Escritorio',
    kicker: 'Entrega',
    large: 'El camión de costado, con la caja abierta.',
    person: 'Despacho está en el portalón, tres cuartos, con una caja en alto.',
    prop: 'El camión.',
    clear: 'El camión y la caja en las manos.',
    scene: 'entrega',
  },
  {
    id: 'cupo',
    device: 'Escritorio',
    kicker: 'Cupo',
    large: 'La caja ofrecida, cerca, con la etiqueta que se lee.',
    person: 'Despacho queda detrás de la caja, tres cuartos, con los brazos hacia adelante.',
    prop: 'La caja.',
    clear: 'La etiqueta.',
    scene: 'cupo',
  },
  {
    id: 'mobile',
    device: 'Celular',
    kicker: 'Cupo',
    large: 'La planta queda arriba. La caja se lee entera.',
    person: 'Despacho se ve de la gorra a las manos, por encima de la tarjeta.',
    prop: 'La caja, encima del formulario.',
    clear: 'La etiqueta. La tarjeta es corta y va abajo. Los chips viven en la franja oscura.',
    scene: 'mobile',
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
          <p className="mt-1 text-xs tracking-wide text-gold-bright">Encuadres de la planta · arcilla sobre suelo oscuro</p>
        </div>
        <p className="text-sm text-cream">
          {index + 1} / {FRAMES.length}
        </p>
      </header>
      <div className="board-layout">
        <figure className="board-figure">
          <div className={frame.scene === 'mobile' ? 'board-stage is-mobile' : 'board-stage'} aria-hidden="true">
            <Scene kind={frame.scene} />
            <div className="board-card-ghost">
              <span>Tarjeta</span>
              <strong>{frame.scene === 'mobile' ? 'Abajo. La caja queda arriba.' : 'No tapa el motivo.'}</strong>
            </div>
          </div>
          <figcaption className="sr-only">{frame.kicker}</figcaption>
        </figure>
        <aside className="board-notes">
          <p className="text-xs font-semibold tracking-wide text-gold-bright">
            {frame.device} · {frame.kicker}
          </p>
          <h1 className="font-display mt-1 text-4xl leading-none text-paper">{frame.kicker}</h1>
          <dl>
            <div>
              <dt>Qué es grande</dt>
              <dd>{frame.large}</dd>
            </div>
            <div>
              <dt>Dónde está la persona</dt>
              <dd>{frame.person}</dd>
            </div>
            <div>
              <dt>El objeto que nombra la estación</dt>
              <dd>{frame.prop}</dd>
            </div>
            <div>
              <dt>La tarjeta no tapa</dt>
              <dd>{frame.clear}</dd>
            </div>
          </dl>
          <p className="board-rule">Gorra y mandil oscuro. Tres cuartos. Sin bigote. Sin estacas en el suelo.</p>
        </aside>
      </div>
      <footer className="board-foot">
        <div className="flex gap-2" role="tablist" aria-label="Encuadres">
          {FRAMES.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`${item.device}, ${item.kicker}`}
              onClick={() => setIndex(itemIndex)}
              className={itemIndex === index ? 'board-dot is-on' : 'board-dot'}
            />
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

function Scene({ kind }: { kind: Frame['scene'] }) {
  return (
    <div className={`mini mini-${kind}`}>
      <div className="mini-floor" />
      <div className="mini-wall" />
      <div className="mini-roof" />
      <div className="mini-chimney" />
      {kind === 'insumos' ? <InsumosSet /> : null}
      {kind === 'masa' ? <MasaSet /> : null}
      {kind === 'horno' ? <HornoSet /> : null}
      {kind === 'cajas' ? <CajasSet /> : null}
      {kind === 'entrega' ? <EntregaSet /> : null}
      {kind === 'cupo' || kind === 'mobile' ? <CupoSet /> : null}
    </div>
  );
}

function Person({ className }: { className?: string }) {
  return (
    <div className={className ? `mini-person ${className}` : 'mini-person'}>
      <i className="cap" />
      <i className="head" />
      <i className="body" />
    </div>
  );
}

function InsumosSet() {
  return (
    <>
      <div className="sack s1" />
      <div className="sack s2" />
      <div className="sack s3" />
      <div className="sack s4" />
      <div className="crate" />
      <div className="scale" />
      <Person />
    </>
  );
}

function MasaSet() {
  return (
    <>
      <div className="bench">
        <i />
        <i />
        <i />
      </div>
      <Person />
    </>
  );
}

function HornoSet() {
  return (
    <>
      <div className="oven">
        <i />
      </div>
      <div className="peel" />
      <Person />
    </>
  );
}

function CajasSet() {
  return (
    <>
      <div className="stack selecto">Selecto</div>
      <div className="stack premium">Premium</div>
      <div className="stack marca">Tu marca</div>
      <Person />
    </>
  );
}

function EntregaSet() {
  return (
    <>
      <div className="truck">
        <i />
      </div>
      <Person />
    </>
  );
}

function CupoSet() {
  return (
    <>
      <div className="handoff">Selecto</div>
      <Person />
    </>
  );
}
