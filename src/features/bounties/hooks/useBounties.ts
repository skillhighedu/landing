import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  applyToBounty,
  cancelBountyApplication,
  fetchAppliedBounties,
  fetchBounties,
  fetchDemoBounties,
  submitBountyWork,
} from "../services/bounties.service";
import type {
  AppliedBounty,
  ApplyBountyPayload,
  BountiesResponseData,
  CancelBountyApplicationPayload,
  SubmitBountyPayload,
} from "../types";

export const useDemoBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["demo-bounties", slug],
    queryFn: () => fetchDemoBounties(slug!),
    enabled: !!slug,
  });
};

export const useBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["real-bounties", slug],
    queryFn: () => fetchBounties(slug!),
    enabled: !!slug,
  });
};

export const useAppliedBounties = (courseId?: string) => {
  return useQuery<AppliedBounty[]>({
    queryKey: ["applied-bounties", courseId],
    queryFn: () => fetchAppliedBounties(courseId!),
    enabled: !!courseId,
  });
};

export const useApplyBounty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ApplyBountyPayload) => applyToBounty(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["real-bounties"] });
      queryClient.invalidateQueries({
        queryKey: ["applied-bounties", variables.courseId],
      });
      toast.success("Bounty application submitted.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to apply for bounty.");
    },
  });
};

export const useCancelBountyApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      courseId,
    }: {
      payload: CancelBountyApplicationPayload;
      courseId: string;
    }) => cancelBountyApplication(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["real-bounties"] });
      queryClient.invalidateQueries({
        queryKey: ["applied-bounties", variables.courseId],
      });
      toast.success("Bounty application cancelled.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to cancel application.");
    },
  });
};

export const useSubmitBountyWork = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      payload,
      courseId,
    }: {
      payload: SubmitBountyPayload;
      courseId: string;
    }) => submitBountyWork(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["real-bounties"] });
      queryClient.invalidateQueries({
        queryKey: ["applied-bounties", variables.courseId],
      });
      toast.success("Bounty work submitted successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to submit bounty work.");
    },
  });
};
