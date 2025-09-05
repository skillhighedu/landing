import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Logo from "@/assets/logo.png";

import CustomButton from "./Button";
import MenuIcon from "./icons/Menu";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useAuthStore } from "@/store/authStore";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0);
  const [isCoursesOpen, setCoursesOpen] = useState(false);

  const coursesDropdownRef = useRef<HTMLDivElement>(null);

  const departments = usePublicCoursesStore((state) => state.departments);
  const { isAuthenticated, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Scroll hide/show
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdown if click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        coursesDropdownRef.current &&
        !coursesDropdownRef.current.contains(event.target as Node)
      ) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectedCourse = (courseSlug: string) => {
    navigate(`/course/${courseSlug}`);
    setCoursesOpen(false); // close dropdown when selecting course
  };

  return (
    <>
      {/* Navbar container */}
      <div
        className={`fixed top-0 left-0 w-full bg-neutral-900 font-pixel text-white z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link to="/">
            <img src={Logo} alt="SkillHigh" className="h-12" />
          </Link>

          <nav className="flex items-center gap-6 font-medium">
            <Link
              to="/"
              className="text-sm text-neutral-300 hover:text-white transition cursor-pointer"
            >
              Home
            </Link>

            {/* Courses Dropdown */}
            <div className="relative">
              <button
                onClick={() => setCoursesOpen((prev) => !prev)}
                className="text-sm text-neutral-300 hover:text-white transition cursor-pointer"
              >
               Programs
              </button>

              <AnimatePresence>
                {isCoursesOpen && (
                  <motion.div
                    ref={coursesDropdownRef}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    id="courses-dropdown"
                    className="absolute left-0 top-full mt-3 bg-neutral-800 border border-neutral-700 shadow-lg rounded-lg w-[630px] p-4"
                  >
                    <div className="flex gap-4">
                      {/* Departments Sidebar */}
                      <div className="w-40 flex flex-col gap-1">
                        {departments.map((department, index) => (
                          <button
                            key={department.uuid}
                            onClick={() => setSelectedDeptIndex(index)}
                            className={`text-left text-sm py-1.5 px-2 rounded transition-colors cursor-pointer ${
                              selectedDeptIndex === index
                                ? "bg-blue-50 text-primary"
                                : "text-white hover:bg-primary"
                            }`}
                          >
                            {department.departmentName}
                          </button>
                        ))}
                      </div>

                      {/* Courses Grid */}
                      <div className="flex-1">
                        <h3 className="text-sm text-primary mb-4">
                          {departments[selectedDeptIndex]?.departmentName} Courses
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {departments[selectedDeptIndex]?.courses.map((course) => (
                            <button
                              key={course.uuid}
                              onClick={() => handleSelectedCourse(course.slug)}
                              className="h-30 rounded-lg overflow-hidden transition-colors text-left cursor-pointer"
                              style={{
                                backgroundImage: `url(${course.courseThumbnail})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                              }}
                            >
                              <div className="h-full bg-black/50 flex items-end p-2">
                                <h4 className="text-white text-sm font-medium">
                                  {course.courseName}
                                </h4>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          {isAuthenticated ? (
            <Link to="/profile">
              <CustomButton title="View Profile" icon="" />
            </Link>
          ) : (
            <Link to="/signup">
              <CustomButton title="Start Your Journey" icon="" />
            </Link>
          )}
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden h-18 flex items-center justify-between px-4 py-3 shadow-sm">
          <img src={Logo} className="h-10" alt="SkillHigh" />
          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            aria-label={isDrawerOpen ? "Close Menu" : "Open Menu"}
            className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-1 rounded"
          >
            {isDrawerOpen ? <X size={24} className="text-red-500" /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
         <motion.aside
  initial={{ x: "100%" }}
  animate={{ x: 0 }}
  exit={{ x: "100%" }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
  role="dialog"
  aria-modal="true"
  className="fixed inset-0 z-50 flex justify-end px-4 py-6 sm:px-6 sm:py-10 bg-black/50 backdrop-blur-sm"
>
  <div className="relative h-full w-full max-w-sm sm:max-w-md bg-neutral-800 rounded-2xl shadow-xl px-6 py-10 flex flex-col justify-between">
    
    {/* Close button */}
    <button
      onClick={() => setDrawerOpen(false)}
      aria-label="Close menu"
      className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
    >
      <X className="w-6 h-6" />
    </button>

    {/* Navigation */}
    <nav className="pt-8 flex flex-col items-end gap-6 text-lg leading-relaxed text-white">
      <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
      <Link to="/all-courses" onClick={() => setDrawerOpen(false)}>Programs</Link>
    </nav>

    {/* Conditional Button */}
    <div>
      {isAuthenticated ? (
        <CustomButton
          title="Profile"
          icon=""
          onClick={() => navigate("/profile")}
          className="w-full"
        />
      ) : (
        <CustomButton
          title="Start Your Journey"
   
          onClick={() => navigate("/signup")}
          className="w-full"
        />
      )}
    </div>
  </div>
</motion.aside>

        )}
      </AnimatePresence>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
