export interface CurriculumLesson {
  id: string;
  contentName: string;
}

export interface CurriculumModule {
  id: string;
  moduleName: string;
  contents?: CurriculumLesson[];
}

export interface CourseCurriculumProps {
  modules: CurriculumModule[];
}
