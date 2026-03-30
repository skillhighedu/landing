import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchSolutionsByProjectId,
  fetchSubmissionsByCourseId,
  updateSolutionReviewStateService,
} from "../services/solutions.service";
import { MENTOR_PROJECTS_KEY } from "./projectHook";
import type { PaginatedSubmissions, Project, Solution } from "../types";

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

  const applyReviewState = (
    solution: Solution,
    reviewState: string,
    reviewNotes?: string,
  ): Solution => ({
    ...solution,
    reviewState: reviewState as Solution["reviewState"],
    reviewNotes: reviewNotes ?? null,
  });

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

    onSuccess: (updated, variables) => {
      queryClient.setQueryData<Solution[]>(
        ["project-solutions", projectId],
        (previous) =>
          previous?.map((solution) =>
            solution.id === variables.solutionId
              ? applyReviewState(
                  solution,
                  updated.reviewState,
                  updated.reviewNotes ?? undefined,
                )
              : solution,
          ) ?? previous,
      );

      queryClient.setQueryData<Project[]>(
        MENTOR_PROJECTS_KEY,
        (previous) =>
          previous?.map((project) =>
            project.id === projectId
              ? {
                  ...project,
                  solutions: project.solutions.map((solution) =>
                    solution.id === variables.solutionId
                      ? applyReviewState(
                          solution,
                          updated.reviewState,
                          updated.reviewNotes ?? undefined,
                        )
                      : solution,
                  ),
                }
              : project,
          ) ?? previous,
      );

      queryClient.setQueriesData<PaginatedSubmissions>(
        { queryKey: ["course-submissions"] },
        (previous) =>
          previous
            ? {
                ...previous,
                submissions: previous.submissions.map((submission) =>
                  submission.id === variables.solutionId
                    ? applyReviewState(
                        submission,
                        updated.reviewState,
                        updated.reviewNotes ?? undefined,
                      )
                    : submission,
                ),
              }
            : previous,
      );

      queryClient.invalidateQueries({ queryKey: ["project-solutions", projectId] });
      queryClient.invalidateQueries({ queryKey: MENTOR_PROJECTS_KEY });
      queryClient.invalidateQueries({ queryKey: ["course-submissions"] });
    },
  });
};
