import { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import api from "@/config/axiosConfig";
import type { ApiResponse } from "@/types";
import { handleApiError } from "@/utils/errorHandler";
import { useMentorCourseStore } from "@/store/mentorCourse.store";

import type { MentorAssignedCourse, MentorProfile } from "../types";

export const MENTOR_PROFILE_QUERY_KEY = ["mentor-profile"] as const;

const normalizeAssignedCourses = (profile: MentorProfile | null | undefined): MentorAssignedCourse[] => {
  const assignedCourses = profile?.assignedCourses?.filter(
    (course): course is MentorAssignedCourse =>
      Boolean(course?.courseId && course?.courseName),
  );

  if (assignedCourses?.length) {
    return assignedCourses;
  }

  if (profile?.courseId && profile?.courseName) {
    return [{ courseId: profile.courseId, courseName: profile.courseName }];
  }

  return [];
};

const fetchMentorProfile = async (): Promise<MentorProfile | null> => {
  try {
    const response = await api.get<ApiResponse<MentorProfile>>("/mentors/profile");
    return response.data.additional ?? null;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

export function useMentorProfile() {
  const selectedCourseId = useMentorCourseStore((state) => state.selectedCourseId);
  const setSelectedCourseId = useMentorCourseStore((state) => state.setSelectedCourseId);
  const clearSelectedCourseId = useMentorCourseStore((state) => state.clearSelectedCourseId);

  const query = useQuery({
    queryKey: MENTOR_PROFILE_QUERY_KEY,
    queryFn: fetchMentorProfile,
    staleTime: 5 * 60 * 1000,
  });

  const assignedCourses = useMemo(
    () => normalizeAssignedCourses(query.data),
    [query.data],
  );

  useEffect(() => {
    if (query.isLoading) {
      return;
    }

    if (!assignedCourses.length) {
      if (selectedCourseId) {
        clearSelectedCourseId();
      }
      return;
    }

    const hasSelectedCourse = assignedCourses.some(
      (course) => course.courseId === selectedCourseId,
    );

    if (assignedCourses.length === 1) {
      const onlyCourseId = assignedCourses[0]?.courseId ?? "";
      if (onlyCourseId && selectedCourseId !== onlyCourseId) {
        setSelectedCourseId(onlyCourseId);
      }
      return;
    }

    if (selectedCourseId && hasSelectedCourse) {
      return;
    }

    if (selectedCourseId && !hasSelectedCourse) {
      clearSelectedCourseId();
    }
  }, [
    assignedCourses,
    clearSelectedCourseId,
    query.isLoading,
    selectedCourseId,
    setSelectedCourseId,
  ]);

  const selectedCourse =
    assignedCourses.find((course) => course.courseId === selectedCourseId) ?? null;

  return {
    ...query,
    profile: query.data ?? null,
    assignedCourses,
    selectedCourse,
    selectedCourseId,
    hasMultipleCourses: assignedCourses.length > 1,
    hasAssignedCourses: assignedCourses.length > 0,
    setSelectedCourseId,
  };
}
