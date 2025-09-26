import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/services/student-service";
import { useStudentProfileStore } from "@/store/studentStore";
import { useAuthStore } from "@/store/authStore";
import { loadRazorpayScript } from "@/utils/razorpay";
import {
  razorpayConfig,
  createPendingPayment,
  verifyPendingPayment,
} from "@/services/payment-service";

import ProfileForm from "./ProfileForm";
import CustomButton from "./Button";
import HeaderSection from "./ui/HeaderSection";

const Skeleton = ({ className }: { className?: string }) => (
  <div className={`animate-pulse bg-neutral-700/50 ${className}`}></div>
);

export default function Profile() {
  const { studentProfile, setStudentProfile } = useStudentProfileStore();
  const { logout } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await profile();
        setStudentProfile([res]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handlePayment = async (orderId: string) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) throw new Error("Razorpay SDK failed to load.");

    const config = await razorpayConfig();
    const orderDetails = await createPendingPayment(orderId);

    return new Promise<void>((resolve, reject) => {
      const options = {
        key: config.key,
        amount: orderDetails.amount!,
        currency: "INR",
        name: `${orderDetails.courseName} | Skillhigh`,
        description: `${orderDetails.courseName} – ${orderDetails.planTitle}`,
        order_id: orderDetails.orderId,
        handler: async function (response: any) {
          try {
            await verifyPendingPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              amount: orderDetails.amount,
              orderId,
            });
            resolve();
          } catch (error) {
            reject(error);
          }
        }
      };
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 px-4 sm:px-8 py-12 text-white">

      <HeaderSection title="Profile"/>
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-neutral-900 via-zinc-800 to-neutral-900 p-8 mt-6 rounded-2xl shadow-xl mb-12 text-center max-w-7xl mx-auto border border-neutral-700"
      >
        {loading ? (
          <Skeleton className="h-12 w-60 mx-auto mb-3 rounded-md" />
        ) : (
          <h1 className="text-2xl sm:text-5xl mb-3 text-primary">
            Welcome Back, {studentProfile[0]?.name?.split(" ")[0] || "Student"}
          </h1>
        )}
        {loading ? (
          <Skeleton className="h-6 w-80 mx-auto rounded-md" />
        ) : (
          <p className="text-md sm:text-xl text-gray-100 font-bricolage max-w-2xl mx-auto">
            Your skills are battle-ready. Sharpen your expertise and conquer the digital realm.
          </p>
        )}
      </motion.div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-1 bg-neutral-900 p-6 rounded-2xl shadow-xl border border-neutral-700 flex flex-col items-center text-center"
        >
          {loading ? (
            <>
              <Skeleton className="w-28 h-28 rounded-full mb-4" />
              <Skeleton className="h-6 w-40 mb-2 rounded-md" />
              <Skeleton className="h-4 w-32 rounded-md" />
              <Skeleton className="h-10 w-full mt-6 rounded-lg" />
            </>
          ) : (
            <>
              <div className="relative w-28 h-28 flex items-center justify-center mb-4">
                <div className="w-28 h-28 rounded-full bg-lime-400/20 flex items-center justify-center text-3xl font-bold text-white">
                  {studentProfile?.[0]?.name?.[0] || "S"}
                </div>
              </div>
              <h2 className="text-2xl font-semibold">{studentProfile?.[0]?.name}</h2>
              <p className="text-gray-400 font-sans">{studentProfile?.[0]?.email}</p>
              <CustomButton
                onClick={logout}
                icon=""
                title="Logout"
                className="mt-6 bg-red-500 hover:bg-red-700 w-full sm:w-auto"
              />
            </>
          )}
        </motion.div>

        {/* Profile Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="col-span-1 lg:col-span-2 rounded-2xl shadow-xl border border-neutral-700"
        >
          {loading ? (
            <div className="p-6 space-y-4">
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-1/2 rounded-lg mt-4" />
            </div>
          ) : (
            studentProfile[0] && <ProfileForm student={studentProfile[0]} />
          )}
        </motion.div>
      </div>

      {/* Courses Section */}
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
        ) : studentProfile[0]?.courses?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {studentProfile[0].courses.map((course) => (
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
                          onClick={() => handlePayment(course.purchaseDetails.purchaseId)}
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
            <p className="text-gray-400 mb-6">You haven’t enrolled in any course yet.</p>
            <CustomButton title="Browse our courses" />
          </motion.div>
        )}
      </div>
    </div>
  );
}
