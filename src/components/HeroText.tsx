import { FlipWords } from "@components/Flipwords";
import { motion, useTransform, MotionValue } from "motion/react";
import { useEffect, useState } from "react";

type VariantsType = {
  hidden: { opacity: number; x: number };
  visible: { opacity: number; x: number };
};

const HeroText = ({ progress }: { progress: MotionValue<number> }) => {
    const words = ["Secure", "Modern", "Scalable"];

    const variants: VariantsType = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 },
    };

    // stays put for the first half, then rises slowly to the end
    const textY = useTransform(progress, [0, 0.7, 1], [0, 0, -250]);
    // fully visible, fades only in the last stretch
    const textOpacity = useTransform(progress, [0, 0.75, 1], [1, 1, 0]);

  return (
    // scroll motion lives ONLY here
    <motion.div
      style={{ y: textY, opacity: textOpacity }}
      className="z-10 mt-20 text-center md:text-left rounded-3xl bg-clip-text"
    >
      {/* Desktop view */}
      <div className="flex-col hidden md:flex">
        <motion.h1 variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }} className="text-4xl font-medium">
          Hi I'm Akhil
        </motion.h1>
        <div className="flex flex-col items-start">
          <motion.p variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.4 }} className="text-5xl font-medium text-neutral-300">
            A Developer <br /> Dedicated to crafting
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            <FlipWords className="text-8xl font-black text-white" words={words} />
          </motion.div>
          <motion.p variants={variants} initial="hidden" animate="visible" transition={{ delay: 2.2 }} className="text-4xl font-medium text-neutral-300">
            Web Solutions
          </motion.p>
        </div>
      </div>

      {/* Mobile view */}
      <div className="md:hidden flex flex-col space-y-6">
        <motion.p variants={variants} initial="hidden" animate="visible" transition={{ delay: 1 }} className="text-4xl font-medium">
          Hi I'm Akhil
        </motion.p>
        <div>
          <motion.p variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.4 }} className="text-5xl font-black text-neutral-300">
            Building
          </motion.p>
          <motion.div variants={variants} initial="hidden" animate="visible" transition={{ delay: 1.8 }}>
            <FlipWords className="text-7xl font-black text-white" words={words} />
          </motion.div>
          <motion.p variants={variants} initial="hidden" animate="visible" transition={{ delay: 2.2 }} className="text-4xl font-black text-neutral-300">
            Web Applications
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default HeroText;