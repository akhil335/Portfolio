import { lazy, Suspense, useEffect, useRef } from "react";
import { useScroll, useSpring, useTransform, useMotionValue, motion, useInView } from "motion/react";
import HeroText from "@components/HeroText";
import ParallelBackground from "@components/ParallelBackground";

// module scope, so it's created once
const HeroScene = lazy(() => import("@components/HeroScene"));


const Hero = () => {
  
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const fade = useTransform(progress, [0.0, 1], [0, 1]);

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
    <section id="home" ref={ref} className="relative h-[250vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050514]">
        <ParallelBackground progress={progress} inView={isInView} />

        {/* 3D astronaut: inside the sticky screen, above the scene, below the fade and text */}
        <div className="pointer-events-none absolute inset-0">
         <Suspense fallback={null}>
          <HeroScene progress={progress} pointerX={pointerX} inView={isInView} />
        </Suspense>
        </div>

        <motion.div
          style={{ opacity: fade }}
          className="pointer-events-none absolute inset-0 bg-[#050514]"
        />

        <div className="relative mx-auto c-space h-full max-w-7xl z-10 flex items-start justify-center md:justify-start">
          <HeroText progress={progress} />
        </div>
      </div>
    </section>
  );
};

export default Hero;