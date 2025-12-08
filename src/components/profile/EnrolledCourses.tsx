import { motion } from "framer-motion";
import CustomButton from "@/components/Button";
import { enrolledCoursesData } from "@/data/enrolledCourses";

interface EnrolledCoursesProps {
  loading: boolean;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-neutral-700/50 ${className}`}></div>
);

export default function EnrolledCourses({ loading }: EnrolledCoursesProps) {
  return (
    <div className="max-w-7xl mx-auto mt-12">
      <h3 className="text-3xl mb-6 text-primary">Enrolled Courses</h3>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 overflow-hidden p-4 flex flex-col space-y-2"
            >
              <Skeleton className="w-full aspect-video rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg mt-auto" />
            </motion.div>
          ))}
        </div>
      ) : enrolledCoursesData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {enrolledCoursesData.map((course) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 hover:border-lime-500/50 transition-all duration-300 flex flex-col overflow-hidden"
            >
              <div className="w-full aspect-video">
                <img
                  src={course.courseThumbnail}
                  alt={course.courseName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                  <h4 className="text-lg font-semibold mb-2">{course.courseName}</h4>
                </div>
                <div className="mt-4">
                  <a href={`/course-dashboard/${course.id}`} className="inline-block w-full">
                    <CustomButton 
                      title="Go to Course" 
                      icon="" 
                      className="w-full"
                    />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 p-10 flex flex-col items-center justify-center text-center"
        >
          <h4 className="text-xl font-semibold mb-4">No enrolled courses</h4>
          <p className="text-gray-400 mb-6">You haven't enrolled in any courses yet.</p>
          <CustomButton title="Explore Courses" />
        </motion.div>
      )}
    </div>
  );
}
