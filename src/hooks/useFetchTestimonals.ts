
import { useEffect } from "react";
import { useTestimonialStore } from "@/store/useTestimonalStore";
import { fetchTestimonals} from "@/services/testimonal-service";


export const useFetchTestimonals = () => {
  const setTestimonials = useTestimonialStore((state) => state.setTestimonials);

  useEffect(() => {
    const fetchTestimonalsAsync = async () => {
     const testimonials = await fetchTestimonals();
     setTestimonials(testimonials);
    };

    fetchTestimonalsAsync();
  }, [setTestimonials]);
};
