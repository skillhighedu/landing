import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  label?: string;
  className?: string;
}

export default function BackButton({ label = "Back", className = "" }: BackButtonProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white hover:bg-neutral-700 hover:border-neutral-600 transition-colors font-normal ${className}`}
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
}
