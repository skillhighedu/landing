import { motion } from "framer-motion";
import type { Benefit } from "../types";
import { Icon } from "@/components/icons";
import { cardVariants } from "../animations";

type Props = {
  benefit: Benefit;
};

export default function BenefitCard({ benefit }: Props) {
  const IconComponent = benefit.icon;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="
        relative rounded-2xl
        border border-neutral-800
        bg-neutral-900
        p-6
        pixel-border
        shadow-[4px_4px_0_#000]
        hover:shadow-[6px_6px_0_#000]
        transition-all
        cursor-default
      "
    >
      {/* Icon */}
      <div className="mb-5 inline-flex items-center justify-center rounded-md bg-primary/10 p-3 border border-primary/20">
        <Icon icon={IconComponent} className="w-7 h-7 text-primary" />
      </div>

      {/* Content */}
      <h3 className="text-lg  text-white mb-2 tracking-normal">
        {benefit.title}
      </h3>

      <p className="text-sm text-neutral-400 leading-relaxed font-bricolage">
        {benefit.description}
      </p>
    </motion.div>
  );
}
