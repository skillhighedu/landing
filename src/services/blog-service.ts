import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ContactUsDetails } from "@/types";

export const fetchBlogs = async (): Promise<FAQ[]> => {
  try {
    const response = await apiClient.get<ApiResponse<FAQ[]>>("/blogs/blog");
    console.log(response.data.additional)
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
