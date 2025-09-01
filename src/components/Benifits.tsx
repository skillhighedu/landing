'use client'

import { easeOut, motion, type Variants } from 'framer-motion'
import {
  Code2,
  Users,
  GraduationCap,
  Briefcase,
  Compass,
  BadgeCheck,
} from 'lucide-react'

import Header from './Header'
import { DotPatternLinearGradient } from './ui/DotBg'

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: easeOut,
    },
  }),
}

export default function Benefits() {
  return (
    <section className="relative w-full bg-neutral-950 text-white py-20 px-6 md:px-12 overflow-hidden">
      <DotPatternLinearGradient />

      <div className="relative z-10 text-center space-y-2 mb-12">
        <Header
          title="What You Gain from SkillHigh"
          subline='  What makes Skillhigh more than just another course.'
        
        />
     
      </div>

      <motion.div
        className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        {benefits.map((benefit, i) => {
          const Icon = benefit.icon
          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              className="group relative pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] rounded-2xl p-6 bg-neutral-900 transition-colors hover:bg-neutral-800 overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.03 }}
            >
              {/* Smooth floating icon */}
              <motion.div
                initial={{ y: 0 }}
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="absolute -top-3 -left-3 bg-primary/10 p-4 rounded-full shadow-lg"
              >
                <Icon className="text-[#16C47F]" size={40} />
              </motion.div>

              {/* Content */}
              <div className="pl-14 pt-4">
                <h3 className="text-lg mb-2 font-semibold">{benefit.title}</h3>
                <p className="text-neutral-400 font-bricolage text-sm">{benefit.description}</p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
