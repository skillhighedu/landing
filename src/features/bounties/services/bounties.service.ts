import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import type { BountiesResponseData } from "../types";

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
    ApiResponse<BountiesResponseData>
  >(`/course-bounties/course/bounty/${slug}`);
  console.log(res)
  return res.data.additional!;
};
