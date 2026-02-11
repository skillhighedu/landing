import { useQuery } from "@tanstack/react-query";
import { fetchProjects } from "../services/demo-projects.service";
import type { ProjectsResponse } from "../types";

export const useProjects = (
  slug: string | undefined

) => {
  return useQuery<ProjectsResponse>({
    queryKey: ["real-projects", slug],
    queryFn: () => fetchProjects(slug!),
    enabled: !!slug,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
