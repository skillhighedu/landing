import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type SelectedCourse,type SelectedCourseTools } from "@/types/course";


interface SelectedCourseState {
  selectedCourse: SelectedCourse | null;
  setSelectedCourse: (course: SelectedCourse | null) => void;

  selectedCourseTools: SelectedCourseTools | null;
  setSelectedCourseTools: (tools: SelectedCourseTools | null) => void;

  resetSelectedCourse: () => void;
  resetSelectedCourseTools: () => void;
}

export const useSelectedCourseStore = create<SelectedCourseState>()(
  devtools((set) => ({
    selectedCourse: null,
    setSelectedCourse: (course) => set({ selectedCourse: course }),
    resetSelectedCourse: () => set({ selectedCourse: null }),
    selectedCourseTools: null,
    setSelectedCourseTools: (tools) => set({ selectedCourseTools: tools }),
    resetSelectedCourseTools: () => set({ selectedCourseTools: null }),
  }))
);
