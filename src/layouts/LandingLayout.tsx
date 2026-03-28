import Footer from "@/components/common/Footer";
import Navbar from "@/components/navbar/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useFetchDepartments } from "@/hooks/useFetchDepartments";
import { useFetchFaqs } from "@/hooks/useFetchFaqs";
import { useFetchTestimonals } from "@/hooks/useFetchTestimonals";
import { useFetchFormattedCourses } from "@/hooks/useFetchFormattedCourses";
import { useFetchPricings } from "@/hooks/useFetchPricings";
import { usePageScroll } from "@/hooks/usePageScroll";

export default function LandingLayout() {
  const { pathname } = useLocation();
  const HIDE_FOOTER_PATH_PREFIXES = ["/course-dashboard", "/course"];
  const shouldHideFooter = HIDE_FOOTER_PATH_PREFIXES.some((path) =>
    pathname.startsWith(path)
  );

  usePageScroll();

  useFetchDepartments();
  useFetchFaqs();
  useFetchTestimonals();
  useFetchFormattedCourses();
  useFetchPricings();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!shouldHideFooter && <Footer />}
    </div>
  );
}
