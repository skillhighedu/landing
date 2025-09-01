import React from "react";

interface Props {
  redirectUrl?: string; // optional redirect after login
}

const GoogleLoginButton: React.FC<Props> = ({ redirectUrl }) => {
  const handleLogin = () => {
    window.location.href =
      redirectUrl || "https://skillhigh.in/api/v2/auth/google";
  };

  return (
    <button
      onClick={handleLogin}
      className="
        flex items-center justify-center gap-3
        w-full max-w-sm mt-2
        px-2 py-3
        text-sm font-medium text-gray-700 cursor-pointer
        pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] 
        bg-white border border-gray-300 rounded-xl 
        hover:bg-gray-50 
        transition-all duration-200
      "
    >
      <svg
        className="w-5 h-5"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.9 0 7.4 1.5 10.1 3.9l7.5-7.5C37.9 1.6 31.5-1 24-1 14.6-1 6.4 4.8 2.4 13.2l8.9 6.9C13 14.6 18.1 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.1 24.5c0-1.5-.1-3-.3-4.5H24v9h12.4c-.5 2.6-1.9 4.7-3.9 6.2l6.1 4.7c3.6-3.3 5.5-8.3 5.5-15.4z"
        />
        <path
          fill="#FBBC05"
          d="M11.3 28.2c-.5-1.6-.8-3.2-.8-5 0-1.7.3-3.4.8-5l-8.9-6.9C.9 14.9 0 19.3 0 23.2s.9 8.3 2.4 11.9l8.9-6.9z"
        />
        <path
          fill="#EA4335"
          d="M24 47c6.5 0 12-2.1 16-5.8l-6.1-4.7c-2 1.4-4.7 2.2-7.9 2.2-5.9 0-11-5.1-12.7-11.9l-8.9 6.9C6.4 43.2 14.6 47 24 47z"
        />
      </svg>
      <span>Sign in with Google</span>
    </button>
  );
};

export default GoogleLoginButton;
