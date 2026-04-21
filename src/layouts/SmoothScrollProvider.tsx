import { useEffect, useLayoutEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { useLocation } from "react-router-dom";

export const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    lenisRef.current = lenis;

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useLayoutEffect(() => {
    lenisRef.current?.scrollTo(0, {
      immediate: true,
      force: true,
    });
  }, [location.key]);

  return <>{children}</>;
};
