import { Lock } from "lucide-react";
import CustomButton from "@/components/common/Button";
import { useDashboardRouteStore } from "@/store/dashboardRoute.store";
import { useNavigate } from "react-router-dom";

export default function DemoNotice() {
  const navigate = useNavigate();
  const { slug } = useDashboardRouteStore();

  return (
    <div
      className="
        mb-6
        rounded-2xl
        border border-border
        bg-muted/40
        px-4 sm:px-6 py-4 sm:py-5
        flex flex-col lg:flex-row
        items-start lg:items-center
        justify-between
        gap-4
      "
    >
      {/* Left Content */}
      <div className="flex items-start gap-3 max-w-xl">
        <div className="p-2 rounded-lg bg-primary/10">
          <Lock size={18} className="text-primary" />
        </div>

        <div>
          <p className="text-sm sm:text-base ">
            You are viewing the demo dashboard
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1 font-mono">
            Some features are locked. Purchase the course to unlock full access.
          </p>
        </div>
      </div>

      {/* CTA */}
      <CustomButton
        title="Buy Course"
        icon={<Lock size={16} />}
        onClick={() => navigate(`/course/${slug}`)}
        className="w-full sm:w-auto"
      />
    </div>
  );
}
