export interface RazorpayConfig {
  key:string
}

export interface CreatePayment {
 courseId: string;
  priceId: string; 
  amount?: number;
  isFullPayment: boolean;
  orderId?:string
  courseName?:string;
  planTitle?:string;

}

export interface CreatePendingPayment {
amount: number;
orderId:string
  courseName?:string;
  planTitle?:string;
}
export interface VerifyPayment {
 razorpay_order_id: string;
   razorpay_payment_id: string;
  razorpay_signature: string;
  priceId: string; 
  amount: number;
  isFullPayment: boolean;
  courseId:string;
}

export interface VerifyPendingPayment {
 razorpay_order_id: string;
   razorpay_payment_id: string;
  razorpay_signature: string;
  amount: number;

  orderId:string
}