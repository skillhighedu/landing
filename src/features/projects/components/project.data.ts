import type { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    id: "p1",
    projectName: "Build a Todo App",
    projectLink: null,
    locked: false,

    difficulty: "Easy",
    description: "Create a full CRUD todo app using React with proper state management.",
    skills: ["React", "State", "UI"],
    time: "45 mins",
  },
  {
    id: "p2",
    projectName: "REST API with Node",
    projectLink: null,
    locked: false,

    difficulty: "Medium",
    description: "Build a REST API with authentication and database integration.",
    skills: ["Node", "Express", "MongoDB"],
    time: "90 mins",
  },
  {
    id: "p3",
    projectName: "Job Board Platform",
    projectLink: null,
    locked: true,

    difficulty: "Hard",
    description: "Design and implement a job board with recruiters, applicants and admin panel.",
    skills: ["Full Stack", "Auth", "DB"],
    time: "3 hours",
  },
];
