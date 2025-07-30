import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Courses } from "@/data/course";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function CoursesCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

  return (
    <section className="bg-neutral-900 w-full py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-8">
          Master In-Demand Skills
        </h2>

        {/* Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {Courses.map((course) => (
              <CarouselItem
                key={course.id}
                className="sm:basis-1/2 md:basis-1/3 px-2"
              >
                <Card className="relative h-[350px] overflow-hidden rounded-xl group border-none shadow-lg">
                  {/* Background Image */}
                  <img
                    src={course.logo}
                    alt={course.alt || course.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <CardContent className="relative z-10 p-6 bg-gradient-to-t from-black/80 to-transparent h-full flex flex-col justify-end text-white">
                    <h3 className="text-xl font-semibold">{course.name}</h3>
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
          <CarouselNext className="text-black" />
        </Carousel>

        {/* Footer CTA + Quote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-2">
          <blockquote className="text-white text-lg italic text-center sm:text-left">
            “Skills are the new swords.”
          </blockquote>

          <Link to="/all-courses" aria-label="Browse all skill-building programs">
            <Button
              className="bg-green-800 text-white text-base sm:text-md py-3 px-6 hover:bg-primary shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 flex items-center gap-2"
            >
              Browse Our Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
