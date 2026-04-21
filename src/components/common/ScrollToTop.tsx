import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

function scrollPageToTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.body.scrollTo({ top: 0, left: 0, behavior: "auto" });
}

export default function ScrollToTop() {
  const { key } = useLocation();

  useEffect(() => {
    if (!("scrollRestoration" in window.history)) {
      return;
    }

    const previousScrollRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";

    return () => {
      window.history.scrollRestoration = previousScrollRestoration;
    };
  }, []);

  useLayoutEffect(() => {
    scrollPageToTop();
  }, [key]);

  return null;
}
