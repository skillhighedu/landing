export type Department = {
  uuid: string;
  departmentName: string;
  courses: {
    slug: string;
    courseName: string;
    courseThumbnail: string;
  }[];
};
