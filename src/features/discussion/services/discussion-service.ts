import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { DiscussionQuestion, DiscussionQuestionInput } from "../types";

export async function fetchCourseQuestions(slug: string): Promise<DiscussionQuestion[]> {
  try {
    const response = await apiClient.get<ApiResponse<DiscussionQuestion[]>>(
      `/dashboard/course/${slug}/questions`,
    );
    return response.data.additional ?? response.data.data ?? [];
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

export async function createCourseQuestion(
  slug: string,
  topicId: string,
  payload: DiscussionQuestionInput,
): Promise<{ message: string }> {
  try {
    const response = await apiClient.post<ApiResponse<unknown>>(
      `/dashboard/course/${slug}/topics/${topicId}/questions`,
      payload,
    );
    return { message: response.data.message || "Question posted successfully." };
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

export async function updateCourseQuestion(
  slug: string,
  questionId: string,
  payload: DiscussionQuestionInput,
): Promise<{ message: string }> {
  try {
    const response = await apiClient.put<ApiResponse<unknown>>(
      `/dashboard/course/${slug}/questions/${questionId}`,
      payload,
    );
    return { message: response.data.message || "Question updated successfully." };
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}

export async function deleteCourseQuestion(
  slug: string,
  questionId: string,
): Promise<{ message: string }> {
  try {
    const response = await apiClient.delete<ApiResponse<unknown>>(
      `/dashboard/course/${slug}/questions/${questionId}`,
    );
    return { message: response.data.message || "Question deleted successfully." };
  } catch (error) {
    throw new Error(handleApiError(error));
  }
}
