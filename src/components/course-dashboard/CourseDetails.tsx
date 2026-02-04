import { useRef, useEffect } from "react"
import { useParams, useLocation } from "react-router-dom"
import AboutCourse from "@/components/AboutCouse"
import Trees from "@/assets/images/bg.jpg";
import Certificates from "@/components/Certificates"
import CurriculumAccordion from "@/components/Curriculam"
import FAQ from "@/components/FAQ"
import Pricing from "@/components/Pricing"
import Form from "@/components/Form"
// import { certificates } from "@/data/certifcates";
import Tools from "@/features/landing/components/Tools";
import { useSelectedCourseStore } from "@/store/useSelectedCourse";
import MentorsCall from "@/components/MentorsCall";
export default function CourseDetails() {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const location = useLocation();
  const pricingRef = useRef<HTMLDivElement>(null);
  const { selectedCourseTools } = useSelectedCourseStore();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    if (location.state?.scrollTo === "pricing") {
      pricingRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location.state]);

  return (
    <>
      <AboutCourse
        scrollToPricing={() =>
          pricingRef.current?.scrollIntoView({ behavior: "smooth" })
        }
        courseSlug={courseSlug ?? ""}
      />
      <CurriculumAccordion />
      <Tools courseTools={selectedCourseTools ?? []} />
      <Pricing ref={pricingRef} courseSlug={courseSlug ?? ""}  autoOpenPayment={location.state?.openPayment} />
      {/* <Certificates certificates={certificates} /> */}
      <FAQ />
      <MentorsCall/>
      <Form backgroundImage={Trees} />
    </>
  );
}
 