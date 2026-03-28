import { Link, useNavigate } from "react-router-dom";
import { X, Sun, Moon, ChevronRight, User } from "lucide-react";
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
  const { isAuthenticated, user } = useAuthStore();
  const profileLabel = user?.role === "mentor" ? "Mentor Profile" : "Profile";

  if (!open) return null;

  const navItems = [
    { label: "Home", to: "/" },
    { label: "Programs", to: "/all-courses" },
    { label: "Blogs", to: "/blogs" },
    { label: "Certificate", to: "/check-certificate" },
  ];

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
        onClick={onClose}
      />

      <div
        className="
          fixed right-0 top-0 z-50 flex h-screen w-[88vw] max-w-sm flex-col
          border-l border-neutral-200 bg-white text-neutral-900 shadow-2xl
          dark:border-neutral-800 dark:bg-neutral-950 dark:text-white
        "
      >
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-5 dark:border-neutral-800">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
              SkillHigh
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">Navigation</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-900"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={onClose}
                className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-3 font-mono text-sm transition hover:border-neutral-200 hover:bg-neutral-50 dark:hover:border-neutral-800 dark:hover:bg-neutral-900"
              >
                <span>{item.label}</span>
                <ChevronRight className="h-4 w-4 text-neutral-400" />
              </Link>
            ))}
          </nav>

          <div className="my-5 h-px bg-neutral-200 dark:bg-neutral-800" />

          <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900/80">
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
              Preferences
            </p>

            <button
              onClick={toggleTheme}
              className="
                mt-3 flex w-full items-center justify-between rounded-2xl px-3 py-3
                text-sm transition hover:bg-white dark:hover:bg-neutral-950
              "
            >
              <span className="font-sans">
                {theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              </span>
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>

        <div className="border-t border-neutral-200 px-5 py-5 dark:border-neutral-800">
          {isAuthenticated ? (
            <CustomButton
              title={profileLabel}
              icon={<User size={15} />}
              onClick={() => {
                onClose();
                navigate("/profile");
              }}
              className="w-full justify-center"
            />
          ) : (
            <CustomButton
              title="Start learning"
              onClick={() => {
                onClose();
                navigate("/signup");
              }}
              className="w-full justify-center"
            />
          )}
        </div>
      </div>
    </>
  );
}
