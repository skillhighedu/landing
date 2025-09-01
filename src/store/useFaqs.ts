import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FAQ } from "@/types/faq";


interface FaqState {
  faq: FAQ[];
  setFaq: (faq: FAQ[]) => void;
  resetFaq: () => void;
}

export const useFaqStore = create<FaqState>()(
  devtools((set) => ({
    faq: [],
    setFaq: (faq) => set({ faq }),
    resetFaq: () => set({ faq: [] }),
  }))
);
