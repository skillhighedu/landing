import { useEffect } from "react";

export function usePageScroll() {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Ignore typing contexts
      const target = e.target as HTMLElement;
      const isTyping =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isTyping) return;

      if (e.code === "PageDown") {
        e.preventDefault();
        e.stopPropagation();

        window.scrollBy({
          top: window.innerHeight * 0.9,
          behavior: "smooth",
        });
      }

      if (e.code === "PageUp") {
        e.preventDefault();
        e.stopPropagation();

        window.scrollBy({
          top: -window.innerHeight * 0.9,
          behavior: "smooth",
        });
      }
    };

    // 🔑 KEY FIX: document + capture = true
    document.addEventListener("keydown", handler, { capture: true });

    return () => {
      document.removeEventListener("keydown", handler, { capture: true });
    };
  }, []);
}
