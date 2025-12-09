export interface CircularProgressProps {
  value: number;
  color: string;
}

import type { CourseProgress } from "@/data/courseProgress";


export interface ProgressSectionProps {
  progress: CourseProgress;
}