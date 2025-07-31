import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function TypewriterHeading({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex >= text.length) clearInterval(interval);
    }, 100); // typing speed (ms per character)

    return () => clearInterval(interval);
  }, [text]);

  return (
    <motion.h1
      className="text-white text-4xl sm:text-7xl font-bold mb-8 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {displayedText}
      <span className="animate-pulse">|</span> {/* cursor */}
    </motion.h1>
  );
}
