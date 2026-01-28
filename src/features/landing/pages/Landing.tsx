import Stat from '../sections/hero/Stat'
import FAQSection from '../sections/faq/FAQSection'
import BookCallSection from '../sections/cta/pages/BookCallSection'
import LearningJourneySection from '../sections/learning-journey/pages/LearningJourneySection'
import TestimonialsSection from '../sections/testimonals/TestimonialsSection'
import BenefitsSection from '../sections/benefits/BenefitsSection'
import CoursesSection from '../sections/courses/CoursesSection'
import ComparisonSection from '../sections/comparison/ComparisonSection'
import CertificatePartnersSection from '../sections/certificate-partners'
import RecognizedBySection from '../sections/recognized-by/RecognizedBySection'
import Hero from '@/components/Hero'
import { MentorsSection } from '../sections/mentors'



export default function Landing() {
  return (
    <>
    <Hero/>
    <CertificatePartnersSection/>
    <RecognizedBySection/>
    <CoursesSection/>

    <BenefitsSection/>
    <ComparisonSection/>
    <LearningJourneySection/>
    <TestimonialsSection/>
    <Stat />
    <FAQSection/>
    <BookCallSection/>
    <MentorsSection/>

    </>
  )
}
