import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { partners } from "@/data/partners";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: true, // Pause on hover for better user experience
    })
  );

  return (
    <section className="bg-gradient-to-b from-neutral-900 to-neutral-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true, align: "center" }}
        >
          <CarouselContent>
            {partners.map((partner, index) => (
              <CarouselItem
                key={partner.name}
                className="basis-1/4 md:basis-1/5 sm:basis-1/3"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-2"
                >
                  <Card className="h-40   bg-neutral-800/50 shadow-none rounded-xl  hover:shadow-xl transition-all duration-300 items-center justify-center">
                    <CardContent className="flex h-96 items-center justify-center p-4">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="h-[250px] w-auto   transition-transform duration-300 hover:scale-105"
                     
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