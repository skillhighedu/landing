import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type SelectedCourse } from "@/types/course";


interface SelectedCourseState {
  selectedCourse: SelectedCourse | null;
  setSelectedCourse: (course: SelectedCourse | null) => void;
  resetSelectedCourse: () => void;
}

export const useSelectedCourseStore = create<SelectedCourseState>()(
  devtools((set) => ({
    selectedCourse: null,
    setSelectedCourse: (course) => set({ selectedCourse: course }),
    resetSelectedCourse: () => set({ selectedCourse: null }),
  }))
);
