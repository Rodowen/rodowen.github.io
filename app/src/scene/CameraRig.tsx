import { useLayoutEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import type { StationId } from '../content';
import { poseFor } from './poses';

type Props = {
  station: StationId;
  narrow: boolean;
  reduced: boolean;
};

export function CameraRig({ station, narrow, reduced }: Props) {
  const camera = useThree((state) => state.camera);
  const pos = useRef(new Vector3());
  const look = useRef(new Vector3());
  const targetPos = useRef(new Vector3());
  const targetLook = useRef(new Vector3());
  const ready = useRef(false);

  useLayoutEffect(() => {
    const pose = poseFor(station, narrow);
    targetPos.current.set(...pose.pos);
    targetLook.current.set(...pose.look);
    if ('fov' in camera) {
      const next = pose.fov;
      if (Math.abs(camera.fov - next) > 0.1) {
        camera.fov = next;
        camera.updateProjectionMatrix();
      }
    }
    if (!ready.current || reduced) {
      pos.current.copy(targetPos.current);
      look.current.copy(targetLook.current);
      ready.current = true;
    }
  }, [station, narrow, reduced, camera]);

  useFrame((_, delta) => {
    const k = reduced ? 1 : 1 - Math.exp(-5.4 * delta);
    pos.current.lerp(targetPos.current, k);
    look.current.lerp(targetLook.current, k);
    camera.position.copy(pos.current);
    camera.lookAt(look.current);
  });

  return null;
}
