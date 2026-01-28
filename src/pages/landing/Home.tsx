import { useEffect, useState } from 'react'
import Trees from "@/assets/images/water.jpg";
import Hero from '@/components/Hero'
import RecognizedBy from '@/features/landing/components/RecognizedBy'
import Timeline from '@/components/Timeline'
import { CoursesCarousel } from '@/components/Courses'

import SkillsCurtainIntro from '@/components/SkillsCurtainIntro'
import Testimonials from '@/features/landing/components/Testimonals'
import { Mentors } from '@/components/Mentors'
import Benefits from '@/components/Benifits'

import CertificatePartners from '@/components/CertificatePartners'

import Form from '@/components/Form'
import { Landing } from '@/features/landing';



const INTRO_EXPIRY_MINUTES = 15

function hasIntroExpired(): boolean {
  const timestamp = localStorage.getItem('introTimestamp')
  if (!timestamp) return true

  const diff = Date.now() - new Date(timestamp).getTime()
  return diff > INTRO_EXPIRY_MINUTES * 60 * 1000
}

export default function Home() {
  const [showMain, setShowMain] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const introShown = localStorage.getItem('introShown')
    const expired = hasIntroExpired()

    if (introShown && !expired) {
      setShowMain(true)
    } else {
      // Expired or not set — clear old data
      localStorage.removeItem('introShown')
      localStorage.removeItem('introTimestamp')
    }
  }, [])

  const handleIntroFinish = () => {
    localStorage.setItem('introShown', 'true')
    localStorage.setItem('introTimestamp', new Date().toISOString())
    setShowMain(true)
  }

  return (
    <>
      {!showMain && <SkillsCurtainIntro onFinish={handleIntroFinish} />}
      {showMain && (
        <>
          {/* <Hero /> */}
          {/* <CertificatePartners />
          <RecognizedBy /> */}

          {/* <Benefits /> */}
          {/* <CoursesCarousel /> */}
          {/* <Timeline /> */}
          {/* <Testimonials /> */}
          <Landing />

     

         
          <Form backgroundImage={Trees} />
        </>
      )}
    </>
  )
}
