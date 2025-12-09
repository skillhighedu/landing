import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CustomButton from "@/components/Button";
import { type CourseHeaderProps } from "@/types/dashboard/Course";
import { actions } from "@/data/dashboard/Actions";


export default function CourseHeader({ course, details }: CourseHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-neutral-800 shadow-lg rounded-2xl overflow-hidden border border-neutral-700 p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 max-w-7xl mx-auto mt-6 mb-12"
    >
      <div className="w-full md:w-1/3 flex justify-center">
        <img
          src={course.logo}
          alt={course.name}
          className="w-40 h-40 md:w-56 md:h-56 rounded-xl object-cover border-2 border-neutral-700 shadow-md"
        />
      </div>
      <div className="w-full md:w-2/3 space-y-4 text-center md:text-left">
        <h1 className="text-2xl md:text-3xl font-bold text-lime-400">
          {course.name}
        </h1>
        <p className="text-base text-gray-300">
          {details.totalTopicsCount || 50} Topics • Explore Below
        </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start flex-wrap">
  {actions.map(({ label, icon, href, className }, index) => {
    const Btn = (
      <CustomButton className={className} icon={icon} title={label}>
        {icon}
        {label}
      </CustomButton>
    );

    // If there's a link, wrap in <Link>
    return href ? (
      <Link to={href} key={index}>
        {Btn}
      </Link>
    ) : (
      <div key={index}>{Btn}</div>
    );
  })}
</div>

      </div>
    </motion.div>
  );
}
