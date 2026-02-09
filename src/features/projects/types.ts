export interface ProjectItem {
  id: string;
  title: string;
  projectLink: string | null;
  locked: boolean;
}

export interface ProjectsResponse {
  courseId: string;
  projects: ProjectItem[];
  meta: {
    demo: boolean;
    totalProjects: number;
    unlockedProjects: number;
  };
}
