import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Header from "./Header"

export default function ScrollTriggered() {
  return (
    <div className="w-full bg-neutral-950 bg-pixel-crt  px-4 sm:px-8 md:px-12 py-20 sm:py-32">
     <div className="text-center space-y-2">
 
  <Header title=" From Beginner to Pro"/>
  <p className="text-neutral-400">
    See how each step takes you closer to mastery.
  </p>
</div>

      <div className="mx-auto max-w-[500px] w-full">
        {food.map(([emoji, des, ], i) => (
          <Card i={i} emoji={emoji} des={des}  key={i} />
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
      <div style={{ ...splash, background }}className=" bg-green-700" />
      <motion.div
        style={card}
        variants={cardVariants}
        className="card bg-neutral-900  text-black text-base sm:text-sm px-4 "
      >
        <div className="bg-green-800 w-10 h-10 rounded-sm text-white mr-40 mb-10 opacity-80 pixel-border items-center justify-center text-2xl "> {i+1}</div>
        <div className="text-4xl mb-4 text-primary">{emoji}</div>
        <p className="text-neutral-100 leading-relaxed text-center">{des}</p>
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

  boxShadow:
    "0 0 1px hsl(0deg 0% 0% / 0.075), 0 0 2px hsl(0deg 0% 0% / 0.075), 0 0 4px hsl(0deg 0% 0% / 0.075), 0 0 8px hsl(0deg 0% 0% / 0.075), 0 0 16px hsl(0deg 0% 0% / 0.075)",
  transformOrigin: "10% 60%",
  textAlign: "center",
  padding: 24,
}

// EdTech timeline content with black splash colors
const food: [string, string][] = [
  ["🎯 Goal Setting", "Decide your learning path: frontend, backend, fullstack, or product."],
  ["📚 Learn Fundamentals", "Master HTML, CSS, JavaScript, Git, and basic problem-solving."],
  ["🛠️ Build Projects", "Apply concepts in real-world projects: dashboards, landing pages, portfolios."],
  ["⚙️ Learn Advanced Tools", "Pick up React, TypeScript, Tailwind, Node.js, and databases like MongoDB."],
  ["🚀 Launch & Grow", "Create your portfolio, apply for jobs, freelance, or start your own venture.",],
]
