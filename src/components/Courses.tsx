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
import Header from "./Header";
import CustomButton from "./Button";
import SearchIcon from "@/components/icons/Search";

export function CoursesCarousel() {
  const plugin = React.useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  return (
    <section className="bg-neutral-900 py-16 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <Header title="Master In-Demand Skills" />
          <p className="text-neutral-400 text-base sm:text-lg">
            Every click takes you one step closer to mastery.
          </p>
        </div>

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
                <Card className="relative group overflow-hidden h-[360px] rounded-2xl shadow-md border border-neutral-800">
                  {/* Background */}
                  <img
                    src={course.logo}
                    alt={course.alt || course.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-10" />

                  {/* Content */}
                  <CardContent className="relative z-20 p-5 flex flex-col justify-end h-full text-white">
                    <h3 className="text-xl  mb-1">
                      {course.name}
                    </h3>
                    <p className="text-sm text-neutral-300 font-mono mb-4 line-clamp-2">
                      {course.description}
                    </p>
                    <Button variant="secondary" size="sm" className="w-fit cursor-pointer pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]">
                      Enroll
                    </Button>
                    
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:text-primary cursor-pointer " />
          <CarouselNext className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]  hover:text-primary cursor-pointer" />
        </Carousel> 

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 px-2">
          <blockquote className="text-white text-lg italic text-center sm:text-left max-w-lg">
            “Skills are the new swords. Sharpen them often.”
          </blockquote>

          <Link to="/all-courses" aria-label="Browse all programs">
            <CustomButton title="Browse Our Programs" icon={<SearchIcon />} />
          </Link>
        </div>
      </div>
    </section>
  );
}
