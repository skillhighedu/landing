import { useEffect, useState } from 'react'

import Hero from '@/components/Hero'
import RecognizedBy from '@/components/RecognizedBy'
import Timeline from '@/components/Timeline'
import { CoursesCarousel } from '@/components/Courses'
import FAQ from '@/components/FAQ'
import Hook from '@/components/Hook'
import SkillsCurtainIntro from '@/components/SkillsCurtainIntro'
import Testimonials from '@/components/Testimonals'
import { Mentors } from '@/components/Mentors'
import Benefits from '@/components/Benifits'


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
          <Hero />
          <RecognizedBy />
          <Benefits/>
          <CoursesCarousel />
          <Timeline />
          <Testimonials/>
          <Mentors/>
          <FAQ />
          <Hook />
        </>
      )}
    </>
  )
}
