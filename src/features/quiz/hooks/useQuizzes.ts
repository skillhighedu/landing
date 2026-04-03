import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizzes } from "../services/quiz-services";

export const useQuizzes = (slug: string, mode: "demo" | "real") => {
  return useQuery({
    queryKey: ["quizzes", slug, mode],
    queryFn: () => fetchQuizzes(slug, mode),
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return false;
      }

      return failureCount < 1;
    },
  });
};
