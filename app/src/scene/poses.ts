import type { StationId } from '../content';

export type Pose = {
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
};

// Eye-level on the dark studio floor, aimed at the clay set.
// Desktop keeps the subject right of the card. Phone keeps it above the card.
const wide = {
  insumos: { pos: [-2.4, 2.35, -12.85], look: [4.05, 1.15, -11.35], fov: 36 },
  masa: { pos: [-2.2, 2.25, -5.35], look: [4.2, 1.15, -3.9], fov: 36 },
  horno: { pos: [-2.05, 2.2, 1.15], look: [4.5, 1.2, 2.85], fov: 36 },
  cajas: { pos: [-2.15, 2.2, 7.25], look: [4.4, 1.15, 8.9], fov: 36 },
  entrega: { pos: [-2.3, 2.3, 13.05], look: [4.5, 1.1, 15.05], fov: 38 },
  cupo: { pos: [0.35, 1.45, 13.15], look: [2.15, 1.12, 14.0], fov: 32 },
} satisfies Record<StationId, Pose>;

const narrow = {
  insumos: { pos: [-0.6, 2.55, -12.55], look: [4.0, 0.55, -11.35], fov: 40 },
  masa: { pos: [-0.5, 2.6, -5.2], look: [4.2, 0.15, -3.95], fov: 40 },
  horno: { pos: [-0.4, 2.55, 1.2], look: [4.4, 0.2, 2.8], fov: 40 },
  cajas: { pos: [-0.45, 2.6, 7.3], look: [4.3, 0.15, 8.9], fov: 40 },
  entrega: { pos: [-0.55, 2.7, 13.1], look: [4.4, 0.1, 15.1], fov: 40 },
  cupo: { pos: [-1.7, 1.85, 12.35], look: [2.12, 0.42, 13.98], fov: 36 },
} satisfies Record<StationId, Pose>;

export function poseFor(id: StationId, isNarrow: boolean) {
  return isNarrow ? narrow[id] : wide[id];
}
