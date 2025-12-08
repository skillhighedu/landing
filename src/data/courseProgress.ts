export interface CourseProgress {
  topicsCompleted: number;
  totalTopics: number;
  quizProgress: number;
  projectProgress: number;
  completedTopics: string[];
  upcomingTopics: string[];
}

export interface ProgressDataMap {
  [courseId: string]: CourseProgress;
}

export const courseProgressData: ProgressDataMap = {
  "1": {
    topicsCompleted: 10,
    totalTopics: 13,
    quizProgress: 100,
    projectProgress: 100,
    completedTopics: [
      "Introduction to AI",
      "Machine Learning Basics",
      "Neural Networks",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Reinforcement Learning",
      "AI Ethics",
      "Model Deployment",
      "Advanced Topics"
    ],
    upcomingTopics: [
      "AI in Production",
      "Scaling AI Systems",
      "Future of AI"
    ]
  },
  "2": {
    topicsCompleted: 8,
    totalTopics: 12,
    quizProgress: 75,
    projectProgress: 50,
    completedTopics: [
      "AutoCAD Interface",
      "Basic Drawing",
      "Editing Tools",
      "Layers & Properties",
      "Annotations",
      "Dimensions",
      "Blocks & Attributes",
      "2D Drafting"
    ],
    upcomingTopics: [
      "3D Modeling",
      "Rendering",
      "Advanced Features",
      "Project Work"
    ]
  },
  "3": {
    topicsCompleted: 15,
    totalTopics: 15,
    quizProgress: 100,
    projectProgress: 100,
    completedTopics: [
      "Data Collection",
      "Data Cleaning",
      "Exploratory Analysis",
      "Statistical Methods",
      "Python for Analytics",
      "Pandas & NumPy",
      "Data Visualization",
      "Excel Advanced",
      "SQL Fundamentals",
      "Tableau Basics",
      "Dashboard Creation",
      "Business Intelligence",
      "Reporting",
      "Case Studies",
      "Final Project"
    ],
    upcomingTopics: []
  }
};
