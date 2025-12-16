
import { useEffect } from "react";
import { useFaqStore } from "@/store/faq.store";
import { fetchFaqs} from "@/services/faq-service";

export const useFetchFaqs = () => {
  const setFaq = useFaqStore((state) => state.setFaq);

  useEffect(() => {
    const fetchFaqsAsync = async () => {
      try {
        const faqs = await fetchFaqs();
        setFaq(faqs);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqsAsync();
  }, [setFaq]);
};
