import { useEffect, useState } from 'react';
import { getAboutCourse } from '../services/courseService';
import { useSelectedCourseStore } from '@/store/useSelectedCourse';

export function useAboutCourse(courseSlug: string) {
  const {
    selectedCourse,
    setSelectedCourse,
    setSelectedCourseTools,
  } = useSelectedCourseStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);

      const res = await getAboutCourse(courseSlug);

      setSelectedCourse(res);
      setSelectedCourseTools(
        (res?.tools ?? []).map((tool: any) => ({
          toolName: tool.toolName,
          toolImage: tool.toolImage,
        }))
      );

      setLoading(false);
    }

    load();
  }, [courseSlug]);

  return { selectedCourse, loading };
}
