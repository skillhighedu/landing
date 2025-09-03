

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
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/skillhigh",
    icon: (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.25c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.25 12.25h-3v-5.5c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.44-2.13 2.93v5.6h-3v-11h2.88v1.5h.04c.4-.76 1.38-1.56 2.85-1.56 3.05 0 3.61 2.01 3.61 4.62v6.44z"/>
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
