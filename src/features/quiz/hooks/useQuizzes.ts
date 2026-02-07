// src/features/quiz/api/quiz.queries.ts
import { useQuery } from "@tanstack/react-query";
import type { QuizByQuizIdResponse, QuizzesByCourseIdResponse } from "../types";
import { fetchQuizzesByCourseId, fetchQuizzesByQuizId } from "../services/quiz-services";
// import { fetchQuizzesByQuizId, fetchQuizzesByCourseId } from "./quiz.api";

export const quizKeys = {
  all: ["quizzes"] as const,
  byQuizId: (id: string) => [...quizKeys.all, "byQuizId", id] as const,
  byCourseId: (courseId: string) =>
    [...quizKeys.all, "byCourseId", courseId] as const,
};

// Get quiz by quizId
export const useQuizByQuizId = (id?: string) => {
  return useQuery<QuizByQuizIdResponse, Error>({
    queryKey: id ? quizKeys.byQuizId(id) : quizKeys.byQuizId(""),
    queryFn: () => fetchQuizzesByQuizId(id!),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 min
  });
};

// Get quizzes by courseId
export const useQuizzesByCourseId = (courseId?: string) => {
  return useQuery<QuizzesByCourseIdResponse[], Error>({
    queryKey: courseId ? quizKeys.byCourseId(courseId) : quizKeys.byCourseId(""),
    queryFn: () => fetchQuizzesByCourseId(courseId!),
    enabled: !!courseId,
    staleTime: 1000 * 60 * 5,
  });
};
