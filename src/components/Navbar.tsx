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
import {  X } from "lucide-react";
import Logo from "@/assets/logo.png";
import { Button } from "./ui/button";

import HomeIcon from "@/components/icons/Home";
import { departments } from "@/data/departments";
import CustomButton from "./Button";
import MenuIcon from "./icons/Menu";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [selectedDeptIndex, setSelectedDeptIndex] = useState(0); // default to first department

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
      <div
        className={`fixed top-0 left-0 w-full bg-neutral-900 font-pixel text-white z-50 transition-transform duration-300 ease-in-out ${isVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link to="/">
            <img src={Logo} alt="SkillHigh" className="h-12 " />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex font-medium">
              <NavigationMenuItem>
                <Button variant="link" className="text-md">
                  <HomeIcon /> Home
                </Button>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                  <Button variant="link" className="text-md">
                    Courses
                  </Button>
                </NavigationMenuTrigger>

                {/* Courses Dropdown */}
                <NavigationMenuContent className="bg-neutral-900 border-none rounded-md p-4 min-w-[600px]">
                  <div className="text-white flex gap-6">
                    {/* Departments List (left column) */}
                    <div className="flex flex-col gap-2 w-auto border-r border-neutral-700 pr-4">
                      {departments.map((department, index) => (
                        <Button
                          key={department.name}
                          variant={selectedDeptIndex === index ? "secondary" : "ghost"}
                          onClick={() => setSelectedDeptIndex(index)}
                          className="text-left justify-start w-full"
                        >
                          {department.name}
                        </Button>
                      ))}
                    </div>

                    {/* Courses List (right column) */}
                    <div className="flex flex-col gap-2 w-[200px]">
                      {departments[selectedDeptIndex]?.courses.map((course) => (
                        <div
                          key={course}
                          className="text-sm hover:underline cursor-pointer transition"
                        >
                          {course}
                        </div>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link to="/signup">

            <CustomButton title=" Start Your Journey" icon="" />
          </Link>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 shadow-sm">
          <img src={Logo} className="h-8" alt="SkillHigh" />
          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            aria-label={isDrawerOpen ? "Close Menu" : "Open Menu"}
            className="text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-1 rounded"
          >
            {isDrawerOpen ? <X size={24} className="text-red-500" /> : <MenuIcon />}
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
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex justify-end px-4 py-6 sm:px-6 sm:py-10"
          >
            <div className="relative h-full w-full max-w-sm sm:max-w-md bg-neutral-800 rounded-2xl shadow-xl px-6 py-10 ">

              {/* Close Button */}
              <button
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 text-white hover:text-red-400 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

          <div className="flex flex-col h-full justify-between">
  {/* Navigation Menu */}
  <nav className="pt-8 flex flex-col items-end gap-6 text-lg leading-relaxed text-white">
    <Link to="/home" onClick={() => setDrawerOpen(false)}>
      Home
    </Link>
    <Link to="/courses" onClick={() => setDrawerOpen(false)}>
      Courses
    </Link>
    {/* Add more links here */}
  </nav>

  {/* CTA Button */}
  <div className="">
    <CustomButton title="Start Your Journey" icon="" />
  </div>
</div>


            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
