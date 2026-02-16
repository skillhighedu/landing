import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitProjectService,
  updateProjectSubmissionService,
  type SubmitProjectPayload,
} from "../services/project.service";

export function useSubmitProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitProjectPayload) => submitProjectService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}

export function useUpdateProjectSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      payload,
    }: {
      submissionId: string;
      payload: SubmitProjectPayload;
    }) => updateProjectSubmissionService(submissionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
}
