import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMentorProjects } from "../services/projects.service";

export const MENTOR_PROJECTS_KEY = ["mentor-projects"];

export const useProjects = () =>
  useQuery({
    queryKey: MENTOR_PROJECTS_KEY,
    queryFn: fetchMentorProjects, 
    staleTime: 5 * 60 * 1000,
  });

export const useInvalidateProjects = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: MENTOR_PROJECTS_KEY });
};