"use client";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { X, Sun, Moon } from "lucide-react";

import Logo from "@/assets/logo.png";
import MenuIcon from "@/components/icons/Menu";
import CustomButton from "@/components/common/Button";

import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useAuthStore } from "@/store/authStore";
import { useTheme } from "@/providers/ThemeProvider";

/* -------------------- Types -------------------- */
type Department = {
  uuid: string;
  departmentName: string;
  courses: {
    uuid?: string;
    slug: string;
    courseName: string;
    courseThumbnail: string;
  }[];
};

/* -------------------- Sidebar -------------------- */
function DepartmentsSidebar({
  departments,
  selectedIndex,
  onSelect,
}: {
  departments: Department[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="w-44 flex flex-col gap-1">
      {departments.map((dept, index) => (
        <button
          key={dept.uuid}
          onClick={() => onSelect(index)}
          className={`
            text-left text-sm px-3 py-2 rounded-md
            transition-colors
            ${
              selectedIndex === index
                ? "bg-primary/10 text-primary"
                : "text-neutral-300 hover:bg-neutral-800"
            }
          `}
        >
          {dept.departmentName}
        </button>
      ))}
    </div>
  );
}

/* -------------------- Courses Grid -------------------- */
function CoursesGrid({
  courses,
  deptName,
  onSelectCourse,
}: {
  courses: Department["courses"];
  deptName: string;
  onSelectCourse: (slug: string) => void;
}) {
  return (
    <div className="flex-1">
      <h3 className="text-sm text-primary mb-4">{deptName} Programs</h3>

      <div className="grid grid-cols-2 gap-3">
        {courses.map((course) => (
          <button
            key={course.slug}
            onClick={() => onSelectCourse(course.slug)}
            className="relative h-24 rounded-lg overflow-hidden group"
            style={{
              backgroundImage: `url(${course.courseThumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/70 transition" />
            <span className="absolute bottom-2 left-2 right-2 text-xs text-white font-medium line-clamp-2">
              {course.courseName}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

/* -------------------- Navbar -------------------- */
export default function Navbar() {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const { isAuthenticated, checkAuth } = useAuthStore();
  const departments = usePublicCoursesStore((s) => s.departments) as Department[];

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  /* ---------------- Auth check ---------------- */
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /* ---------------- Scroll hide/show ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastScrollY || y < 80);
      setLastScrollY(y);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  /* ---------------- Outside click ---------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleCourseSelect = (slug: string) => {
    navigate(`/course/${slug}`);
    setCoursesOpen(false);
  };

  /* ====================================================== */
  return (
    <>
      {/* ================= DESKTOP ================= */}
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          bg-white dark:bg-neutral-900
          border-b border-neutral-200 dark:border-white/10
          transition-transform duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={Logo} alt="SkillHigh" className="h-10" />
          </Link>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link className="nav-link" to="/">Home</Link>

            {/* Programs */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setCoursesOpen((v) => !v)}
                className="nav-link"
              >
                Programs
              </button>

              {coursesOpen && (
                <div className="
                  absolute left-0 top-full mt-4
                  w-[680px]
                  bg-neutral-900
                  border border-neutral-800
                  rounded-xl
                  shadow-xl
                  p-4
                ">
                  <div className="flex gap-4">
                    <DepartmentsSidebar
                      departments={departments}
                      selectedIndex={selectedDept}
                      onSelect={setSelectedDept}
                    />

                    <CoursesGrid
                      deptName={departments[selectedDept]?.departmentName ?? ""}
                      courses={departments[selectedDept]?.courses ?? []}
                      onSelectCourse={handleCourseSelect}
                    />
                  </div>
                </div>
              )}
            </div>

            <Link className="nav-link" to="/blogs">Blogs</Link>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md bg-neutral-100 dark:bg-neutral-800"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <Sun size={16} className="text-yellow-400" />
              ) : (
                <Moon size={16} />
              )}
            </button>

            {isAuthenticated ? (
              <CustomButton title="Profile" onClick={() => navigate("/profile")} />
            ) : (
              <CustomButton title="Start Your Journey" onClick={() => navigate("/signup")} />
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </button>
        </div>
      </header>

      {/* ================= MOBILE DRAWER ================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-sm bg-neutral-900 h-full p-6 flex flex-col justify-between">
            <button
              className="self-end"
              onClick={() => setDrawerOpen(false)}
            >
              <X />
            </button>

            <nav className="flex flex-col gap-6 text-lg">
              <Link to="/" onClick={() => setDrawerOpen(false)}>Home</Link>
              <Link to="/all-courses" onClick={() => setDrawerOpen(false)}>Programs</Link>
              <Link to="/blogs" onClick={() => setDrawerOpen(false)}>Blogs</Link>
            </nav>

            <div className="space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full p-3 rounded-md bg-neutral-800 flex items-center justify-center gap-2"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                Toggle Theme
              </button>

              {isAuthenticated ? (
                <CustomButton title="Profile" onClick={() => navigate("/profile")} className="w-full" />
              ) : (
                <CustomButton title="Start Your Journey" onClick={() => navigate("/signup")} className="w-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
