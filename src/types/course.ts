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
