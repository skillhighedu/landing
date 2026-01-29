// Core Course type (used everywhere)
export type Course = {
  id: string;
  slug: string;

  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  isTopSelling:boolean;

  level?: "beginner" | "intermediate" | "advanced";
  duration?: string; // e.g. "6 weeks", "30 hours"
  price?: number;
  discountedPrice?: number;

  isActive?: boolean;
  createdAt?: string;
};
