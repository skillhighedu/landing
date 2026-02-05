export interface CourseDetails {
  id: string;
  name: string;
}

export interface CourseLesson {
  id: string;
  title: string;
  description: string | null;
  video: string | null;
  locked: boolean;
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
