import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { partners } from "@/data/partners"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

export function CarouselPlugin() {
  const plugin = React.useRef(
    Autoplay({
      delay: 2000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  )

  return (
    <div className="bg-white w-full py-6">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-7xl mx-auto"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {partners.map((partner) => (
            <CarouselItem key={partner.name} className="basis-1/5">
              <div className="p-2">
                <Card className="h-auto border-none shadow-none">
                  <CardContent className="flex h-full items-center justify-center ">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="h-60 w-auto object-contain  transition"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
