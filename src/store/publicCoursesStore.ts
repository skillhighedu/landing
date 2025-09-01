import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Department, type FormatedCourses } from "@/types/course";


interface PublicCoursesState {
  departments: Department[];
  formatedCourses: FormatedCourses[];
  setDepartments: (departments: Department[]) => void;
  setFormatedCourses: (formatedCourses: FormatedCourses[]) => void;
  resetDepartments: () => void;
}

export const usePublicCoursesStore = create<PublicCoursesState>()(
  devtools((set) => ({
    departments: [],
    formatedCourses: [],
    setDepartments: (departments) => set({ departments }),
    setFormatedCourses: (formatedCourses: FormatedCourses[]) => set({ formatedCourses }),

    resetDepartments: () => set({ departments: [] }),
  }))
);

