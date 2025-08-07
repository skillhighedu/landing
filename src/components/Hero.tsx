import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {  ArrowUpRight } from "lucide-react";

import { Link } from "react-router-dom";
import Trees from "@/assets/images/forest.jpg";
import Autoplay from "embla-carousel-autoplay";
import { partners } from "@/data/partners";
import { Card, CardContent } from "@/components/ui/card";
import CustomButton from "@/components/Button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

const heading = "Skills Build Futures. We Help You Build Them."
const words = heading.split(' ')

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.3,
    },
  },
}

const wordAnim = {
  hidden: {
    y: 40,
    opacity: 0,
    skewY: 8,
    rotate: 2,
    scale: 0.95,
  },
  show: {
    y: 0,
    opacity: 1,
    skewY: 0,
    rotate: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.2, 0.8, 0.3, 1] as [number, number, number, number],
    },
  },
}
  
  const scanlineVariants: Variants = {
    animate: {
      opacity: shouldReduceMotion ? 0.1 : [0.05, 0.15, 0.05],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: "linear",
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center bg-black font-pixel text-center overflow-hidden py-16 sm:py-20">
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: `url(${Trees})`, opacity: 0.6 }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
      
      />

      {/* CRT Scanlines */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.25) 2px, rgba(0,0,0,0.25) 4px)",
        }}
        variants={scanlineVariants}
        animate="animate"
      />

      {/* Hero Content */}
      <div className="relative z-20 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto grid grid-cols-1 gap-6 sm:gap-8">
        <motion.h1
      className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl  pixel-shadow drop-shadow-lg leading-tight tracking-tight"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordAnim}
          className="inline-block mr-2"
        >
          {word}&nbsp;
        </motion.span>
      ))}
    </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-neutral-900  fonleading-relaxedt-bricolage  max-w-md sm:max-w-lg md:max-w-4xl mx-auto"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Skillhigh helps you grow what matters — real skills. Not theory. Not fluff. Just outcomes.
        </motion.p>

        <motion.div
          className="flex justify-center gap-4 sm:gap-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <Link to="/all-courses">
            <CustomButton title="Start Building Skills" icon={<ArrowUpRight/>} />
          </Link>
        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg  leading-relaxed max-w-md sm:max-w-lg md:max-w-2xl mx-auto mt-4 sm:mt-6"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          Join 10,000+ learners leveling up with Skillhigh.
        </motion.p>
      </div>

      {/* Partner Carousel */}
    <div className="relative z-20 mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true, align: "center" }}
        aria-label="Partner logos carousel"
      >
        <CarouselContent className="gap-4">
          {partners.map((partner, index) => (
            <CarouselItem
              key={partner.name}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5"
              role="group"
              aria-label={`Partner: ${partner.name}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="p-2"
              >
                <Card className="border border-gray-300/20 bg-white/5 shadow-sm transition-all duration-300 hover:shadow-md rounded-2xl flex items-center justify-center">
                  <CardContent className="flex h-28 items-center justify-center p-4">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="max-h-40 transition-transform duration-300 hover:scale-105 object-contain"
                      onError={(e) => (e.currentTarget.src = "/fallback-logo.jpg")}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
    </section>
  );
}
