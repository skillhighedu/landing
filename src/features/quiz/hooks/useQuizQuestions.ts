import { useQuery } from "@tanstack/react-query";
import { fetchQuizQuestions } from "../services/quiz-services";

export const useQuizQuestions = (
  slug: string,
  quizId: string,
  mode: "demo" | "real"
) => {
  return useQuery({
    queryKey: ["quiz-questions", slug, quizId, mode],
    queryFn: () => fetchQuizQuestions(slug, quizId, mode),
    enabled: !!slug && !!quizId,   // FIX
  });
};

