
import { Counter } from "./ui/Counter"
import { GridPatternDashed } from "./ui/DashedStroke"

const stats = [
  { label: 'Learners', value: 5, suffix: 'K+', color: 'text-red-400' },
  { label: 'Live Projects', value: 50, suffix: '+', color: 'text-green-400' },
  { label: 'Mentors', value: 20, suffix: '+', color: 'text-blue-400' },
  { label: 'Hours of Content', value: 1000, suffix: '+', color: 'text-pink-400' },
]



export default function Stat() {
  return (
    <section className="w-full relative py-20 bg-neutral-950 text-white">
      <GridPatternDashed/>
      <div className=" relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       <div className="text-center text-sm sm:text-xl text-neutral-400 mb-8  border border-neutral-800 rounded-xl px-4 py-2 inline-block bg-neutral-900 shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000] transition-shadow">
  Join our Skillhigh community
</div>

        <div className=" relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className=" relative bg-neutral-900 rounded-2xl py-6 px-4 border border-neutral-800 pixel-border shadow-[4px_4px_0_#000] hover:shadow-[6px_6px_0_#000]">
              <Counter to={stat.value} suffix={stat.suffix} color={stat.color} />

              <div className="text-sm text-neutral-400 mt-1 font-bricolage">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
