'use client';

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "@/components/common/Header";
import CustomButton from "@/components/common/Button";
import BlockQuote from "@/components/common/BlockQuote";
import { Search } from "lucide-react";
import Container from "@/layouts/Container";

export function CoursesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  const { formatedCourses = [] } = usePublicCoursesStore();
  const navigate = useNavigate();

  return (
    <section className="bg-neutral-950 py-20 overflow-hidden">
      <Container size="xl">
        {/* Header */}
        <div className="text-center mb-14">
          <Header
            title="Master In-Demand Skills"
            subline="Carefully designed programs focused on real-world outcomes."
          />
        </div>

        {/* Carousel */}
        {formatedCourses.length > 0 ? (
          <Carousel
            plugins={[plugin.current]}
            opts={{ loop: true }}
            className="relative"
          >
            <CarouselContent>
              {formatedCourses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="sm:basis-1/2 md:basis-1/3 px-3"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-[420px]"
                  >
                    <Card className="group relative h-full overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-shadow">
                      {/* Thumbnail */}
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseName}
                        className="
                          absolute inset-0 h-full w-full object-cover
                          transition-transform duration-700
                          group-hover:scale-[1.06]
                        "
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/70 to-transparent" />

                      {/* Content */}
                      <CardContent className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
                        <h3 className="text-lg font-semibold leading-tight mb-1">
                          {course.courseName}
                        </h3>

                        <p className="text-sm text-neutral-300 font-bricolage line-clamp-2 mb-4">
                          {course.courseDescription}
                        </p>

                        <CustomButton
                          title="View Program"
                          className="w-fit"
                          onClick={() => navigate(`/course/${course.slug}`)}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Controls */}
            <CarouselPrevious className="pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]" />
            <CarouselNext className="pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]" />
          </Carousel>
        ) : (
          <p className="text-center text-neutral-400">
            No courses available at the moment.
          </p>
        )}

        {/* Footer CTA */}
        <div className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6">
          <BlockQuote quote="Skills compound faster than experience." />

          <Link to="/all-courses" aria-label="Browse all programs">
            <CustomButton
              title="Browse all programs"
              icon={<Search />}
            />
          </Link>
        </div>
      </Container>
    </section>
  );
}
