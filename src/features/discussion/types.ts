export interface DiscussionTopic {
  title?: string | null;
}

export interface DiscussionQuestion {
  id: string;
  question: string;
  answer: string | null;
  isAnswered: boolean;
  isVerified: boolean;
  studentName: string;
  topicId: string;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  topic?: DiscussionTopic | null;
}

export interface DiscussionQuestionInput {
  question: string;
}
