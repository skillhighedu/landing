
import { useEffect } from "react";
import { useFaqStore } from "@/store/useFaqs";
import { fetchFaqs} from "@/services/faq-service";

export const useFetchFaqs = () => {
  const setFaq = useFaqStore((state) => state.setFaq);

  useEffect(() => {
    const fetchFaqsAsync = async () => {
     const faqs = await fetchFaqs();
     setFaq(faqs);
    };

    fetchFaqsAsync();
  }, [setFaq]);
};
