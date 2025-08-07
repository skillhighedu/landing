import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SkillsCurtainIntro({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish(); // Inform parent to reveal main page
    }, 8000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-white text-black flex flex-col justify-center items-center text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Swords won wars.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl text-pretty mb-6"
          >
            Skills win jobs.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="max-w-xl text-lg sm:text-xl text-neutral-700 mb-8"
          >
            In the past, people fought with weapons. <br />
            Today, we build with skills. <br />
            And we’ll help you get them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 }}
          >
            <Button
              variant="secondary"
              className="text-base sm:text-lg px-6 py-3"
              onClick={() => {
                setShow(false);
                onFinish();
              }}
            >
              Start Now
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
