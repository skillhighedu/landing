import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ContactUsDetails } from "@/types";
import { useAuthStore } from "@/store/authStore";
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


export const googleCallBack = async (code:string): Promise<{role:string}> => {
  try {
    const response = await apiClient.post<ApiResponse<{role:string}>>("/auth/google/callback",{code});
    const role = response.data?.additional?.role!;
        useAuthStore.setState({
          user: {role:role},
          isAuthenticated: true,
          loading: false,
          isCheckingAuth: false,
          authChecked: true,
        });
     return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};