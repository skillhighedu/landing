import api from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { Solution, PaginatedSubmissions } from "../types";

export const fetchSolutionsByProjectId = async (
  projectId: string
): Promise<Solution[]> => {
  try {
    const res = await api.get<ApiResponse<Solution[]>>(
      `/mentors/projects/solutions/${projectId}`
    );
    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const fetchSubmissionsByCourseId = async (
  courseId: string,
  page = 1,
  limit = 10,
  reviewState?: string
): Promise<PaginatedSubmissions> => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(reviewState ? { reviewState } : {}),
    });
    const res = await api.get<ApiResponse<PaginatedSubmissions>>(
      `/mentors/courses/${courseId}/submissions?${params}`
    );
    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};



export const updateSolutionReviewStateService = async (
  solutionId: string,
  reviewState: string,
  reviewNotes?: string
): Promise<{ id: string; reviewState: string; reviewNotes?: string | null }> => {
  try {
    const res = await api.put(`/mentors/solutions/${solutionId}/review`, {
      reviewState,
      reviewNotes,
    });
    return res.data.additional;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};