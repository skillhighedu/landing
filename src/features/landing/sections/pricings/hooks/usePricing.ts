import { useEffect, useState } from 'react';
import { fetchSelectedCourse } from '@/services/course-service';
import type { SelectedCourse } from '@/types/course';
import { calculateRegistrationAmount } from '../utils';
import type { SelectedPlan } from '../types';

export function usePricing(courseSlug: string) {
  const [selectedCourse, setSelectedCourse] = useState<SelectedCourse | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null);
  const [registrationAmount, setRegistrationAmount] = useState<number | null>(null);

  useEffect(() => {
    fetchSelectedCourse(courseSlug).then(setSelectedCourse);
  }, [courseSlug]);

  useEffect(() => {
    if (!selectedPlan) return;
    setRegistrationAmount(
      calculateRegistrationAmount(selectedPlan.price, selectedPlan.per)
    );
  }, [selectedPlan]);

  return {
    selectedCourse,
    selectedPlan,
    setSelectedPlan,
    registrationAmount,
  };
}
