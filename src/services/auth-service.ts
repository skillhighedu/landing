import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ContactUsDetails } from "@/types";

export const checkAuthentication = async (): Promise<string> => {
  try {
    const response = await apiClient.get<ApiResponse<ContactUsDetails>>("/auth/auth/check");
    return response.data.message;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const ForgetPassword = async (email:string): Promise<string> => {
  try {
    const response = await apiClient.post<ApiResponse<ContactUsDetails>>("/auth/forget-password",{email});
    return response.data.message;
  } catch (error) {
    throw handleApiError(error);
  }
};
