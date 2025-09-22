import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { RazorpayConfig,CreatePayment,VerifyPayment,CreatePendingPayment, VerifyPendingPayment } from "@/types";


export const createPayment = async ({courseId,priceId,isFullPayment}: CreatePayment): Promise<CreatePayment> => {
  try {
    const response = await apiClient.post<ApiResponse<CreatePayment>>("/purchases/create-payment", {
      courseId,
      priceId,
      isFullPayment

    });

    return response.data.additional!
  } catch (error) {
    console.log("hey error",error)
    throw handleApiError(error);
  }
};

export const createPendingPayment = async (orderId: string): Promise<CreatePendingPayment> => {
  try {

    const response = await apiClient.post<ApiResponse<CreatePendingPayment>>("/purchases/create-pending-payment", {
      orderId

    });

    return response.data.additional!
  } catch (error) {
    throw handleApiError(error);
  }
};

export const razorpayConfig = async (): Promise<RazorpayConfig> => {
  try {
    const response = await apiClient.get<ApiResponse<RazorpayConfig>>("/purchases/config");

    return response.data.additional!
  } catch (error) {
    throw handleApiError(error);
  }
};


export const verifyPayment = async ( { razorpay_order_id, razorpay_payment_id, razorpay_signature,isFullPayment,amount,courseId,priceId }: VerifyPayment): Promise<VerifyPayment> => {
  try {
    const response = await apiClient.post<ApiResponse<VerifyPayment>>("/purchases/verify-payment", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      isFullPayment,
      amount,
      courseId,
      priceId

    });

    return response.data.additional!
  } catch (error) {
    throw handleApiError(error);
  }
};


export const verifyPendingPayment = async ( { razorpay_order_id, razorpay_payment_id, razorpay_signature,amount,orderId }: VerifyPendingPayment): Promise<VerifyPendingPayment> => {
  try {
    const response = await apiClient.post<ApiResponse<VerifyPendingPayment>>("/purchases/verify-pending-payment", {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
      amount,

    });

    return response.data.additional!
  } catch (error) {
    throw handleApiError(error);
  }
};