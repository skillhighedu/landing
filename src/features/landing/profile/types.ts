export interface Student {
  name: string;
  email: string;
}

export interface Course {
  courseId: string;
  courseName: string;
  courseThumbnail: string;
  slug: string;
}

export interface StudentProfile {
  courses: Course[];
}
