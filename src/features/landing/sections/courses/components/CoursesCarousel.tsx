import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CourseCard from "./CourseCard";
import type { Course } from "../types";

type Props = {
  courses: Course[];
};

export default function CoursesCarousel({ courses }: Props) {
  const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <Carousel plugins={[plugin.current]} opts={{ loop: true }}>
      <CarouselContent>
        {courses.map((course) => (
          <CarouselItem
            key={course.id}
            className="sm:basis-1/2 md:basis-1/3 px-3"
          >
            <CourseCard course={course} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious className="pixel-border bg-neutral-900 shadow-[4px_4px_0_#000]" />
      <CarouselNext className="pixel-border bg-neutral-900 shadow-[4px_4px_0_#000]" />
    </Carousel>
  );
}
