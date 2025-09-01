import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FormattedPricing } from "@/types";


interface FaqState {
  pricings: FormattedPricing[];
  setPricings: (pricings: FormattedPricing[]) => void;
  resetPricings: () => void;
}

export const usePricingsStore = create<FaqState>()(
  devtools((set) => ({
    pricings: [],
    setPricings: (pricings) => set({ pricings }),
    resetPricings: () => set({ pricings: [] }),
  }))
);
