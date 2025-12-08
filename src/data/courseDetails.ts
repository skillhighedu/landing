export interface CourseDetail {
  instructor: string;
  duration: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  students: string;
  rating: string;
  description: string;
  skills: string[];
  totalTopicsCount?: number;
}

export interface CourseDetailsMap {
  [courseId: string]: CourseDetail;
}

export const courseDetailsData: CourseDetailsMap = {
  "1": {
    instructor: "Dr. Sarah Johnson",
    duration: "12 Weeks",
    level: "Advanced",
    students: "2,543",
    rating: "4.8",
    description: "Master the fundamentals and advanced concepts of Artificial Intelligence and Machine Learning. Learn to build intelligent systems from scratch.",
    skills: ["Python", "TensorFlow", "Neural Networks", "Deep Learning", "Computer Vision", "NLP"]
  },
  "2": {
    instructor: "Eng. Michael Chen",
    duration: "8 Weeks",
    level: "Beginner",
    students: "1,892",
    rating: "4.7",
    description: "Learn professional 2D and 3D CAD design with AutoCAD. Perfect for architects, engineers, and designers.",
    skills: ["2D Drafting", "3D Modeling", "Technical Drawing", "AutoCAD Tools", "Design Standards"]
  },
  "3": {
    instructor: "Prof. Emily Roberts",
    duration: "10 Weeks",
    level: "Intermediate",
    students: "3,124",
    rating: "4.9",
    description: "Transform raw data into actionable insights using industry-standard analytics tools and techniques.",
    skills: ["Python", "SQL", "Tableau", "Excel", "Data Visualization", "Statistical Analysis"]
  }
};
