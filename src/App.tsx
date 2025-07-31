import { Routes, Route } from "react-router-dom";
import Layout from "@/layouts/layout";
import Home from "@/pages/Home";

import AllCourses from "./components/AllCourses";
import './App.css';
import "./index.css"
import CourseDetails from "./pages/CourseDetails";
import ContactUs from "./components/contactus";
import Profile from "./components/Profile";
import Signup from "./pages/Signup";

function App() {
  return (
    <div className=" text-white min-h-screen">
    
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

    </div>
  );
}

export default App;
