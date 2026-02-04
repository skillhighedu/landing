import { useNavigate } from "react-router-dom";
import { BarChart3, FolderKanban, LayoutDashboard, Lock } from "lucide-react";
import ValueRow from "./ValueRow";
import CustomButton from "@/components/common/Button";

export default function DemoValueList({
  courseSlug,
}: {
  courseSlug: string;
}) {
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-8 space-y-4">
        <ValueRow
          icon={BarChart3}
          title="Track progress visually"
          desc="Know exactly where you stand in the course."
        />
        <ValueRow
          icon={FolderKanban}
          title="Projects & bounties"
          desc="Hands-on tasks that simulate real-world work."
        />
        <ValueRow
          icon={LayoutDashboard}
          title="One focused dashboard"
          desc="Everything related to this course in one place."
        />
      </div>

      <div className="mt-10">
        <CustomButton
          onClick={() => navigate(`/course/${courseSlug}/demo`)}
          title="LMS preview"
          icon={<Lock size={16} />}
         
        >
          
          
        </CustomButton>

      
      </div>
    </>
  );
}
