
import { loadRazorpayScript } from "@/utils/razorpay";
import { razorpayConfig, createPayment, verifyPayment } from "@/services/payment-service"; // your API calls

type PaymentParams = {
  courseId: string;
  priceId: string;
  isFullPayment: boolean;

};

export async function initiateRazorpayPayment({
  courseId,
  priceId,

  isFullPayment,

}: PaymentParams) {
  const isLoaded = await loadRazorpayScript();
  if (!isLoaded) {
    throw new Error("Razorpay SDK failed to load.");
  }

  // ✅ Get Razorpay keys from backend
  const config = await razorpayConfig();

  // ✅ Create order on backend
  const orderDetails = await createPayment({
    courseId,
    priceId,
    isFullPayment,
  
  });
  


  return new Promise<void>((resolve, reject) => {
    const options = {
      key: config.key,
      amount: orderDetails.amount,
      currency: "INR",
      name: `${orderDetails.courseName} | Skillhigh`,
      description: `${orderDetails.courseName} – ${orderDetails.planTitle}`,
      order_id: orderDetails.orderId,

      handler: async function (response: any) {
        try {
          await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            isFullPayment: orderDetails.isFullPayment,
            amount: orderDetails.amount!,
            courseId,
            priceId
          });

          resolve(); // success
        } catch (error) {
          reject(error); // verification failed
        }
      },

      prefill: {
        name:  "",
        email:  "",
        contact:  "",
      },
      theme: { color: "#3399cc" },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  });
}
