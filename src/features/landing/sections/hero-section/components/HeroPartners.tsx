import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { partners } from "@/data/partners";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function HeroPartners() {
  const plugin = React.useRef(
    Autoplay({
      delay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
      <div className="relative z-20 mx-auto mt-16 w-full px-4 sm:px-6 lg:px-8">
        <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true, align: "center" }} aria-label="Partner logos carousel">
          <CarouselContent className="gap-4">
            {partners.map((partner, index) => (
              <CarouselItem key={partner.name} className="basis-1/2 sm:basis-1/3 md:basis-1/5" role="group" aria-label={`Partner: ${partner.name}`}>
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
  );
}
