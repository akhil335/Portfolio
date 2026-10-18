import { motion } from "motion/react";

type CardProps = {
  text?: string;
  image?: string;
  className?: string;
  rotate?: number;
  constraintsRef?: React.RefObject<HTMLElement | null>;
};

const Card = ({ text, className = "", image, rotate = 0, constraintsRef }: CardProps) => {
  const common = {
    drag: true,
    dragConstraints: constraintsRef,

    initial: { rotate },
    whileHover: { scale: 1.05 },
    whileDrag: { scale: 1.1, cursor: "grabbing" },
    // dragElastic: 0.2,
  } as const;

  if (image && !text) {
    return (
      <motion.img
        {...common}
        className={`absolute w-15 cursor-grab ${className}`}
        src={image}
        alt="tech stack logo"
      />
    );
  }

  return (
    <motion.div
      {...common}
      className={`absolute px-1 py-4 text-xl text-center rounded-full ring ring-gray-700 text-white font-extralight bg-storm w-[12rem] cursor-grab select-none touch-none ${className}`}
    >
      {text}
    </motion.div>
  );
};

export default Card;