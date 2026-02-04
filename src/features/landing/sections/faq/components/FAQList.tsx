import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {items.map((item, index) => (
        <FAQItem
          key={index}
          item={item}
          index={index}
          activeIndex={activeIndex}
          onToggle={toggle}
        />
      ))}
    </motion.div>
  );
}
