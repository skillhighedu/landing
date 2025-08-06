import CurriculumSection from "./CurriculamSection";
import { curriculum } from "@/data/curriculam";
import Header from "./Header";

export default function CurriculumAccordion() {
  return (
    <section className=" bg-pixel-crt mx-auto flex flex-col items-center justify-center p-6 bg-neutral-950  w-full">
      
      <Header title="   Learn by Doing: The Hands-On Curriculum"/>

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
