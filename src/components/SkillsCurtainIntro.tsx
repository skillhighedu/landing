import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import CustomButton from "@/components/common/Button";

export default function SkillsCurtainIntro({
  onFinish,
}: {
  onFinish: () => void;
}) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 2200); // faster, compact feel

    return () => clearTimeout(timer);
  }, [onFinish]);

  const fadeUp = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: easeOut },
    },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/90"
        >
          {/* Compact card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="
              w-full max-w-sm
              rounded-xl
              bg-neutral-900
              border border-white/10
              px-6 py-5
              text-center
              shadow-xl
            "
          >
            <h1 className="text-lg sm:text-xl font-semibold text-white mb-1">
              Skills that matter
            </h1>

            <p className="text-sm text-neutral-400 mb-4">
              Learn by doing. Build what the industry uses.
            </p>

            <CustomButton
              title="Start learning"
              onClick={() => {
                setShow(false);
                onFinish();
              }}
              className="w-full bg-neutral-800 hover:bg-neutral-700"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
