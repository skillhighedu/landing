import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import type { BountiesResponseData, Bounty, SubmitBountyPayload } from "../types";

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
//   console.log(res)
  return res.data.additional!;
};



export const submitBounty = async (
  id: string,
  payload: SubmitBountyPayload,
): Promise<Bounty> => {
  if (!id) throw new Error("Bounty id is required");
  if (!payload?.submittedLink?.trim()) throw new Error("submittedLink is required");

  const res = await apiClient.post<ApiResponse<Bounty>>(
    `/course-bounties/submit-bounty/${id}`,
    {
      notes: payload.notes ?? "",
      submittedLink: payload.submittedLink.trim(),
      applicationId: payload.applicationId,
    },
  );

  return res.data.additional!;
}

export const cancelBounty = async (
  id: string
): Promise<Bounty> => {
  const res = await apiClient.delete<
    ApiResponse<Bounty>
  >(`/course-bounties/cancel-application/${id}`);
//   console.log(res)
  return res.data.additional!;
};

