import apiClient from "@/config/axiosConfig";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiResponse } from "@/types";
import type {
  AppliedBounty,
  ApplyBountyPayload,
  BountiesResponseData,
  Bounty,
  CancelBountyApplicationPayload,
  SubmitBountyPayload,
} from "../types";

type RawBounty = Omit<Bounty, "applicationCount" | "locked"> & {
  applications?: unknown[];
  submissions?: unknown[];
};

type RawAppliedBounty = {
  id: string;
  bountyId: string;
  name: string;
  description: string;
  link: string | null;
  amount: number;
  type: string;
  expiryDate: string;
  isBountyAwarded?: boolean | null;
  submittedLink?: string | null;
  status?: string | null;
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

const normalizeAppliedBounty = (bounty: RawAppliedBounty): AppliedBounty => ({
  id: bounty.id,
  bountyId: bounty.bountyId,
  name: bounty.name,
  description: bounty.description,
  link: bounty.link,
  amount: Number(bounty.amount || 0),
  type: bounty.type,
  expiryDate: bounty.expiryDate,
  isBountyAwarded: bounty.isBountyAwarded ?? null,
  submittedLink: bounty.submittedLink ?? null,
  status: bounty.status ?? null,
});

export const fetchDemoBounties = async (
  slug: string,
): Promise<BountiesResponseData> => {
  try {
    const res = await apiClient.get<ApiResponse<BountiesResponseData>>(
      `/demodashboard/course/${slug}/demo/bounties`,
    );

    return res.data.additional!;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchBounties = async (
  slug: string,
): Promise<BountiesResponseData> => {
  try {
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
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const fetchAppliedBounties = async (
  courseId: string,
): Promise<AppliedBounty[]> => {
  try {
    const res = await apiClient.get<ApiResponse<RawAppliedBounty[]>>(
      `/course-bounties/bounty-application/${courseId}`,
    );

    return (res.data.additional ?? []).map(normalizeAppliedBounty);
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const applyToBounty = async ({
  bountyId,
  courseId,
}: ApplyBountyPayload) => {
  try {
    const res = await apiClient.post<ApiResponse<{ id: string }>>(
      `/course-bounties/bounty-application/${bountyId}`,
      { courseId },
    );

    return res.data.additional;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const cancelBountyApplication = async ({
  applicationId,
  bountyId,
}: CancelBountyApplicationPayload) => {
  try {
    const res = await apiClient.delete<ApiResponse<{ id: string }>>(
      `/course-bounties/cancel-application/${applicationId}`,
      {
        data: { bountyId },
      },
    );

    return res.data.additional;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};

export const submitBountyWork = async ({
  bountyId,
  applicationId,
  submittedLink,
  notes,
}: SubmitBountyPayload) => {
  try {
    const res = await apiClient.post<ApiResponse<{ id: string }>>(
      `/course-bounties/submit-bounty/${bountyId}`,
      {
        applicationId,
        submittedLink,
        notes,
      },
    );

    return res.data.additional;
  } catch (error) {
    throw new Error(handleApiError(error));
  }
};
