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
  const { isAuthenticated, user } = useAuthStore();

const HIDE_POPUP_ROUTES = [
  "/mentor",
  "/certificate/verify",
];

const isMatchedRoute =
  HIDE_POPUP_ROUTES.some((route) => location.pathname.startsWith(route)) ||
  location.pathname.includes("/demo");

const shouldHideNavLinks = isMatchedRoute;
const shouldHideProfileAction = location.pathname.includes("/demo");
const profileLabel = user?.role === "mentor" ? "Mentor Profile" : "Profile";

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Logo */}
      <Link to="/" className="flex shrink-0 items-center gap-2">
        <img src={Logo} alt="SkillHigh" className="h-8 sm:h-9 w-auto" />
      </Link>

      {/* Nav links — hidden on mobile and course dashboard */}
      {!shouldHideNavLinks && (
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLink to="/" label="Home" />

          <ProgramsDropdown
            departments={departments}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
            coursesOpen={coursesOpen}
            setCoursesOpen={setCoursesOpen}
            dropdownRef={dropdownRef}
            onSelectCourse={(slug) => navigate(`/course/${slug}`)}
          />

          <NavLink to="/blogs" label="Blogs" />

          <NavLink to="/check-certificate" label="Certificate" />

        </nav>
      )}

      {/* Right actions */}
      <div className="flex items-center gap-2 sm:gap-3 ml-auto md:ml-0">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="
            flex items-center justify-center
            h-8 w-8 sm:h-9 sm:w-9 rounded-lg
            bg-neutral-100 dark:bg-white/10
            text-neutral-600 dark:text-neutral-300
            hover:bg-neutral-200 dark:hover:bg-white/15
            transition-colors duration-150
          "
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        {/* Authenticated — profile button */}
        {isAuthenticated && !shouldHideProfileAction && (
          <CustomButton
            title={profileLabel}
            icon={<User size={15} />}
            onClick={() => navigate("/profile")}
  
          />
        )}

        {/* Unauthenticated + not on course dashboard — CTA */}
        {!isAuthenticated && !shouldHideNavLinks && (
          <CustomButton
            title="Start Learning"
            onClick={() => navigate("/signup")}
            className="hidden sm:inline-flex"
          />
        )}
      </div>
    </div>
  );
}

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        text-sm font-medium transition-colors duration-150
        ${
          isActive
            ? "text-black dark:text-white"
            : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
        }
      `}
    >
      {label}
    </Link>
  );
}
