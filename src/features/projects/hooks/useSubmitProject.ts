import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  submitProjectService,
  updateProjectSubmissionService,
  type SubmitProjectPayload,
  type UpdateProjectPayload,
} from "../services/project.service";
import { toast } from "sonner";

export function useSubmitProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SubmitProjectPayload) => submitProjectService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["real-projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["demo-projects"],
      });
      toast.success("Project submitted successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit project.");
    },
  });
}

export function useUpdateProjectSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProjectPayload) =>
      updateProjectSubmissionService(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["real-projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["demo-projects"],
      });
      toast.success("Project submission updated successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to update project submission.");
    },
  });
}
