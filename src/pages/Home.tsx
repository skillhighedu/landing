import Hero from '@/components/Hero'

import Footer from '@/components/Footer'
import {CoursesCarousel} from '@/components/Courses'
import {CarouselPlugin} from "@/components/Partners"
import RecognizedBy from '@/components/RecognizedBy'
import Timeline from '@/components/Timeline'
import Hook from '@/components/Hook'
export default function Home() {
  return (
    <>
      <Hero />
      <CarouselPlugin/>
      <RecognizedBy/>
      <Timeline/>
      
      <CoursesCarousel/>
      <Hook/>
      <Footer />
    </>
  )
}
