import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { ContactLead, ContactUsDetails } from "@/types";

export const submitContactLead = async (
  payload: ContactUsDetails,
): Promise<{ message: string; lead?: ContactLead | null }> => {
  try {
    const response = await apiClient.post<ApiResponse<ContactLead>>("/contacts/leads", payload);

    return {
      message: response.data.message ?? "Your message has been sent successfully.",
      lead: response.data.additional ?? response.data.data ?? null,
    };
  } catch (error) {
    throw handleApiError(error);
  }
};

export const sendContactDetails = async (payload: ContactUsDetails): Promise<string> => {
  const response = await submitContactLead(payload);
  return response.message;
};
