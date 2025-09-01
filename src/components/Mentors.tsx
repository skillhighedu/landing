
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type Mentors } from "@/types";
import { Link } from "react-router-dom";
import Header from "./Header";
import CustomButton from "./Button";
import { motion } from "framer-motion";
import BlockQuote from "./ui/BlockQuote";
import { fetchMentors } from "@/services/mentors-service";

export function Mentors() {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    })
  );

   const [mentors,setMentors] = React.useState<Mentors[]>([]);
    React.useEffect(()=> {
      async function getMentors() {
        const res = await fetchMentors()
        setMentors(res)
      }
  
      getMentors()
    },[])

  return (
    <section className="bg-neutral-900 bg-pixel-crt w-full py-12 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* Header */}
        <div className="flex flex-col mb-10 gap-3">
          <Header title="Learn from Those Who’ve Done It" subline=" Your mentors once started just like you. They’ve built real skills — now they’re here to help you do the same" />
        
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {mentors.map((course, index) => (
              <CarouselItem
                key={index}
                className="sm:basis-1/2 md:basis-1/3 px-2 h-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: false }}
                >
                  <Card className="relative h-[420px] overflow-hidden rounded-2x pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all group ">
                    {/* Background */}
                    <img
                      src={course.photo}
                      alt={course.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />

                    {/* Tag (optional) */}
                    <div className="absolute top-4 left-4 z-20 bg-white/10 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                      { "Mentor"}
                    </div>

                    {/* Content */}
                    <CardContent className="relative z-20 h-full p-6 flex flex-col justify-end text-white">
                      <h3 className="text-xl ">{course.name}</h3>
                      <p className="text-sm text-gray-300 mb-4 line-clamp-2">
                        {course.qualification}
                      </p>

                   
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

  <CarouselPrevious className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] hover:text-primary cursor-pointer " />
           <CarouselNext className="text-black hover:bg-white/10 rounded-md pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]  hover:text-primary cursor-pointer" />
        </Carousel>

        {/* Footer CTA + Quote */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 px-2">
         
         <BlockQuote quote="Behind every skilled person is someone who showed them the way."/>
          <Link to="/contact-us" aria-label="Message Us">
            <CustomButton title="Message Us" icon="" />
          </Link>
        </div>
      </div>
    </section>
  );
}
