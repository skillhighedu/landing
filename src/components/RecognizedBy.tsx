
import { recognizedPartners } from "@/data/recognized"

export default function RecognizedBy() {
  return (
    <section className="w-full bg-neutral-900 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-white text-3xl font-semibold mb-6">
          We’re Proudly Recognized By
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10">
          {recognizedPartners && recognizedPartners.map((partner) => (
            <img
              key={partner.id}
              src={partner.logo}
              alt={partner.alt}
             className={`h-60  transition duration-300 ease-in-out cursor-pointer`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
