import api from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { StudentPerformance } from "../types";

export const fetchPerformanceByCourseId = async (): Promise<StudentPerformance[]> => {
  try {
    const res = await api.get<ApiResponse<StudentPerformance[]>>("/mentors/courses/performance");
    return res.data.additional ?? [];
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const upsertPerformanceService = async (
  userId: string,
  percentage: number
): Promise<void> => {
  try {
    await api.post("/mentors/student/update/performance", { userId, percentage });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
