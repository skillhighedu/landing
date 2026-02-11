export interface CourseDetails {
  id: string;
  name: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string | null;
  video: string | null;
  locked?: boolean;
}

export interface LessonsMeta {
  totalLessons: number;
  unlockedLessons: number;
  demo: boolean;
}

export interface LessonsResponse {
  courseDetails: CourseDetails;
  courseLessons: CourseLesson[];
  meta: LessonsMeta;
}


export type DashboardMode = "demo" | "real";

export interface ProgressData {
  topics: number;
  quizzes: number;
  projects: number;
}

export interface CourseDashboardResponse {
  courseData: {
    courseName: string;
    courseSlug: string;
    courseThumbnail: string;
    description: string;
    totalTopicsCount: number;
    modules: any[];
  };
  topicProgress: number;
  quizProgress: number;
  projectProgress: number;
}
