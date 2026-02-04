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
  const [api, setApi] = React.useState<EmblaCarouselType | undefined>(undefined);

  const autoplay = React.useRef(
    Autoplay({
      delay: 3500,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  );

  React.useEffect(() => {
    if (!api) return;

    const update = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    update();
    api.on("select", update);
    api.on("reInit", update);

    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      plugins={[autoplay.current]}
      opts={{ loop: true, align: "center" }}
      className="relative w-full"
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

      <CarouselPrevious
        className="
          left-2 top-1/2 -translate-y-1/2
          backdrop-blur-md border-none
          bg-white/80 text-neutral-900 hover:bg-white
          dark:bg-black/40 dark:text-white dark:hover:bg-black/60
        "
      />

      <CarouselNext
        className="
          right-2 top-1/2 -translate-y-1/2
          backdrop-blur-md border-none
          bg-white/80 text-neutral-900 hover:bg-white
          dark:bg-black/40 dark:text-white dark:hover:bg-black/60
        "
      />
    </Carousel>
  );
}
