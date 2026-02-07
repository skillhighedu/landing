import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { QuizByQuizIdResponse, QuizzesByCourseIdResponse } from "../types";

export const fetchQuizzesByQuizId = async (
  id: string,
): Promise<QuizByQuizIdResponse> => {
  try {
    const response = await apiClient.get<ApiResponse<QuizByQuizIdResponse>>(
      `/quizzes/quizzes/${id}`,
    );
    console.log("RESPONSE: ", response);
    return response.data.additional!;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const fetchQuizzesByCourseId = async (
  id: string,
): Promise<QuizzesByCourseIdResponse[]> => {
  try {
    const response = await apiClient.get<
      ApiResponse<QuizzesByCourseIdResponse[]>
    >(`/quizzes/quizzes/${id}`);
    console.log("RESPONSE: ", response);
    return response.data.additional ?? [];
  } catch (error) {
    throw handleApiError(error);
  }
};
