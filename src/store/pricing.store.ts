import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { type FormattedPricing } from "@/types";


interface PricingState {
  pricings: FormattedPricing[];
  setPricings: (pricings: FormattedPricing[]) => void;
  resetPricings: () => void;
}

export const usePricingsStore = create<PricingState>()(
  devtools((set) => ({
    pricings: [],
    setPricings: (pricings) => set({ pricings }),
    resetPricings: () => set({ pricings: [] }),
  }))
);

