import Logo from "@/assets/logo.png";
import PP from "@/assets/PRIVACY_POLICY.pdf";
import TC from "@/assets/TermsandConditions.pdf";
import { Linkedin, Instagram, Youtube, Twitter, Facebook } from "lucide-react";

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const handlePP = () => openExternal(PP);
const handleTC = () => openExternal(TC);

export default function Footer() {
  return (
    <footer className="relative bg-neutral-950 text-gray-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-5">
            <a href="/" className="inline-flex items-center gap-2">
              <img src={Logo} alt="SkillHigh Logo" className="h-12 w-auto" />
            </a>

            <p className="text-sm leading-relaxed text-gray-400 max-w-sm">
              Learn by building. Grow by doing. Empowering the next generation
              of developers, creators, and leaders through practical learning.
            </p>

            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() =>
                  openExternal("https://www.linkedin.com/company/skillhigh")
                }
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-white transition"
              >
                <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() =>
                  openExternal(
                    "https://www.instagram.com/skillhighedutechnologies/"
                  )
                }
                aria-label="Instagram"
                className="text-gray-400 hover:text-white transition"
              >
                <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              <button
                onClick={() =>
                  openExternal("https://www.youtube.com/@SkillHighTechnologies")
                }
                aria-label="YouTube"
                className="text-gray-400 hover:text-white transition"
              >
                <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* X (Twitter) */}
              <button
                onClick={() => openExternal("https://x.com/SkillHighedu")}
                aria-label="X"
                className="text-gray-400 hover:text-white transition"
              >
                <Twitter className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Facebook */}
              <button
                onClick={() =>
                  openExternal("https://www.facebook.com/share/1AYSxjWiyZ/")
                }
                aria-label="Facebook"
                className="text-gray-400 hover:text-white transition"
              >
                <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white mb-4">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="/about" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-white">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/skillhigh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  Book a Meet
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white mb-4">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={handlePP} className="hover:text-white">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={handleTC} className="hover:text-white">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:admin@skillhigh.in"
                  className="hover:text-white"
                >
                  admin@skillhigh.in
                </a>
              </li>
              <li>
                Phone:{" "}
                <a href="tel:+919182661204" className="hover:text-white">
                  +91 9182661204
                </a>
              </li>
              <li className="text-gray-400 text-sm">
                CFJ4+PPQ Cluster, Malkajgiri 55 Block-04, Teachers Colony,
                Greenlands, Begumpet, Hyderabad, Telangana 500016
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-neutral-800 pt-8 text-center text-xs sm:text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-white">SkillHigh</span>. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
