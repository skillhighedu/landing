import { useFaqStore } from "@/store/faq.store";
import type { FAQ } from "../types";

export function useFAQ(): FAQ[] {
  return useFaqStore((state) => state.faq);
}
