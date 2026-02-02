import type { CourseContent } from '@/types/course';

export interface CurriculumModule {
  moduleName: string;
  contents: CourseContent[];
}
