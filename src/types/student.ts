export interface LoginPayload {
  email: string;
  password: string;
  role?:string;

}

export interface SignupPayload {
   onVerified: boolean
}


export interface StudentProfile {
  name: string;
  email: string;
  courses: CourseInfo[];
}

export interface CourseInfo {
  courseId: string;
  courseName: string;
  courseDescription: string;
  courseThumbnail: string;
  expiryDate: string;
  enrolledAt: string; 
  purchaseDetails:{
    id: string;
    purchaseId:string;
    preRegistrationAmount:number,
    remainingAmount:number,
    isFullPayment:boolean,
    discountAmount:number,
    createdAt:string
  }
}
