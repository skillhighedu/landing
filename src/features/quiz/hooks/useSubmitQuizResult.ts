import { useMutation } from "@tanstack/react-query";
import type { SubmitQuizResult, SubmitQuizVars } from "../types";
import { submitQuizResult } from "../services/quiz-services";

export const useSubmitQuizResult = () => {
  return useMutation<SubmitQuizResult, Error, SubmitQuizVars>({
    mutationKey: ["quiz", "submitResult"],
    mutationFn: ({ quizId, answers }: SubmitQuizVars) =>
      submitQuizResult(quizId, answers),
  });
};