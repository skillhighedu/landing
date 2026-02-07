import { useQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "../services/quiz-services";

export const useQuizzes = (slug: string, mode: "demo" | "real") => {
  return useQuery({
    queryKey: ["quizzes", slug, mode],
    queryFn: () => fetchQuizzes(slug, mode),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};
