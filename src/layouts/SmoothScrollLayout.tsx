import { useEffect } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother"; // ✅ named import

gsap.registerPlugin(ScrollSmoother);

export default function SmoothScrollLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const wrapper = document.getElementById("smooth-wrapper");
    const content = document.getElementById("smooth-content");

    if (!wrapper || !content) {
      console.warn("ScrollSmoother wrapper or content not found");
      return;
    }

    if (!ScrollSmoother.get()) {
      ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1.2,
        effects: true,
      });
    }
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
