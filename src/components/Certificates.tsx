'use client'

import { easeOut, motion } from 'framer-motion'
import { DotPatternLinearGradient } from './ui/DotBg'

const certificates = [
  { id: 1, src: '/images/cert1.png', title: 'Certificate 1' },
  { id: 2, src: '/images/cert2.png', title: 'Certificate 2' },
  { id: 3, src: '/images/cert3.png', title: 'Certificate 3' },
  { id: 3, src: '/images/cert3.png', title: 'Certificate 3' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: easeOut,
    },
  }),
}

export default function Certificates() {
  return (
    <section className=" relative w-full bg-neutral-900 text-white py-20 px-6 md:px-12">
     <DotPatternLinearGradient/>
      <div className=" relative max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Certificates</h2>
        <p className="text-neutral-400 text-lg">
          Proof of excellence in various domains.
        </p>
      </div>

      <div className=" relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
        {certificates.map((cert, i) => (
          <motion.div
            key={cert.id}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={fadeUp}
            className="group relative   pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 transition-transform hover:scale-105"
          >
            <div className="aspect-video relative">
              <image
           
            
        
                className="object-cover"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold">{cert.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
