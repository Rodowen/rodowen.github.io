import { PEOPLE, STATIONS, DEFAULT_WA, whatsapp, type ProductId } from '../content';
import { CupoForm } from './CupoForm';

type Props = {
  product: ProductId;
  onProduct: (id: ProductId) => void;
};

export function ReducedTour({ product, onProduct }: Props) {
  return (
    <main className="mx-auto w-full max-w-xl px-5 pt-10 pb-16">
      <p className="font-display text-4xl text-paper">Orindale</p>
      <p className="mt-2 text-sm text-gold-bright">Planta en Puente Piedra · Campaña 2026</p>
      <p className="mt-6 max-w-prose text-base leading-relaxed text-cream">
        Panetón para panaderías, cadenas y mayoristas. La planta, estación por estación, sin recorrido en movimiento.
      </p>
      <ol className="mt-8">
        {STATIONS.filter((station) => station.id !== 'cupo').map((station, index) => {
          const person = PEOPLE[station.person];
          return (
            <li key={station.id} id={station.id} className="border-t border-white/10 py-6">
              <p className="text-xs font-semibold tracking-wide text-gold">
                0{index + 1} · {station.kicker}
              </p>
              <h2 className="font-display mt-1 text-3xl leading-tight text-paper">{station.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-cream">{station.body}</p>
              <p className="mt-4 text-[0.68rem] font-semibold tracking-wide text-gold">Rol de la planta</p>
              <p className="font-display text-xl text-paper">{person.role}</p>
              <p className="mt-1 text-sm leading-snug text-cream">{person.line}</p>
            </li>
          );
        })}
      </ol>
      <section id="cupo" className="rounded-2xl bg-paper p-4 text-ink md:p-5">
        <p className="text-xs font-semibold tracking-wide text-gold">Cupo</p>
        <h2 className="font-display text-3xl leading-tight">La caja queda en tus manos</h2>
        <p className="mt-2 text-sm leading-snug text-ink-soft">
          Elige Selecto, Premium o tu marca. El cupo de la campaña 2026 se confirma por WhatsApp.
        </p>
        <a
          className="press mt-4 inline-flex h-11 items-center justify-center rounded-full bg-gold-bright px-4 text-sm font-semibold text-ink"
          href={whatsapp(DEFAULT_WA)}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="whatsapp-cupo"
        >
          Pedir cupo o maquila
        </a>
        <CupoForm product={product} onProduct={onProduct} />
      </section>
    </main>
  );
}
