import { LoaderCircle } from "lucide-react";
import { motion, type Variants } from "motion/react";

const Loader = () => {
  const loaderVariant: Variants = {
    initial: {
      rotate: 0,
    },
    final: {
      rotateZ: 360,

      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <motion.div
      variants={loaderVariant}
      initial="initial"
      animate="final"
      className="w-12 h-12 flex items-center justify-center "
    >
      <LoaderCircle />
    </motion.div>
  );
};

export default Loader;
