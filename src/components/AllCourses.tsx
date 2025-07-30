import { Courses } from "@/data/course";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function AllCourses() {
  return (
    <section className="bg-neutral-900 py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto"
      >
     <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8 px-2">
  
  <h2 className="text-4xl sm:text-3xl text-white text-center  pixel-font leading-tight tracking-tight">
    Our Courses
  </h2>

 
  <blockquote className="text-white text-lg italic text-center sm:text-left">
 “One skill. A thousand doors.”
          </blockquote>
</div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <img
                  src={course.logo}
                  alt={course.name}
                  className="w-full h-48 object-cover"
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-xl text-white font-semibold mb-2">{course.name}</h3>
                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {course.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="text-lg text-green-400">
                    ₹{course.price.toLocaleString()}
                  </p>
                </div>
                <Link to="/about-course">
                  <Button
                    className="bg-green-800 text-white mt-4 py-3 px-6 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
                    aria-label="Enroll Now"
                  >
                    Enroll now
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
     <div className="mt-24 bg-neutral-800/60 rounded-2xl shadow-inner py-16 px-6 sm:px-12 text-center max-w-4xl mx-auto">
      <h3 className="text-2xl sm:text-3xl text-white mb-4">
        Not sure which skill is right for you?
      </h3>
      <p className="text-gray-300 font-mono mb-8 text-sm sm:text-base">
        Click the button below and drop us a message. Our team will guide you personally to choose the best path for your goals.
      </p>

      <Link to="/contact-us">
        <Button
          className="bg-green-800 text-white text-base sm:text-md py-3 px-6 sm:py-4 sm:px-8 cursor-pointer pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 gap-2"
          aria-label="Start Your Journey"
        >
  
          Let’s talk
        </Button>
      </Link>
    </div>
    </section>
  );
}
