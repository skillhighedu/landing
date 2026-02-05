import type { LessonTopic } from "@/types/course";

export interface ActionsProps {
  lessons: LessonTopic[];
  currentLesson: LessonTopic | null;
  onChangeLesson: (lesson: LessonTopic) => void;
  onOpenDiscussion?: () => void;
}
