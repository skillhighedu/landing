import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "@/layouts/layout";
import "./App.css";
import "./index.css";
import Popup from "./components/ui/Popup";

// Lazy-loaded pages
const Home = lazy(() => import("@/pages/Home"));
const AllCourses = lazy(() => import("./components/AllCourses"));
const CourseDetails = lazy(() => import("./pages/CourseDetails"));
const ContactUs = lazy(() => import("./components/contactus"));
const Profile = lazy(() => import("./components/Profile"));
const Signup = lazy(() => import("./pages/Signup"));

// Optional: Create a minimal fallback
const Fallback = () => <div className="bg-neutral-900 text-white h-screen text-center justify-center">Loading...</div>;

function App() {
  return (
    <div className="text-white min-h-screen">
       <Popup/>
      <Suspense fallback={<Fallback />}>
        <Routes>
          <Route element={<Layout />}>
         
            <Route path="/" element={<Home />} />
            <Route path="/about-course" element={<CourseDetails />} />
            <Route path="/all-courses" element={<AllCourses />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
