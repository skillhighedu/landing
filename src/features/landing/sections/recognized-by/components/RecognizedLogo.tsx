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
      className="
        group flex min-h-[180px] w-full items-center justify-center
        rounded-3xl border border-neutral-200 bg-white px-8 py-8
        shadow-sm transition-all duration-200 hover:border-primary/15 hover:shadow-md
        dark:border-neutral-800 dark:bg-neutral-700
      "
    >
      <img
        src={logo}
        alt={alt}
        className="h-32 object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100 sm:h-32 lg:h-56"
        loading="lazy"
      />
    </motion.div>
  );
}
