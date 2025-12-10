import Banner from "@/components/common/Banner";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { Outlet } from "react-router-dom";
import { useFetchDepartments } from "@/hooks/useFetchDepartments";
import { useFetchFaqs } from "@/hooks/useFetchFaqs";
import { useFetchTestimonals } from "@/hooks/useFetchTestimonals";
import { useFetchFormattedCourses } from "@/hooks/useFetchFormattedCourses";
import { useFetchPricings } from "@/hooks/useFetchPricings";
import {useLocation} from "react-router-dom"
import { useEffect, useState } from "react";
export default function Layout() {
  const [displayBanner, setDisplayBanner] = useState(true);

  useFetchDepartments();
  useFetchFaqs();
  useFetchTestimonals();
  useFetchFormattedCourses();
  useFetchPricings();

  const location = useLocation();

  useEffect(() => {
    const shouldHideBanner = location.pathname.startsWith("/course-dashboard");
    setDisplayBanner(!shouldHideBanner);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full">
        <Navbar />
        {displayBanner && <Banner />}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
