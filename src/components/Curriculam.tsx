import CurriculumSection from "./CurriculamSection";
import { curriculum } from "@/data/curriculam";

export default function CurriculumAccordion() {
  return (
    <section className=" mx-auto p-6 bg-neutral-950 w-full">
      <h2 className="text-3xl text-white text-center mb-8">
       Learn by Doing: The Hands-On Curriculum
      </h2>

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
