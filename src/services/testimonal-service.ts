import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { Testimonial } from "@/types";

export const fetchTestimonals = async (): Promise<Testimonial[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Testimonial[]>>("/testimonals");
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
