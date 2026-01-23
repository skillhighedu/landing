import apiClient from "@/config/axiosConfig";
import type { ApiResponse, blogsList } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
// import type { ContactUsDetails } from "@/types";

export const fetchBlogs = async (): Promise<blogsList[]> => {
  try {
    const response = await apiClient.get<ApiResponse<blogsList[]>>("/blogs/category");
    console.log(response.data.additional)
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
