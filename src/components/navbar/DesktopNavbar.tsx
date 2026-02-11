import { Link, useNavigate, useLocation } from "react-router-dom";
import { Sun, Moon, User } from "lucide-react";
import Logo from "@/assets/logo.png";
import CustomButton from "@/components/common/Button";
import ProgramsDropdown from "./ProgramsDropdown";
import type { Department } from "./types";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuthStore } from "@/store/authStore";

export default function DesktopNavbar({
  departments,
  dropdownRef,
  coursesOpen,
  setCoursesOpen,
  selectedDept,
  setSelectedDept,
}: {
  departments: Department[];
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  coursesOpen: boolean;
  setCoursesOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedDept: number;
  setSelectedDept: (i: number) => void;
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  const isCourseDashboard = location.pathname.startsWith("/course-dashboard");

  return (
    <>
      {/* Logo always visible */}
      <Link to="/" className="flex items-center gap-2">
        <img src={Logo} alt="SkillHigh" className="h-9" />
      </Link>

      {/* Nav links → hidden on course dashboard */}
      {!isCourseDashboard && (
        <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700 dark:text-neutral-300">
          <Link to="/">Home</Link>

          <ProgramsDropdown
            departments={departments}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            coursesOpen={coursesOpen}
            setCoursesOpen={setCoursesOpen}
            dropdownRef={dropdownRef}
            onSelectCourse={(slug) => navigate(`/course/${slug}`)}
          />

          <Link to="/blogs">Blogs</Link>
        </nav>
      )}

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-3">
        {/* Dark mode → always visible */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-black/50 dark:bg-white/10 cursor-pointer"
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Profile → visible everywhere if authenticated */}
        {isAuthenticated && (
          <CustomButton
            title="Profile"
            icon={<User size={16} />}
            onClick={() => navigate("/profile")}
          />
        )}

        {/* Start Learning → hide on course dashboard */}
        {!isAuthenticated && !isCourseDashboard && (
          <CustomButton
            title="Start Learning"
            onClick={() => navigate("/signup")}
          />
        )}
      </div>
    </>
  );
}
