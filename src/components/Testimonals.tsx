

import  { useState } from "react"

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
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 flex items-center justify-center gap-2">
  Loved by Many
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-6 h-6 text-red-500"
    fill="currentColor"
  >
    <path d="M30.47 8.38H32V16h-1.53Z" />
    <path d="M28.95 16h1.52v3.05h-1.52Z" />
    <path d="M28.95 6.86h1.52v1.52h-1.52Z" />
    <path d="M27.43 19.05h1.52v1.52h-1.52Z" />
    <path d="M27.43 9.9h1.52v3.05h-1.52Z" />
    <path d="M27.43 5.33h1.52v1.53h-1.52Z" />
    <path d="M25.9 8.38h1.53V9.9H25.9Z" />
    <path d="M24.38 20.57h3.05v1.52h-3.05Z" />
    <path d="M22.85 6.86h3.05v1.52h-3.05Z" />
    <path d="M21.33 22.09h3.05v1.53h-3.05Z" />
    <path d="M19.81 3.81h7.62v1.52h-7.62Z" />
    <path d="M18.28 23.62h3.05v1.52h-3.05Z" />
    <path d="M18.28 5.33h1.53v1.53h-1.53Z" />
    <path d="M16.76 25.14h1.52v1.52h-1.52Z" />
    <path d="M16.76 6.86h1.52v1.52h-1.52Z" />
    <path d="M15.24 26.66h1.52v1.53h-1.52Z" />
    <path d="M15.24 8.38h1.52V9.9h-1.52Z" />
    <path d="M13.71 25.14h1.53v1.52h-1.53Z" />
    <path d="M13.71 6.86h1.53v1.52h-1.53Z" />
    <path d="M10.66 23.62h3.05v1.52h-3.05Z" />
    <path d="M12.19 5.33h1.52v1.53h-1.52Z" />
    <path d="M7.62 22.09h3.04v1.53H7.62Z" />
    <path d="M4.57 20.57h3.05v1.52H4.57Z" />
    <path d="M4.57 3.81h7.62v1.52H4.57Z" />
    <path d="M3.05 19.05h1.52v1.52H3.05Z" />
    <path d="M3.05 5.33h1.52v1.53H3.05Z" />
    <path d="M1.52 16h1.53v3.05H1.52Z" />
    <path d="M1.52 6.86h1.53v1.52H1.52Z" />
    <path d="M0 8.38h1.52V16H0Z" />
  </svg>
</h2>

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