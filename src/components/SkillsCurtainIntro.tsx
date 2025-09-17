import { useEffect, useState } from "react";
import { motion, AnimatePresence, easeOut } from "framer-motion";
import CustomButton from "./Button";

export default function SkillsCurtainIntro({ onFinish }: { onFinish: () => void }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onFinish();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  const staggerContainer = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: easeOut } },
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)", transition: { duration: 0.8 } }}
          className="fixed inset-0 z-50 flex flex-col justify-center items-center text-center px-6 bg-gradient-to-tr from-neutral-900 via-neutral-950 to-black overflow-hidden"
        >
          {/* Optional: animated background elements */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/20 to-green-800-600/20 animate-[pulse_10s_linear_infinite]"
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="relative z-10"
          >
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-white drop-shadow-lg"
            >
              Swords won wars.
            </motion.h1>

            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl text-pretty mb-6  drop-shadow-md"
            >
              Skills win jobs.
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="max-w-xl text-lg sm:text-xl text-neutral-400 mb-8 leading-relaxed"
            >
              In the past, people fought with weapons. <br />
              Today, we build with skills. <br />
              And we’ll help you get them.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex justify-center"
            >
              <CustomButton
                title="Start Now"
                icon=""
                onClick={() => {
                  setShow(false);
                }}
                className="hover:scale-105 transition-transform duration-300   bg-neutral-900 hover:bg-neutral-900 font-normal"
              />
            </motion.div>
          </motion.div>

          {/* Extra visual flair: moving light streaks */}
          <motion.div
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 2 }}
          >
            <div className="w-full h-full bg-[radial-gradient(circle,rgba(255,255,255,0.05),transparent)] animate-[pulse_15s_linear_infinite]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
