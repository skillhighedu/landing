
import api from "@/config/axiosConfig";
import { handleApiError } from "@/utils/errorHandler";
import type { ApiResponse } from "@/types";

type MentorLoginPayload = { email: string; password: string };
type MentorLoginResponse = ApiResponse<{ role: string }>;

export const mentorLoginService = async (
  payload: MentorLoginPayload
): Promise<MentorLoginResponse> => {
  try {
    const res = await api.post<MentorLoginResponse>("/mentors/login", payload);
    return res.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

