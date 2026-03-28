import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import type { BountiesResponseData, Bounty } from "../types";

type RawBounty = Omit<Bounty, "applicationCount" | "locked"> & {
  applications?: unknown[];
  submissions?: unknown[];
};

const normalizeRealBounty = (bounty: RawBounty): Bounty => ({
  id: bounty.id,
  name: bounty.name,
  description: bounty.description,
  slots: bounty.slots,
  isSlotsAvailable: bounty.isSlotsAvailable,
  amount: bounty.amount,
  status: bounty.status,
  type: bounty.type,
  expiryDate: bounty.expiryDate,
  createdAt: bounty.createdAt,
  link: bounty.link,
  locked: false,
  applicationCount: String(bounty.applications?.length ?? 0),
});

export const fetchDemoBounties = async (
  slug: string
): Promise<BountiesResponseData> => {
  const res = await apiClient.get<
    ApiResponse<BountiesResponseData>
  >(`/demodashboard/course/${slug}/demo/bounties`);

  return res.data.additional!;
};


export const fetchBounties = async (
  slug: string
): Promise<BountiesResponseData> => {
  const res = await apiClient.get<
    ApiResponse<{
      courseId: string;
      bounties: RawBounty[];
      meta: BountiesResponseData["meta"];
    }>
  >(`/course-bounties/course/bounty/${slug}`);

  const data = res.data.additional!;

  return {
    ...data,
    bounties: data.bounties.map(normalizeRealBounty),
  };
};
