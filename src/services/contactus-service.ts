import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ContactUsDetails } from "@/types";

export const sendContactDetails = async (payload:ContactUsDetails): Promise<string> => {
  try {
    const response = await apiClient.post<ApiResponse<ContactUsDetails>>("/contacts/leads",payload);
    
    return response.data.message
  } catch (error) {
    throw handleApiError(error);
  }
};
