
import { useEffect } from "react";
import { usePricingsStore } from "@/store/usePricingStore";
import { fetchPricings} from "@/services/pricing-service";

export const useFetchPricings = () => {
  const setPricings = usePricingsStore((state) => state.setPricings);

  useEffect(() => {
    const fetchPricingsAsync = async () => {
     const pricings = await fetchPricings();
     setPricings(pricings);
    };

    fetchPricingsAsync();
  }, [setPricings]);
};
