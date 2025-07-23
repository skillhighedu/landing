import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

const navItems = [
  { to: "/home", label: "Home", ariaLabel: "Go to homepage" },
  { to: "/blogs", label: "Blogs", ariaLabel: "View blog posts" },
  { to: "/story", label: "Our Story", ariaLabel: "Learn about our story" },
];

export default function Navbar() {
  return (
    <div className="flex justify-center shadow-md p-3 md:p-4">
      <NavigationMenu>
        <NavigationMenuList className="bg-background w-full max-w-3xl rounded-full shadow-md px-4 py-2 md:px-6 md:py-3 flex items-center gap-4 md:gap-6">
          <NavigationMenuItem>
            <Link
              to="/"
              className="flex items-center justify-center w-28 h-9 md:w-32 md:h-10 bg-primary text-white text-sm font-medium rounded-full hover:bg-gray-800 transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              aria-label="Go to SkillHigh homepage"
            >
              SkillHigh
            </Link>
          </NavigationMenuItem>
          {navItems.map((item) => (
            <NavigationMenuItem key={item.to}>
              <Link
                to={item.to}
                className="text-sm font-medium text-foreground hover:text-muted-foreground transition focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                aria-label={item.ariaLabel}
              >
                {item.label}
              </Link>
            </NavigationMenuItem>
          ))}
          <NavigationMenuItem>
            <Link
              to="/contact"
              className="flex items-center justify-center w-28 h-9 md:w-32 md:h-10 bg-amber-400 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition focus:ring-2 focus:ring-offset-2 focus:ring-amber-400"
              aria-label="Go to contact page"
            >
              Contact
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}