import CurriculumSection from "./CurriculamSection";
import { curriculum } from "@/data/curriculam";
import Header from "./Header";

export default function CurriculumAccordion() {
  return (
    <section className=" bg-pixel-crt mx-auto flex flex-col items-center justify-center p-6 bg-neutral-950  w-full">
      
      <Header title="   Learn by Doing: The Hands-On Curriculum"/>
        <p className="text-neutral-400 text-md mb-3 text-center font-mono">
        Learn faster by doing — every concept is taught through practical application.
          </p>
      {curriculum.map((section, idx) => (
        <CurriculumSection
          key={idx}
          sectionTitle={section.sectionTitle}
          topics={section.topics}
        />
      ))}
    </section>
  );
}
