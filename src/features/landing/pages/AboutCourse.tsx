import { useRef } from "react";

import CoursePage from "../sections/course-details/pages/CourseDetails";
import Certificates from "../sections/certificates/certifcates";
import Curriculum from "../sections/curriculum";
import Tools from "../sections/tools/tools";
import MentorCall from "../sections/mentors-call/MentorCall";
import Footer from "@/components/common/Footer";
import Pricings from "../sections/pricings";
import { useParams } from "react-router-dom";
import DemoDashboardSection from "../sections/demodashboard/DemoDashboard";

export default function AboutCourse() {
  // ✅ CREATE REF HERE (PARENT)
  const pricingRef = useRef<HTMLDivElement>(null);
  const { courseSlug } = useParams<{ courseSlug: string }>();
 
  // ✅ SCROLL FUNCTION
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const demoRef = useRef<HTMLDivElement>(null);

const scrollToDemo = () => {
  demoRef.current?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

  return (
    <>
      {/* 👇 pass scroll function */}
      <CoursePage courseSlug={courseSlug!} scrollToPricing={scrollToPricing} scrollToDemo={scrollToDemo} />

      <Curriculum />
      <DemoDashboardSection ref={demoRef} courseSlug={courseSlug!}/>
      <Tools />

      {/* 👇 pass ref to Pricing */}
      <Pricings ref={pricingRef} />

      <Certificates />
      <MentorCall />
      <Footer />
    </>
  );
}
