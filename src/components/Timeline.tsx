import * as motion from "motion/react-client"
import type { Variants } from "motion/react"

import QuestinIcon from './icons/QuestionIcon';
import Target from './icons/Target';
import Header from "./common/Header";


export default function ScrollTriggered() {
  return (

    <div className="w-full relative bg-neutral-900 bg-[radial-gradient(#3d3d3d_1px,transparent_0)] [background-size:12px_12px]  px-4 sm:px-8 md:px-12 py-20 sm:py-32">
      <div className="text-center space-y-2">
        <motion.div
          className="absolute top-10 right-10"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0, rotate: 15 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          viewport={{ once: true }}
        >
          <QuestinIcon className="w-12 h-12 opacity-70" />
        </motion.div>

         <motion.div
        className="absolute bottom-40 left-10"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0, rotate: -10 }}
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        viewport={{ once: true }}
      >
        <Target className="w-12 h-12 opacity-70" />
      </motion.div>
        <Header title=" From Beginner to Pro" subline="   See how each step takes you closer to mastery." />
      
      </div>

      <div className="mx-auto max-w-[500px] w-full">
        {food.map(([emoji, des,], i) => (
          <Card i={i} emoji={emoji} des={des} key={i} />
        ))}
      </div>
    </div>
  )
}

interface CardProps {
  emoji: string
  des: string

  i: number
}

function Card({ emoji, des, i }: CardProps) {
  const background = "linear-gradient(306deg, #000000, #0a0a0a)" // solid black splash

  return (


    <motion.div
      className={`card-container-${i}`}
      style={cardContainer}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.8 }}
    >



      <div style={{ ...splash, background }} className=" bg-green-700" />
      <motion.div
        style={card}
        variants={cardVariants}
        className="card bg-neutral-900  text-black text-base sm:text-sm px-4  pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]"
      >
        <div className="bg-green-800 w-10 h-10 rounded-sm text-white mr-40 mb-10 opacity-80 pixel-border items-center justify-center text-2xl "> {i + 1}</div>
        <div className="text-4xl mb-4 text-primary">{emoji}</div>
        <p className="text-neutral-100 leading-relaxed text-center font-bricolage">{des}</p>
      </motion.div>

      
    </motion.div>
  )
}

const cardVariants: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 50,
    rotate: -10,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
}

const cardContainer: React.CSSProperties = {
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  paddingTop: 20,
  marginBottom: -120,
}

const splash: React.CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  clipPath: `path("M 0 303.5 C 0 292.454 8.995 285.101 20 283.5 L 460 219.5 C 470.085 218.033 480 228.454 480 239.5 L 500 430 C 500 441.046 491.046 450 480 450 L 20 450 C 8.954 450 0 441.046 0 430 Z")`,
}

const card: React.CSSProperties = {
  fontSize: 16,
  width: "100%",
  maxWidth: 320,
  height: 430,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: 20,


  transformOrigin: "10% 60%",
  textAlign: "center",
  padding: 24,
}

// EdTech timeline content with black splash colors
const food: [string, string][] = [
  ["Effortless Enrollment", "Register quickly for your chosen course with our streamlined sign-up process."],
  ["Instant Learning Access","Begin immediately with access to video lessons, projects, and resources."],
  ["Expert-Led Training", "Learn in-demand skills from industry professionals through practical sessions."],
  ["Real-World Projects", "Build expertise with hands-on projects that reflect industry challenges."],
  ["Certification & Career Support", "Earn a recognized certificate and receive placement assistance to advance your career.",],
]
