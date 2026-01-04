import { certificatePartners } from "@/data/certificatePartners";
import { motion, spring, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Header from "./common/Header";


export default function CertificatePartners() {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // Parent container animation (stagger all children)
  const containerVariant = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  // Logo animation
  const logoVariant = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95, 
      rotateX: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.7,
        type: spring,
        stiffness: 60,
        damping: 15
      }
    }
  };

  return (
    <section className="w-full bg-neutral-950 bg-pixel-crt py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, type: "spring", stiffness: 80 }}
        >
          <Header title="Our Certificate Partners" subline=" Certified by the Best" />
        
        </motion.div>

        {/* Logos */}
        <motion.div
          ref={ref}
          className="flex flex-wrap justify-center items-center gap-10"
          variants={containerVariant}
          initial="hidden"
          animate={controls}
        >
          {certificatePartners.map((partner) => (
            <motion.div
              key={partner.id}
              className="bg-[#1a1a1a] rounded-xl p-4  relative z-10 hover:scale-105 transition-transform"
              variants={logoVariant}
              whileHover={{ scale: 1.08, rotateY: 5, transition: { type: "spring", stiffness: 200 } }}
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="h-24 sm:h-44 object-contain mx-auto"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
