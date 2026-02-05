import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import { getCourseActions } from "@/data/dashboard/Actions";

interface Props {
  slug: string;
  mode: "demo" | "real";
}

export default function CourseHeaderActions({ slug, mode }: Props) {
  const actions = getCourseActions(slug, mode);

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
      {actions.map(({ label, icon, href, className }, i) => {
        const button = (
          <CustomButton
            className={`text-xs sm:text-sm ${className}`}
            icon={icon}
            title={label}
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
