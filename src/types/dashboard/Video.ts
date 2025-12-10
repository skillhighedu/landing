export interface Topic {
  id: string;
  title: string;
  description: string;
  video: string;
  completed?: boolean;
}

export interface TopicsSidebarProps {
  topics: Topic[];
  currentTopic: Topic | null;
  onTopicSelect: (topic: Topic) => void;
  isSidebarOpen?: boolean;
  onClose?: () => void;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  video: string;
  questions?: TopicQuestion[];
}

export interface TopicQuestion {
  studentName: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface VideoPlayerProps {
  currentTopic: Topic | null;
  onPrevious: () => void;
  onNext: () => void;
  isFirstTopic: boolean;
  isLastTopic: boolean;
}
