import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { FAQ } from "@/types/faq";

export const fetchFaqs = async (): Promise<FAQ[]> => {
  try {
    const response = await apiClient.get<ApiResponse<FAQ[]>>("/faqs/faq");
    
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
