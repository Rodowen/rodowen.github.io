import {
  DEFAULT_WA,
  PEOPLE,
  STATIONS,
  stationIndex,
  whatsapp,
  type ProductId,
  type StationId,
} from '../content';
import { CupoForm } from './CupoForm';

type Props = {
  station: StationId;
  person: string | null;
  product: ProductId;
  playing: boolean;
  ready: boolean;
  onStation: (id: StationId) => void;
  onPerson: (id: string) => void;
  onProduct: (id: ProductId) => void;
  onTogglePlay: () => void;
};

export function Chrome({
  station,
  person,
  product,
  playing,
  ready,
  onStation,
  onPerson,
  onProduct,
  onTogglePlay,
}: Props) {
  const index = stationIndex(station);
  const current = STATIONS[index];
  const who = PEOPLE[current.person];
  const arrived = station === 'cupo';
  const selected = person === who.id;

  return (
    <>
      <a className="skip" href="#capitulo">
        Saltar al contenido
      </a>
      <div className="vignette pointer-events-none fixed inset-0 z-10" />
      <div
        className="progress fixed inset-x-0 top-0 z-30 h-0.5 origin-left bg-gold-bright"
        style={{ transform: `scaleX(${index / (STATIONS.length - 1)})` }}
      />
      <header className="topbar pointer-events-none fixed inset-x-0 top-0 z-30 px-4 pt-4 pb-6 md:px-8 md:pt-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-display text-2xl leading-none text-paper">Orindale</p>
            <p className="mt-1 text-xs tracking-wide text-cream">Planta · Puente Piedra</p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={onTogglePlay}
                className="press pointer-events-auto inline-flex h-10 items-center rounded-full bg-paper px-3.5 text-sm font-semibold text-ink"
              >
                {playing ? 'Pausar recorrido' : 'Recorrer la planta'}
              </button>
              <button
                type="button"
                onClick={() => {
                  window.location.hash = '#diseno';
                }}
                className="press pointer-events-auto inline-flex h-10 items-center rounded-full px-3 text-sm text-cream"
              >
                Encuadres
              </button>
            </div>
          </div>
          <nav className="pointer-events-auto hidden max-w-[40rem] flex-wrap justify-end gap-1 md:flex" aria-label="Recorrido">
            {STATIONS.map((item) => {
              const active = item.id === station;
              return (
                <button
                  key={item.id}
                  type="button"
                  data-station={item.id}
                  onClick={() => onStation(item.id)}
                  className={
                    active
                      ? 'rounded-full bg-gold/20 px-3 py-2 text-sm font-semibold text-gold-bright'
                      : 'rounded-full px-3 py-2 text-sm text-cream'
                  }
                  aria-current={active ? 'true' : undefined}
                >
                  {item.kicker}
                </button>
              );
            })}
          </nav>
        </div>
        <nav className="chips pointer-events-auto mt-3 flex gap-1 overflow-x-auto pb-1 md:hidden" aria-label="Recorrido">
          {STATIONS.map((item) => {
            const active = item.id === station;
            return (
              <button
                key={item.id}
                type="button"
                data-station={item.id}
                onClick={() => onStation(item.id)}
                className={
                  active
                    ? 'shrink-0 rounded-full bg-gold/20 px-3 py-2 text-sm font-semibold text-gold-bright'
                    : 'shrink-0 rounded-full bg-white/5 px-3 py-2 text-sm text-cream'
                }
                aria-current={active ? 'true' : undefined}
              >
                {item.kicker}
              </button>
            );
          })}
        </nav>
      </header>
      <div className="pointer-events-auto fixed top-1/2 right-1 z-20 hidden -translate-y-1/2 flex-col md:right-3 md:flex">
        {STATIONS.map((item) => {
          const active = item.id === station;
          return (
            <button
              key={item.id}
              type="button"
              aria-label={item.dot}
              onClick={() => onStation(item.id)}
              className="flex h-11 w-11 items-center justify-center"
            >
              <span className={active ? 'block h-2 w-2 rounded-full bg-gold-bright' : 'block h-1.5 w-1.5 rounded-full bg-line'} />
            </button>
          );
        })}
      </div>
      <section
        id="capitulo"
        className={`ticket pointer-events-auto fixed bottom-3 left-3 z-20 w-[min(28rem,calc(100%-1.5rem))] overflow-auto rounded-2xl bg-paper p-4 text-ink md:bottom-4 md:left-4 md:w-[min(28rem,calc(100%-4.75rem))] md:p-5${arrived ? ' arrived' : ''}`}
      >
        <article key={current.id} className="chapter" aria-live="polite">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-xs font-semibold tracking-wide text-gold">{current.kicker}</p>
            <p className="text-xs text-ink-soft">
              {index + 1} / {STATIONS.length}
            </p>
          </div>
          <h1 className="font-display text-2xl leading-tight text-ink">{current.title}</h1>
          <p className="mt-1 text-sm leading-snug text-ink-soft">{current.body}</p>
          <button
            type="button"
            data-person={who.id}
            aria-pressed={selected}
            onClick={() => onPerson(who.id)}
            className={
              selected
                ? 'mt-3 w-full rounded-xl border border-gold bg-gold/10 px-3 py-2.5 text-left'
                : 'mt-3 w-full rounded-xl border border-rule px-3 py-2.5 text-left'
            }
          >
            <span className="block text-[0.68rem] font-semibold tracking-wide text-gold">Rol de la planta</span>
            <span className="font-display text-lg leading-tight text-ink">{who.role}</span>
            <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{who.line}</span>
          </button>
        </article>
        {arrived ? null : (
          <a
            className="press mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-gold-bright px-4 text-sm font-semibold text-ink"
            href={whatsapp(DEFAULT_WA)}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="whatsapp-cupo"
          >
            Pedir cupo o maquila
          </a>
        )}
        <div className={arrived ? 'sheet open' : 'sheet'}>
          <div className="sheet-body" inert={arrived ? undefined : true}>
            <CupoForm product={product} onProduct={onProduct} />
          </div>
        </div>
      </section>
      {ready ? null : <p className="stage-status">Abriendo la planta…</p>}
    </>
  );
}
