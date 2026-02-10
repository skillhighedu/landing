import { useQuery } from "@tanstack/react-query";
import { fetchBounties, fetchDemoBounties } from "../services/bounties.service";
import type { BountiesResponseData } from "../types";

export const useDemoBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["demoBounties", slug],
    queryFn: () => fetchDemoBounties(slug!),
    enabled: !!slug,
  });
};


export const useAppliedBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["bounties", slug],
    queryFn: () => fetchBounties(slug!),
    enabled: !!slug,
  });
};

export const useBounties = (slug?: string) => {
  return useQuery<BountiesResponseData>({
    queryKey: ["bounties", slug],
    queryFn: () => fetchBounties(slug!),
    enabled: !!slug,
  });
};