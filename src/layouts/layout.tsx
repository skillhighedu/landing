import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Outlet } from "react-router-dom";
import { useFetchDepartments } from "@/hooks/useFetchDepartments";
import { useFetchFaqs } from "@/hooks/useFetchFaqs";
import { useFetchTestimonals } from "@/hooks/useFetchTestimonals";
import { useFetchFormattedCourses } from "@/hooks/useFetchFormattedCourses";
import { useFetchPricings } from "@/hooks/useFetchPricings";
export default function Layout() {
  useFetchDepartments();
  useFetchFaqs();
  useFetchTestimonals();
  useFetchFormattedCourses();
  useFetchPricings()

  return (
    <div className="min-h-screen flex flex-col  ">

      <header className="w-full ">
        {/* Centered Navbar Container */}
        <div >

          <Navbar />
          <Banner 
          />

        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
