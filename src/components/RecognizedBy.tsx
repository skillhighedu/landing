import { recognizedPartners } from "@/data/recognized"
import { motion, useAnimation, easeOut } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from "react"
import Header from "./Header"

export default function RecognizedBy() {
  const controls = useAnimation()
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  const logoVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: easeOut,
      },
    }),
  }

  return (
    <section className="w-full bg-neutral-950 bg-pixel-crt py-20 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Animate heading + subline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <Header title="We are recognized by" />
          <p className="text-lg sm:text-xl text-gray-300 font-mono mb-12">
            Recognized. Certified. Trusted.
          </p>
        </motion.div>

        {/* Logos grid */}
        <div
          ref={ref}
          className="flex flex-wrap justify-center items-center gap-10"
        >
          {recognizedPartners.map((partner, i) => (
            <motion.div
              key={partner.id}
              className="bg-black/40 rounded-xl p-4"
              custom={i}
              initial="hidden"
              animate={controls}
              variants={logoVariant}
            >
              <img
                src={partner.logo}
                alt={partner.alt}
                className="h-24 sm:h-28 object-contain mx-auto transition duration-300 ease-in-out hover:grayscale"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
