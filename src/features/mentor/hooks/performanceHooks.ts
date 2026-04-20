import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchPerformanceByCourseId,
  upsertPerformanceService,
} from "../services/performance.service";

export const PERFORMANCE_KEY = ["performance"] as const;

export const usePerformance = (courseId: string | undefined, page: number, limit: number) =>
  useQuery({
    queryKey: [...PERFORMANCE_KEY, courseId, page, limit],
    queryFn: () => fetchPerformanceByCourseId(courseId!, page, limit),
    enabled: Boolean(courseId),
    staleTime: 2 * 60 * 1000,
  });

export const useUpsertPerformance = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      percentage,
      courseId,
    }: {
      userId: string;
      percentage: number;
      courseId: string;
    }) => upsertPerformanceService(userId, percentage, courseId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PERFORMANCE_KEY,
      });
    },
  });
};
