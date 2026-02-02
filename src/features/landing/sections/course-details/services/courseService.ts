import { fetchSelectedCourse } from '@/services/course-service';

export async function getAboutCourse(courseSlug: string) {
  return fetchSelectedCourse(courseSlug);
}
