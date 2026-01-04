
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
export interface CourseCurriculumProps {
  modules: Module[];
}