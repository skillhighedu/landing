import AboutCourse from "@/components/AboutCouse"
import Trees from "@/assets/images/bg.jpg";
import Certificates from "@/components/Certificates"
import CurriculumAccordion from "@/components/Curriculam"
import { useRef } from "react"
import FAQ from "@/components/FAQ"
import Pricing from "@/components/Pricing"
// import Tools from "@/components/Tools"
import { useEffect } from "react"
import Form from "@/components/Form"
import { useParams } from "react-router-dom";
import {certificates} from "@/data/certifcates";
export default function CourseDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const pricingRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <AboutCourse scrollToPricing={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })} courseSlug={courseSlug ?? ""} />
      <CurriculumAccordion />
      {/* <Tools /> */}
      <Pricing ref={pricingRef} courseSlug={courseSlug ?? ""} />
      <Certificates certificates={certificates} />
      <FAQ />
      <Form backgroundImage={Trees} />
    </>
  )
}
