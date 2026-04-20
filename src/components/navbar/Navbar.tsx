"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Menu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { usePublicCoursesStore } from "@/store/publicCoursesStore";
import { useAuthStore } from "@/store/authStore";
import { useSidebarStore } from "../../features/dashboard/store/sidebar.store";

import DesktopNavbar from "./DesktopNavbar";
import MobileDrawer from "./MobileDrawer";
import type { Department } from "./types";
import Container from "@/layouts/Container";
const MOBILE_CTA_HIDDEN_ROUTES = [
  "/mentor",
  "/certificate/verify",
  "/course-dashboard",
  "/profile",
];

export default function Navbar() {
  const departments = usePublicCoursesStore(
    (s) => s.departments
  ) as Department[];

  const navigate = useNavigate();
  const { checkAuth, isAuthenticated } = useAuthStore();
  const { open } = useSidebarStore();

  const location = useLocation();
  const isCourseDashboard =
    location.pathname.startsWith("/course-dashboard") || location.pathname.includes("/demo");
  const shouldShowMobileCta =
    !isAuthenticated &&
    !MOBILE_CTA_HIDDEN_ROUTES.some((route) =>
      location.pathname.startsWith(route)
    );


  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(0);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /* Hide / show navbar on scroll */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y < lastScrollY || y < 100);
      setLastScrollY(y);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastScrollY]);

  /* Close dropdown outside */
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
          pointer-events-none fixed top-0 left-0 w-full z-50
          transition-[padding,transform] duration-300
          ${isVisible ? "translate-y-0" : "-translate-y-full"}
          ${isCourseDashboard ? (open ? "lg:pl-60" : "lg:pl-16") : ""}
        `}
      >
        <Container size="full">
          <div
            className="
              pointer-events-auto
              mx-auto px-4 sm:px-6 py-3
              flex items-center justify-between
              rounded-b-2xl
              backdrop-blur-xl
              bg-white/70 dark:bg-neutral-900/70
              border-b border-black/5 dark:border-white/10
            "
          >
            <DesktopNavbar
              departments={departments}
              dropdownRef={dropdownRef}
              coursesOpen={coursesOpen}
              setCoursesOpen={setCoursesOpen}
              selectedDept={selectedDept}
              setSelectedDept={setSelectedDept}
            />

            <div className="ml-3 flex items-center gap-2 md:hidden">
              {shouldShowMobileCta && (
                <button
                  onClick={() => navigate("/login")}
                  className="
                    inline-flex h-10 items-center gap-2 rounded-xl
                    border-2 border-black bg-primary px-3
                    font-mono text-xs font-semibold uppercase tracking-[0.08em] text-white
                    shadow-[2px_2px_0_#000] transition
                    hover:bg-primary/90
                  "
                  aria-label="Start Learning"
                >
                  <span className="hidden min-[380px]:inline">Start Learning</span>
                  <span className="min-[380px]:hidden">Start</span>
                  <ArrowRight size={14} />
                </button>
              )}

              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open menu"
                className="
                  inline-flex items-center justify-center
                  rounded-xl p-2.5
                  text-neutral-700 dark:text-neutral-200
                  hover:bg-neutral-200/60 dark:hover:bg-neutral-800/60
                  active:scale-95 transition
                "
              >
                <Menu size={22} />
              </button>
            </div>
          </div>
        </Container>
      </header>

      <MobileDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </>
  );
}
