import { useEffect, useRef } from "react";

import CoursePage from "../sections/course-details/pages/CourseDetails";
import Certificates from "../sections/certificates/certifcates";
import Curriculum from "../sections/curriculum";
import Tools from "../sections/tools/tools";
import MentorCall from "../sections/mentors-call/MentorCall";
import Footer from "@/components/common/Footer";
import Pricings from "../sections/pricings";
import { useLocation, useParams } from "react-router-dom";
import DemoDashboardSection from "../sections/demodashboard/DemoDashboard";

export default function AboutCourse() {
  // CREATE REF HERE (PARENT)
  const pricingRef = useRef<HTMLDivElement>(null);
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const location = useLocation();
 
  // SCROLL FUNCTION
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

  useEffect(() => {
    if (location.state?.scrollTo !== "pricing") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      scrollToPricing();
    }, 250);

    return () => window.clearTimeout(timeoutId);
  }, [location.state]);

  return (
    <>
    
      <CoursePage courseSlug={courseSlug!} scrollToPricing={scrollToPricing} scrollToDemo={scrollToDemo} />

      <Curriculum />
      <DemoDashboardSection ref={demoRef} courseSlug={courseSlug!}/>
      <Tools />

    
      <Pricings ref={pricingRef} />

      <Certificates />
      <MentorCall />
      <Footer />
    </>
  );
}
