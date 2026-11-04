import { FAQS, PRODUCTS, messageFor, whatsapp, type ProductId } from '../content';

type Props = {
  product: ProductId;
  onProduct: (id: ProductId) => void;
};

export function CupoForm({ product, onProduct }: Props) {
  return (
    <form
      className="mt-4 border-t border-rule pt-4"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        const nombre = String(data.get('nombre') ?? '').trim();
        const empresa = String(data.get('empresa') ?? '').trim();
        const chosen = PRODUCTS.find((item) => item.id === product)?.name ?? 'Selecto';
        const alert = form.querySelector<HTMLElement>('[data-error]');
        if (!nombre || !empresa) {
          if (alert) {
            alert.textContent = 'Escribe tu nombre y el de la empresa.';
            alert.hidden = false;
          }
          return;
        }
        if (alert) alert.hidden = true;
        window.open(whatsapp(messageFor(nombre, empresa, chosen)), '_blank', 'noopener,noreferrer');
      }}
    >
      <fieldset>
        <legend className="text-sm font-semibold text-ink">Qué caja te interesa</legend>
        <div className="mt-2 grid gap-2">
          {PRODUCTS.map((item) => (
            <label key={item.id} className="flex cursor-pointer items-start gap-2 text-sm">
              <input
                className="mt-1 accent-gold"
                type="radio"
                name="producto"
                value={item.name}
                checked={product === item.id}
                onChange={() => onProduct(item.id)}
              />
              <span>
                <span className="font-semibold text-ink">{item.name}</span>
                <span className="block text-ink-soft">{item.detail}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <Field label="Nombre" name="nombre" autoComplete="name" />
        <Field label="Empresa" name="empresa" autoComplete="organization" />
      </div>
      <p id="cupo-error" data-error hidden className="mt-2 text-sm font-semibold text-ink" role="alert" />
      <button
        type="submit"
        data-testid="whatsapp-submit"
        className="press mt-3 inline-flex h-11 w-full items-center justify-center rounded-full bg-ink text-sm font-semibold text-paper"
      >
        Armar mensaje de WhatsApp
      </button>
      <div className="mt-4 divide-y divide-rule">
        {FAQS.map((item) => (
          <details key={item.q} className="py-2">
            <summary className="cursor-pointer text-sm font-semibold text-ink">{item.q}</summary>
            <p className="pt-1 text-sm leading-snug text-ink-soft">{item.a}</p>
          </details>
        ))}
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        El cupo no se aparta hasta confirmar la cotización. En maquila, la fórmula y el arte los pone el cliente.
        Planta en Puente Piedra, Lima. Despacho nacional.
      </p>
      <p className="mt-2 text-xs text-ink-soft">© 2026 Orindale Properties Peru S.A.C.</p>
    </form>
  );
}

function Field({ label, name, autoComplete }: { label: string; name: string; autoComplete: string }) {
  return (
    <label className="block text-sm">
      <span className="font-semibold text-ink">{label}</span>
      <input
        name={name}
        autoComplete={autoComplete}
        required
        className="mt-1 h-11 w-full rounded-xl border border-rule bg-paper px-3 text-sm text-ink"
      />
    </label>
  );
}
