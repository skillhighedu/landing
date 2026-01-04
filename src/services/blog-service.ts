import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";


export const fetchBlogs = async (): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<any>>("/blogs/blog");
    console.log(response.data.additional)
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
