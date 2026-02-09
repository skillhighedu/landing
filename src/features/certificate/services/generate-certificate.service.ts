
import { handleApiError } from "@/utils/errorHandler";
import { toast } from "sonner";
import type { CertificateDetails } from "@/types/certificateStore";
import type { ApiResponse } from "@/types";
import api from "@/config/axiosConfig";


export const generateCerticateService = async (
  slug: string,
  navigate: (path: string) => void,
): Promise<CertificateDetails> => {
  try {
    const response = await api.get<ApiResponse<CertificateDetails>>(
      `/certificate/generate-certificate/${slug}`,
    );

    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    toast.success(response.data.message);
    navigate(`/course-dashboard/${slug}/download-certificates`);
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};


export const verifyCertificateService = async (
  cid: string,
): Promise<CertificateDetails> => {
  try {
    const response = await api.get<ApiResponse<CertificateDetails>>(
      `/certificate/verify-certificate/${cid}`,
    );

    if (!response.data.additional) {
      throw new Error("Data is undefined");
    }
    toast.success(response.data.message);
    return response.data.additional;
  } catch (error) {
    throw handleApiError(error);
  }
};
