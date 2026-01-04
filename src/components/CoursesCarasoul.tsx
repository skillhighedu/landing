import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Courses } from "@/data/course"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
 
} from "@/components/ui/carousel"


export default function CoursesNames() {
    const plugin = React.useRef(
      Autoplay({
        delay: 800,
        stopOnInteraction: false,
        stopOnMouseEnter: false,
      })
    )
  return  (
  
  
  
      <div className="bg-neutral-900 w-full py-8">
       
        <Carousel
          plugins={[plugin.current]}
          className="w-full mx-auto"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {Courses.map((course) => (
              <CarouselItem key={course.id} className="basis-1/3">
               <div className="bg-primary text-white text-center rounded-2xl py-2 px-3">{course.name}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
       
      </div>
    )
}
