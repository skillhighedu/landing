import type { ProjectItem, ProjectSolution } from "../types";

export const getLatestProjectSolution = (
  project: Pick<ProjectItem, "solutions"> | null | undefined,
): ProjectSolution | null => {
  if (!project?.solutions?.length) {
    return null;
  }

  return (
    project.solutions
      .slice()
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0] ?? null
  );
};
