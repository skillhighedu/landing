

export type Project = {
  id: string;
  projectName: string;
  projectLink: string;
  solutions: Solution[];
};



export type Solution = {
  id: string;
  projectId: string;
  projectName?: string;
  explanation: string;
  githubLink: string;
  isCompleted: boolean;
  reviewState: "REVIEWING" | "SUCCESSFUL" | "FAILED";
  reviewNotes?: string | null;
  userId: string;
  userName: string;
  userEmail?: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type PaginatedSubmissions = {
  submissions: Solution[];
  pagination: PaginationMeta;
};

export type StudentPerformance = {
  id: string | null;
  userId: string;
  name: string;
  email: string;
  percentage: number;
  rank: number;
  submittedProjectsCount?: number;
  completedProjectsCount?: number;
  completedTopicsCount?: number;
  completedQuizCount?: number;
  submittedProjects?: Array<{
    solutionId: string;
    projectId: string;
    projectName: string;
    githubLink: string;
    isCompleted: boolean;
    reviewState: "REVIEWING" | "SUCCESSFUL" | "FAILED";
    submittedAt: string;
  }>;
  createdAt: string | null;
  updatedAt: string | null;
};

export type PaginatedStudentPerformance = {
  students: StudentPerformance[];
  pagination: PaginationMeta;
};

export type MentorQuestion = {
  id: string;
  question: string;
  answer?: string | null;
  isAnswered: boolean;
  isVerified: boolean;
  studentName?: string | null;
  topicId?: string | null;
  topicTitle?: string | null;
  topic?: {
    title?: string | null;
  } | null;
  createdAt: string;
  updatedAt?: string;
};

export type MentorProfile = {
  id: string;
  mentorName: string;
  email: string;
  role: string;
  courseId?: string | null;
  courseName?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type MentorProjectState = {
  projectName: string;
  projectLink: string;
  id: string;
};
