'use client';

import { useSelectedCourseStore } from '@/store/useSelectedCourse';
import CurriculumAccordionView from './CurriculumAccordion.view';

export default function CurriculumAccordion() {
  const { selectedCourse } = useSelectedCourseStore();

  if (!selectedCourse) return null;

  return (
    <CurriculumAccordionView modules={selectedCourse.modules} />
  );
}
