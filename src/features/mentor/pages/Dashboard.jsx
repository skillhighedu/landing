import Header from "@/components/common/Header";
import HeaderSection from "@/components/common/HeaderSection";
import Container from "@/layouts/Container";
import React, { useEffect, useState } from "react";

interface Solution {
  id: string;
  reviewState: string;
}

interface Project {
  id: string;
  projectName: string;
  projectLink: string;
  solutions: Solution[];
}

export default function MentorDashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fakeProjects: Project[] = [
      {
        id: "1",
        projectName: "AI Resume Builder",
        projectLink: "https://example.com/project1",
        solutions: [
          { id: "s1", reviewState: "REVIEWING" },
          { id: "s2", reviewState: "APPROVED" },
        ],
      },
      {
        id: "2",
        projectName: "Realtime Chat Application",
        projectLink: "https://example.com/project2",
        solutions: [
          { id: "s3", reviewState: "REVIEWING" },
          { id: "s4", reviewState: "REVIEWING" },
        ],
      },
      {
        id: "3",
        projectName: "Ecommerce Recommendation Engine",
        projectLink: "https://example.com/project3",
        solutions: [{ id: "s5", reviewState: "APPROVED" }],
      },
      {
        id: "4",
        projectName: "AI Project Idea Generator",
        projectLink: "https://example.com/project4",
        solutions: [],
      },
    ];

    setProjects(fakeProjects);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (

     <Container>
       <HeaderSection title="Projects" />

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-10 w-full max-w-7xl sm:px-0">
        {projects.map((project, index) => {
          const newSolutions = project.solutions?.filter(
            (solution) => solution.reviewState === "REVIEWING"
          ).length;

          return (
            <div
              key={project.id}
              className={`p-5 sm:p-6 text-left rounded-xl shadow-sm hover:shadow-lg transition transform hover:-translate-y-2 border border-gray-100 flex flex-col justify-between
              ${newSolutions > 0 ? "bg-red-100 border-red-400" : "bg-white"}`}
            >
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-900 truncate">
                  <span className="text-primary font-bold mr-2">
                    #{index + 1}.
                  </span>
                  {project.projectName}
                </h2>

                {newSolutions > 0 && (
                  <p className="text-sm sm:text-md text-red-600 font-medium mb-3 sm:mb-4">
                    New {newSolutions}{" "}
                    {newSolutions === 1 ? "Solution" : "Solutions"}
                  </p>
                )}
              </div>

              <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex-1 px-4 py-2 sm:px-5 sm:py-3 bg-primary text-white rounded-lg transition font-medium shadow-sm text-center"
                >
                  View Project
                </a>

                <button
                  className="w-full sm:w-auto flex-1 px-4 py-2 border-1 bg-white border-primary text-primary sm:px-5 sm:py-3 rounded-lg transition font-medium shadow-sm cursor-pointer"
                >
                  Review Solutions
                </button>
              </div>
            </div>
          );
        })}
      </div>
     </Container>

  );
}
