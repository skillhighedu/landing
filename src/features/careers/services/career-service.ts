import apiClient from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import type { BackendCareerJob, CareerJob } from "../types";

function normalizeList(value: string[] | string | null | undefined): string[] {
  if (!value) return [];

  if (Array.isArray(value)) {
    return value.map((item) => item.trim()).filter(Boolean);
  }

  return value
    .split(/\r?\n|•|-/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeCareerJob(job: BackendCareerJob): CareerJob {
  return {
    id: job.id,
    roleName: job.roleName?.trim() || "Open Role",
    location: job.location?.trim() || "Remote / Flexible",
    type: job.type?.trim() || "Full Time",
    experience: job.experience?.trim() || "Not specified",
    jobDescription: job.jobDescription?.trim() || "Details will be shared during the application process.",
    responsibilities: normalizeList(job.responsibilities),
    requirements: normalizeList(job.requirements),
    applicationLink: job.applicationLink?.trim() || "#",
  };
}

export const fetchCareers = async (): Promise<CareerJob[]> => {
  try {
    const response = await apiClient.get<ApiResponse<BackendCareerJob[]>>("/careers/career");
    const jobs = response.data.additional ?? response.data.data ?? [];
    return jobs
      .map(normalizeCareerJob)
      .filter((job) => job.applicationLink && job.applicationLink !== "#");
  } catch (error) {
    throw handleApiError(error);
  }
};
