import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";

import type { Department,SelectedCourse,FormatedCourses } from "@/types/course";

export const fetchCourses = async (): Promise<Department[]> => {
  try {
    const response = await apiClient.get<ApiResponse<Department[]>>("/courses/");

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchSelectedCourse = async (courseSlug:string): Promise<SelectedCourse> => {
  try {
    const response = await apiClient.get<ApiResponse<SelectedCourse>>(`/courses/course/${courseSlug}`);
    console.log(response)
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchFormattedCourses = async (): Promise<FormatedCourses[]> => {
  try {
    const response = await apiClient.get<ApiResponse<FormatedCourses[]>>(`/courses/formatted-courses`);
    console.log(response.data.additional)
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


