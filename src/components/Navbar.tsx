import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "@/assets/logo.png";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

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

  return (
    <>
      {/* Main Navbar */}
      <div
        className={`fixed top-0 left-0 w-full transition-transform duration-300 ease-in-out z-50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Desktop Nav */}
        <div className="hidden md:flex justify-center p-4">
          <NavigationMenu viewport={false} className="w-full max-w-5xl px-4">
            <NavigationMenuList className="bg-background w-full rounded-full shadow-md px-6 py-3 flex items-center gap-6">
              <NavigationMenuItem>
                <img src={Logo} className="h-10" alt="Logo" />
              </NavigationMenuItem>

              <NavigationMenuItem className="text-neutral-900 font-medium">
                <Link to="/home">Home</Link>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-neutral-900">
                  Courses
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4">Coming Soon</div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link
                  to="/contact"
                  className="flex items-center justify-center w-32 h-10 bg-amber-400 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
                >
                  Contact
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden mx-2 mt-2 mb-3 px-4 py-3 bg-background rounded-full shadow-md flex items-center justify-between">
          <img src={Logo} className="h-8" alt="Logo" />

          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            aria-label={isDrawerOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isDrawerOpen}
            className="text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-1 rounded"
          >
            {isDrawerOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-background shadow-lg z-50 px-6 py-10"
          >
            <nav className="flex flex-col gap-6 text-lg text-neutral-800 font-semibold">
              <Link to="/home" onClick={() => setDrawerOpen(false)}>
                Home
              </Link>
              <Link to="/courses" onClick={() => setDrawerOpen(false)}>
                Courses
              </Link>
              <Link to="/contact" onClick={() => setDrawerOpen(false)}>
                Contact
              </Link>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for Drawer */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
