import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { BlogCardProps, BlogPost } from "../types/types";


export const fetchBlogs = async (): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<BlogCardProps>>("/blogs/blog");
    console.log("RESPONSE: ",response)
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};


export const fetchSpecifiBlog = async (slug:string): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/blogs/blog/${slug}`);
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};



export const fetchCategories = async (): Promise<any> => {
  try {
    const response = await apiClient.get<ApiResponse<BlogPost>>(`/blogs/category`);
    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
