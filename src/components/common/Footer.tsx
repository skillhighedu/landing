import Logo from "@/assets/logo.png";
import PP from "@/assets/PRIVACY_POLICY.pdf";
import TC from "@/assets/TermsandConditions.pdf";
import {
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
} from "lucide-react";

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function Footer() {
  return (
    <footer
      className="
        relative overflow-hidden
        bg-neutral-50 dark:bg-neutral-950
        border-t border-neutral-200 dark:border-neutral-800 
      "
    >
      {/* ================= Decorative Curves ================= */}

      {/* Left curve */}
      <div
        className="
          pointer-events-none
          absolute -top-40 -left-40
          h-96 w-96
          rounded-full
          bg-gradient-to-br from-primary/20 via-primary/10 to-transparent
          blur-3xl
          dark:from-primary/25 dark:via-primary/10
        "
      />

      {/* Right curve */}
      <div
        className="
          pointer-events-none
          absolute -top-40 -right-40
          h-96 w-96
          rounded-full
          bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent
          blur-3xl
          dark:from-primary/25 dark:via-primary/10
        "
      />

      {/* ================= Content ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-14">

          {/* Brand */}
          <div className="space-y-5">
            <a href="/" className="inline-flex items-center gap-2">
              <img src={Logo} alt="SkillHigh Logo" className="h-11 w-auto" />
            </a>

            <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 max-w-sm">
              Learn by building. Grow by doing. Empowering the next generation
              of developers, creators, and leaders through practical learning.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              {[
                {
                  label: "LinkedIn",
                  icon: Linkedin,
                  url: "https://www.linkedin.com/company/skillhigh",
                },
                {
                  label: "Instagram",
                  icon: Instagram,
                  url: "https://www.instagram.com/skillhighedutechnologies/",
                },
                {
                  label: "YouTube",
                  icon: Youtube,
                  url: "https://www.youtube.com/@SkillHighTechnologies",
                },
                {
                  label: "X",
                  icon: Twitter,
                  url: "https://x.com/SkillHighedu",
                },
                {
                  label: "Facebook",
                  icon: Facebook,
                  url: "https://www.facebook.com/share/1AYSxjWiyZ/",
                },
              ].map(({ label, icon: Icon, url }) => (
                <button
                  key={label}
                  onClick={() => openExternal(url)}
                  aria-label={label}
                  className="
                    p-2 rounded-lg
                    bg-neutral-200 text-neutral-700
                    hover:bg-neutral-300 hover:text-black
                    transition

                    dark:bg-neutral-900 dark:text-neutral-400
                    dark:hover:bg-neutral-800 dark:hover:text-white
                  "
                >
                  <Icon className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-900 dark:text-white">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <a href="/about" className="hover:text-black dark:hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact-us" className="hover:text-black dark:hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/skillhigh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Book a Meet
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  onClick={() => openExternal(PP)}
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => openExternal(TC)}
                  className="hover:text-black dark:hover:text-white transition"
                >
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-neutral-900 dark:text-white">
              Get in touch
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <a
                  href="mailto:admin@skillhigh.in"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  admin@skillhigh.in
                </a>
              </li>
              <li>
                <a
                  href="tel:+919182661204"
                  className="hover:text-black dark:hover:text-white transition"
                >
                  +91 9182661204
                </a>
              </li>
              <li className="leading-relaxed">
                CFJ4+PPQ Cluster, Malkajgiri 55 Block-04, Teachers Colony,
                Greenlands, Begumpet, Hyderabad, Telangana 500016
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="
          relative z-10
          border-t border-neutral-200 dark:border-neutral-800
          py-6 text-center
          text-xs sm:text-sm
          text-neutral-500
        "
      >
        © {new Date().getFullYear()}{" "}
        <span className="text-neutral-900 dark:text-white font-medium">
          SkillHigh
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
}
