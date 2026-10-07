import { Suspense, useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform, useMotionValue, motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import HeroText from "@components/HeroText";
import ParallelBackground from "@components/ParallelBackground";
import { Astronaut } from "@components/Astronaut";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const fade = useTransform(progress, [0.85, 1], [0, 1]);

  /* cursor value for the astronaut (-0.5 to 0.5, smoothed) */
  const pointer = useMotionValue(0);
  const pointerX = useSpring(pointer, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const onMove = (e: PointerEvent) =>
      pointer.set(e.clientX / window.innerWidth - 0.5);
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer]);

  return (
    <section ref={ref} className="absolute inset-0 h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050514]">
        <ParallelBackground progress={progress} />

        {/* 3D astronaut: inside the sticky screen, above the scene, below the fade and text */}
        <div className="pointer-events-none absolute inset-0">
          <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 6], fov: 30 }}>
            <ambientLight intensity={1.2} color="#b9a8ff" />
            <directionalLight position={[4, 3, 3]} intensity={2.5} color="#ff9ad5" />
            <directionalLight position={[-4, 2, -2]} intensity={1.2} color="#6fa8ff" />
            <Suspense fallback={null}>
              <Astronaut progress={progress} pointerX={pointerX} />
            </Suspense>
          </Canvas>
        </div>

        <motion.div
          style={{ opacity: fade }}
          className="pointer-events-none absolute inset-0 bg-[#050514]"
        />

        <div className="relative mx-auto c-space max-w-7xl z-10 flex items-start justify-center md:justify-start">
          <HeroText progress={progress} />
        </div>
      </div>
    </section>
  );
};

export default Hero;