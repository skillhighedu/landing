import { useMutation, useQuery, useQueryClient,  } from "@tanstack/react-query";
import { cancelBounty, fetchBounties, fetchDemoBounties, submitBounty } from "../services/bounties.service";
import type { BountiesResponseData, Mode, SubmitBountyPayload } from "../types";

// export const useDemoBounties = (slug?: string, ) => {
//   return useQuery<BountiesResponseData>({
//     queryKey: ["demoBounties", slug],
//     queryFn: () => fetchDemoBounties(slug!),
//     enabled: !!slug,
//   });
// };


export const useAppliedBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["bounties", slug],
    queryFn: () => fetchBounties(slug!),
    enabled: !!slug,
  });
};

// export const useBounties = (slug?: string, options?: UseQueryOptions<BountiesResponseData>) => {
//   return useQuery<BountiesResponseData>({
//     queryKey: ["bounties", slug],
//     queryFn: () => fetchBounties(slug!),
//     enabled: !!slug,
//     ...options
//   });
// };

export const useCourseBounties = (slug?: string, mode?: Mode) => {
  return useQuery({
    queryKey: ["bounties", slug, mode],
    queryFn: () =>
      mode === "demo"
        ? fetchDemoBounties(slug!)
        : fetchBounties(slug!),
    enabled: !!slug && !!mode,
  });
};


export const useSubmitBounty = (slug?: string, mode?: Mode) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SubmitBountyPayload }) =>
      submitBounty(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties", slug, mode] });
      queryClient.invalidateQueries({ queryKey: ["submitted-bounties", slug, mode] });
      queryClient.invalidateQueries({ queryKey: ["applied-bounties", slug, mode] });
    },
  });
};

export const useCancelBounty = (slug?: string, mode?: Mode) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => cancelBounty(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bounties", slug, mode] });
      queryClient.invalidateQueries({ queryKey: ["submitted-bounties", slug, mode] });
      queryClient.invalidateQueries({ queryKey: ["applied-bounties", slug, mode] });
    },
  });
};