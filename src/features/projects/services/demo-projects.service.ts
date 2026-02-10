import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ProjectsResponse } from "../types";


export const fetchDemoProjects = async (
  slug: string,
): Promise<ProjectsResponse> => {
  try {
    const url =
      `/demodashboard/course/${slug}/demo/projects`
     

  const res = await apiClient.get<ApiResponse<ProjectsResponse>>(url);
  console.log(res)
  return res.data.additional!;
  } catch (error) {
    handleApiError(error)
    throw error
  }
};

export const fetchProjects = async (
  slug: string,
): Promise<ProjectsResponse> => {
  try {
    const url =
      `/course-projects/course/${slug}/projects`
     

  const res = await apiClient.get<ApiResponse<ProjectsResponse>>(url);
  console.log(res)
  return res.data.additional!;
  } catch (error) {
    handleApiError(error)
    throw error
  }
};
