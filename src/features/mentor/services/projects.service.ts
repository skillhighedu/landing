import api from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { Project } from "../types";

export const fetchMentorProjects = async (courseId: string): Promise<Project[]> => {
  try {
    const res = await api.get<ApiResponse<Project[]>>("/mentors/projects", {
      params: { courseId },
    });
    return res.data.additional!;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};
