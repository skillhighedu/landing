
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function SkillsCurtainIntro({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);






  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish(); // Inform parent to reveal main page
    }, 8000); // Duration of curtain page
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black text-white flex flex-col justify-center items-center text-center px-6"
        >
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
          >
            Swords Won Wars.
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl text-green-400 mb-6"
          >
            Skills Win Futures.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1 }}
            className="max-w-xl text-lg sm:text-xl text-gray-300 mb-8"
          >
            In ancient times, warriors wielded swords to conquer.  
            Today, you wield skills to build your future.  
            We help you forge them.
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
              Begin Your Journey
            </Button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
