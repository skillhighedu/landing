

import  { useState } from "react"
import Header from "./Header"

const testimonials = [
  {
    name: "Arjun, Frontend Knight",
    feedback:
      "The training sharpened my UI skills like a katana. Clean code, sleek animations — battle-ready frontend warrior now.",
  },
  {
    name: "Meera, Backend Sorceress",
    feedback:
      "This course awakened my Prisma powers. My APIs are faster than arrows now.",
  },
  {
    name: "Ravi, DevOps Monk",
    feedback:
      "CI/CD and Docker are no longer mysteries. Deployment is now my daily kata.",
  },
  {
    name: "Tanvi, Fullstack Ronin",
    feedback:
      "Mastered the art of frontend and backend together. Dual-wielding React and Node with ease.",
  },
]

export default function Testimonials() {
  const [paused, setPaused] = useState(false)

  return (
    <section className="bg-neutral-900 py-20 px-4 text-white">
      <div className="max-w-5xl mx-auto text-center">
        <Header title="Loved by Many"/>
      

        <p className="text-lg sm:text-xl text-gray-300 font-mono mb-12">
        Their journey wasn’t easy. But the Right Skills made all the difference.
        </p>

        <div className="flex flex-row gap-4">
          {/* Left Row: Scrolls Up */}
          <div
            className="overflow-hidden h-[500px] w-1/2 relative "
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={`flex flex-col gap-3 ${
                paused ? "animate-none" : "animate-scroll-up"
              }`}
              style={{
                animationDuration: `${testimonials.length * 3}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={`up-${index}`}
                  className="flex-shrink-0 h-[220px] bg-neutral-800 flex items-center justify-center  text-white rounded-xl px-6 py-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
                    <p className="text-sm text-gray-100">{t.feedback}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {testimonials.map((t, index) => (
                <div
                  key={`up-dup-${index}`}
                  className="flex-shrink-0 h-[220px] bg-neutral-800 flex items-center justify-center text-white rounded-xl px-6 py-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
                    <p className="text-sm text-gray-100">{t.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Row: Scrolls Down */}
          <div
            className="overflow-hidden h-[500px] w-1/2 relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <div
              className={`flex flex-col gap-3 ${
                paused ? "animate-none" : "animate-scroll-down"
              }`}
              style={{
                animationDuration: `${testimonials.length * 3}s`,
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
              }}
            >
              {testimonials.map((t, index) => (
                <div
                  key={`down-${index}`}
                  className="flex-shrink-0 h-[220px] bg-neutral-800 flex items-center justify-center text-white rounded-xl px-6 py-4"
                >
                  <div>
                    <h3 className="text-lg  mb-2">{t.name}</h3>
                    <p className="text-sm text-gray-100">{t.feedback}</p>
                  </div>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {testimonials.map((t, index) => (
                <div
                  key={`down-dup-${index}`}
                  className="flex-shrink-0 h-[220px] bg-neutral-800 flex items-center justify-center text-white rounded-xl px-6 py-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{t.name}</h3>
                    <p className="text-sm text-gray-100">{t.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

   
    </section>
  )
}