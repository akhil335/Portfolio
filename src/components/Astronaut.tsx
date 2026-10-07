import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { useMediaQuery } from 'react-responsive'

const MODEL_URL = "/models/tenhun_falling_spaceman_fanart.glb"; // file lives in /public
const TINT = "#9a8fd0"; // multiplies the texture to push orange toward your purple dusk. Set to "#ffffff" to keep the original colors.

type Props = {
  progress: MotionValue<number>; // scroll progress (0 to 1)
  pointerX: MotionValue<number>; // -0.5 to 0.5, the smoothed cursor value you already have
};

export function Astronaut({ progress, pointerX }: Props) {
    const isMobile = useMediaQuery({
        query: '(max-width: 768px)'
    })

    const SIZE = isMobile ? 1.2 : 0.5; // make the astronaut bigger/smaller
    const x = isMobile ? 0.05 : 0.36;
    const y = isMobile ? -0.2 : 0.23;

  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  // the scene already contains the rotation/scale from the gltfjsx output,
  // so we don't need to rebuild every mesh by hand
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions, names } = useAnimations(animations, group);

  // collect materials once so we can tint and fade them
  const materials = useMemo(() => {
    const set = new Set<THREE.Material>();
    scene.traverse((o) => {
      const mat = (o as THREE.Mesh).material;
      if (mat) (Array.isArray(mat) ? mat : [mat]).forEach((m) => set.add(m));
    });
    return [...set];
  }, [scene]);

  useEffect(() => {
    materials.forEach((m) => {
      m.transparent = true;
      (m as THREE.MeshStandardMaterial).color?.set(TINT);
    });
  }, [materials]);

  // play the built-in animation (the model has an "Idle" clip)
  useEffect(() => {
    const action = actions["Idle"] ?? actions[names[0]];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.3);
    };
  }, [actions, names]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;

    const p = progress.get();
    const px = pointerX.get();

    // anchor: upper right, scales with the screen so it works on mobile too
    const baseX = viewport.width * x;
    const baseY = viewport.height * y;
  
    g.position.x = baseX + px * 0.5;
    g.position.y = baseY + Math.sin(t * 0.6) * 0.1 + (p > 0.6 ? p - 0.6 : 0); // lifts away on scroll
    g.rotation.z = Math.sin(t * 0.4) * 0.12;
    g.rotation.y = px * 0.5;

    const s = Math.min(1, viewport.width / 7) * SIZE * (1 - p * 0.25);
    g.scale.setScalar(s);

    // fade out during the second half of the scroll
    // const fade = 1 - THREE.MathUtils.clamp((p - 0.5) / 0.35, 0, 1);
    // materials.forEach((m) => (m.opacity = fade * 0.9));
  });

  return (
    <group ref={group}>
      <primitive object={scene} rotation={[100 * (Math.PI / 180), 0 * (Math.PI / 180),  90 * (Math.PI / 180)]} />
    </group>
  );
}

useGLTF.preload(MODEL_URL);