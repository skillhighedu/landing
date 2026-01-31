type RibbonType = 'FEATURED' | 'HIGH DEMAND' | 'TRENDING' | 'POPULAR';

export type Course = {
  id: string;
  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  slug: string;
  ribbon:RibbonType;
};
