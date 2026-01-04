import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";

import type { Department,SelectedCourse,FormatedCourses, LessonsResponse, CompletedLessons } from "@/types/course";

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
 
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchFormattedCourses = async (): Promise<FormatedCourses[]> => {
  try {
    const response = await apiClient.get<ApiResponse<FormatedCourses[]>>(`/courses/formatted-courses`);
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchDashboardCourse = async (slug:string): Promise<SelectedCourse> => {
  try {
    const response = await apiClient.get<ApiResponse<SelectedCourse>>(`/dashboard/students/course-details/${slug}`);
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchCourseLessons = async (slug:string): Promise<LessonsResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<LessonsResponse>>(`/dashboard/course/${slug}/lessons`);
  
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const lessonsStatus = async (slug:string): Promise<CompletedLessons> => {
  try {
    const response = await apiClient.get<ApiResponse<CompletedLessons>>(`/dashboard/course/${slug}/course-lessons/status`);
   
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchLessonCheckbox = async (slug:string, lessonId:string): Promise<LessonsResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<LessonsResponse>>(`/dashboard/course/${slug}/lessons/${lessonId}`);
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const clickLessonToggle = async (
  slug: string,
  lessonId: string,
  completed: boolean
): Promise<LessonsResponse> => {
  try {
    const response = await apiClient.put<ApiResponse<LessonsResponse>>(
      `/dashboard/courses/${slug}/lessons/${lessonId}/completion`,
      { completed }
    );

    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};


