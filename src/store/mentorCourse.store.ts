import { create } from "zustand";

interface MentorCourseState {
  selectedCourseId: string;
  setSelectedCourseId: (courseId: string) => void;
  clearSelectedCourseId: () => void;
}

export const useMentorCourseStore = create<MentorCourseState>((set) => ({
  selectedCourseId: "",
  setSelectedCourseId: (courseId) => set({ selectedCourseId: courseId }),
  clearSelectedCourseId: () => set({ selectedCourseId: "" }),
}));
