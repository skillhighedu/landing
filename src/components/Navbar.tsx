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
import { Button } from "./ui/button";
import { Icons } from "@/assets/icons/icons";
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
      <div
        className={`fixed top-0 left-0 w-full bg-neutral-900 font-pixel  text-white to-neutral-800 z-50 transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
        role="navigation"
        aria-label="Main Navigation"
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          <Link to="/">
            <img src={Logo} alt="SkillHigh" className="h-10" />
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex   font-medium">
              <NavigationMenuItem>
                
                <Button variant="link" className="text-md">{Icons[0].svgIcon} Home </Button>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className=" bg-transparent hover:bg-transparent">
                          <Button variant="link" className="text-md">{Icons[0].svgIcon} Courses </Button>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-neutral-900 border-none  rounded-md p-4">
                  <div className="text-white border-none">Coming Soon</div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

         <Link to="/signup">
           <Button
            className="bg-green-800 text-white text-base sm:text-md  py-3 px-6 sm:py-4 sm:px-8 hover:bg-lime-400 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-lime-300 flex items-center gap-2"
            aria-label="Start Building Skills"
          >
           Start Your Journey
          
          </Button>
         </Link>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 shadow-sm">
          <img src={Logo} className="h-8" alt="SkillHigh" />
          <button
            onClick={() => setDrawerOpen(!isDrawerOpen)}
            aria-label={isDrawerOpen ? "Close Menu" : "Open Menu"}
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
            className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-white shadow-lg z-50 px-6 py-10"
          >
            <nav className="flex flex-col gap-6 text-lg text-neutral-800 font-semibold">
              <Link to="/home" onClick={() => setDrawerOpen(false)}>Home</Link>
              <Link to="/courses" onClick={() => setDrawerOpen(false)}>Courses</Link>
             
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Mobile Drawer Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40"
          onClick={() => setDrawerOpen(false)}
        />
      )}
    </>
  );
}
