import { useQuery } from "@tanstack/react-query";
import { fetchDemoProjects } from "../services/demo-projects.service";
import type { ProjectsResponse } from "../types";

export const useDemoProjects = (
  slug: string | undefined,
) => {
  return useQuery<ProjectsResponse>({
    queryKey: ["demo-projects", slug],
    queryFn: () => fetchDemoProjects(slug!),
    enabled: !!slug,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
};
