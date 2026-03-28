import { motion } from "framer-motion";
import { logoVariants } from "../animations";

type Props = {
  logo: string;
  alt: string;
};

export default function PartnerLogo({ logo, alt }: Props) {
  return (
    <motion.div
      variants={logoVariants}
      className="
        group relative flex min-h-[160px] min-w-[220px] items-center justify-center
        rounded-3xl border border-neutral-200 bg-white px-8 py-8
        shadow-sm transition-all duration-200 hover:border-primary/15 hover:shadow-md
        dark:border-neutral-800 dark:bg-neutral-900
      "
    >
      <img
        src={logo}
        alt={alt}
        className="mx-auto h-24 object-contain opacity-90 transition-opacity duration-200 group-hover:opacity-100 sm:h-28"
        loading="lazy"
      />
    </motion.div>
  );
}
