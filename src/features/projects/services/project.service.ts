
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import apiClient from "@/config/axiosConfig";
export interface SubmitProjectPayload {
  projectId: string;
  githubLink: string;
  explanation: string;
}

export interface SubmitProjectResponse {
  id: string;
  projectId: string;
  githubLink: string;
  explanation: string;
  reviewState: string;
}

export const submitProjectService = async (
  payload: SubmitProjectPayload
): Promise<SubmitProjectResponse> => {
  try {
    const url = `/projects/submission`;

    const res =
      await apiClient.post<ApiResponse<SubmitProjectResponse>>(url, payload);

    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};


export const updateProjectSubmissionService = async (
  submissionId: string,
  payload: SubmitProjectPayload
): Promise<SubmitProjectResponse> => {
  try {
    const url = `/projects/submission/${submissionId}`;

    const res =
      await apiClient.put<ApiResponse<SubmitProjectResponse>>(url, payload);

    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
