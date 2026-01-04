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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-7xl mx-auto mt-10 mb-14"
    >
      <div
        className="
        bg-neutral-900 border border-neutral-800 rounded-3xl 
        p-8 md:p-12 grid md:grid-cols-[220px_1fr] gap-10
      "
      >
        {/* Thumbnail */}
        <div className="flex justify-center md:justify-start">
          <img
            src={courseThumbnail}
            alt={courseName}
            className="w-52 h-52 md:w-56 md:h-56 rounded-2xl object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col justify-between gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
              {courseName}
            </h1>
            <p className="text-neutral-400 text-sm mt-2">
              Your learning space · Course Overview
            </p>
          </div>

          {/* Actions */}
          <div
            className="
            flex flex-wrap gap-3 
            bg-neutral-800/50 border border-neutral-700/50 
            rounded-xl p-4
          "
          >
            {actions.map(({ label, icon, href, className }, i) => {
              const Btn = (
                <CustomButton className={className} icon={icon} title={label}>
                  {icon}
                  {label}
                </CustomButton>
              );

              return href ? (
                <Link to={href} key={i}>
                  {Btn}
                </Link>
              ) : (
                <div key={i}>{Btn}</div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
