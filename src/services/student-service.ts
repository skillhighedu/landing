import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { LoginPayload, SignupPayload, StudentProfile } from "@/types/student";
import { useAuthStore } from "@/store/authStore";

export const login = async (email: string, password: string): Promise<LoginPayload> => {
  try {
    const payload: LoginPayload = { email, password };
    const response = await apiClient.post<ApiResponse<LoginPayload>>("/auth/login", payload);
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

export const createAccount = async (name: string, email: string, password: string): Promise<SignupPayload> => {
  try {
    const payload = { name, email, password };
    const response = await apiClient.post<ApiResponse<SignupPayload>>("/auth/create-account", payload);

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const verifyOtp = async (name: string, email: string, password: string, otp: string): Promise<SignupPayload> => {
  try {
    const payload = { name, email, password, otp };
    const response = await apiClient.post<ApiResponse<SignupPayload>>("/auth/otp-verification", payload);

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const verifyForgetOtp = async ( email: string,  otp: string): Promise<string> => {
  try {
    const payload = {  email, otp };
  console.log(payload)
    const response = await apiClient.post<ApiResponse<string>>("/auth/forget-password-verification", payload);
    return response.data.message;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const setNewPassword = async ( newPassword:string,confirmPassword:string): Promise<string> => {
  try {
    const payload = {  newPassword,confirmPassword };

    const response = await apiClient.post<ApiResponse<string>>("/auth/set-new-password", payload);
    return response.data.message;
  } catch (error) {
    throw handleApiError(error);
  }
};




export const updateProfile = async ( name:string,phoneNumber:string): Promise<string> => {
  try {
    const payload = {  name,phoneNumber };
    const response = await apiClient.put<ApiResponse<string>>("/auth/update-profile", payload);
    return response.data.message;
  } catch (error) {
    throw handleApiError(error);
  }
};







export const profile = async (): Promise<StudentProfile> => {
  try {
    const response = await apiClient.get<ApiResponse<StudentProfile>>("/auth/profile");
    console.log(response)
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};
