import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import type { LessonsResponse } from "../types";
import { handleApiError } from "@/utils/errorHandler";

export const 
fetchDemoCourseLessons = async (
  slug: string
): Promise<LessonsResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<LessonsResponse>>(
      `/demodashboard/course/${slug}/demo/lessons`
    );

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const 
fetchDemoCourse = async (
  slug: string
): Promise<LessonsResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<LessonsResponse>>(
      `/demodashboard/course/${slug}/demo/course-details`
    );

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};
