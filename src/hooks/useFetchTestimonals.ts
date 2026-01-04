
import { useEffect } from "react";
import { useTestimonialStore } from "@/store/testimonial.store";
import { fetchTestimonals} from "@/services/testimonal-service";


export const useFetchTestimonals = () => {
  const setTestimonials = useTestimonialStore((state) => state.setTestimonials);

  useEffect(() => {
    const fetchTestimonalsAsync = async () => {
      try {
        const testimonials = await fetchTestimonals();
        setTestimonials(testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };

    fetchTestimonalsAsync();
  }, [setTestimonials]);
};
