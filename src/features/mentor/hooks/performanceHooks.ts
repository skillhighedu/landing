import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPerformanceByCourseId,
  upsertPerformanceService,
} from "../services/performance.service";

export const PERFORMANCE_KEY = ["performance"] as const;

export const usePerformance = (page: number, limit: number) =>
  useQuery({
    queryKey: [...PERFORMANCE_KEY, page, limit],
    queryFn: () => fetchPerformanceByCourseId(page, limit),
    staleTime: 2 * 60 * 1000,
  });

export const useUpsertPerformance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, percentage }: { userId: string; percentage: number }) =>
      upsertPerformanceService(userId, percentage),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PERFORMANCE_KEY,
      });
    },
  });
};
