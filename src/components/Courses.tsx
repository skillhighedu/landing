import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Courses } from "@/data/course"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

export function CoursesCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  )

  return (
    <div className="bg-neutral-900 w-full py-8">
      <Carousel
        plugins={[plugin.current]}
        className="w-full max-w-7xl mx-auto"
        opts={{ loop: true }}
      >
        <CarouselContent>
          {Courses.map((course) => (
            <CarouselItem key={course.id} className="basis-1/3">
              <Card className="relative h-[350px] overflow-hidden rounded-xl group border-none shadow-none">
                {/* Fixes the white border issue */}
                <img
                  src={course.logo}
                  alt={course.alt}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Overlay content */}
                <CardContent className="relative z-10 p-6 bg-gradient-to-t from-black/80 to-transparent h-full flex flex-col justify-end text-white">
                  <h2 className="text-xl font-semibold">{course.name}</h2>
                  <p className="text-sm text-gray-200 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <Button variant="secondary" className="w-fit">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-black" />
        <CarouselNext  className="text-black" />
      </Carousel>
    </div>
  )
}
