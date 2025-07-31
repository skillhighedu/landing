import React from "react";

const HeartPixelIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="currentColor"
    className={`w-6 h-6 text-red-500 ${props.className ?? ""}`}
    {...props}
  >
    <path d="M30.47 8.38H32V16h-1.53Z" />
    <path d="M28.95 16h1.52v3.05h-1.52Z" />
    <path d="M28.95 6.86h1.52v1.52h-1.52Z" />
    <path d="M27.43 19.05h1.52v1.52h-1.52Z" />
    <path d="M27.43 9.9h1.52v3.05h-1.52Z" />
    <path d="M27.43 5.33h1.52v1.53h-1.52Z" />
    <path d="M25.9 8.38h1.53V9.9H25.9Z" />
    <path d="M24.38 20.57h3.05v1.52h-3.05Z" />
    <path d="M22.85 6.86h3.05v1.52h-3.05Z" />
    <path d="M21.33 22.09h3.05v1.53h-3.05Z" />
    <path d="M19.81 3.81h7.62v1.52h-7.62Z" />
    <path d="M18.28 23.62h3.05v1.52h-3.05Z" />
    <path d="M18.28 5.33h1.53v1.53h-1.53Z" />
    <path d="M16.76 25.14h1.52v1.52h-1.52Z" />
    <path d="M16.76 6.86h1.52v1.52h-1.52Z" />
    <path d="M15.24 26.66h1.52v1.53h-1.52Z" />
    <path d="M15.24 8.38h1.52V9.9h-1.52Z" />
    <path d="M13.71 25.14h1.53v1.52h-1.53Z" />
    <path d="M13.71 6.86h1.53v1.52h-1.53Z" />
    <path d="M10.66 23.62h3.05v1.52h-3.05Z" />
    <path d="M12.19 5.33h1.52v1.53h-1.52Z" />
    <path d="M7.62 22.09h3.04v1.53H7.62Z" />
    <path d="M4.57 20.57h3.05v1.52H4.57Z" />
    <path d="M4.57 3.81h7.62v1.52H4.57Z" />
    <path d="M3.05 19.05h1.52v1.52H3.05Z" />
    <path d="M3.05 5.33h1.52v1.53H3.05Z" />
    <path d="M1.52 16h1.53v3.05H1.52Z" />
    <path d="M1.52 6.86h1.53v1.52H1.52Z" />
    <path d="M0 8.38h1.52V16H0Z" />
  </svg>
);

export default HeartPixelIcon;
