import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCourseQuestion,
  deleteCourseQuestion,
  fetchCourseQuestions,
  updateCourseQuestion,
} from "../services/discussion-service";

export const discussionKeys = {
  all: (slug: string) => ["course-discussion", slug] as const,
};

export function useLessonDiscussion(slug: string, enabled = true) {
  return useQuery({
    queryKey: discussionKeys.all(slug),
    queryFn: () => fetchCourseQuestions(slug),
    enabled: Boolean(slug) && enabled,
  });
}

export function useCreateLessonQuestion(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ topicId, question }: { topicId: string; question: string }) =>
      createCourseQuestion(slug, topicId, { question }),
    onSuccess: async ({ message }) => {
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: discussionKeys.all(slug) });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to post question.");
    },
  });
}

export function useUpdateLessonQuestion(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId, question }: { questionId: string; question: string }) =>
      updateCourseQuestion(slug, questionId, { question }),
    onSuccess: async ({ message }) => {
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: discussionKeys.all(slug) });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update question.");
    },
  });
}

export function useDeleteLessonQuestion(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ questionId }: { questionId: string }) => deleteCourseQuestion(slug, questionId),
    onSuccess: async ({ message }) => {
      toast.success(message);
      await queryClient.invalidateQueries({ queryKey: discussionKeys.all(slug) });
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete question.");
    },
  });
}
