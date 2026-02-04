import { Link, useNavigate } from "react-router-dom";
import { X, Sun, Moon } from "lucide-react";
import CustomButton from "@/components/common/Button";
import { useTheme } from "@/providers/ThemeProvider";
import { useAuthStore } from "@/store/authStore";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuthStore();

  if (!open) return null;

  return (
    <>
      {/* Click outside backdrop (transparent) */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Dropdown panel */}
      <div
        className="
          fixed right-4 top-16 z-50
          w-64
          rounded-2xl
          shadow-xl
          p-4

          /* Light */
          bg-white text-neutral-900

          /* Dark */
          dark:bg-neutral-900 dark:text-white
          border border-neutral-200 dark:border-neutral-800
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Menu</span>
          <button onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2 text-sm">
          <Link
            to="/"
            onClick={onClose}
            className="rounded-lg px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Home
          </Link>
          <Link
            to="/all-courses"
            onClick={onClose}
            className="rounded-lg px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Programs
          </Link>
          <Link
            to="/blogs"
            onClick={onClose}
            className="rounded-lg px-2 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          >
            Blogs
          </Link>
        </nav>

        <div className="my-3 h-px bg-neutral-200 dark:bg-neutral-800" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="
            w-full flex items-center justify-between
            rounded-lg px-2 py-2
            text-sm
            hover:bg-neutral-100 dark:hover:bg-neutral-800
          "
        >
          <span>
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </span>
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        {/* CTA */}
        <div className="mt-3">
          {isAuthenticated ? (
            <CustomButton
              title="Profile"
              onClick={() => {
                onClose();
                navigate("/profile");
              }}
              className="w-full"
            />
          ) : (
            <CustomButton
              title="Start learning"
              onClick={() => {
                onClose();
                navigate("/signup");
              }}
              className="w-full"
            />
          )}
        </div>
      </div>
    </>
  );
}
