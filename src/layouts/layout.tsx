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
  targetDate="2025-08-07T23:59:59"
  showEvent={true}
  event={{
    title: "Full Stack Hackathon – 28th Sept",
    description: "Join developers worldwide and showcase your skills!",
    buttonText: "Register Now",
    formLink: "https://forms.gle/67AUHKzS4yUXdzBT6",
  }}
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
