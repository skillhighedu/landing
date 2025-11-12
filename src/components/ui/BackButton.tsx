import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  to?: string; // Default route to navigate back
  label?: string; // Text shown next to icon
  className?: string; // Extra styling override
}

const BackButton: React.FC<BackButtonProps> = ({
  to = "/blogs",
  label = "Back to all blogs",
  className = "",
}) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`inline-flex items-center gap-2 cursor-pointer text-sm font-medium text-primary hover:text-white transition-all duration-200 group ${className}`}
    >
      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
      <span className="">{label}</span>
    </button>
  );
};

export default BackButton;
