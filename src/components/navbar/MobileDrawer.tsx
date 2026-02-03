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
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-sm bg-neutral-900 h-full p-6 flex flex-col justify-between">
        <button className="self-end" onClick={onClose}>
          <X />
        </button>

        <nav className="flex flex-col gap-6 text-lg">
          <Link to="/" onClick={onClose}>Home</Link>
          <Link to="/all-courses" onClick={onClose}>Programs</Link>
          <Link to="/blogs" onClick={onClose}>Blogs</Link>
        </nav>

     <div className="space-y-3">
  {/* Theme Toggle */}
  <button
    onClick={toggleTheme}
    className="
      w-full p-3 rounded-xl
      flex items-center justify-center gap-2
      transition-colors
      bg-neutral-100 text-neutral-900 hover:bg-neutral-200
      dark:bg-neutral-800 dark:text-white dark:hover:bg-neutral-700
    "
    aria-label="Toggle theme"
  >
    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    <span className="text-sm font-medium">
      {theme === "dark" ? "Light mode" : "Dark mode"}
    </span>
  </button>

  {/* Auth CTA */}
  {isAuthenticated ? (
    <CustomButton
      title="Profile"
      onClick={() => navigate("/profile")}
      className="w-full"
    />
  ) : (
    <CustomButton
      title="Start Learning"
      onClick={() => navigate("/signup")}
      className="w-full"
    />
  )}
</div>

      </div>
    </div>
  );
}
