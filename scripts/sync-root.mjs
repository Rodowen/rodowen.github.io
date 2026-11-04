import { cp, rm } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.join(root, 'dist');

await rm(path.join(root, 'assets'), { recursive: true, force: true });
await cp(path.join(dist, 'assets'), path.join(root, 'assets'), { recursive: true });
await cp(path.join(dist, 'index.html'), path.join(root, 'index.html'));

for (const name of ['favicon.svg', 'og.jpg']) {
  await cp(path.join(dist, name), path.join(root, name));
}

await rm(path.join(root, 'orindale-fly.mp4'), { force: true });
