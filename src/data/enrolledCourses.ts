import { Courses } from "./course";

export interface EnrolledCourse {
  id: string;
  courseId: string;
  courseName: string;
  courseThumbnail: string;
  progress: number;
  enrolledDate: string;
  status: "In Progress" | "Completed";
}

export const enrolledCoursesData: EnrolledCourse[] = [
  {
    id: "1",
    courseId: Courses[0].id,
    courseName: Courses[0].name,
    courseThumbnail: Courses[0].logo,
    progress: 65,
    enrolledDate: "2024-10-15",
    status: "In Progress"
  },
  {
    id: "2",
    courseId: Courses[2].id,
    courseName: Courses[2].name,
    courseThumbnail: Courses[2].logo,
    progress: 30,
    enrolledDate: "2024-11-01",
    status: "In Progress"
  },
  {
    id: "3",
    courseId: Courses[6].id,
    courseName: Courses[6].name,
    courseThumbnail: Courses[6].logo,
    progress: 100,
    enrolledDate: "2024-09-20",
    status: "Completed"
  },
];
