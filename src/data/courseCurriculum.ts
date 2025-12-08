export interface CurriculumContent {
  id: string;
  contentName: string;
}



export interface CurriculumModule {
  id: string;
  moduleName: string;
  contents?: CurriculumContent[];
}



export interface CourseCurriculum {
  [courseId: string]: CurriculumModule[];
}



export const courseCurriculumData: CourseCurriculum = {
  "67691eb73f409fe0a9890a04": [
    {
      id: "1",
      moduleName: "Introduction to AI",
      contents: [
        { id: "1-1", contentName: "What is Artificial Intelligence?" },
        { id: "1-2", contentName: "History and Evolution of AI" },
        { id: "1-3", contentName: "Types of AI Systems" },
      ],
    },
    {
      id: "2",
      moduleName: "Machine Learning Basics",
      contents: [
        { id: "2-1", contentName: "Supervised Learning" },
        { id: "2-2", contentName: "Unsupervised Learning" },
        { id: "2-3", contentName: "Reinforcement Learning" },
      ],
    },
    {
      id: "3",
      moduleName: "Deep Learning",
      contents: [
        { id: "3-1", contentName: "Neural Networks Fundamentals" },
        { id: "3-2", contentName: "CNNs and Image Recognition" },
        { id: "3-3", contentName: "RNNs and NLP" },
      ],
    },
    {
      id: "4",
      moduleName: "AI Tools & Frameworks",
      contents: [
        { id: "4-1", contentName: "TensorFlow Basics" },
        { id: "4-2", contentName: "PyTorch Introduction" },
        { id: "4-3", contentName: "Scikit-learn for ML" },
      ],
    },
    {
      id: "5",
      moduleName: "Computer Vision",
      contents: [
        { id: "5-1", contentName: "Image Processing" },
        { id: "5-2", contentName: "Object Detection" },
        { id: "5-3", contentName: "Face Recognition" },
      ],
    },
    {
      id: "6",
      moduleName: "Natural Language Processing",
      contents: [
        { id: "6-1", contentName: "Text Processing" },
        { id: "6-2", contentName: "Sentiment Analysis" },
        { id: "6-3", contentName: "Language Models" },
      ],
    },
  ],
  "1": [
    {
      id: "1",
      moduleName: "Getting Started",
      contents: [
        { id: "1-1", contentName: "Course Overview" },
        { id: "1-2", contentName: "Setup Development Environment" },
        { id: "1-3", contentName: "Your First Project" },
      ],
    },
    {
      id: "2",
      moduleName: "Core Concepts",
      contents: [
        { id: "2-1", contentName: "Fundamental Principles" },
        { id: "2-2", contentName: "Best Practices" },
        { id: "2-3", contentName: "Common Patterns" },
      ],
    },
    {
      id: "3",
      moduleName: "Advanced Topics",
      contents: [
        { id: "3-1", contentName: "Optimization Techniques" },
        { id: "3-2", contentName: "Real-world Applications" },
        { id: "3-3", contentName: "Industry Standards" },
      ],
    },
  ],
};


