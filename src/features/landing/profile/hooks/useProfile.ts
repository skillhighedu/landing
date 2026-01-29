import type { Student, StudentProfile } from "../types";

export function useProfile() {
  return {
    student: {
      name: "Kiran Kumar",
      email: "kiran@email.com",
    } as Student,

    courses: {
      courses: [],
    } as StudentProfile,

    loading: false,

    logout: () => console.log("logout"),
    payRemaining: (id: string) => console.log("pay", id),
  };
}
