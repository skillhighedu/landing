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
        mt-5 sm:mt-6
        flex flex-wrap gap-2 sm:gap-3
        w-full
        rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-md sm:w-fit sm:p-4
      "
    >
      {actions.map(({ label, icon, href, onClick,  }, i) => {
        const isCertificateAction = label === "Claim Certificates";
        const isLoading = isCertificateAction && generateMutation.isPending;
        const buttonTitle = isLoading ? "Preparing Certificates..." : label;
        const button = (
          <CustomButton
            className="w-full justify-center font-mono text-xs sm:w-auto sm:text-sm"
            icon={icon}
            title={buttonTitle}
            loading={isLoading}
            disabled={isLoading}
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
