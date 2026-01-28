import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { partners } from "@/data/partners";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

export default function HeroPartners() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false })
  );

  return (
    <div className="mt-16 opacity-80">
      <Carousel plugins={[plugin.current]} opts={{ loop: true }}>
        <CarouselContent>
          {partners.map((partner) => (
            <CarouselItem
              key={partner.name}
              className="basis-1/2 sm:basis-1/3 md:basis-1/5"
            >
              <div className="flex items-center justify-center h-20">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-h-12 object-contain grayscale hover:grayscale-0 transition"
                  loading="lazy"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
