'use client'

import { easeOut, motion } from 'framer-motion'
import {
  Code2,
  Users,
  GraduationCap,
  Briefcase,
  Compass,
  BadgeCheck,
} from 'lucide-react'

import Header from './Header'
const benefits = [
  {
    title: 'Live Project Building',
    description:
      'Work on real-world projects with deadlines, version control, and mentor feedback — just like a real job.',
    icon: Code2,
  },
  {
    title: '1:1 & Group Mentorship',
    description:
      'Get personal guidance in live doubt sessions, code reviews, and roadmap discussions with experts.',
    icon: Users,
  },
  {
    title: 'Active Developer Community',
    description:
      'Join a private Discord with peers, mentors, hiring managers, and ongoing learning challenges.',
    icon: GraduationCap,
  },
  {
    title: 'Job & Internship Support',
    description:
      'We help you prepare with resume reviews, mock interviews, and referrals to top tech companies.',
    icon: Briefcase,
  },
  {
    title: 'Skill-Based Learning Tracks',
    description:
      'Choose your path — frontend, backend, fullstack — and follow structured content curated by working engineers.',
    icon: Compass,
  },
  {
    title: 'Certification & Portfolio Showcase',
    description:
      'Earn verifiable certificates and get a portfolio site to show your work to the world.',
    icon: BadgeCheck,
  },
]



const fade = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: easeOut,
    },
  }),
}

export default function Benefits() {
  return (
    <section className="w-full bg-neutral-950 text-white py-20 px-6 md:px-12">

       
          <div className="text-center space-y-2 mb-6">
         
          <Header title="What You Gain from SkillHigh"/>
          <p className="text-neutral-400">
          What makes Skillhigh more than just another course.
          </p>
        </div>
    

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
     {benefits.map((benefit, i) => {
  const Icon = benefit.icon
  return (
    <motion.div
      key={i}
      custom={i}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fade}
      className="group border border-neutral-800 rounded-2xl p-6 bg-neutral-900 transition-colors hover:bg-neutral-800"
    >
      <div className="flex items-start gap-4">
        <Icon className="text-primary mt-1" size={52} />
        <div>
          <h3 className="text-lg  mb-1">{benefit.title}</h3>
          <p className="text-neutral-400 font-mono text-sm">{benefit.description}</p>
        </div>
      </div>
    </motion.div>
  )
})}

      </div>
    </section>
  )
}
