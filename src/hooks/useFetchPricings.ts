
import { useEffect } from "react";
import { usePricingsStore } from "@/store/pricing.store";
import { fetchPricings} from "@/services/pricing-service";

export const useFetchPricings = () => {
  const setPricings = usePricingsStore((state) => state.setPricings);

  useEffect(() => {
    const fetchPricingsAsync = async () => {
      try {
        const pricings = await fetchPricings();
        setPricings(pricings);
      } catch (error) {
        console.error("Error fetching pricings:", error);
      }
    };

    fetchPricingsAsync();
  }, [setPricings]);
};
