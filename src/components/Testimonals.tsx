

import Header from "./Header"
import HeartPixelIcon from "./icons/HeartPixelIcon"
import {motion} from 'framer-motion'
import { MarqueeDemoVertical } from "./ui/marquee"


export default function Testimonials() {
  

  return (
    <section className="bg-neutral-900 bg-pixel-crt py-20 px-4 text-white">
      <div className="max-w-5xl mx-auto text-center">
      <div className="flex justify-center items-center gap-2 text-center">
  <Header title="Loved by Many" />
 <motion.div
      className="mb-5 w-6 h-6 text-red-500"
      initial={{ scale: 0.8, rotate: 0 }}
      animate={{
        scale: [1, 1.2, 1, 1.3, 1],
        rotate: [0, -10, 10, -10, 0],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      <HeartPixelIcon className="w-full h-full text-inherit" />
    </motion.div>
</div>


        <p className="text-lg sm:text-xl text-gray-300 font-mono mb-12">
        Their journey wasn’t easy. But the Right Skills made all the difference.
        </p>

       <MarqueeDemoVertical/>
      </div>

   
    </section>
  )
}