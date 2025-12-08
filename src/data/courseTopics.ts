export interface Topic {
  id: string;
  title: string;
  description: string;
  video: string;
  completed?: boolean;
  questions?: TopicQuestion[];
}

export interface TopicQuestion {
  studentName: string;
  question: string;
  answer: string;
  createdAt: string;
}

export interface CourseTopics {
  [courseId: string]: Topic[];
}

export const courseTopicsData: CourseTopics = {
  "67691eb73f409fe0a9890a04": [
    {
      id: "1",
      title: "Introduction to AI",
      description: "Get started with the fundamentals of Artificial Intelligence, including its history, applications, and basic concepts.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "2",
      title: "Machine Learning Basics",
      description: "Learn the core concepts of machine learning, including supervised and unsupervised learning algorithms.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "3",
      title: "Neural Networks",
      description: "Deep dive into neural networks, understanding how they work and their role in deep learning.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "4",
      title: "Computer Vision Fundamentals",
      description: "Explore the basics of computer vision, image processing, and object detection techniques.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "5",
      title: "Natural Language Processing",
      description: "Learn how machines understand and process human language through NLP techniques.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "6",
      title: "AI Tools & Frameworks",
      description: "Get hands-on with popular AI frameworks like TensorFlow, PyTorch, and scikit-learn.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "7",
      title: "Deep Learning Advanced",
      description: "Advanced concepts in deep learning including CNNs, RNNs, and transformers.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "8",
      title: "AI Ethics & Future",
      description: "Understand the ethical considerations in AI development and explore future trends.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "9",
      title: "Reinforcement Learning",
      description: "Discover how agents learn to make decisions through trial and error in reinforcement learning.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "10",
      title: "Generative AI Models",
      description: "Explore generative models like GANs and VAEs for creating new content.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "11",
      title: "Model Optimization",
      description: "Learn techniques to optimize AI models for better performance and efficiency.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "12",
      title: "AI in Production",
      description: "Deploy AI models to production environments and learn MLOps best practices.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "13",
      title: "Transfer Learning",
      description: "Leverage pre-trained models and apply transfer learning to new tasks.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "14",
      title: "AI Model Evaluation",
      description: "Master techniques for evaluating and validating AI model performance.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "15",
      title: "AI Security & Privacy",
      description: "Understand security challenges and privacy concerns in AI systems.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "16",
      title: "AI Capstone Project",
      description: "Apply everything you've learned in a comprehensive end-to-end AI project.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
  ],
  "1": [
    {
      id: "1",
      title: "Getting Started",
      description: "Introduction to the course and overview of what you'll learn throughout this program.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "2",
      title: "Core Concepts",
      description: "Learn the fundamental concepts that form the foundation of this subject.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "3",
      title: "Advanced Topics",
      description: "Dive deeper into advanced topics and complex scenarios.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "4",
      title: "Practical Applications",
      description: "Apply what you've learned through real-world examples and projects.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
    {
      id: "5",
      title: "Final Project",
      description: "Put your skills to the test with a comprehensive final project.",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      completed: false,
      questions: [],
    },
  ],
};
