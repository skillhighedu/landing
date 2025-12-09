
interface Content {
  id: string;
  contentName: string;
}

interface Module {
  id: string;
  moduleName: string;
  contents?: Content[];
}

export interface CourseCurriculumProps {
  modules: Module[];
}