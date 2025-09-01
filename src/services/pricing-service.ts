import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types/api";
import { handleApiError } from "@/utils/errorHandler";
import type { FormattedPricing } from "@/types";

export const fetchPricings = async (): Promise<FormattedPricing[]> => {
  try {
    const response = await apiClient.get<ApiResponse<FormattedPricing[]>>("/pricings/pricing");

    return response.data.additional ?? []
  } catch (error) {
    throw handleApiError(error);
  }
};
