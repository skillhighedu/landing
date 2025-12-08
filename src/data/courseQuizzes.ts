export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: number;
  duration: number;
  difficulty: "Easy" | "Medium" | "Hard";
  completed: boolean;
  score?: number;
}

export interface CourseQuizzes {
  [courseId: string]: Quiz[];
}

export const courseQuizzesData: CourseQuizzes = {
  "67691eb73f409fe0a9890a04": [
    {
      id: "1",
      title: "Introduction to AI",
      description: "Test your knowledge on AI fundamentals and basic concepts",
      questions: 10,
      duration: 15,
      difficulty: "Easy",
      completed: true,
      score: 85,
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      description: "Quiz on supervised and unsupervised learning techniques",
      questions: 15,
      duration: 20,
      difficulty: "Medium",
      completed: true,
      score: 92,
    },
    {
      id: "3",
      title: "Deep Learning Fundamentals",
      description: "Test your understanding of neural networks and deep learning",
      questions: 12,
      duration: 18,
      difficulty: "Medium",
      completed: false,
    },
    {
      id: "4",
      title: "Computer Vision",
      description: "Quiz on image processing and computer vision concepts",
      questions: 20,
      duration: 25,
      difficulty: "Hard",
      completed: false,
    },
    {
      id: "5",
      title: "Natural Language Processing",
      description: "Test your knowledge on NLP and text processing and computing",
      questions: 18,
      duration: 22,
      difficulty: "Hard",
      completed: false,
    },
    {
      id: "6",
      title: "AI Tools & Frameworks",
      description: "Assessment on TensorFlow, PyTorch, and scikit-learn",
      questions: 14,
      duration: 20,
      difficulty: "Medium",
      completed: false,
    },
  ],
  "1": [
    {
      id: "1",
      title: "Getting Started Quiz",
      description: "Test your understanding of the course fundamentals",
      questions: 10,
      duration: 15,
      difficulty: "Easy",
      completed: false,
    },
    {
      id: "2",
      title: "Core Concepts Assessment",
      description: "Evaluate your knowledge of key principles",
      questions: 15,
      duration: 20,
      difficulty: "Medium",
      completed: false,
    },
    {
      id: "3",
      title: "Advanced Topics Quiz",
      description: "Challenge yourself with advanced concepts",
      questions: 20,
      duration: 25,
      difficulty: "Hard",
      completed: false,
    },
  ],
};
