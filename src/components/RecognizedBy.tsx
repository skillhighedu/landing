import { recognizedPartners } from "@/data/recognized"
import { motion, useAnimation,easeOut } from "framer-motion"
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
    <section className="w-full bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
       <Header title="We are recognized by"/>
        <div
          ref={ref}
          className="flex flex-wrap justify-center items-center gap-10"
        >
          {recognizedPartners.map((partner, i) => (
            <motion.img
              key={partner.id}
              src={partner.logo}
              alt={partner.alt}
              className="h-60 transition duration-300 ease-in-out cursor-pointer"
              custom={i}
              initial="hidden"
              animate={controls}
              variants={logoVariant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
