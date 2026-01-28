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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="
        relative
        rounded-xl
        bg-neutral-900
        border border-neutral-800
        px-6 py-5
        pixel-border
        shadow-[4px_4px_0_#000]
        hover:shadow-[6px_6px_0_#000]
        transition-shadow
      "
    >
      <img
        src={logo}
        alt={alt}
        className="h-20 sm:h-28 object-contain mx-auto opacity-90"
        loading="lazy"
      />
    </motion.div>
  );
}
