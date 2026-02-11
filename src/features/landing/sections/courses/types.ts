import type { RibbonType } from "@/types/ribbon";


export type Course = {
  id: string;
  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  slug: string;
  ribbon:RibbonType;
};
