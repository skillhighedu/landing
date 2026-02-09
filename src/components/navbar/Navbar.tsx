"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useAuthStore } from "@/store/authStore";
import { useSidebarStore } from "../../features/dashboard/store/sidebar.store";

import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import type { Department } from "./types";

export default function Navbar() {
  const departments = usePublicCoursesStore(
    (s) => s.departments
  ) as Department[];

  const { checkAuth } = useAuthStore();
  const open = useSidebarStore((s) => s.open);   // ← sidebar state

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Hide / show navbar on scroll
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastScrollY || y < 100);
      setLastScrollY(y);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setCoursesOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${open ? "lg:pl-56" : "lg:pl-16"}
        `}
      >
        <div
          className="
            mx-auto max-w-7xl
            px-4 sm:px-6 py-3
            flex items-center justify-between
            rounded-b-2xl
            backdrop-blur-xl
            bg-white/70 dark:bg-neutral-900/70
            border-b border-black/5 dark:border-white/10
          "
        >
          {/* Desktop navbar */}
          <DesktopNavbar
            departments={departments}
            dropdownRef={dropdownRef}
            coursesOpen={coursesOpen}
            setCoursesOpen={setCoursesOpen}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
          />

          {/* Mobile menu button */}
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open menu"
            className="
              md:hidden
              inline-flex items-center justify-center
              rounded-xl
              p-2.5
              text-neutral-700 dark:text-neutral-200
              hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60
              active:scale-95
              transition
            "
          >
            <Menu size={22} />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
