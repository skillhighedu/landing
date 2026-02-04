import { motion } from "framer-motion";
import { logoVariants } from "../animations";

type Props = {
  logo: string;
  alt: string;
};

export default function RecognizedLogo({ logo, alt }: Props) {
  return (
    <motion.div
      variants={logoVariants}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 180, damping: 18 }}
      className="
        flex items-center justify-center
        rounded-xl
        bg-neutral-50 dark:bg-neutral-900
        border dark:border-neutral-800
        px-6 py-4
        pixel-border
        shadow-[4px_4px_0_#000]
        hover:shadow-[6px_6px_0_#000]
        transition-shadow
      "
    >
      <img
        src={logo}
        alt={alt}
        className="h-16 sm:h-40 object-contain opacity-90"
        loading="lazy"
      />
    </motion.div>
  );
}
