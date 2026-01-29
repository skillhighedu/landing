import { motion } from "framer-motion";
import { Icon, HelpCircle } from "@/components/icons";

export default function FAQDecorations() {
  return (
    <>
      <motion.div
        className="absolute top-12 right-12"
        animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      >
        <Icon
          icon={HelpCircle}
          size={56}
          className="opacity-70 text-foreground/40"
        />
      </motion.div>

      <motion.div
        className="absolute bottom-12 left-12"
        animate={{ rotate: [0, -10, 10, 0], y: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <Icon
          icon={HelpCircle}
          size={56}
          className="opacity-70 text-foreground/40"
        />
      </motion.div>
    </>
  );
}
