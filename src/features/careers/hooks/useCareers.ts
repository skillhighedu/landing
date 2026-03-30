import { useQuery } from "@tanstack/react-query";
import { fetchCareers } from "../services/career-service";

export const careerKeys = {
  all: ["careers"] as const,
};

export function useCareers() {
  return useQuery({
    queryKey: careerKeys.all,
    queryFn: fetchCareers,
  });
}
