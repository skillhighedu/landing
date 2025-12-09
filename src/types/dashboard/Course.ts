import type { CourseDetail } from "@/data/courseDetails";

interface Course {
  id: string;
  name: string;
  description: string;
  logo: string;
  alt: string;
}

export interface CourseHeaderProps {
  course: Course;
  details: CourseDetail;
}