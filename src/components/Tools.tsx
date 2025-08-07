import {tools} from "@/data/tools"
import Header from "./Header"
import { GridPatternDashed } from "./ui/DashedStroke"

import {motion} from "framer-motion"
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export default function Tools() {
  const plugin = React.useRef(
      Autoplay({
        delay: 800,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      })
    );
  return (
    <section className=" relative w-full bg-neutral-900 py-12 px-4">
        <GridPatternDashed/>
      <div className="max-w-6xl mx-auto text-center">
      
   <div className="flex flex-row items-center justify-center gap-4">  
       <div>
<Header title=" Your learning Toolbox"/>     {/*  <motion.div
  initial={{ rotate: -10, scale: 0.9, opacity: 1 }}
  animate={{ rotate: [ -10, 0, 10, 0 ], scale: 1, opacity: 1 }}
  transition={{
    duration: 1.6,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  }}
  className="w-8 h-8 mb-4"
>
  <ToolIcon className="w-full h-full text-primary" />
</motion.div> */}
           <p className="text-lg sm:text-xl text-gray-300 font-mono mb-6">
          Tools we are using in this course
          </p>
       </div>
       
   </div>

        <div className="relative z-20 mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{ loop: true, align: "center" }}
        aria-label="Partner logos carousel"
      >
        <CarouselContent className="gap-4">
          {tools.map((partner, index) => (
            <CarouselItem
              key={partner.name}
              className="basis-1/2 sm:basis-2/3 md:basis-1/5"
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
                <Card className="bg-neutral-950 border-0 shadow-sm transition-all duration-300 hover:shadow-md rounded-2xl flex items-center justify-center">
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
<div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent z-10" />

  {/* Gradient Right */}
  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-900 via-neutral-900/60 to-transparent z-10" />
    </div>
      </div>
    </section>
  )
}
