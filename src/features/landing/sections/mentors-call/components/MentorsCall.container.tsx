'use client';

import MentorsCallView from './MentorsCall.view';
import type { MentorsCallProps } from '../types';
import { useSelectedCourseStore } from '@/store/useSelectedCourse';

export default function MentorsCall({ onJoin }: MentorsCallProps) {
  const courseName = useSelectedCourseStore((state) => state.selectedCourse?.courseName);

  const handleJoin = () => {
    if (onJoin) {
      onJoin();
      return;
    }

    window.open(
      'https://forms.gle/fSaB1JkXp1TaYz1z9',
      '_blank'
    );
  };

  return <MentorsCallView onJoin={handleJoin} courseName={courseName} />;
}
