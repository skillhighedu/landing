import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type StudentProfile } from "@/types";


interface FaqState {
  studentProfile: StudentProfile[];
  setStudentProfile: (studentProfile: StudentProfile[]) => void;
  resetStudentProfile: () => void;
}

export const useStudentProfileStore = create<FaqState>()(
  devtools((set) => ({
    studentProfile: [],
    setStudentProfile: (studentProfile) => set({ studentProfile }),
    resetStudentProfile: () => set({ studentProfile: [] }),
  }))
);
