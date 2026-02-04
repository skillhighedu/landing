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
        relative rounded-2xl p-6 cursor-default transition-all

        /* Surface */
        bg-white text-neutral-900
        dark:bg-neutral-900 dark:text-white

        /* Border */
        border border-neutral-200
        dark:border-neutral-800

        /* Neo / pixel shadow */
        shadow-[4px_4px_0_rgba(0,0,0,0.15)]
        hover:shadow-[6px_6px_0_rgba(0,0,0,0.2)]
        dark:shadow-[4px_4px_0_#000]
        dark:hover:shadow-[6px_6px_0_#000]
      "
    >
      {/* Icon */}
      <div
        className="
          mb-5 inline-flex items-center justify-center rounded-md p-3
          bg-primary/10 border border-primary/20
        "
      >
        <Icon icon={IconComponent} className="w-7 h-7 text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium mb-2 tracking-normal">
        {benefit.title}
      </h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
        {benefit.description}
      </p>
    </motion.div>
  );
}
