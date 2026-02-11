export interface ProjectSolution {
  id: string;
  projectId: string;
  explanation: string;
  githubLink: string;
  isCompleted: boolean;
  reviewState: "SUCCESSFUL" | "FAILED" | "PENDING";
  reviewNotes: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  projectName: string;
  projectLink: string | null;
  locked: boolean;

  difficulty?: string;
  description?: string;
  skills?: string[];
  time?: string;
  // real mode only → optional
  solutions?: ProjectSolution[];
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
