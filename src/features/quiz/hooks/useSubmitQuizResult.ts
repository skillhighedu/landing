import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { SubmitQuizResult, SubmitQuizVars } from "../types";
import { submitQuizResult } from "../services/quiz-services";
import { coursesKeys } from "@/hooks/tanstack/useCourses";

export const useSubmitQuizResult = () => {
  const queryClient = useQueryClient();

  return useMutation<SubmitQuizResult, Error, SubmitQuizVars>({
    mutationKey: ["quiz", "submitResult"],
    mutationFn: ({ quizId, answers }: SubmitQuizVars) =>
      submitQuizResult(quizId, answers),
    onSuccess: async (_, { slug, mode }) => {
      if (mode === "demo") {
        await queryClient.invalidateQueries({
          queryKey: ["demo-course", slug],
        });
        await queryClient.refetchQueries({
          queryKey: ["demo-course", slug],
          type: "active",
        });
        queryClient.removeQueries({
          queryKey: ["demo-course", slug],
          exact: true,
          type: "inactive",
        });
        return;
      }

      await queryClient.invalidateQueries({
        queryKey: coursesKeys.byCourseSlug(slug),
      });
      await queryClient.refetchQueries({
        queryKey: coursesKeys.byCourseSlug(slug),
        type: "active",
      });
      queryClient.removeQueries({
        queryKey: coursesKeys.byCourseSlug(slug),
        exact: true,
        type: "inactive",
      });
    },
  });
};
