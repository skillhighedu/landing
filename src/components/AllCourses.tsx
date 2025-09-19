import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import CustomButton from "./Button";
import { Input } from "./ui/input";
import BookingModal from "./BookingModal";
import BlockQuote from "./ui/BlockQuote";
import { Calendar, Swords } from "lucide-react";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import HeaderSection from "./ui/HeaderSection";

export default function AllCourses() {
  const { formatedCourses } = usePublicCoursesStore();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSelectedCourse = (courseSlug: string) => {
    navigate(`/course/${courseSlug}`);
  };

  // Filter courses based on search query
  const filteredCourses = formatedCourses.filter(
    (course) =>
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="bg-neutral-900 py-10 px-4 sm:px-6 lg:px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto flex flex-col gap-6"
      >
        {/* Header */}
        <HeaderSection title="Our Courses" />

        {/* Search + Quote */}
        <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BlockQuote quote="One skill. A thousand doors." />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="md:w-[400px] text-white border-0 bg-neutral-800 py-4 px-4 rounded-lg focus:ring-2 focus:ring-lime-400"
          />
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredCourses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
              className="bg-neutral-800/50 backdrop-blur-md rounded-2xl shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] overflow-hidden transition-transform duration-300 hover:scale-105"
            >
              <div className="relative">
               <img
  src={course.courseThumbnail}
  alt={course.courseName}
  className="w-full object-contain max-h-[400px] mx-auto"
  loading="lazy"
  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
/>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6 flex flex-col gap-4">
                <h3 className="text-xl text-white ">{course.courseName}</h3>
                <p className="text-gray-300 text-md leading-relaxed font-bricolage line-clamp-3">
                  {course.courseDescription}
                </p>
                <CustomButton
                  title="Enroll now"
                  icon={<Swords />}
                  onClick={() => handleSelectedCourse(course.slug)}
                  className="w-full hover:scale-105 transition-transform duration-300 ease-out"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        className="mt-20 bg-neutral-800/60 rounded-2xl shadow-inner py-16 px-6 sm:px-12 text-center max-w-4xl mx-auto flex flex-col items-center gap-6"
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h3 className="text-2xl sm:text-3xl text-white font-semibold">
          Not sure which skill is right for you?
        </h3>
        <p className="text-gray-300 font-bricolage mb-4 text-sm sm:text-base">
          Book a quick 15-minute call — our team will personally help you choose the right path based on your goals.
        </p>
        <BookingModal
          title="Get Clarity in 15 Minutes"
          icon={<Calendar />}
          className="hover:scale-105 transition-transform duration-300 ease-out"
        />
      </motion.div>
    </section>
  );
}
