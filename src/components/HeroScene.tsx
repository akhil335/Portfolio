import { Canvas } from "@react-three/fiber";
import type { MotionValue } from "motion/react";
import { lazy, Suspense } from "react";

const Astronaut = lazy(() => import("@components/Astronaut"));

type Props = {
  progress: MotionValue<number>;
  pointerX: MotionValue<number>;
  inView?: boolean;
};


export default function HeroScene({ progress, pointerX, inView = true }: Props) {
  return (
     <Canvas frameloop={inView ? "always" : "never"} dpr={[1, 1.25]} camera={{ position: [0, 0, 6], fov: 30 }}>
            <ambientLight intensity={1.2} color="#b9a8ff" />
            <directionalLight position={[4, 3, 3]} intensity={2.5} color="#ff9ad5" />
            <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#6fa8ff" />
            <Suspense fallback={null}>
              <Astronaut progress={progress} pointerX={pointerX} />
            </Suspense>
          </Canvas>
  );
}