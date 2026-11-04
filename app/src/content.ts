export type StationId = 'insumos' | 'masa' | 'horno' | 'cajas' | 'entrega' | 'cupo';

export type ProductId = 'selecto' | 'premium' | 'marca';

export type Tool = 'clipboard' | 'dough' | 'peel' | 'pack' | 'offer';

export type Person = {
  id: string;
  role: string;
  line: string;
  position: [number, number, number];
  yaw: number;
  tool: Tool;
};

export type Station = {
  id: StationId;
  kicker: string;
  title: string;
  body: string;
  dot: string;
  person: string;
};

export const PHONE = '51933699420';

export const PEOPLE: Record<string, Person> = {
  calidad: {
    id: 'calidad',
    role: 'Jefa de calidad',
    line: 'Confirma el peso y el lote de cada insumo antes de que entre a la línea.',
    position: [3.05, 0, -11.05],
    yaw: -2.02,
    tool: 'clipboard',
  },
  panadero: {
    id: 'panadero',
    role: 'Maestro panadero',
    line: 'Corta la masa con el mismo criterio, del primer panetón de la tanda al último.',
    position: [2.85, 0, -3.15],
    yaw: -2.12,
    tool: 'dough',
  },
  hornero: {
    id: 'hornero',
    role: 'Hornero',
    line: 'Cuida el horno para que la tanda salga pareja, sea cual sea el tamaño del pedido.',
    position: [3.15, 0, 3.45],
    yaw: -2.08,
    tool: 'peel',
  },
  empaque: {
    id: 'empaque',
    role: 'Empaque',
    line: 'Cierra Selecto, Premium o la caja de tu marca. El arte lo trae el cliente.',
    position: [2.78, 0, 9.95],
    yaw: -2.05,
    tool: 'pack',
  },
  despacho: {
    id: 'despacho',
    role: 'Despacho',
    line: 'Te alcanza la caja y la sube al camión. De Puente Piedra a todo el Perú.',
    position: [2.55, 0, 14.15],
    yaw: -1.95,
    tool: 'offer',
  },
};

export const STATIONS: Station[] = [
  {
    id: 'insumos',
    kicker: 'Insumos',
    title: 'Llegan los insumos',
    body: 'Harina, fruta confitada y mantequilla se reciben y se pesan en la planta de Puente Piedra.',
    dot: 'Llegan los insumos',
    person: 'calidad',
  },
  {
    id: 'masa',
    kicker: 'Producción',
    title: 'La masa entra a la línea',
    body: 'El mismo corte de calidad en toda la tanda, del primer panetón al último.',
    dot: 'La masa entra a la línea',
    person: 'panadero',
  },
  {
    id: 'horno',
    kicker: 'Hornos',
    title: 'Pasan por el horno',
    body: 'La tanda sale pareja. El proceso no cambia porque el pedido sea más grande.',
    dot: 'Pasan por el horno',
    person: 'hornero',
  },
  {
    id: 'cajas',
    kicker: 'Las cajas',
    title: 'Selecto, Premium o tu marca',
    body: '900 g con pasas y frutas. 1 kg Premium. En maquila traes la fórmula y el arte: el diseño no lo hace la planta.',
    dot: 'Selecto, Premium o tu marca',
    person: 'empaque',
  },
  {
    id: 'entrega',
    kicker: 'Entrega',
    title: 'Salen en el camión',
    body: 'De Puente Piedra a tu local, en todo el Perú. Cupo o maquila, por WhatsApp.',
    dot: 'Salen en el camión',
    person: 'despacho',
  },
  {
    id: 'cupo',
    kicker: 'Cupo',
    title: 'La caja queda en tus manos',
    body: 'Elige Selecto, Premium o tu marca. El cupo de la campaña 2026 se confirma por WhatsApp.',
    dot: 'La caja y el cupo',
    person: 'despacho',
  },
];

export const PRODUCTS: { id: ProductId; name: string; detail: string }[] = [
  { id: 'selecto', name: 'Selecto', detail: '900 g · pasas y frutas' },
  { id: 'premium', name: 'Premium', detail: '1 kg · arándanos y naranja' },
  { id: 'marca', name: 'Tu marca', detail: 'Tu fórmula y tu arte. La planta produce.' },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: '¿Hay un mínimo de pedido?',
    a: 'El volumen se arma a la medida de tu negocio, de una cadena a un lote industrial. El cupo de la campaña 2026 se confirma por WhatsApp.',
  },
  {
    q: '¿Cuánto tarda?',
    a: 'El plazo sale de tu volumen y de la fecha en que lo necesitas. No publicamos un número único porque no sería el tuyo.',
  },
  {
    q: '¿Se puede personalizar?',
    a: 'Selecto y Premium ya tienen empaque Orindale. En maquila traes la fórmula y el arte de la caja. El diseño no lo hace la empresa: nosotros producimos y envasamos.',
  },
  {
    q: '¿Llegan fuera de Lima?',
    a: 'Sí. La planta está en Puente Piedra y el despacho es nacional.',
  },
];

export const DEFAULT_WA =
  'Hola Orindale, quiero un cupo de panetón o consultar maquila de marca propia para la campaña 2026.';

export function whatsapp(text: string) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(text)}`;
}

export function messageFor(nombre: string, empresa: string, productName: string) {
  if (productName === 'Tu marca') {
    return `Hola Orindale, soy ${nombre} de ${empresa}. Quiero maquila: llevamos nuestra fórmula y nuestro arte. El diseño no lo pedimos a la planta.`;
  }
  return `Hola Orindale, soy ${nombre} de ${empresa}. Quiero un cupo de ${productName} para la campaña 2026.`;
}

export function stationIndex(id: StationId) {
  return STATIONS.findIndex((station) => station.id === id);
}

export function personFor(id: StationId) {
  const station = STATIONS.find((item) => item.id === id);
  return station ? PEOPLE[station.person] : PEOPLE.calidad;
}
