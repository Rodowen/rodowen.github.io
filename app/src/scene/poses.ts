import type { StationId } from '../content';

export type Pose = {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

// Outside the open side of the long nave, about 3 m up.
// The look point sits left of the subject so the card does not cover it.
const wide = {
  insumos: { pos: [-5.4, 3.0, -16.2], look: [4.4, 0.9, -12.6], fov: 32 },
  masa: { pos: [-5.0, 2.95, -9.0], look: [4.6, 0.9, -5.4], fov: 32 },
  horno: { pos: [-4.8, 2.95, -1.5], look: [5.0, 1.05, 2.2], fov: 32 },
  cajas: { pos: [-4.6, 2.9, 5.2], look: [4.8, 1.0, 8.6], fov: 31 },
  entrega: { pos: [-6.2, 3.15, 8.6], look: [4.8, 1.05, 15.2], fov: 36 },
  cupo: { pos: [-2.8, 2.25, 11.0], look: [5.6, 1.0, 14.4], fov: 36 },
} satisfies Record<StationId, Pose>;

// Phone: a little higher, look lowered so the station sits above the card.
const narrow = {
  insumos: { pos: [-3.6, 3.45, -15.4], look: [4.8, 0.2, -11.8], fov: 38 },
  masa: { pos: [-3.4, 3.5, -8.4], look: [5.0, 0.15, -4.6], fov: 38 },
  horno: { pos: [-3.2, 3.45, -0.6], look: [5.2, 0.2, 2.5], fov: 38 },
  cajas: { pos: [-3.0, 3.5, 6.0], look: [5.0, 0.15, 9.0], fov: 36 },
  entrega: { pos: [-4.0, 3.6, 9.4], look: [5.0, 0.1, 15.0], fov: 40 },
  cupo: { pos: [-4.6, 3.15, 8.8], look: [5.6, 0.75, 13.8], fov: 34 },
} satisfies Record<StationId, Pose>;

export function poseFor(id: StationId, isNarrow: boolean) {
  return isNarrow ? narrow[id] : wide[id];
}
