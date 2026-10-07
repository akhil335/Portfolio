import { useEffect, useRef, useState, type RefObject } from "react";
import { motion, useTransform, MotionValue, useReducedMotion, useMotionValue, useSpring, useTime } from "motion/react";


const ORIGIN = "50% 45%"; // vanishing point of the pier

/* ------------------------------------------------------------------ */
/* Fireflies (deterministic so they don't jump on re-render)           */
/* ------------------------------------------------------------------ */
const FIREFLIES = Array.from({ length: 10 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin(i * 97.1 + n * 13.7) * 10000;
    return x - Math.floor(x);
  };
  return {
    left: r(1) * 100,
    top: 45 + r(2) * 50,
    size: 4 + r(3) * 3,
    dur: 8 + r(4) * 8,
    delay: r(5) * 6,
    dx: (r(6) - 0.5) * 80,
  };
});

const IMG = { w: 2740, h: 1536 }; // your bridge image size in pixels
const PIER = { x: 0.5, y: 0.5 };  // pier end as a fraction of the IMAGE (not the screen)

/* mimics bg-cover + bg-bottom to find where the pier end lands on screen */
const usePierPoint = (ref: RefObject<HTMLElement | null>) => {
  const [pos, setPos] = useState<{ left: number; top: number }>({ left: 0, top: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const update = () => {
      const W = el.clientWidth;
      const H = el.clientHeight;
      const s = Math.max(W / IMG.w, H / IMG.h); // cover scale
      const w = IMG.w * s;
      const h = IMG.h * s;
      console.log(w, h, W, H)
      setPos({
        left: ((W - w) / 2 + PIER.x * w),
        top: H - h + PIER.y * h,
      });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return pos;
};

const WaterFilter = () => {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // low x + higher y frequency = wide horizontal ripples
      const fx = 0.004 + Math.sin(t * 0.5) * 0.001;
      const fy = 0.02 + Math.cos(t * 0.4) * 0.004;
      turbRef.current?.setAttribute("baseFrequency", `${fx} ${fy}`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg className="absolute h-0 w-0" aria-hidden>
      <filter id="water" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          ref={turbRef}
          type="fractalNoise"
          baseFrequency="0.004 0.02"
          numOctaves="2"
          seed="3"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="25"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
};

const SkyFilter = () => {
  const turbRef = useRef<SVGFETurbulenceElement>(null);

  useEffect(() => {
    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const t = (now - start) / 1000;
      // very low frequency = big soft cloud shapes
      // slow drift along x makes the clouds move sideways
      const fx = 0.0015 + Math.sin(t * 0.08) * 0.0008;
      const fy = 0.004 + Math.cos(t * 0.06) * 0.001;
      turbRef.current?.setAttribute("baseFrequency", `${fx} ${fy}`);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg className="absolute h-0 w-0" aria-hidden>
      <filter id="sky" x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence
          ref={turbRef}
          type="fractalNoise"
          baseFrequency="0.0015 0.004"
          numOctaves="2"
          seed="8"
          result="noise"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="noise"
          scale="40"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
};


/* cursor parallax helper: nearer layers move more */
const useShift = (
  mx: MotionValue<number>,
  my: MotionValue<number>,
  depth: number
) => ({
  x: useTransform(mx, (v) => v * depth),
  y: useTransform(my, (v) => v * depth * 0.6),
});

const ParallelBackground = ({ progress }: { progress: MotionValue<number> }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const lantern = usePierPoint(rootRef);
  const reduce = useReducedMotion();

  const skyScale = useTransform(progress, [0, 1], [1.1, 1.3]); // farthest = slowest zoom
  // water starts at 1.1 so the distorted edges never show
  const waterScale = useTransform(progress, [0, 1], [1.1, 1.7]);
  const bridgeScale = useTransform(progress, [0, 1], [1, 2.8]);
  const hintOpacity = useTransform(progress, [0, 0.06], [1, 0]);
  const particleScale = useTransform(progress, [0, 1], [1, 3.2]);

   /* cursor parallax */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 50, damping: 20 });
  const smy = useSpring(my, { stiffness: 50, damping: 20 });

  const bridgeShift = useShift(smx, smy, 36);

  /* camera sway */
  const time = useTime();
  const swayRotate = useTransform(time, (t) => (reduce ? 0 : Math.sin(t / 2600) * 0.3));
  const swayY = useTransform(time, (t) => (reduce ? 0 : Math.sin(t / 1700) * 4));

  return (
    <div className="absolute inset-0">

      {/* <SkyFilter /> */}
      <WaterFilter />

      {/* Sky (farthest) */}
      <motion.div
        style={{
          scale: skyScale,
          transformOrigin: "50% 45%",
          filter: "url(#sky)",
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-[url(/assets/sky-horizon.png)]"
      />

      {/* Water (far) */}
      <motion.div
        style={{
          scale: waterScale,
          transformOrigin: "50% 45%",
          filter: "url(#water)",
        }}
        className="absolute inset-0 w-full h-full bg-cover bg-bottom bg-[url(/assets/river.png)]"
      />


    <motion.div
     ref={rootRef}
      style={{ rotate: swayRotate, y: swayY, scale: 1.04 }}
      className="absolute inset-0"
    >
      <div className="absolute inset-0 bg-black/40" />

      
      {/* 7. Bridge + lantern (lantern scales with the pier so it stays glued to its end) */}
        <motion.div
          style={{ scale: bridgeScale, transformOrigin: ORIGIN, ...bridgeShift }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-cover bg-bottom bg-[url(/assets/bridge.png)]" />
          <motion.div
            animate={reduce ? undefined : { opacity: [0.7, 1, 0.8, 1, 0.65] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
           style={{
              left: lantern.left,
              top: lantern.top,
              background:
                "radial-gradient(circle, rgba(255,200,120,0.95) 0%, rgba(255,150,60,0.4) 35%, transparent 70%)",
            }}
            className="absolute h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          />
        </motion.div>

        {/* 10. Fireflies: fastest-zooming layer, so they rush past you */}
        {!reduce && (
          <motion.div
            style={{ scale: particleScale, transformOrigin: ORIGIN }}
            className="pointer-events-none absolute inset-0"
          >
            {FIREFLIES.map((f, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                animate={{ y: [0, -140], x: [0, f.dx], opacity: [0, 0.9, 0] }}
                transition={{ duration: f.dur, delay: f.delay, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  left: `${f.left}%`,
                  top: `${f.top}%`,
                  width: f.size,
                  height: f.size,
                }}
                className="absolute rounded-full bg-amber-200/80"
              />
            ))}
          </motion.div>
        )}


    </motion.div>
      {/* Vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.65) 100%)",
        }}
      />

      {/* Scroll hint: fades out once scrolling starts */}
      <motion.div
        style={{ opacity: hintOpacity }}
        className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-sm text-neutral-300"
      >
        <span>Scroll to walk the pier</span>
        <motion.svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M6 9l6 6 6-6" />
        </motion.svg>
      </motion.div>
    </div>
  );
};

export default ParallelBackground;