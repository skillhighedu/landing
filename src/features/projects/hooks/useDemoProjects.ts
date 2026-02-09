import { useQuery } from "@tanstack/react-query";
import { fetchDemoProjects } from "../services/demo-projects.service";
import type { ProjectsResponse } from "../types";

export const useDemoProjects = (
  slug: string,
  mode: "demo" | "real"
) => {
  return useQuery<ProjectsResponse>({
    queryKey: ["projects", slug, mode],
    queryFn: () => fetchDemoProjects(slug, mode),
    enabled: !!slug,
  });
};
