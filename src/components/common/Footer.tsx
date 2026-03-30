import { Link } from "react-router-dom";
import Logo from "@/assets/logo.png";
import PP from "@/assets/PRIVACY_POLICY.pdf";
import TC from "@/assets/TermsandConditions.pdf";
import {
  Linkedin,
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const socialLinks = [
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
];

const openExternal = (url: string) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-950">
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-0 h-80 w-80 rounded-full bg-gradient-to-bl from-primary/20 via-primary/10 to-transparent blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-12 lg:py-20">
     

        <div className="grid gap-10 sm:grid-cols-2 xl:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <div className="space-y-5">
            <Link to="/" className="inline-flex cursor-pointer items-center gap-2">
              <img src={Logo} alt="SkillHigh Logo" className="h-11 w-auto" />
            </Link>

            <p className="max-w-sm font-mono text-sm leading-7 text-neutral-600 dark:text-neutral-400">
              Learn by building. Grow by doing. SkillHigh helps the next generation of developers, creators, and leaders build useful skills with confidence.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {socialLinks.map(({ label, icon: Icon, url }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => openExternal(url)}
                  aria-label={label}
                  className="inline-flex cursor-pointer items-center justify-center rounded-xl border border-neutral-200 bg-white p-2.5 text-neutral-600 transition hover:-translate-y-0.5 hover:border-primary/30 hover:bg-primary/5 hover:text-primary dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-primary/30 dark:hover:bg-primary/10 dark:hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:text-white">
              Explore
            </h3>
            <ul className="space-y-3 font-mono text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <Link
                  to="/all-courses"
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  to="/blogs"
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact-us"
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-3 font-mono text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={() => openExternal(PP)}
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openExternal(TC)}
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openExternal("https://cal.com/skillhigh")}
                  className="inline-flex cursor-pointer transition hover:text-black dark:hover:text-white"
                >
                  Book a Meet
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-neutral-900 dark:text-white">
              Get In Touch
            </h3>
            <ul className="space-y-4 font-mono text-sm text-neutral-600 dark:text-neutral-400">
              <li>
                <a
                  href="mailto:admin@skillhigh.in"
                  className="inline-flex cursor-pointer items-start gap-3 transition hover:text-black dark:hover:text-white"
                >
                  <Mail size={16} className="mt-0.5 shrink-0" />
                  <span>admin@skillhigh.in</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919182661204"
                  className="inline-flex cursor-pointer items-start gap-3 transition hover:text-black dark:hover:text-white"
                >
                  <Phone size={16} className="mt-0.5 shrink-0" />
                  <span>+91 9182661204</span>
                </a>
              </li>
              <li className="flex items-start gap-3 leading-7">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>
                  CFJ4+PPQ Cluster, Malkajgiri 55 Block-04, Teachers Colony, Greenlands, Begumpet, Hyderabad, Telangana 500016
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-neutral-200 px-4 py-5 dark:border-neutral-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 text-center text-xs text-neutral-500 sm:flex-row sm:text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-medium text-neutral-900 dark:text-white">SkillHigh</span>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/all-courses"
              className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-white"
            >
              Programs
            </Link>
            <Link
              to="/careers"
              className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-white"
            >
              Careers
            </Link>
            <Link
              to="/blogs"
              className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-white"
            >
              Blogs
            </Link>
            <Link
              to="/contact-us"
              className="cursor-pointer transition hover:text-neutral-900 dark:hover:text-white"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
