import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import type { Group } from 'three';
import type { Person, ProductId, Tool } from '../content';
import { clay } from './clay';
import { makeBoxTexture } from './labels';
import { boxBody } from './labels';

type Props = {
  person: Person;
  selected: boolean;
  reduced: boolean;
  product: ProductId;
  fontsReady: boolean;
  onSelect: (id: string) => void;
  onOpen?: () => void;
};

export function Worker({ person, selected, reduced, product, fontsReady, onSelect, onOpen }: Props) {
  const ref = useRef<Group>(null);
  useFrame(({ clock }) => {
    const group = ref.current;
    if (!group) return;
    const idle = reduced ? 0 : Math.sin(clock.elapsedTime * 1.3 + person.position[2]) * 0.008;
    group.position.y = person.position[1] + idle;
  });

  return (
    <group ref={ref} position={person.position} rotation={[0, person.yaw, 0]}>
      <mesh
        position={[0, 0.9, 0]}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(person.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
        }}
      >
        <boxGeometry args={[0.7, 1.75, 0.6]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {selected ? (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
          <ringGeometry args={[0.42, 0.58, 32]} />
          <meshBasicMaterial color="#e4b15a" />
        </mesh>
      ) : null}
      <Figure tool={person.tool} product={product} fontsReady={fontsReady} onOpen={onOpen} />
    </group>
  );
}

function Figure({ tool, product, fontsReady, onOpen }: { tool: Tool; product: ProductId; fontsReady: boolean; onOpen?: () => void }) {
  return (
    <group>
      <Shoe x={-0.08} />
      <Shoe x={0.08} />
      <Leg x={-0.08} />
      <Leg x={0.08} />
      <RoundedBox args={[0.36, 0.42, 0.22]} position={[0, 0.96, 0]} radius={0.08} smoothness={2} castShadow>
        <meshStandardMaterial color={clay.shirt} roughness={0.92} />
      </RoundedBox>
      <RoundedBox args={[0.4, 0.5, 0.07]} position={[0, 0.78, 0.12]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color={clay.apron} roughness={0.9} />
      </RoundedBox>
      <RoundedBox args={[0.2, 0.26, 0.045]} position={[0, 1.1, 0.13]} radius={0.02} smoothness={2} castShadow>
        <meshStandardMaterial color={clay.apron} roughness={0.9} />
      </RoundedBox>
      <mesh position={[0, 1.22, 0.14]}>
        <boxGeometry args={[0.22, 0.035, 0.03]} />
        <meshStandardMaterial color={clay.apron} roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.24, 0]} castShadow>
        <cylinderGeometry args={[0.055, 0.065, 0.08, 12]} />
        <meshStandardMaterial color={clay.skin} roughness={0.78} />
      </mesh>
      <mesh position={[0, 1.42, 0]} castShadow>
        <sphereGeometry args={[0.155, 24, 18]} />
        <meshStandardMaterial color={clay.skin} roughness={0.76} />
      </mesh>
      <mesh position={[-0.145, 1.42, 0]}>
        <sphereGeometry args={[0.03, 10, 8]} />
        <meshStandardMaterial color={clay.skin} roughness={0.8} />
      </mesh>
      <mesh position={[0.145, 1.42, 0]}>
        <sphereGeometry args={[0.03, 10, 8]} />
        <meshStandardMaterial color={clay.skin} roughness={0.8} />
      </mesh>
      <Eye x={-0.052} />
      <Eye x={0.052} />
      <mesh position={[0, 1.4, 0.145]}>
        <sphereGeometry args={[0.022, 10, 8]} />
        <meshStandardMaterial color={clay.nose} roughness={0.72} />
      </mesh>
      <mesh position={[0, 1.52, 0]} castShadow>
        <cylinderGeometry args={[0.148, 0.155, 0.045, 18]} />
        <meshStandardMaterial color={clay.cap} roughness={0.94} />
      </mesh>
      <mesh position={[0, 1.58, 0.01]} scale={[1.05, 0.62, 1.05]} castShadow>
        <sphereGeometry args={[0.145, 20, 14]} />
        <meshStandardMaterial color={clay.cap} roughness={0.94} />
      </mesh>
      <Arms tool={tool} />
      {tool === 'clipboard' ? <Clipboard /> : null}
      {tool === 'peel' ? <Peel /> : null}
      {tool === 'offer' ? <OfferBox product={product} fontsReady={fontsReady} onOpen={onOpen} /> : null}
    </group>
  );
}

function Eye({ x }: { x: number }) {
  return (
    <group position={[x, 1.455, 0.132]}>
      <mesh>
        <sphereGeometry args={[0.02, 10, 8]} />
        <meshStandardMaterial color={clay.eye} roughness={0.35} />
      </mesh>
      <mesh position={[0.006, 0.006, 0.016]}>
        <sphereGeometry args={[0.006, 6, 6]} />
        <meshBasicMaterial color="#fffaf3" />
      </mesh>
    </group>
  );
}

function Shoe({ x }: { x: number }) {
  return (
    <RoundedBox args={[0.12, 0.06, 0.2]} position={[x, 0.045, 0.03]} radius={0.02} smoothness={2} castShadow>
      <meshStandardMaterial color={clay.shoe} roughness={0.8} />
    </RoundedBox>
  );
}

function Leg({ x }: { x: number }) {
  return (
    <mesh position={[x, 0.36, 0]} castShadow>
      <capsuleGeometry args={[0.068, 0.4, 4, 8]} />
      <meshStandardMaterial color={clay.trouser} roughness={0.95} />
    </mesh>
  );
}

function Arms({ tool }: { tool: Tool }) {
  const pair = POSE[tool];
  return (
    <group>
      <Sleeve a={pair.left[0]} b={pair.left[1]} />
      <Sleeve a={pair.right[0]} b={pair.right[1]} />
      <Hand at={pair.left[1]} />
      <Hand at={pair.right[1]} />
    </group>
  );
}

type Joint = [number, number, number];

const POSE: Record<Tool, { left: [Joint, Joint]; right: [Joint, Joint] }> = {
  clipboard: {
    left: [[-0.22, 1.08, 0.06], [-0.28, 0.78, 0.22]],
    right: [[0.22, 1.08, 0.06], [0.24, 1.0, 0.28]],
  },
  dough: {
    left: [[-0.22, 1.08, 0.06], [-0.1, 0.78, 0.38]],
    right: [[0.22, 1.08, 0.06], [0.12, 0.78, 0.38]],
  },
  peel: {
    left: [[-0.22, 1.08, 0.04], [-0.3, 0.72, 0.12]],
    right: [[0.2, 1.08, 0.08], [0.16, 0.92, 0.34]],
  },
  pack: {
    left: [[-0.2, 1.06, 0.08], [-0.1, 0.86, 0.34]],
    right: [[0.2, 1.06, 0.08], [0.12, 0.86, 0.34]],
  },
  offer: {
    left: [[-0.22, 1.05, 0.1], [-0.28, 0.96, 0.48]],
    right: [[0.22, 1.05, 0.1], [0.28, 0.96, 0.48]],
  },
};

function Sleeve({ a, b }: { a: Joint; b: Joint }) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const dz = b[2] - a[2];
  const len = Math.hypot(dx, dy, dz);
  const mid: Joint = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
  const yaw = Math.atan2(dx, dz);
  const pitch = Math.asin(Math.max(-1, Math.min(1, dy / (len || 1))));
  return (
    <mesh position={mid} rotation={[pitch - Math.PI / 2, yaw, 0]} castShadow>
      <capsuleGeometry args={[0.048, Math.max(0.08, len - 0.08), 4, 8]} />
      <meshStandardMaterial color={clay.shirt} roughness={0.92} />
    </mesh>
  );
}

function Hand({ at }: { at: Joint }) {
  return (
    <mesh position={at} castShadow>
      <sphereGeometry args={[0.055, 12, 10]} />
      <meshStandardMaterial color={clay.skin} roughness={0.74} />
    </mesh>
  );
}

function Clipboard() {
  return (
    <group position={[0.22, 1.02, 0.32]} rotation={[-0.5, 0.2, 0.15]}>
      <RoundedBox args={[0.2, 0.26, 0.02]} radius={0.01} smoothness={2} castShadow>
        <meshStandardMaterial color="#f4efe6" roughness={0.85} />
      </RoundedBox>
      <mesh position={[0, 0.1, 0.012]}>
        <boxGeometry args={[0.08, 0.03, 0.012]} />
        <meshStandardMaterial color="#c8882a" metalness={0.35} roughness={0.4} />
      </mesh>
    </group>
  );
}

function Peel() {
  return (
    <group position={[-0.15, 0.95, 0.2]} rotation={[0.25, 1.35, -0.15]}>
      <mesh castShadow>
        <boxGeometry args={[0.045, 0.045, 1.45]} />
        <meshStandardMaterial color={clay.wood} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0, 0.86]} castShadow>
        <boxGeometry args={[0.36, 0.03, 0.42]} />
        <meshStandardMaterial color={clay.woodDark} roughness={0.78} />
      </mesh>
    </group>
  );
}

function OfferBox({ product, fontsReady, onOpen }: { product: ProductId; fontsReady: boolean; onOpen?: () => void }) {
  const map = useMemo(() => makeBoxTexture(product), [product, fontsReady]);
  return (
    <group
      position={[0, 0.98, 0.5]}
      onClick={(event) => {
        event.stopPropagation();
        onOpen?.();
      }}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = '';
      }}
    >
      <RoundedBox args={[0.5, 0.62, 0.4]} radius={0.03} smoothness={2} castShadow>
        <meshStandardMaterial color={boxBody[product]} roughness={0.72} />
      </RoundedBox>
      <mesh position={[0, 0, 0.205]}>
        <planeGeometry args={[0.46, 0.56]} />
        <meshBasicMaterial map={map} toneMapped={false} />
      </mesh>
    </group>
  );
}
