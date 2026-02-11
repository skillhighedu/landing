import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type {
  QuizByQuizIdResponse,
  QuizzesByCourseIdResponse,
  SubmitQuizAnswer,
  SubmitQuizResult,
} from "../types";

export interface QuizItem {
  id: string;
  title: string;
  questionsCount: number;
  locked: boolean;
}

export const fetchQuizzes = async (
  slug: string,
  mode: "demo" | "real"
): Promise<QuizItem[]> => {
  try {
    const url =
      mode === "demo"
        ? `/demodashboard/course/${slug}/demo/quiz`
        : `/course-quiz/course/${slug}/quiz`;

    const res = await apiClient.get<
      ApiResponse<QuizzesByCourseIdResponse>
    >(url);

   console.log(res)

    return res.data.additional?.quizzes ?? [];
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const fetchQuizQuestions = async (
  slug: string,
  quizId: string,
  mode: "demo" | "real"
): Promise<QuizByQuizIdResponse> => {
  try {
    const url =
      mode === "demo"
        ? `/demodashboard/course/${slug}/demo/quiz/${quizId}`
        : `/course-quiz/course/${slug}/quiz/${quizId}`;

        console.log(slug)
    const res = await apiClient.get<
      ApiResponse<QuizByQuizIdResponse>
    >(url);

    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const submitQuizResult = async (
  quizId: string,
  answers: SubmitQuizAnswer[],
): Promise<SubmitQuizResult> => {
  try {
    const res = await apiClient.post<ApiResponse<null>>(
      `/course-quiz/quizzes/submitResult/${quizId}`,
      { answers },
    );
    
     return {
      message: res.data.message,
      score: res.data.additional ?? "0",
    };
    
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


