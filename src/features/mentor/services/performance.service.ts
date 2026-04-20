import api from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { PaginatedStudentPerformance } from "../types";

export const fetchPerformanceByCourseId = async (
  courseId: string,
  page = 1,
  limit = 8,
): Promise<PaginatedStudentPerformance> => {
  try {
    const res = await api.get<ApiResponse<PaginatedStudentPerformance>>("/mentors/courses/performance", {
      params: { page, limit, courseId },
    });
    return (
      res.data.additional ?? {
        students: [],
        pagination: {
          total: 0,
          page: 1,
          limit,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        },
      }
    );
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export const upsertPerformanceService = async (
  userId: string,
  percentage: number,
  courseId: string,
): Promise<void> => {
  try {
    await api.post("/mentors/student/update/performance", {
      userId,
      percentage,
      courseId,
    });
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
