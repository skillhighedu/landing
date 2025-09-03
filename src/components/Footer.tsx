

import React from "react";
import Logo from "@/assets/logo.png";
import PP from '../assets/PRIVACY_POLICY.pdf'
import TC from '../assets/TermsandConditions.pdf'

interface SocialLink {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface QuickLink {
  name: string;
  href: string;
  open?:() => void;
}

const socialLinks: SocialLink[] = [
  {
    name: "Twitter",
    href: "https://twitter.com/skillhigh",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M22.46 6c-.77.35-1.6.59-2.47.7a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.39-.58 2.19 0 1.51.77 2.84 1.94 3.62-.72-.02-1.4-.22-1.99-.55v.06c0 2.11 1.5 3.87 3.5 4.27-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.11 2.94 3.97 2.97A8.6 8.6 0 0 1 2 19.54c-.29 0-.57-.02-.85-.05A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/skillhigh",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
      </svg>
    ),
  },
];

 const handlePP = () => {
    window.open(PP, "_blank");
  }
  const handleTC = () => {
    window.open(TC, "_blank");
  }

const companyQuickLinks: QuickLink[] = [

  { name: "Contact Us", href: "/contact-us" },
  { name: "Book a meet",  href: "https://cal.com/skillhigh",  },
  { name: "Privacy Policy", href: "/privacy-policy" ,open:handlePP },
  { name: "Terms and Conditions", href: "/terms-and-conditions" ,open:handleTC },


];



export default function Footer() {
 

  return (
  <footer className=" text-gray-400 py-16 bg-neutral-900  backdrop-blur-md">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      
      {/* Logo + Tagline */}
      <div className="space-y-4">
        <a href="/" className="inline-flex items-center">
          <img src={Logo} alt="Skill High Logo" className="h-16 w-auto" />
        </a>
        <p className="text-sm max-w-xs font-bricolage">
          Learn by building. Grow by doing. Empowering the next generation of developers and tech leaders.
        </p>
      </div>

      {/* Quick Links + Social */}
      <div className="space-y-6">
        <div>
          <h3 className="text-primary  mb-2">Explore</h3>
          <ul className="space-y-2">
            {companyQuickLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href} onClick={link.open} className="hover:text-white font-bricolage transition-colors text-sm">
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-primary mb-2">Connect</h3>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm ">
        <h3 className="text-primary mb-2">Contact</h3>
        <p className="font-bricolage">
          <span className="font-medium">Email:</span>{" "}
          <a href="mailto:admin@skillhigh.in" className="hover:text-white transition-colors">
            admin@skillhigh.in
          </a>
        </p>
        <p  className="font-bricolage">
          <span className="font-medium">Phone:</span>{" "}
          <a href="tel:+919182661204" className="hover:text-white transition-colors">
            +91 9182661204
          </a>
        </p>
        <p className="max-w-xs text-justify font-bricolage">
          <span className="font-medium">Address:</span> P.No: 169, First Floor, Woods Enclave, Woods Central Park, Suchitra Sub Post, Pet Basheerabad, Telangana, India.
        </p>
      </div>

    </div>

    {/* Bottom Bar */}
    <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm">
      © {new Date().getFullYear()} SkillHigh. Empowering Next-Gen Talent.
    </div>
  </div>
</footer>

  );
}
