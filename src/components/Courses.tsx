import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useNavigate, Link } from "react-router-dom";
import { motion, cubicBezier } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Header from "./common/Header";

import CustomButton from "@/components/common/Button";;
import BlockQuote from "./common/BlockQuote";
import { Search } from "lucide-react";

export function CoursesCarousel() {
  const plugin = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  // Default to empty array to prevent undefined errors
  const { formatedCourses = [] } = usePublicCoursesStore();
  const navigate = useNavigate();

  const handleSelectedCourse = (courseSlug: string) => {
    navigate(`/course/${courseSlug}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: cubicBezier(0.25, 0.46, 0.45, 0.94) },
    },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, rotate: 1 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="bg-neutral-900 py-16 px-4 w-full">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center space-y-3 mb-10">
          <Header
            title="Master In-Demand Skills"
            subline="Every click takes you one step closer to mastery."
          />
        </div>

        {/* Carousel */}
        {formatedCourses.length > 0 ? (
          <Carousel plugins={[plugin.current]} className="w-full" opts={{ loop: true }}>
            <CarouselContent>
              {formatedCourses.map((course) => (
                <CarouselItem key={course.id} className="sm:basis-1/2 md:basis-1/3 px-2">
                  <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="relative group h-[400px]"
                  >
                    <Card className="overflow-hidden rounded-2xl pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] h-full">
                      {/* Background */}
                      <img
                        src={course.courseThumbnail}
                        alt={course.courseName}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/70 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90" />
                      {/* Content */}
                      <CardContent className="relative z-20 p-5 flex flex-col justify-end h-full text-white">
                        <h3 className="text-xl mb-1 font-bold">{course.courseName}</h3>
                        <p className="text-sm text-neutral-300 font-bricolage mb-4 line-clamp-2">
                          {course.courseDescription}
                        </p>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                          <CustomButton
                            title="Enroll Now"
                            icon=""
                            className="w-40"
                            onClick={() => handleSelectedCourse(course.slug)}
                          />
                        </motion.div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:text-primary cursor-pointer" />
            <CarouselNext className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:text-primary cursor-pointer" />
          </Carousel>
        ) : (
          <p className="text-center text-white">No courses available at the moment.</p>
        )}

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-14 px-2">
          <BlockQuote quote="Skills are the new swords. Sharpen them often." />
          <Link to="/all-courses" aria-label="Browse all programs">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <CustomButton title="Browse Our Programs" icon={<Search />} />
            </motion.div>
          </Link>
        </div>
      </div>
    </section>
  );
}
