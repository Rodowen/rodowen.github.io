import * as THREE from 'three';

function roundRect(
  g: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}

export function makeSignTexture(text: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('sin lienzo');
  roundRect(g, 12, 16, 1000, 224, 36);
  g.fillStyle = '#1a140f';
  g.fill();
  g.fillStyle = '#e4b15a';
  g.fillRect(72, 188, 880, 8);
  g.font = '600 108px Fraunces, Georgia, serif';
  g.fillStyle = '#f4efe6';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.fillText(text, 512, 112);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

const BOX = {
  selecto: {
    bg: '#f4efe6',
    fg: '#1a140f',
    band: '#c8882a',
    title: 'SELECTO',
    sub: '900 g',
    note: 'pasas y frutas',
    dashed: false,
  },
  premium: {
    bg: '#6e2430',
    fg: '#f4efe6',
    band: '#e4b15a',
    title: 'PREMIUM',
    sub: '1 kg',
    note: 'arándanos y naranja',
    dashed: false,
  },
  marca: {
    bg: '#e7d3ae',
    fg: '#1a140f',
    band: '#c8882a',
    title: 'TU MARCA',
    sub: 'maquila',
    note: 'tu fórmula y tu arte',
    dashed: true,
  },
} as const;

export function makeBoxTexture(product: keyof typeof BOX) {
  const spec = BOX[product];
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 680;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('sin lienzo');
  g.fillStyle = spec.bg;
  g.fillRect(0, 0, 512, 680);
  g.fillStyle = spec.band;
  g.fillRect(0, 300, 512, 46);
  g.font = '600 96px Fraunces, Georgia, serif';
  g.fillStyle = spec.fg;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  if (spec.dashed) {
    g.strokeStyle = spec.band;
    g.lineWidth = 6;
    g.setLineDash([16, 12]);
    g.strokeRect(70, 78, 372, 150);
    g.setLineDash([]);
  }
  g.fillText(spec.title, 256, spec.dashed ? 154 : 168);
  g.font = '600 42px Manrope, sans-serif';
  g.fillText(spec.sub, 256, 400);
  g.font = '500 30px Manrope, sans-serif';
  g.fillText(spec.note, 256, 470);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export function makeRoofTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 256;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('sin lienzo');
  g.fillStyle = '#c4623f';
  g.fillRect(0, 0, 128, 256);
  for (let y = 0; y < 256; y += 32) {
    g.fillStyle = '#9d4630';
    g.fillRect(0, y, 128, 5);
    const offset = (y / 32) % 2 === 0 ? 0 : 32;
    g.fillStyle = '#a85238';
    for (let x = offset; x < 128; x += 64) g.fillRect(x, y + 5, 3, 27);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2.4, 16);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export const boxBody: Record<keyof typeof BOX, string> = {
  selecto: '#f4efe6',
  premium: '#6e2430',
  marca: '#e4d0aa',
};
