import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import axios from "axios";
import type { ProjectsResponse } from "../types";

const buildEmptyProjectsResponse = (slug: string, demo: boolean): ProjectsResponse => ({
  courseId: slug,
  projects: [],
  meta: {
    demo,
    totalProjects: 0,
    unlockedProjects: 0,
  },
});

export const fetchDemoProjects = async (
  slug: string,
): Promise<ProjectsResponse> => {
  try {
    const url =
      `/demodashboard/course/${slug}/demo/projects`
     

  const res = await apiClient.get<ApiResponse<ProjectsResponse>>(url);
  return res.data.additional ?? buildEmptyProjectsResponse(slug, true);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return buildEmptyProjectsResponse(slug, true);
    }

    handleApiError(error)
    throw error
  }
};

export const fetchProjects = async (
  slug: string,
): Promise<ProjectsResponse> => {
  try {
    const url =
      `/projects/course/${slug}/projects`
     

  const res = await apiClient.get<ApiResponse<ProjectsResponse>>(url);

  return res.data.additional ?? buildEmptyProjectsResponse(slug, false);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return buildEmptyProjectsResponse(slug, false);
    }

    handleApiError(error)
    throw error
  }
};
