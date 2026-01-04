export interface ProjectSolution {
  reviewState: string;
  isCompleted: boolean;
  submissionLink?: string;
}

export interface Project {
  id: string;
  projectName: string;
  projectLink: string;
  description: string;
  solutions: ProjectSolution[];
}

export interface CourseProjects {
  [courseId: string]: Project[];
}

export const courseProjectsData: CourseProjects = {
  "67691eb73f409fe0a9890a04": [
    {
      id: "1",
      projectName: "AI Chatbot Development",
      projectLink: "https://github.com/skillhighedu/ai-chatbot-project",
      description: "Build an intelligent chatbot using natural language processing and machine learning techniques.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
    {
      id: "2",
      projectName: "Image Classification System",
      projectLink: "https://github.com/skillhighedu/image-classification",
      description: "Create a deep learning model to classify images into different categories using CNNs.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
    {
      id: "3",
      projectName: "Sentiment Analysis Tool",
      projectLink: "https://github.com/skillhighedu/sentiment-analysis",
      description: "Develop a sentiment analysis application using NLP to analyze text data.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
    {
      id: "4",
      projectName: "Recommendation Engine",
      projectLink: "https://github.com/skillhighedu/recommendation-engine",
      description: "Build a recommendation system using collaborative filtering and content-based approaches.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
  ],
  "1": [
    {
      id: "1",
      projectName: "Final Capstone Project",
      projectLink: "https://github.com/skillhighedu/capstone-project",
      description: "Complete a comprehensive project that demonstrates all the skills learned throughout the course.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
    {
      id: "2",
      projectName: "Web Application Development",
      projectLink: "https://github.com/skillhighedu/web-app-project",
      description: "Build a full-stack web application with modern technologies and best practices.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
    {
      id: "3",
      projectName: "Data Visualization Dashboard",
      projectLink: "https://github.com/skillhighedu/data-viz-dashboard",
      description: "Create an interactive dashboard to visualize and analyze complex datasets.",
      solutions: [
        {
          reviewState: "Pending",
          isCompleted: false,
        },
      ],
    },
  ],
};
