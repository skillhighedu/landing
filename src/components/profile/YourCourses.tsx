import { motion } from "framer-motion";
import CustomButton from "@/components/Button";

interface Course {
  courseId: string;
  courseName: string;
  courseThumbnail: string;
  purchaseDetails?: {
    isFullPayment: boolean;
    purchaseId: string;
    remainingAmount?: number;
    discountAmount?: number;
  };
}

interface YourCoursesProps {
  courses: Course[];
  loading: boolean;
  onPayment: (orderId: string) => Promise<void>;
}

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-neutral-700/50 ${className}`}></div>
);

export default function YourCourses({ courses, loading, onPayment }: YourCoursesProps) {
  return (
    <div className="max-w-7xl mx-auto">
      <h3 className="text-3xl mb-6 text-primary">Your Courses</h3>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-neutral-800 rounded-2xl shadow-lg border border-neutral-700 overflow-hidden p-4 flex flex-col space-y-2"
            >
              <Skeleton className="w-full aspect-video rounded-md" />
              <Skeleton className="h-6 w-3/4 rounded-md" />
              <Skeleton className="h-6 w-1/2 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg mt-auto" />
            </motion.div>
          ))}
        </div>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course) => (
            <motion.div
              key={course.courseId}
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
                <h4 className="text-lg font-semibold mb-2">{course.courseName}</h4>
                {course.purchaseDetails?.isFullPayment ? (
                  <a href="https://app.skillhigh.in" className="inline-block">
                    <CustomButton title="Start Lessons" icon="" />
                  </a>
                ) : (
                  course.purchaseDetails && (
                    <>
                      <p className="text-sm text-gray-400 mb-2">
                        Remaining: ₹{course.purchaseDetails.discountAmount ? course.purchaseDetails.discountAmount : course.purchaseDetails.remainingAmount}
                      </p>
                      <CustomButton
                        title="Pay Remaining"
                        onClick={() => onPayment(course.purchaseDetails!.purchaseId)}
                        className="w-full bg-lime-400 text-black hover:bg-lime-500 rounded-lg"
                      />
                    </>
                  )
                )}
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
          <h4 className="text-xl font-semibold mb-4">No courses yet</h4>
          <p className="text-gray-400 mb-6">You haven't enrolled in any course yet.</p>
          <CustomButton title="Browse our courses" />
        </motion.div>
      )}
    </div>
  );
}
