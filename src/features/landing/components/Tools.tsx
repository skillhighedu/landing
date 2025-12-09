import { GridPatternDashed } from "@/components/ui/DashedStroke"
import { motion } from "framer-motion"
import React from "react"
import Autoplay from "embla-carousel-autoplay"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import type { SelectedCourseTools } from "@/types/course"
import BlockQuote from "@/components/common/BlockQuote"
import Header from "@/components/common/Header"


export default function Tools({ courseTools }: { courseTools: SelectedCourseTools }) {
  const plugin = React.useRef(
    Autoplay({
      delay: 1000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    })
  )

  if (!courseTools || courseTools.length === 0) return null

  return (
    <section className="relative w-full bg-neutral-900 py-16 px-4">
      <GridPatternDashed />
      <div className="max-w-6xl mx-auto text-center">
        <Header
          title="Tools You Use in This Course"
          subline="Explore the tools that turn your skills into mastery."
        />

        <div className="relative z-20 mt-12 w-full max-w-7xl px-2 sm:px-4 lg:px-8">
          <Carousel
            plugins={[plugin.current]}
            className="w-full"
            opts={{ loop: true, align: "center" }}
            aria-label="Course tools carousel"
          >
            <CarouselContent className="gap-4">
              {courseTools.map((tool, index) => (
                <CarouselItem
                  key={tool.toolName}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
                  role="group"
                  aria-label={`Tool: ${tool.toolName}`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.08 }}
                    viewport={{ once: true }}
                    className="p-2"
                  >
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Card className="border-0 rounded-2xl flex items-center justify-center shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-transform duration-300 group hover:scale-105">
                            <CardContent className="flex h-28 sm:h-32 md:h-36 items-center justify-center p-4">
                              <img
                                src={tool.toolImage}
                                alt={`${tool.toolName} logo`}
                                loading="lazy"
                                className="max-h-20 sm:max-h-24 md:max-h-32 w-auto object-contain"
                                onError={(e) => (e.currentTarget.src = "/fallback-logo.jpg")}
                              />
                            </CardContent>
                          </Card>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          <p className="text-sm font-medium">{tool.toolName}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Gradient Overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-neutral-900 via-neutral-900/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-neutral-900 via-neutral-900/60 to-transparent z-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 sm:mt-12"
        >
          <BlockQuote quote="Great work starts with the right tools." />
        </motion.div>
      </div>
    </section>
  )
}
