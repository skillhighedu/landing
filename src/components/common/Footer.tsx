
import Logo from "@/assets/logo.png";
import PP from "@/assets/PRIVACY_POLICY.pdf";
import TC from "@/assets/TermsandConditions.pdf";
import { Linkedin, Instagram, Youtube } from "lucide-react";
const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/skillhigh",
    icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/skillhightechnologies",
    icon: <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@SkillHighTechnologies",
    icon: <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />,
  },
];

const handlePP = () => window.open(PP, "_blank");
const handleTC = () => window.open(TC, "_blank");

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-gray-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <div className="space-y-5">
            <a href="/" className="inline-flex items-center gap-2">
              <img src={Logo} alt="SkillHigh Logo" className="h-12 w-auto" />
             
            </a>
            <p className="text-sm leading-relaxed text-gray-400 max-w-sm font-bricolage">
              Learn by building. Grow by doing. Empowering the next generation
              of developers, creators, and leaders through practical learning.
            </p>

            <div className="flex items-center gap-4 mt-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Company */}
          <div>
            <h3 className="text-white  mb-4 tracking-wide">
              Company
            </h3>
            <ul className="space-y-3 text-sm font-bricolage">
              <li>
                <a
                  href="/about"
                  className="hover:text-white transition-colors duration-200"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="hover:text-white transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/skillhigh"
                  target="_blank"
                  className="hover:text-white transition-colors duration-200"
                >
                  Book a Meet
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 — Legal */}
          <div>
            <h3 className="text-white  mb-4 tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3 text-sm font-bricolage">
              <li>
                <button
                  onClick={handlePP}
                  className="hover:text-white transition-colors duration-200"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={handleTC}
                  className="hover:text-white transition-colors duration-200"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <h3 className="text-white  mb-4 tracking-wide">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm font-bricolage">
              <li>
                <span className="font-medium">Email:</span>{" "}
                <a
                  href="mailto:admin@skillhigh.in"
                  className="hover:text-white transition-colors duration-200"
                >
                  admin@skillhigh.in
                </a>
              </li>
              <li>
                <span className="font-medium">Phone:</span>{" "}
                <a
                  href="tel:+919182661204"
                  className="hover:text-white transition-colors duration-200"
                >
                  +91 9182661204
                </a>
              </li>
              <li className="text-gray-400 text-sm leading-relaxed max-w-xs">
                CFJ4+PPQ Cluster, Malkajgiri 55 Block-04, Teachers Colony,
                Greenlands, Begumpet, Hyderabad, Telangana 500016
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-16 border-t border-neutral-800 pt-8 flex items-center justify-center text-xs sm:text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">SkillHigh</span>. All
            rights reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
