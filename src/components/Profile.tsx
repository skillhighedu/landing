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
import HeaderSection from "@/components/common/HeaderSection";
import ProfileHero from "./profile/ProfileHero";
import ProfileCard from "./profile/ProfileCard";
import YourCourses from "./profile/YourCourses";
// import EnrolledCourses from "./profile/EnrolledCourses";

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
      <HeaderSection title="Profile" />

      {/* Hero Section */}
      <ProfileHero name={studentProfile[0]?.name} loading={loading} />

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Profile Card */}
        <ProfileCard 
          student={studentProfile[0]} 
          loading={loading} 
          onLogout={logout} 
        />

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

      {/* Your Courses Section */}
      <YourCourses 
        courses={studentProfile[0]?.courses || []} 
        loading={loading} 
        onPayment={handlePayment} 
      />

      {/* Enrolled Courses Section
      <EnrolledCourses loading={loading} /> */}
    </div>
  );
}
