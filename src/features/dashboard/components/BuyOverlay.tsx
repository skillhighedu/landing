import CustomButton from "@/components/common/Button";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";

export default function BuyOverlay() {
  const navigate = useNavigate();
  const { slug } = useDashboardRouteStore();

  return (
    <div
      className="
        absolute inset-0 z-30
        flex flex-col items-center justify-center text-center
        backdrop-blur-xl
        p-6
      "
    >
      <h3 className="text-xl mb-3 text-white">
        Unlock this lesson
      </h3>

      <p className="text-white/70 font-sans text-sm mb-6 max-w-sm">
        Purchase the course to continue watching this content.
      </p>

      <CustomButton
        title="Buy Course"
        icon={<Lock />}
        onClick={() => navigate(`/course/${slug}`)}
        className="
          bg-white text-black
          font-medium
          hover:opacity-90 transition
        "
      />
    </div>
  );
}
