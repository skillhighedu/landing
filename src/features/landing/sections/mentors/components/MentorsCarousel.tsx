import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import type { EmblaCarouselType } from "embla-carousel";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import MentorCard from "./MentorCard";
import type { Mentor } from "../types";

interface MentorsCarouselProps {
  mentors: Mentor[];
}

export default function MentorsCarousel({ mentors }: MentorsCarouselProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const plugin = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  );

  const handleSelect = React.useCallback((embla: EmblaCarouselType) => {
    setActiveIndex(embla.selectedScrollSnap());
  }, []);

  return (
    <Carousel
      opts={{ loop: true, align: "center" }}
      plugins={[plugin.current]}
      className="relative w-full"
      onSelect={handleSelect as any}
    >
      <CarouselContent className="-ml-4">
        {mentors.map((mentor, index) => (
          <CarouselItem
            key={mentor.id}
            className="basis-[85%] sm:basis-1/2 md:basis-1/3 pl-4"
          >
            <MentorCard
              mentor={mentor}
              index={index}
              isActive={index === activeIndex}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* Controls */}
      <CarouselPrevious
        className="
    left-2 top-1/2 -translate-y-1/2
    bg-card text-card-foreground
    border border-border
    backdrop-blur-md
    hover:bg-muted
  "
      />
      <CarouselNext
        className="
    right-2 top-1/2 -translate-y-1/2
    bg-card text-card-foreground
    border border-border
    backdrop-blur-md
    hover:bg-muted
  "
      />{" "}
    </Carousel>
  );
}
