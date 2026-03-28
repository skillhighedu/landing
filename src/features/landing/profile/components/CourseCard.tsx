import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import {
  createPendingPayment,
  razorpayConfig,
  verifyPendingPayment,
} from "@/services/payment-service";
import { loadRazorpayScript } from "@/utils/razorpay";
import type { Course } from "../types";

interface Props {
  course: Course;
}

type RazorpaySuccessResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpaySuccessResponse) => Promise<void>;
};

export default function CourseCard({ course }: Props) {
  const isPending = !course.purchaseDetails?.isFullPayment;

  const handlePayment = async (orderId: string) => {
    const isLoaded = await loadRazorpayScript();
    if (!isLoaded) {
      throw new Error("Razorpay SDK failed to load.");
    }

    const config = await razorpayConfig();
    const orderDetails = await createPendingPayment(orderId);

    return new Promise<void>((resolve, reject) => {
      const options: RazorpayCheckoutOptions = {
        key: config.key,
        amount: orderDetails.amount!,
        currency: "INR",
        name: `${orderDetails.courseName} | Skillhigh`,
        description: `${orderDetails.courseName} - ${orderDetails.planTitle}`,
        order_id: orderDetails.orderId,
        handler: async function (response: RazorpaySuccessResponse) {
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

      const Razorpay = (window as Window & {
        Razorpay?: new (options: RazorpayCheckoutOptions) => { open: () => void };
      }).Razorpay;

      if (!Razorpay) {
        reject(new Error("Razorpay SDK is unavailable."));
        return;
      }

      const rzp = new Razorpay(options);
      rzp.open();
    });
  };

  return (
    <div className="group overflow-hidden rounded-[28px] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.courseThumbnail}
          alt={course.courseName}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold shadow ${
            isPending
              ? "bg-amber-500 text-white"
              : "bg-emerald-500 text-white"
          }`}
        >
          {isPending ? "Pending payment" : "Active course"}
        </span>
      </div>

      <div className="flex flex-col gap-3 p-5">
        <h4 className=" text-base  text-neutral-900 dark:text-white">
          {course.courseName}
        </h4>

        <p className="text-sm text-neutral-500 dark:text-neutral-400 font-mono">
          {isPending
            ? "Complete the pending payment to unlock the full course dashboard."
            : "Continue learning from your course dashboard."}
        </p>

        {isPending ? (
          <CustomButton
            title="Pay Pending Payment"
            onClick={() => handlePayment(course.purchaseDetails?.purchaseId as string)}
            className="w-full bg-red-500 text-white hover:bg-red-600"
          />
        ) : (
          <Link to={`/course-dashboard/${course.slug}`}>
            <CustomButton
              title="Start Course"
              className="w-full bg-primary text-white hover:opacity-90"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
