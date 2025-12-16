export interface Course {
  uuid: string | null;
  courseName: string;
  slug: string;
  courseDescription: string;
  courseThumbnail: string;
 
}

export interface Department {
  uuid: string;
  departmentName: string;
  courses: Course[];
}


export interface CourseContent {
  contentName: string;
}

export interface CourseModule {
  moduleName: string;
  contents: CourseContent[];
}

export interface SelectedCourse {
  id: string ;
  uuid: string | null;
  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  pricingType:string;
  modules: CourseModule[];
  tools: SelectedCourseTools[];
}


export interface FormatedCourses {
  id: string ;
  courseName: string;
  slug:string;
  courseDescription: string;
  courseThumbnail: string;
  departmentName: string;

}


export interface SelectedCourseTool {
  toolName: string;
  toolImage: string;
}

export type SelectedCourseTools = SelectedCourseTool[];



export interface Topic {
  id: string;
}

export interface Course {
  id: string;
  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  courseCount: number;
  topicCount: number;
  topic: Topic[];
}

export interface Contents {
  id: string;
  contentName: string;
}

export interface Module {
  id: string;
  moduleName: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  contents: Contents[];
}

export interface CourseData {
  courseName: string;
  courseThumbnail: string;
  totalTopicsCount: number;
  modules: Module[];
}

export interface SelectedCourse {
  courseData: CourseData;
  topicProgress: number;
  projectProgress: number;
  quizProgress: number;
}


export interface LessonTopic {
  id: string;
  title: string;
  description: string;
  pptLink: string;
  video: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseDetails {
  id: string;
  name: string;

}

export interface LessonsMeta {
  totalLessons: number;
}
export interface LessonsResponse {
  courseDetails: CourseDetails;
  courseLessons: LessonTopic[];
  meta: LessonsMeta;
}
