import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import type { MeshStandardMaterial } from 'three';
import { PEOPLE, type ProductId, type StationId } from '../content';
import { clay, plasterMap, sackMap, woodMap } from './clay';
import { boxBody, makeBoxTexture, makeRoofTexture, makeSignTexture } from './labels';
import { Worker } from './Worker';

type Props = {
  station: StationId;
  person: string | null;
  product: ProductId;
  reduced: boolean;
  fontsReady: boolean;
  onPerson: (id: string) => void;
  onStation: (id: StationId) => void;
  onProduct: (id: ProductId) => void;
};

export function Plant(props: Props) {
  return (
    <group>
      <Studio />
      <Architecture fontsReady={props.fontsReady} />
      <Insumos />
      <Produccion />
      <Hornos reduced={props.reduced} />
      <Cajas
        product={props.product}
        onPick={(id) => {
          props.onProduct(id);
          props.onStation('cajas');
        }}
      />
      <Truck />
      {Object.values(PEOPLE).map((person) => (
        <Worker
          key={person.id}
          person={person}
          selected={props.person === person.id}
          reduced={props.reduced}
          product={props.product}
          onSelect={props.onPerson}
          onOpen={person.id === 'despacho' ? () => props.onStation('cupo') : undefined}
        />
      ))}
      <ContactShadows position={[4.6, 0.012, 1]} opacity={0.38} scale={36} blur={2.4} far={3.2} color="#140e0a" resolution={512} />
    </group>
  );
}

function Studio() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[4.6, -0.52, 1]} receiveShadow>
      <circleGeometry args={[26, 48]} />
      <meshStandardMaterial color={clay.studio} roughness={1} />
    </mesh>
  );
}

function Architecture({ fontsReady }: { fontsReady: boolean }) {
  const roof = useMemo(() => makeRoofTexture(), []);
  const plaster = useMemo(() => plasterMap(), []);
  useEffect(
    () => () => {
      roof.dispose();
    },
    [roof],
  );
  return (
    <group>
      <mesh position={[5.15, -0.24, 1]} castShadow receiveShadow>
        <boxGeometry args={[6.2, 0.48, 33.4]} />
        <meshStandardMaterial color={clay.slabSide} roughness={0.96} />
      </mesh>
      <mesh position={[5.15, 0.015, 1]} receiveShadow>
        <boxGeometry args={[5.9, 0.05, 33]} />
        <meshStandardMaterial color={clay.slab} roughness={1} />
      </mesh>
      <mesh position={[7.55, 0.32, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.64, 33.2]} />
        <meshStandardMaterial color={clay.stone} roughness={0.95} />
      </mesh>
      <mesh position={[7.68, 1.45, 1]} castShadow receiveShadow>
        <boxGeometry args={[0.28, 2.15, 33]} />
        <meshStandardMaterial color={clay.plaster} map={plaster} roughness={0.94} />
      </mesh>
      <group position={[6.35, 2.7, 1]} rotation={[0, 0, 0.5]}>
        <mesh castShadow>
          <boxGeometry args={[3.6, 0.08, 33.6]} />
          <meshStandardMaterial color={clay.roof} map={roof} roughness={0.9} />
        </mesh>
      </group>
      <mesh position={[4.85, 2.45, 1]}>
        <boxGeometry args={[0.12, 0.18, 33.4]} />
        <meshStandardMaterial color="#9a4632" roughness={0.85} />
      </mesh>
      <mesh position={[6.35, 2.95, 2.7]} castShadow>
        <cylinderGeometry args={[0.32, 0.4, 1.2, 16]} />
        <meshStandardMaterial color="#c4ad96" roughness={0.94} />
      </mesh>
      <mesh position={[6.35, 3.58, 2.7]} castShadow>
        <cylinderGeometry args={[0.42, 0.34, 0.16, 16]} />
        <meshStandardMaterial color="#b89a82" roughness={0.9} />
      </mesh>
      {[
        [-13.4, 1.7],
        [-9.6, 1.85],
        [-6.2, 1.7],
        [-1.1, 1.85],
        [5.6, 1.7],
        [11.4, 1.85],
        [16.2, 1.7],
      ].map(([z, y]) => (
        <Window key={z} position={[7.48, y, z]} />
      ))}
      <Bay position={[7.42, 1.15, -4.3]} />
      {fontsReady ? (
        <>
          <Sign text="ORINDALE" position={[7.48, 2.15, -12.4]} size={[2.2, 0.42]} />
          <Sign text="INSUMOS" position={[7.46, 1.55, -12.2]} size={[1.5, 0.32]} />
          <Sign text="PRODUCCIÓN" position={[7.46, 1.55, -4.5]} size={[1.9, 0.32]} />
          <Sign text="HORNOS" position={[7.46, 1.55, 2.4]} size={[1.45, 0.32]} />
          <Sign text="CAJAS" position={[7.46, 1.55, 8.7]} size={[1.25, 0.32]} />
          <Sign text="DESPACHO" position={[7.46, 1.55, 15.2]} size={[1.7, 0.32]} />
        </>
      ) : null}
      {[-12.2, -4.4, 2.5, 8.8, 15.1].map((z) => (
        <Bulb key={z} position={[6.15, 3.05, z]} />
      ))}
    </group>
  );
}

function Window({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.08, 0.62, 0.5]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.8} />
      </mesh>
      <mesh position={[-0.05, 0, 0]}>
        <planeGeometry args={[0.36, 0.46]} />
        <meshStandardMaterial color="#ffe0b0" emissive="#ffb15e" emissiveIntensity={0.65} />
      </mesh>
      <mesh position={[-0.06, 0, 0]}>
        <boxGeometry args={[0.02, 0.46, 0.025]} />
        <meshStandardMaterial color={clay.wood} />
      </mesh>
      <mesh position={[-0.06, 0, 0]}>
        <boxGeometry args={[0.02, 0.025, 0.36]} />
        <meshStandardMaterial color={clay.wood} />
      </mesh>
    </group>
  );
}

function Bay({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.12, 1.5, 1.8]} />
        <meshStandardMaterial color="#3a2a22" roughness={0.9} />
      </mesh>
      <mesh position={[-0.07, 0.05, 0]}>
        <planeGeometry args={[1.45, 1.15]} />
        <meshStandardMaterial color="#ffc98a" emissive="#ff9a45" emissiveIntensity={0.45} />
      </mesh>
    </group>
  );
}

function Sign({ text, position, size }: { text: string; position: [number, number, number]; size: [number, number] }) {
  const map = useMemo(() => makeSignTexture(text), [text]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <mesh position={position} rotation={[0, -Math.PI / 2, 0]}>
      <planeGeometry args={size} />
      <meshBasicMaterial map={map} toneMapped={false} />
    </mesh>
  );
}

function Bulb({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.16, 6]} />
        <meshStandardMaterial color={clay.woodDark} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.045, 10, 10]} />
        <meshStandardMaterial color="#fff1d0" emissive="#ffc56e" emissiveIntensity={1.1} />
      </mesh>
    </group>
  );
}

const SACKS: { position: [number, number, number]; rotation: number; scale: number }[] = [
  { position: [4.15, 0, -12.15], rotation: 0.2, scale: 1 },
  { position: [4.62, 0, -11.85], rotation: 1.1, scale: 0.92 },
  { position: [3.78, 0, -11.75], rotation: -0.4, scale: 1.05 },
  { position: [4.35, 0, -12.55], rotation: 0.7, scale: 0.86 },
  { position: [4.9, 0, -12.25], rotation: 2.1, scale: 0.82 },
  { position: [3.95, 0, -12.45], rotation: -0.8, scale: 0.78 },
  { position: [4.7, 0, -11.45], rotation: 0.35, scale: 0.74 },
];

function Insumos() {
  const map = useMemo(() => sackMap(), []);
  return (
    <group>
      {SACKS.map((sack) => (
        <Sack key={sack.position.join(',')} position={sack.position} rotation={sack.rotation} scale={sack.scale} map={map} />
      ))}
      <Crate position={[5.45, 0, -12.45]} />
      <Butter position={[5.25, 0, -11.35]} />
      <Scale position={[4.95, 0, -11.05]} />
    </group>
  );
}

function Sack({
  position,
  rotation,
  scale,
  map,
}: {
  position: [number, number, number];
  rotation: number;
  scale: number;
  map: ReturnType<typeof sackMap>;
}) {
  return (
    <group position={position} rotation={[0, rotation, 0]} scale={scale}>
      <RoundedBox args={[0.46, 0.52, 0.34]} position={[0, 0.28, 0]} radius={0.12} smoothness={3} castShadow>
        <meshStandardMaterial color="#f1e2ce" map={map} roughness={0.96} />
      </RoundedBox>
      <mesh position={[0, 0.56, 0]} scale={[0.55, 0.8, 0.5]} castShadow>
        <sphereGeometry args={[0.1, 12, 10]} />
        <meshStandardMaterial color="#d9c4a8" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.66, 0]} castShadow>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#c9b496" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Crate({ position }: { position: [number, number, number] }) {
  const fruits: [number, number, number, string][] = [
    [-0.1, 0.34, -0.06, '#c23b3b'],
    [0.08, 0.36, 0.05, '#3f8f45'],
    [0.02, 0.4, -0.08, '#e4b15a'],
    [-0.06, 0.38, 0.08, '#7a3f86'],
    [0.12, 0.33, -0.02, '#d4652a'],
    [-0.12, 0.32, 0.04, '#c44848'],
  ];
  return (
    <group position={position}>
      <RoundedBox args={[0.72, 0.28, 0.52]} position={[0, 0.16, 0]} radius={0.02} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color={clay.wood} map={woodMap()} roughness={0.82} />
      </RoundedBox>
      {fruits.map(([x, y, z, color], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.07, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.55} />
        </mesh>
      ))}
    </group>
  );
}

function Butter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.05, 0]} receiveShadow>
        <boxGeometry args={[0.62, 0.08, 0.46]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.85} />
      </mesh>
      {[0, 1].map((layer) => (
        <RoundedBox key={layer} args={[0.42, 0.16, 0.3]} position={[0, 0.18 + layer * 0.17, 0]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color={clay.butter} roughness={0.55} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Scale({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.04, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.06, 16]} />
        <meshStandardMaterial color="#8d8882" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.028, 0.034, 0.4, 10]} />
        <meshStandardMaterial color="#6e6a66" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.5, 0]} rotation={[0.15, 0, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.13, 0.04, 20]} />
        <meshStandardMaterial color="#d9d4cc" roughness={0.35} metalness={0.45} />
      </mesh>
      <mesh position={[0.02, 0.5, 0.04]} rotation={[0.15, 0, 0.6]}>
        <boxGeometry args={[0.09, 0.012, 0.012]} />
        <meshStandardMaterial color="#1a140f" />
      </mesh>
      <mesh position={[0.28, 0.05, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.14, 0.04, 16]} />
        <meshStandardMaterial color="#c5c0b8" roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Produccion() {
  return (
    <group>
      <mesh position={[4.7, 0.78, -4.25]} castShadow receiveShadow>
        <boxGeometry args={[2.15, 0.1, 0.95]} />
        <meshStandardMaterial color={clay.wood} map={woodMap()} roughness={0.78} />
      </mesh>
      {[-0.85, 0.85].map((x) =>
        [-0.32, 0.32].map((z) => (
          <mesh key={`${x}-${z}`} position={[4.7 + x, 0.38, -4.25 + z]}>
            <boxGeometry args={[0.08, 0.72, 0.08]} />
            <meshStandardMaterial color={clay.woodDark} roughness={0.8} />
          </mesh>
        )),
      )}
      {[
        [-0.55, 0.95, -4.2, 1.05],
        [-0.05, 0.98, -4.28, 0.9],
        [0.48, 0.93, -4.18, 0.85],
      ].map(([x, y, z, s]) => (
        <mesh key={x} position={[4.7 + x, y, z]} scale={[s, 0.62, s]} castShadow>
          <sphereGeometry args={[0.2, 16, 12]} />
          <meshStandardMaterial color={clay.dough} roughness={0.72} />
        </mesh>
      ))}
      <mesh position={[5.15, 0.86, -4.22]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <boxGeometry args={[0.16, 0.012, 0.018]} />
        <meshStandardMaterial color="#8a5a32" />
      </mesh>
      <mesh position={[5.15, 0.86, -4.22]} rotation={[-Math.PI / 2, 0, 0.4]}>
        <boxGeometry args={[0.018, 0.012, 0.16]} />
        <meshStandardMaterial color="#8a5a32" />
      </mesh>
      <group position={[6.25, 0, -4.85]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.22, 0.32, 16]} />
          <meshStandardMaterial color="#c9c3ba" metalness={0.45} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.62, 0]}>
          <sphereGeometry args={[0.2, 14, 10]} />
          <meshStandardMaterial color={clay.dough} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

function Hornos({ reduced }: { reduced: boolean }) {
  const glow = useRef<MeshStandardMaterial>(null);
  useFrame(({ clock }) => {
    if (!glow.current) return;
    glow.current.emissiveIntensity = reduced ? 1.2 : 1.05 + Math.sin(clock.elapsedTime * 2.2) * 0.18;
  });
  return (
    <group>
      {[1.7, 3.15].map((z) => (
        <group key={z} position={[5.55, 0, z]}>
          <RoundedBox args={[1.35, 1.6, 1.2]} position={[0, 0.85, 0]} radius={0.05} smoothness={2} castShadow>
            <meshStandardMaterial color={clay.iron} roughness={0.7} metalness={0.12} />
          </RoundedBox>
          <mesh position={[-0.68, 0.55, 0]}>
            <boxGeometry args={[0.08, 0.06, 0.78]} />
            <meshStandardMaterial color="#4a4038" roughness={0.6} />
          </mesh>
          <mesh position={[-0.7, 0.82, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <circleGeometry args={[0.3, 24]} />
            <meshStandardMaterial
              ref={z === 3.15 ? glow : undefined}
              color="#ff6a28"
              emissive="#ff3d00"
              emissiveIntensity={2.2}
            />
          </mesh>
          <mesh position={[-0.72, 0.82, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[0.3, 0.4, 24]} />
            <meshStandardMaterial color="#1a1612" roughness={0.6} />
          </mesh>
        </group>
      ))}
      <pointLight position={[4.4, 1.3, 2.4]} color="#ff7a3c" intensity={6} distance={6.5} decay={2} />
      <group position={[4.15, 0, 4.55]}>
        {[0, 1, 2].map((level) => (
          <group key={level}>
            <mesh position={[0, 0.35 + level * 0.38, 0]}>
              <boxGeometry args={[0.7, 0.04, 0.42]} />
              <meshStandardMaterial color={clay.woodDark} />
            </mesh>
            <Panettone position={[-0.16, 0.4 + level * 0.38, 0]} />
            <Panettone position={[0.16, 0.4 + level * 0.38, 0]} />
          </group>
        ))}
      </group>
    </group>
  );
}

function Panettone({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={scale}>
      <mesh castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.12, 14]} />
        <meshStandardMaterial color="#f7f1e6" roughness={0.86} />
      </mesh>
      <mesh position={[0, 0.08, 0]} scale={[1, 0.7, 1]} castShadow>
        <sphereGeometry args={[0.11, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c4844a" roughness={0.72} />
      </mesh>
      {[
        [-0.03, 0.12, 0.04],
        [0.04, 0.13, 0.02],
        [0.01, 0.14, -0.04],
      ].map((dot, index) => (
        <mesh key={index} position={dot as [number, number, number]}>
          <sphereGeometry args={[0.018, 8, 6]} />
          <meshStandardMaterial color={index === 1 ? '#3f8f45' : '#c23b3b'} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Cajas({ product, onPick }: { product: ProductId; onPick: (id: ProductId) => void }) {
  const stacks: { id: ProductId; z: number; lift: number }[] = [
    { id: 'selecto', z: -0.7, lift: 0 },
    { id: 'premium', z: 0.05, lift: 0.08 },
    { id: 'marca', z: 0.8, lift: 0 },
  ];
  return (
    <group position={[4.9, 0, 8.75]}>
      <mesh position={[0, 0.74, 0.05]} castShadow receiveShadow>
        <boxGeometry args={[1.7, 0.1, 1.9]} />
        <meshStandardMaterial color={clay.wood} map={woodMap()} roughness={0.78} />
      </mesh>
      {[-0.7, 0.7].map((x) =>
        [-0.7, 0.75].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.36, z]}>
            <boxGeometry args={[0.08, 0.7, 0.08]} />
            <meshStandardMaterial color={clay.woodDark} />
          </mesh>
        )),
      )}
      {stacks.map((stack) => (
        <BoxStack key={stack.id} id={stack.id} position={[0.05, 0.82 + stack.lift, stack.z]} active={stack.id === product} onPick={onPick} />
      ))}
    </group>
  );
}

function BoxStack({
  id,
  position,
  active,
  onPick,
}: {
  id: ProductId;
  position: [number, number, number];
  active: boolean;
  onPick: (id: ProductId) => void;
}) {
  const map = useMemo(() => makeBoxTexture(id), [id]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group
      position={position}
      onClick={(event) => {
        event.stopPropagation();
        onPick(id);
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
    >
      {[0, 1].map((layer) => (
        <RoundedBox key={layer} args={[0.48, 0.36, 0.48]} position={[0, layer * 0.38, 0]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color={boxBody[id]} roughness={0.74} />
        </RoundedBox>
      ))}
      <mesh position={[-0.25, 0.38, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.42, 0.32]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {active ? (
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.28, 0.34, 24]} />
          <meshStandardMaterial color="#e4b15a" roughness={0.5} />
        </mesh>
      ) : null}
    </group>
  );
}

function Truck() {
  return (
    <group position={[5.35, 0, 15.55]}>
      <mesh position={[0, 0.38, -0.15]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.12, 2.7]} />
        <meshStandardMaterial color="#2a211c" roughness={0.7} />
      </mesh>
      <mesh position={[-0.72, 0.62, -0.35]}>
        <boxGeometry args={[0.06, 0.4, 2.15]} />
        <meshStandardMaterial color={clay.ink} roughness={0.65} />
      </mesh>
      <mesh position={[0.72, 0.62, -0.35]}>
        <boxGeometry args={[0.06, 0.4, 2.15]} />
        <meshStandardMaterial color={clay.ink} roughness={0.65} />
      </mesh>
      <mesh position={[-0.76, 0.78, -0.2]}>
        <boxGeometry args={[0.02, 0.05, 2.1]} />
        <meshStandardMaterial color="#e4b15a" metalness={0.4} roughness={0.35} emissive="#c8882a" emissiveIntensity={0.2} />
      </mesh>
      <RoundedBox args={[1.45, 1.15, 1.2]} position={[0, 0.78, 1.35]} radius={0.06} smoothness={2} castShadow>
        <meshStandardMaterial color="#1a140f" roughness={0.58} />
      </RoundedBox>
      <mesh position={[-0.74, 0.95, 1.35]}>
        <planeGeometry args={[0.7, 0.42]} />
        <meshStandardMaterial color="#f3e2c4" emissive="#ffd7a2" emissiveIntensity={0.2} />
      </mesh>
      <RoundedBox args={[0.42, 0.34, 0.42]} position={[-0.15, 0.62, -0.7]} radius={0.02} castShadow>
        <meshStandardMaterial color="#f4efe6" roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.32, 0.4]} position={[0.28, 0.6, -0.15]} radius={0.02} castShadow>
        <meshStandardMaterial color="#6e2430" roughness={0.75} />
      </RoundedBox>
      {[
        [-0.7, 0.22, 1.15],
        [0.7, 0.22, 1.15],
        [-0.7, 0.22, -1.05],
        [0.7, 0.22, -1.05],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.16, 16]} />
          <meshStandardMaterial color="#14110e" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
