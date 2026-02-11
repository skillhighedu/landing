import { Link, useNavigate } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import { getCourseActions } from "@/data/dashboard/Actions";
import { useGenerateCertificate } from "@/features/certificate/hooks/useCertificate";

interface Props {
  slug: string;
  mode: "demo" | "real";
}

export default function CourseHeaderActions({ slug, mode }: Props) {
  const navigate = useNavigate();
  const generateMutation = useGenerateCertificate();

  const actions = getCourseActions(slug, mode, () =>
    generateMutation.mutate({
      slug,
      navigate,
    })
  );

  return (
    <div
      className="
        mt-4 sm:mt-6
        flex flex-wrap gap-2 sm:gap-3
        bg-white/10 backdrop-blur-md
        rounded-xl p-3 sm:p-4
        w-full sm:w-fit
      "
    >
      {actions.map(({ label, icon, href, onClick,  }, i) => {
        const button = (
          <CustomButton
            className={`text-xs sm:text-sm`}
            icon={icon}
            title={label}
            onClick={onClick}
          />
        );

        return href ? (
          <Link key={i} to={href} className="w-full sm:w-auto">
            {button}
          </Link>
        ) : (
          <div key={i} className="w-full sm:w-auto">
            {button}
          </div>
        );
      })}
    </div>
  );
}
