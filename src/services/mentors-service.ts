import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { Mentors } from "@/types";

export const fetchMentors = async (): Promise<Mentors[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Mentors[]>>("/mentors/mentor");
    
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
