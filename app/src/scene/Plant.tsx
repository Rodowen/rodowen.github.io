import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ContactShadows, RoundedBox } from '@react-three/drei';
import type { MeshStandardMaterial, Texture } from 'three';
import { RepeatWrapping } from 'three';
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

const LENGTH = 31.4;

export function Plant(props: Props) {
  return (
    <group>
      <Ground />
      <Shell fontsReady={props.fontsReady} />
      <Insumos />
      <Produccion />
      <Hornos reduced={props.reduced} />
      <Cajas
        fontsReady={props.fontsReady}
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
          fontsReady={props.fontsReady}
          onSelect={props.onPerson}
          onOpen={person.id === 'despacho' ? () => props.onStation('cupo') : undefined}
        />
      ))}
      <ContactShadows position={[5.2, 0.03, -0.4]} opacity={0.42} scale={28} blur={2.2} far={4} color="#140e0a" resolution={512} />
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, -0.22, 0]} receiveShadow>
      <circleGeometry args={[46, 64]} />
      <meshStandardMaterial color={clay.studio} roughness={1} />
    </mesh>
  );
}

function Shell({ fontsReady }: { fontsReady: boolean }) {
  const plaster = useMemo(() => {
    const map = plasterMap().clone();
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(9, 1.3);
    map.needsUpdate = true;
    return map;
  }, []);
  const wood = useMemo(() => {
    const map = woodMap().clone();
    map.wrapS = RepeatWrapping;
    map.wrapT = RepeatWrapping;
    map.repeat.set(2.2, 16);
    map.needsUpdate = true;
    return map;
  }, []);
  const roof = useMemo(() => {
    const map = makeRoofTexture();
    map.repeat.set(3, 20);
    return map;
  }, []);
  useEffect(() => () => roof.dispose(), [roof]);

  return (
    <group>
      <mesh position={[5.3, -0.08, -0.5]} receiveShadow>
        <boxGeometry args={[8.2, 0.1, LENGTH]} />
        <meshStandardMaterial color="#2a211c" roughness={0.96} />
      </mesh>
      <mesh position={[5.35, 0.015, -0.5]} receiveShadow>
        <boxGeometry args={[6.4, 0.07, 30.6]} />
        <meshStandardMaterial color="#4a3024" map={wood} roughness={0.9} />
      </mesh>
      {[-15.9, -8.9, -1.7, 5.5, 12.4].map((z) => (
        <mesh key={z} position={[5.35, 0.055, z]}>
          <boxGeometry args={[6.3, 0.015, 0.07]} />
          <meshStandardMaterial color="#3a2a22" roughness={0.9} />
        </mesh>
      ))}
      <mesh position={[8.48, 1.26, -0.7]} castShadow receiveShadow>
        <boxGeometry args={[0.26, 2.46, 30.4]} />
        <meshStandardMaterial color={clay.plaster} map={plaster} roughness={0.93} />
      </mesh>
      <mesh position={[8.3, 0.22, -0.7]}>
        <boxGeometry args={[0.08, 0.38, 30.2]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.86} />
      </mesh>
      <mesh position={[5.2, 1.26, -16.05]} castShadow receiveShadow>
        <boxGeometry args={[6.5, 2.46, 0.22]} />
        <meshStandardMaterial color={clay.plaster} map={plaster} roughness={0.93} />
      </mesh>
      <mesh position={[5.5, 1.05, -15.9]}>
        <boxGeometry args={[2.2, 1.85, 0.08]} />
        <meshStandardMaterial color="#1a140f" roughness={1} />
      </mesh>
      <mesh position={[8.32, 2.54, -0.7]} castShadow>
        <boxGeometry args={[0.42, 0.1, 30.6]} />
        <meshStandardMaterial color={clay.roof} map={roof} roughness={0.88} />
      </mesh>
      <mesh position={[8.22, 2.46, -0.7]}>
        <boxGeometry args={[0.16, 0.06, 30.6]} />
        <meshStandardMaterial color="#6e3428" roughness={0.9} />
      </mesh>
      {[-15.7, -9.1, -2.1, 4.9, 11.7].map((z) => (
        <mesh key={z} position={[2.32, 1.26, z]} castShadow>
          <boxGeometry args={[0.14, 2.46, 0.14]} />
          <meshStandardMaterial color={clay.woodDark} roughness={0.82} />
        </mesh>
      ))}
      <mesh position={[2.55, 1.28, 14.85]} castShadow>
        <boxGeometry args={[0.18, 2.5, 0.18]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.82} />
      </mesh>
      <mesh position={[8.15, 1.28, 14.85]} castShadow>
        <boxGeometry args={[0.18, 2.5, 0.18]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.82} />
      </mesh>
      <mesh position={[5.35, 2.5, 14.85]} castShadow>
        <boxGeometry args={[5.8, 0.16, 0.18]} />
        <meshStandardMaterial color={clay.wood} roughness={0.8} />
      </mesh>
      {[-14.2, -11.2, -7.4, -4.2, -0.4, 3.2, 6.6, 10.2, 13.2].map((z) => (
        <Window key={z} position={[8.3, 1.7, z]} />
      ))}
      <Chimney />
      {fontsReady ? (
        <>
          <Sign text="ORINDALE" position={[8.28, 2.12, -13.6]} size={[2.4, 0.42]} />
          <Sign text="INSUMOS" position={[8.28, 1.62, -12.2]} size={[1.7, 0.34]} />
          <Sign text="PRODUCCIÓN" position={[8.28, 1.62, -5.1]} size={[2.15, 0.34]} />
          <Sign text="HORNOS" position={[8.28, 1.62, 2.5]} size={[1.55, 0.34]} />
          <Sign text="CAJAS" position={[8.28, 1.62, 8.9]} size={[1.35, 0.34]} />
          <Sign text="DESPACHO" position={[8.28, 1.62, 13.1]} size={[1.9, 0.34]} />
        </>
      ) : null}
      {[-12.4, -5.0, 2.6, 9.0, 13.4].map((z) => (
        <Bulb key={z} position={[4.2, 2.35, z]} />
      ))}
    </group>
  );
}

function Window({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, -Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[0.62, 0.86, 0.06]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.8} />
      </mesh>
      <mesh position={[0, -0.06, 0.04]}>
        <planeGeometry args={[0.4, 0.5]} />
        <meshStandardMaterial color="#ffd7a8" emissive="#ff9a3c" emissiveIntensity={0.65} />
      </mesh>
      <mesh position={[0, 0.28, 0.045]}>
        <circleGeometry args={[0.2, 16, 0, Math.PI]} />
        <meshStandardMaterial color="#ffd7a8" emissive="#ff9a3c" emissiveIntensity={0.65} />
      </mesh>
    </group>
  );
}

function Chimney() {
  return (
    <group position={[8.15, 3.15, 2.6]}>
      <mesh castShadow>
        <cylinderGeometry args={[0.22, 0.26, 1.15, 12]} />
        <meshStandardMaterial color="#e7d3bc" roughness={0.92} />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.1, 12]} />
        <meshStandardMaterial color="#c4ae96" roughness={0.9} />
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
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.008, 0.008, 0.22, 6]} />
        <meshStandardMaterial color={clay.woodDark} />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.055, 12, 10]} />
        <meshStandardMaterial color="#fff1d0" emissive="#ffc56e" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

const SACKS: { position: [number, number, number]; rotation: number; scale: number }[] = [
  { position: [4.45, 0, -12.7], rotation: 0.2, scale: 1.05 },
  { position: [5.15, 0, -12.95], rotation: 0.8, scale: 1 },
  { position: [5.85, 0, -12.6], rotation: -0.3, scale: 0.98 },
  { position: [4.85, 0, -12.15], rotation: 1.4, scale: 1.02 },
  { position: [5.55, 0, -12.2], rotation: 2.2, scale: 0.96 },
  { position: [5.15, 0.62, -12.5], rotation: 0.4, scale: 0.9 },
];

function Insumos() {
  const map = sackMap();
  return (
    <group>
      <mesh position={[5.2, 0.08, -12.55]} receiveShadow>
        <boxGeometry args={[2.15, 0.1, 1.35]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.86} />
      </mesh>
      {SACKS.map((sack) => (
        <Sack key={sack.position.join(',')} position={sack.position} rotation={sack.rotation} scale={sack.scale} map={map} />
      ))}
      <Crate position={[6.35, 0, -11.35]} />
      <Butter position={[4.35, 0, -11.55]} />
      <Scale position={[3.85, 0, -12.15]} />
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
  map: Texture;
}) {
  return (
    <group position={position} rotation={[0.08, rotation, 0.12]} scale={scale}>
      <RoundedBox args={[0.58, 0.72, 0.42]} position={[0, 0.38, 0]} radius={0.16} smoothness={3} castShadow>
        <meshStandardMaterial color="#f4ead8" map={map} roughness={0.94} />
      </RoundedBox>
      <mesh position={[0, 0.78, 0]} scale={[0.55, 0.7, 0.45]} castShadow>
        <sphereGeometry args={[0.12, 10, 8]} />
        <meshStandardMaterial color="#e4d2b8" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshStandardMaterial color="#c9b496" roughness={0.9} />
      </mesh>
    </group>
  );
}

function Crate({ position }: { position: [number, number, number] }) {
  const fruits: [number, number, number, string][] = [
    [-0.12, 0.36, -0.06, '#c23b3b'],
    [0.08, 0.38, 0.06, '#3f8f45'],
    [0.02, 0.44, -0.08, '#e4b15a'],
    [-0.04, 0.4, 0.1, '#7a3f86'],
    [0.14, 0.34, -0.02, '#d4652a'],
    [-0.14, 0.33, 0.05, '#c44848'],
  ];
  return (
    <group position={position}>
      <RoundedBox args={[0.78, 0.32, 0.56]} position={[0, 0.18, 0]} radius={0.02} smoothness={2} castShadow receiveShadow>
        <meshStandardMaterial color={clay.wood} roughness={0.82} />
      </RoundedBox>
      {fruits.map(([x, y, z, color], index) => (
        <mesh key={index} position={[x, y, z]} castShadow>
          <sphereGeometry args={[0.08, 12, 10]} />
          <meshStandardMaterial color={color} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Butter({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]} receiveShadow>
        <boxGeometry args={[0.7, 0.08, 0.5]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.85} />
      </mesh>
      {[0, 1].map((layer) => (
        <RoundedBox key={layer} args={[0.48, 0.18, 0.34]} position={[0, 0.2 + layer * 0.18, 0]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color={clay.butter} roughness={0.5} />
        </RoundedBox>
      ))}
    </group>
  );
}

function Scale({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.06, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.2, 0.08, 16]} />
        <meshStandardMaterial color="#8d8882" roughness={0.45} metalness={0.35} />
      </mesh>
      <mesh position={[0, 0.36, 0]}>
        <cylinderGeometry args={[0.03, 0.036, 0.48, 10]} />
        <meshStandardMaterial color="#6e6a66" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh position={[0, 0.62, 0]} rotation={[0.2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.045, 20]} />
        <meshStandardMaterial color="#e7e2da" roughness={0.35} metalness={0.4} />
      </mesh>
      <mesh position={[0.04, 0.62, 0.05]} rotation={[0.2, 0, 0.7]}>
        <boxGeometry args={[0.1, 0.012, 0.012]} />
        <meshStandardMaterial color="#1a140f" />
      </mesh>
      <mesh position={[0.32, 0.07, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.16, 0.045, 16]} />
        <meshStandardMaterial color="#c5c0b8" roughness={0.4} metalness={0.4} />
      </mesh>
    </group>
  );
}

function Produccion() {
  return (
    <group>
      <mesh position={[5.55, 0.78, -5.05]} castShadow receiveShadow>
        <boxGeometry args={[1.25, 0.1, 2.7]} />
        <meshStandardMaterial color={clay.wood} roughness={0.78} />
      </mesh>
      {[
        [-0.45, -1.1],
        [0.45, -1.1],
        [-0.45, 1.1],
        [0.45, 1.1],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[5.55 + x, 0.38, -5.05 + z]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color={clay.woodDark} roughness={0.8} />
        </mesh>
      ))}
      {[
        [-0.85, 0.12, 1.15],
        [-0.1, -0.08, 1],
        [0.6, 0.1, 0.9],
        [1.05, -0.02, 0.85],
      ].map(([z, x, s]) => (
        <group key={z} position={[5.55 + x, 0.9, -5.05 + z]} scale={[s, 0.42, s * 0.85]}>
          <mesh castShadow>
            <sphereGeometry args={[0.28, 16, 12]} />
            <meshStandardMaterial color="#e7c99a" roughness={0.78} />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0.4]}>
            <boxGeometry args={[0.22, 0.012, 0.02]} />
            <meshStandardMaterial color="#8a5a32" />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0.4]}>
            <boxGeometry args={[0.02, 0.012, 0.22]} />
            <meshStandardMaterial color="#8a5a32" />
          </mesh>
        </group>
      ))}
      <Panettone position={[6.15, 0.95, -4.15]} scale={1.15} />
      <Panettone position={[6.05, 0.95, -5.85]} scale={1.05} />
      <group position={[7.15, 0, -6.15]}>
        <mesh position={[0, 0.42, 0]} castShadow>
          <cylinderGeometry args={[0.32, 0.26, 0.34, 16]} />
          <meshStandardMaterial color="#c9c3ba" metalness={0.45} roughness={0.35} />
        </mesh>
        <mesh position={[0, 0.64, 0]}>
          <sphereGeometry args={[0.22, 14, 10]} />
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
    glow.current.emissiveIntensity = reduced ? 1.4 : 1.15 + Math.sin(clock.elapsedTime * 2.2) * 0.2;
  });
  return (
    <group>
      {[1.45, 3.25].map((z) => (
        <group key={z} position={[7.05, 0, z]}>
          <RoundedBox args={[1.15, 1.7, 1.45]} position={[0, 0.9, 0]} radius={0.06} smoothness={2} castShadow>
            <meshStandardMaterial color="#4a342c" roughness={0.86} />
          </RoundedBox>
          <mesh position={[-0.58, 0.72, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <circleGeometry args={[0.38, 24]} />
            <meshStandardMaterial ref={z === 3.25 ? glow : undefined} color="#ff6a28" emissive="#ff3d00" emissiveIntensity={1.6} />
          </mesh>
          <mesh position={[-0.6, 0.72, 0]} rotation={[0, -Math.PI / 2, 0]}>
            <ringGeometry args={[0.38, 0.48, 24]} />
            <meshStandardMaterial color="#1a1612" roughness={0.6} />
          </mesh>
          <Panettone position={[0.15, 0.55, 0.15]} scale={0.55} />
        </group>
      ))}
      <pointLight position={[5.2, 1.4, 2.4]} color="#ff7a3c" intensity={8} distance={8} decay={2} />
      <group position={[6.15, 0, 4.85]}>
        {[0, 1, 2].map((level) => (
          <group key={level}>
            <mesh position={[0, 0.42 + level * 0.42, 0]} castShadow>
              <boxGeometry args={[0.9, 0.04, 0.48]} />
              <meshStandardMaterial color={clay.woodDark} />
            </mesh>
            <Panettone position={[-0.22, 0.5 + level * 0.42, 0]} scale={1.15} />
            <Panettone position={[0.22, 0.5 + level * 0.42, 0]} scale={1.15} />
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
        <cylinderGeometry args={[0.13, 0.11, 0.14, 14]} />
        <meshStandardMaterial color="#f7f1e6" roughness={0.86} />
      </mesh>
      <mesh position={[0, 0.1, 0]} scale={[1, 0.7, 1]} castShadow>
        <sphereGeometry args={[0.12, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#c4844a" roughness={0.72} />
      </mesh>
      {[
        [-0.03, 0.14, 0.04],
        [0.045, 0.15, 0.02],
        [0.01, 0.16, -0.04],
      ].map((dot, index) => (
        <mesh key={index} position={dot as [number, number, number]}>
          <sphereGeometry args={[0.02, 8, 6]} />
          <meshStandardMaterial color={index === 1 ? '#3f8f45' : '#c23b3b'} roughness={0.5} />
        </mesh>
      ))}
    </group>
  );
}

function Cajas({
  product,
  fontsReady,
  onPick,
}: {
  product: ProductId;
  fontsReady: boolean;
  onPick: (id: ProductId) => void;
}) {
  const stacks: { id: ProductId; z: number }[] = [
    { id: 'selecto', z: -0.85 },
    { id: 'premium', z: 0.05 },
    { id: 'marca', z: 0.95 },
  ];
  return (
    <group position={[5.4, 0, 8.9]}>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.45, 0.1, 2.5]} />
        <meshStandardMaterial color={clay.wood} roughness={0.78} />
      </mesh>
      {[
        [-0.55, -1.05],
        [0.55, -1.05],
        [-0.55, 1.05],
        [0.55, 1.05],
      ].map(([x, z]) => (
        <mesh key={`${x}-${z}`} position={[x, 0.36, z]}>
          <boxGeometry args={[0.08, 0.68, 0.08]} />
          <meshStandardMaterial color={clay.woodDark} />
        </mesh>
      ))}
      {stacks.map((stack) => (
        <BoxStack
          key={stack.id}
          id={stack.id}
          position={[0.05, 0.84, stack.z]}
          active={stack.id === product}
          fontsReady={fontsReady}
          onPick={onPick}
        />
      ))}
    </group>
  );
}

function BoxStack({
  id,
  position,
  active,
  fontsReady,
  onPick,
}: {
  id: ProductId;
  position: [number, number, number];
  active: boolean;
  fontsReady: boolean;
  onPick: (id: ProductId) => void;
}) {
  const map = useMemo(() => makeBoxTexture(id), [id, fontsReady]);
  useEffect(() => () => map.dispose(), [map]);
  return (
    <group
      position={position}
      rotation={[0, -2.15, 0]}
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
        <RoundedBox key={layer} args={[0.62, 0.46, 0.5]} position={[0, layer * 0.48, 0]} radius={0.02} smoothness={2} castShadow>
          <meshStandardMaterial color={boxBody[id]} roughness={0.74} />
        </RoundedBox>
      ))}
      <mesh position={[0, 0.48, 0.26]}>
        <planeGeometry args={[0.56, 0.4]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
      {active ? (
        <mesh position={[0, -0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.34, 0.4, 24]} />
          <meshStandardMaterial color="#e4b15a" roughness={0.5} />
        </mesh>
      ) : null}
    </group>
  );
}

function Truck() {
  return (
    <group position={[5.55, 0, 17.55]}>
      <mesh position={[0, 0.48, -0.7]} castShadow receiveShadow>
        <boxGeometry args={[2.05, 0.16, 3.3]} />
        <meshStandardMaterial color="#241c16" roughness={0.7} />
      </mesh>
      <mesh position={[-1.0, 0.95, -0.85]} castShadow>
        <boxGeometry args={[0.06, 0.7, 2.9]} />
        <meshStandardMaterial color={clay.ink} roughness={0.62} />
      </mesh>
      <mesh position={[1.0, 0.95, -0.85]}>
        <boxGeometry args={[0.06, 0.7, 2.9]} />
        <meshStandardMaterial color={clay.ink} roughness={0.62} />
      </mesh>
      <mesh position={[-1.04, 1.15, -0.85]}>
        <boxGeometry args={[0.03, 0.06, 2.9]} />
        <meshStandardMaterial color="#e4b15a" metalness={0.35} roughness={0.4} emissive="#c8882a" emissiveIntensity={0.25} />
      </mesh>
      <RoundedBox args={[1.9, 1.15, 1.7]} position={[0, 1.15, 1.55]} radius={0.08} smoothness={2} castShadow>
        <meshStandardMaterial color="#1a140f" roughness={0.55} />
      </RoundedBox>
      <mesh position={[-0.97, 1.3, 1.55]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[0.7, 0.42]} />
        <meshStandardMaterial color="#f3e2c4" emissive="#ffd7a2" emissiveIntensity={0.25} />
      </mesh>
      <RoundedBox args={[0.48, 0.38, 0.42]} position={[-0.35, 0.78, -1.5]} radius={0.02} castShadow>
        <meshStandardMaterial color="#f4efe6" roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.46, 0.36, 0.4]} position={[0.25, 0.76, -0.85]} radius={0.02} castShadow>
        <meshStandardMaterial color="#6e2430" roughness={0.75} />
      </RoundedBox>
      <RoundedBox args={[0.44, 0.34, 0.4]} position={[-0.15, 0.74, -0.2]} radius={0.02} castShadow>
        <meshStandardMaterial color="#e7d3ae" roughness={0.75} />
      </RoundedBox>
      {[
        [-0.78, 0.28, 1.35],
        [0.78, 0.28, 1.35],
        [-0.78, 0.28, -1.55],
        [0.78, 0.28, -1.55],
      ].map((position, index) => (
        <mesh key={index} position={position as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.28, 0.28, 0.18, 16]} />
          <meshStandardMaterial color="#14110e" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}
