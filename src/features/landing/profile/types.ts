export type PurchaseDetails = {
  id: string;
  purchaseId: string;
  preRegistrationAmount: number;
  remainingAmount: number;
  isFullPayment: boolean;
  discountAmount: number;
  createdAt: string;
};

export interface Course {
  courseId: string;
  courseName: string;
  courseThumbnail: string;
  slug: string;
  purchaseDetails?: PurchaseDetails;
}

export interface StudentProfile {
  name: string;
  email: string;
  courses: Course[];
}


export interface Student {
    name:string;
    email:string
}