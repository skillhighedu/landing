import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import {  ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Trees from "@/assets/images/forest.jpg";
import Autoplay from "embla-carousel-autoplay";
import { partners } from "@/data/partners";
import { Card, CardContent } from "@/components/ui/card";
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
          className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl   pixel-shadow drop-shadow-lg leading-tight"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Skills Build Futures.
          <br />
          We Help You Build Them.
        </motion.h1>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-neutral-900 leading-relaxed max-w-md sm:max-w-lg md:max-w-4xl mx-auto"
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
            <Button
              className="bg-green-800 text-white text-base sm:text-md py-3 px-6 sm:py-4 sm:px-8 hover:bg-primary pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 flex items-center gap-2"
              aria-label="Start Building Skills"
            >
              Start Building Skills
              <ArrowRight size={20} />
            </Button>
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
      <div className="relative z-20 max-w-7xl mx-auto w-full mt-12">
        <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true, align: "center" }}>
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem
                key={partner.name}
                className="basis-1/2 sm:basis-1/3 md:basis-1/5"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-2"
                >
                  <Card className=" bg-transparent border-none shadow-none rounded-xl hover:shadow-xl transition-all duration-300 items-center justify-center">
                    <CardContent className="flex h-full items-center justify-center p-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className=" transition-transform duration-300 hover:scale-105"
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
