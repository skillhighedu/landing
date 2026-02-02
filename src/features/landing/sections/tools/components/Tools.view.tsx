import { GridPatternDashed } from '@/components/ui/DashedStroke';
import Header from '@/components/common/Header';
import BlockQuote from '@/components/common/BlockQuote';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import ToolCard from './ToolCard';
import type { SelectedCourseTools } from '@/types/course';

interface Props {
  courseTools: SelectedCourseTools;
  autoplayPlugin: any;
}

export default function ToolsView({
  courseTools,
  autoplayPlugin,
}: Props) {
  return (
    <section className="relative w-full bg-neutral-900 py-24 px-4 overflow-hidden">
      <GridPatternDashed />

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <Header
          title="Tools You’ll Work With"
          subline="A modern stack used in real-world production environments."
        />

        {/* Carousel */}
        <div className="relative mt-16">
          <Carousel
            plugins={[autoplayPlugin]}
            opts={{
              loop: true,
              align: 'center',
              dragFree: true,
            }}
            aria-label="Course tools carousel"
          >
            <CarouselContent className="gap-6">
              {courseTools.map((tool, index) => (
                <CarouselItem
                  key={tool.toolName}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                >
                  <ToolCard
                    toolName={tool.toolName}
                    toolImage={tool.toolImage}
                    index={index}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Edge fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-neutral-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-neutral-900 to-transparent" />
        </div>

        {/* Quote */}
        <div className="mt-16">
          <BlockQuote quote="Great work starts with the right tools." />
        </div>
      </div>
    </section>
  );
}
