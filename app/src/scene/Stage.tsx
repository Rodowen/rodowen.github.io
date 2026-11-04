import { useLayoutEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { ACESFilmicToneMapping, PMREMGenerator } from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import type { ProductId, StationId } from '../content';
import { CameraRig } from './CameraRig';
import { Plant } from './Plant';

type Props = {
  station: StationId;
  person: string | null;
  product: ProductId;
  reduced: boolean;
  narrow: boolean;
  fontsReady: boolean;
  onReady: () => void;
  onPerson: (id: string) => void;
  onStation: (id: StationId) => void;
  onProduct: (id: ProductId) => void;
};

export function Stage(props: Props) {
  return (
    <div className="absolute inset-0">
      <Canvas
        shadows
        dpr={[1, props.narrow ? 1.25 : 1.7]}
        camera={{ fov: 36, near: 0.08, far: 80, position: [-7.6, 5.15, -12.6] }}
        gl={{
          antialias: true,
          alpha: false,
          stencil: false,
          powerPreference: 'high-performance',
        }}
        performance={{ min: 0.6 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#14110e');
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.08;
          document.documentElement.dataset.plant = 'ready';
          props.onReady();
        }}
      >
        <AdaptiveDpr />
        <color attach="background" args={['#14110e']} />
        <fog attach="fog" args={['#14110e', 18, 46]} />
        <SoftEnvironment />
        <hemisphereLight args={['#ffe7c8', '#3a2a22', 0.62]} />
        <ambientLight intensity={0.16} color="#f3e2c8" />
        <directionalLight
          position={[-8, 12, -5]}
          intensity={2.6}
          color="#fff6e8"
          castShadow
          shadow-mapSize-width={props.narrow ? 1024 : 2048}
          shadow-mapSize-height={props.narrow ? 1024 : 2048}
          shadow-bias={-0.0004}
          shadow-normalBias={0.04}
          shadow-camera-near={1}
          shadow-camera-far={48}
          shadow-camera-left={-22}
          shadow-camera-right={22}
          shadow-camera-top={22}
          shadow-camera-bottom={-22}
        />
        <CameraRig station={props.station} narrow={props.narrow} reduced={props.reduced} />
        <Plant
          station={props.station}
          person={props.person}
          product={props.product}
          reduced={props.reduced}
          fontsReady={props.fontsReady}
          onPerson={props.onPerson}
          onStation={props.onStation}
          onProduct={props.onProduct}
        />
      </Canvas>
    </div>
  );
}

function SoftEnvironment() {
  const gl = useThree((state) => state.gl);
  const scene = useThree((state) => state.scene);
  useLayoutEffect(() => {
    const pmrem = new PMREMGenerator(gl);
    const texture = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = texture;
    scene.environmentIntensity = 0.2;
    return () => {
      texture.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}
