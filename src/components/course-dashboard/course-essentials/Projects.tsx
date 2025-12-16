import { useState, useEffect } from "react";
import { FileText, Upload } from "lucide-react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import CustomButton from "@/components/common/Button";;

import { courseProjectsData, type Project } from "@/data/courseProjects";
import HeaderSection from "@/components/common/HeaderSection";
import DashboardLayout from "@/layouts/DashboardLayout";

export default function Projects() {
  const { courseId } = useParams<{ courseId: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const loadedProjects = courseProjectsData[courseId || "67691eb73f409fe0a9890a04"] || [];
    setProjects(loadedProjects);
    setIsLoading(false);
  }, [courseId]);

  const handleSubmit = (project: Project) => {
    // TODO: Implement project submission modal
    console.log("Submit project:", project);
  };

  return (
   <DashboardLayout>
     <div className="min-h-screen bg-linear-to-b from-neutral-950 to-neutral-900 p-6 md:p-10  text-white font-pixel">
      {/* Header Section */}
         {/* Page Header */}
            <div className="max-w-6xl mx-auto mb-10">
              <HeaderSection title="Projects" />
            </div>
      

      {/* Projects Grid */}
      <div className="max-w-6xl mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {isLoading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-80 w-full bg-[#1a1a1a] rounded-2xl animate-pulse border-2 border-black"
              />
            ))
          ) : projects && projects.length > 0 ? (
            projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-[#1a1a1a] shadow-2xl rounded-2xl overflow-hidden border-2 border-black hover:border-[#16C47F]/50 transition-all duration-300 flex flex-col"
              >
                {/* Card Content */}
                <div className="p-6 flex flex-col flex-1">
                  {/* Project Number and Title */}
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-md bg-[#16C47F]/20 flex items-center justify-center border-2 border-[#16C47F] shrink-0 shadow-[2px_2px_0_#000]">
                      <span className="text-[#16C47F] font-bold text-sm pixel-shadow">P{index + 1}</span>
                    </div>
                    
                    {/* Title - Fixed Height */}
                    <h2 className="text-xl  text-[#16C47F] pixel-shadow line-clamp-2 min-h-14 flex-1 leading-snug">
                      {project.projectName}
                    </h2>
                  </div>

                  {/* Description - Fixed Height */}
                  <p className="text-base text-gray-300 font-bricolage leading-relaxed line-clamp-4 mb-6 flex-1">
                    {project.description}
                  </p>

                  {/* View Requirements Link
                  <a
                    href={project.projectLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-base text-blue-400 hover:text-blue-300 transition-colors font-bold mb-6 group/link"
                  >
                    <FileText className="w-5 h-5" />
                    <span>View Requirements</span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                  </a> */}

                  {/* Action Button - Always at bottom */}
                  <CustomButton
                    title={project.solutions[0]?.isCompleted ? "View Submission" : "Submit Project"}
                  
                    onClick={() => handleSubmit(project)}
                  >
                    {project.solutions[0]?.isCompleted ? "View Submission" : "Submit Project"}
                    <Upload size={16} />
                  </CustomButton>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1a1a1a] mb-4 border-2 border-[#16C47F]">
                <FileText className="w-8 h-8 text-[#16C47F]" />
              </div>
              <p className="text-base text-gray-300 font-bricolage">
                No projects available yet
              </p>
            </div>
          )}
      </div>
    </div>
   </DashboardLayout>
  );
}
