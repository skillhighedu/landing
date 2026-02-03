"use client";

import { useEffect, useRef, useState } from "react";
import MenuIcon from "@/components/icons/Menu";
import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useAuthStore } from "@/store/authStore";
import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import  type { Department } from "./types";

export default function Navbar() {
  const departments = usePublicCoursesStore(
    (s) => s.departments
  ) as Department[];

  const { checkAuth } = useAuthStore();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastScrollY || y < 100);
      setLastScrollY(y);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCoursesOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between rounded-b-2xl backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 border-b border-black/5 dark:border-white/10">
          <DesktopNavbar
            departments={departments}
            dropdownRef={dropdownRef}
            coursesOpen={coursesOpen}
            setCoursesOpen={setCoursesOpen}
            selectedDept={selectedDept}
            setSelectedDept={setSelectedDept}
          />

          <button className="md:hidden" onClick={() => setDrawerOpen(true)}>
            <MenuIcon />
          </button>
        </div>
      </header>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
