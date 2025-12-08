import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "@/components/Button";
import { PlayCircle, Brain, Folder, GraduationCap, DollarSign } from "lucide-react";
import type { CourseDetail } from "@/data/courseDetails";

interface Course {
  id: string;
  name: string;
  description: string;
  logo: string;
  alt: string;
}

interface CourseHeaderProps {
  course: Course;
  details: CourseDetail;
}

export default function CourseHeader({ course, details }: CourseHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-neutral-800 shadow-lg rounded-2xl overflow-hidden border border-neutral-700 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto mt-6 mb-12"
    >
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={course.logo}
          alt={course.name}
          className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover border-2 border-neutral-700 shadow-md"
        />
      </div>
      <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-lime-400">
          {course.name}
        </h1>
        <p className="text-base text-gray-300">
          {details.totalTopicsCount || 50} Topics • Explore Below
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start flex-wrap">
          <Link to={`/course-dashboard/${course.id}/video-player`}>
            <CustomButton 
              title="Start Learning" 
              className="text-white rounded-lg cursor-pointer flex items-center gap-2"
            >
              <PlayCircle size={18} />
              Start Learning
            </CustomButton>
          </Link>
          <Link to={`/course-dashboard/${course.id}/course-essentials`}>
            <CustomButton 
              title="Take Quiz" 
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer flex items-center gap-2"
            >
              <Brain size={18} />
              Take Quiz
            </CustomButton>
          </Link>
          <Link to="/projects">
            <CustomButton 
              title="Start Projects" 
              className="bg-purple-600 hover:bg-purple-700 text-white rounded-lg cursor-pointer flex items-center gap-2"
            >
              <Folder size={18} />
              Start Projects
            </CustomButton>
          </Link>
          <CustomButton 
            title="Claim Certificates" 
            className="bg-green-700 hover:bg-neutral-600 text-white rounded-lg cursor-pointer flex items-center gap-2"
          >
            <GraduationCap size={18} />
            Claim Certificates
          </CustomButton>
          <CustomButton 
            title="Bounties" 
            className="bg-yellow-700 hover:bg-neutral-600 text-white rounded-lg cursor-pointer flex items-center gap-2"
          >
            <DollarSign size={18} />
            Bounties
          </CustomButton>
        </div>
      </div>
    </motion.div>
  );
}
