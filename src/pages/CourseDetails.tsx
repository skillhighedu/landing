import AboutCourse from "@/components/AboutCouse"
import BackgroundHook from "@/components/BackgroundHook"
import Certificates from "@/components/Certificates"
import CurriculumAccordion from "@/components/Curriculam"
import { useRef } from "react"
import FAQ from "@/components/FAQ"
import Pricing from "@/components/Pricing"
import Tools from "@/components/Tools"

export default function CourseDetails() {
   const pricingRef = useRef<HTMLDivElement>(null)
  return (
    <>
  <AboutCourse scrollToPricing={() => pricingRef.current?.scrollIntoView({ behavior: 'smooth' })} />
   <CurriculumAccordion/>
   <Tools/>
   <Pricing ref={pricingRef} />
   <Certificates/>
   <FAQ/>
   <BackgroundHook/>
    </>
  )
}
