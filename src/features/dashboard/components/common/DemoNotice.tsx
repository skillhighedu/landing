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
        px-5 py-4
        flex flex-col md:flex-row
        items-start md:items-center
        justify-between
        gap-4
      "
    >
      <div className="flex items-start gap-3">
        <Lock className="mt-1" size={18} />
        <div>
          <p className="font-medium">
            You are viewing the demo dashboard
          </p>
          <p className="text-sm text-muted-foreground">
            Some features are locked. Purchase the course to unlock full access.
          </p>
        </div>
      </div>

      <CustomButton
        title="Buy Course"
        icon={<Lock size={16} />}
        onClick={() => navigate(`/course/${slug}`)}
      />
    </div>
  );
}
