import CustomButton from "@/components/common/Button";
import type { Course } from "../types";
import { Link } from "react-router-dom";
import {
  createPendingPayment,
  razorpayConfig,
  verifyPendingPayment,
} from "@/services/payment-service";
import { loadRazorpayScript } from "@/utils/razorpay";

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const isPending = !course.purchaseDetails?.isFullPayment;

  console.log(course)
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
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    });
  };

  return (
    <div
      className="
        group rounded-2xl overflow-hidden border
        bg-white dark:bg-neutral-900
        border-neutral-200 dark:border-neutral-800
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
      "
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {isPending && (
          <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-red-500 text-white shadow">
            Payment Pending
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h4 className="text-base font-semibold line-clamp-2 text-neutral-900 dark:text-white">
          {course.courseName}
        </h4>

        {/* CTA */}
        {isPending ? (
          <CustomButton
            title="Pay Pending Payment"
            onClick={() =>
              handlePayment(course.purchaseDetails?.purchaseId as string)
            }
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          />
        ) : (
          <Link to={`/course-dashboard/${course.slug}`}>
            <CustomButton
              title="Start Course"
              className="w-full bg-primary hover:opacity-90 text-white"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
