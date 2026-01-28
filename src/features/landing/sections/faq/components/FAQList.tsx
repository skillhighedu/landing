import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { containerVariants, faqItemVariants } from "../animations";
import type { FAQ } from "../types";

type Props = {
  items: FAQ[];
  activeIndex: number | null;
  toggle: (index: number) => void;
};

export default function FAQList({ items, activeIndex, toggle }: Props) {
  return (
    <motion.div
      className="space-y-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.div key={index} custom={index} variants={faqItemVariants}>
          <FAQItem
            item={item}
            index={index}
            activeIndex={activeIndex}
            onToggle={toggle}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
