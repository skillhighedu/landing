import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "@/components/common/Button";
import { getCourseActions } from "@/data/dashboard/Actions";

export default function CourseHeader({
  courseName,
  courseThumbnail,
  slug,
}: any) {
  const actions = getCourseActions(slug);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="max-w-7xl mx-auto mt-8 mb-12 px-2 sm:px-0"
    >
      <div
        className="
          relative overflow-hidden rounded-2xl sm:rounded-3xl
          flex flex-col justify-end
          min-h-[220px] sm:min-h-[280px] md:min-h-[340px]
        "
      >
        {/* Background image */}
        <img
          src={courseThumbnail}
          alt={courseName}
          className="
            absolute inset-0 h-full w-full object-cover
            scale-105
          "
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/55" />

        {/* Content */}
        <div
          className="
            relative z-10
            w-full
            p-4 sm:p-6 md:p-10
            text-white
          "
        >
          {/* Title */}
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-semibold leading-tight">
              {courseName}
            </h1>

            <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-white/80">
              Your learning space · Course overview
            </p>
          </div>

          {/* Actions */}
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
              const Btn = (
                <CustomButton
                  className={`text-xs sm:text-sm ${className}`}
                  icon={icon}
                  title={label}
                >
                  {icon}
                  {label}
                </CustomButton>
              );

              return href ? (
                <Link to={href} key={i} className="w-full sm:w-auto">
                  {Btn}
                </Link>
              ) : (
                <div key={i} className="w-full sm:w-auto">
                  {Btn}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
