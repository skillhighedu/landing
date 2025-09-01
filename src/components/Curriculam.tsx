import CurriculumSection from "./CurriculamSection";

import Header from "./Header";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";

export default function CurriculumAccordion() {
  const { selectedCourse } = useSelectedCourseStore()
  console.log(selectedCourse)
  return (
    <section className=" bg-pixel-crt mx-auto flex flex-col items-center justify-center p-6 bg-neutral-950  w-full">
      
      <Header title="   Learn by Doing: The Hands-On Curriculum" subline="  Learn faster by doing — every concept is taught through practical application."/>
       
      {selectedCourse && selectedCourse.modules.map((section, idx) => (
        <CurriculumSection
          key={idx}
          sectionTitle={section.moduleName}
          topics={section.contents}
        />
      ))}
    </section>
  );
}
