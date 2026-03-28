import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSolutionsByProjectId,
  fetchSubmissionsByCourseId,
  updateSolutionReviewStateService,
} from "../services/solutions.service";

export const useSolutionsByProject = (projectId: string) =>
  useQuery({
    queryKey: ["project-solutions", projectId],
    queryFn: () => fetchSolutionsByProjectId(projectId),
    enabled: !!projectId,
    staleTime: 2 * 60 * 1000,
  });

export const useSubmissionsByCourse = (
  courseId: string,
  page: number,
  limit: number,
  reviewState?: string
) =>
  useQuery({
    queryKey: ["course-submissions", courseId, page, limit, reviewState],
    queryFn: () => fetchSubmissionsByCourseId(courseId, page, limit, reviewState),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000,
    placeholderData: (prev) => prev,
  });

export const useUpdateReviewState = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      solutionId,
      reviewState,
      reviewNotes,
    }: {
      solutionId: string;
      reviewState: string;
      reviewNotes?: string;
    }) => updateSolutionReviewStateService(solutionId, reviewState, reviewNotes),

    onSuccess: () => {
      // invalidate both caches so list + page both refresh
      queryClient.invalidateQueries({ queryKey: ["project-solutions", projectId] });
      queryClient.invalidateQueries({ queryKey: ["mentor-projects"] });
    },
  });
};