import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type Testimonial } from "@/types";


interface TestimonialState {
  testimonials: Testimonial[];
  setTestimonials: (testimonials: Testimonial[]) => void;
  resetTestimonials: () => void;
}

export const useTestimonialStore = create<TestimonialState>()(
  devtools((set) => ({
    testimonials: [],
    setTestimonials: (testimonials) => set({ testimonials }),
    resetTestimonials: () => set({ testimonials: [] }),
  }))
);

