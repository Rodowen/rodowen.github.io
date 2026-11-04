import * as THREE from 'three';

export const clay = {
  studio: '#1a1511',
  slab: '#d7c4a6',
  slabSide: '#b08968',
  plaster: '#f3e6d4',
  stone: '#8a7768',
  roof: '#c4623f',
  wood: '#7a4e32',
  woodDark: '#5c3b28',
  apron: '#3c2a22',
  shirt: '#f4ecdf',
  cap: '#f7f4ee',
  skin: '#e4b48f',
  nose: '#d99a72',
  trouser: '#3a2c26',
  shoe: '#241c16',
  ink: '#1a140f',
  butter: '#f3d56a',
  iron: '#2c2824',
  ember: '#ff7a32',
  dough: '#f0d7b0',
  eye: '#2a211c',
} as const;

function canvasTexture(draw: (g: CanvasRenderingContext2D, w: number, h: number) => void, w: number, h: number) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const g = canvas.getContext('2d');
  if (!g) throw new Error('sin lienzo');
  draw(g, w, h);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

let plaster: THREE.CanvasTexture | null = null;
export function plasterMap() {
  if (plaster) return plaster;
  plaster = canvasTexture((g, w, h) => {
    const wash = g.createLinearGradient(0, 0, 0, h);
    wash.addColorStop(0, '#f7eee2');
    wash.addColorStop(1, '#e5d2b8');
    g.fillStyle = wash;
    g.fillRect(0, 0, w, h);
    for (let i = 0; i < 2200; i += 1) {
      g.fillStyle = `rgba(110, 72, 40, ${Math.random() * 0.06})`;
      g.fillRect(Math.random() * w, Math.random() * h, 2, 2);
    }
  }, 256, 512);
  plaster.wrapS = THREE.RepeatWrapping;
  plaster.wrapT = THREE.RepeatWrapping;
  plaster.repeat.set(1.4, 1.2);
  return plaster;
}

let sack: THREE.CanvasTexture | null = null;
export function sackMap() {
  if (sack) return sack;
  sack = canvasTexture((g, w, h) => {
    g.fillStyle = '#e8d5bc';
    g.fillRect(0, 0, w, h);
    g.strokeStyle = 'rgba(110, 74, 40, 0.22)';
    g.lineWidth = 4;
    for (let x = 18; x < w; x += 36) {
      g.beginPath();
      g.moveTo(x, 70);
      g.quadraticCurveTo(x + 8, h * 0.5, x - 4, h);
      g.stroke();
    }
    g.fillStyle = '#cbb89a';
    g.fillRect(0, 0, w, 64);
    const side = g.createLinearGradient(0, 0, w, 0);
    side.addColorStop(0, 'rgba(80, 48, 24, 0.28)');
    side.addColorStop(0.18, 'rgba(80, 48, 24, 0)');
    side.addColorStop(0.82, 'rgba(80, 48, 24, 0)');
    side.addColorStop(1, 'rgba(80, 48, 24, 0.3)');
    g.fillStyle = side;
    g.fillRect(0, 0, w, h);
  }, 256, 512);
  return sack;
}

let wood: THREE.CanvasTexture | null = null;
export function woodMap() {
  if (wood) return wood;
  wood = canvasTexture((g, w, h) => {
    g.fillStyle = '#8d5a38';
    g.fillRect(0, 0, w, h);
    for (let y = 0; y < h; y += 18) {
      g.fillStyle = 'rgba(80, 42, 24, 0.28)';
      g.fillRect(0, y, w, 3);
    }
  }, 128, 256);
  wood.wrapS = THREE.RepeatWrapping;
  wood.wrapT = THREE.RepeatWrapping;
  return wood;
}

let sackGeo: THREE.LatheGeometry | null = null;
export function sackGeometry() {
  if (sackGeo) return sackGeo;
  const points = [
    [0.035, 0.86],
    [0.055, 0.78],
    [0.09, 0.7],
    [0.16, 0.6],
    [0.26, 0.46],
    [0.3, 0.28],
    [0.28, 0.1],
    [0.18, 0.02],
  ].map(([x, y]) => new THREE.Vector2(x, y));
  sackGeo = new THREE.LatheGeometry(points, 14);
  sackGeo.computeVertexNormals();
  return sackGeo;
}
