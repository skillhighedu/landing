
import type { CourseLesson } from "../../types";

export interface ActionsProps {
  lessons: CourseLesson[];
  currentLesson: CourseLesson | null;
  onChangeLesson: (lesson: CourseLesson) => void;
  onOpenDiscussion?: () => void;
}
