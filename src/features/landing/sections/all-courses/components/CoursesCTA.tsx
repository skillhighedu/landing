import BookingModal from "@/components/common/BookingModal";
import { Calendar } from "lucide-react";

export default function CoursesCTA() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4">
      <div className="relative max-w-5xl w-full rounded-2xl bg-neutral-900/70 border border-white/10 px-8 py-16 text-center backdrop-blur-md transition-all duration-300 hover:scale-[1.01]">
        
        {/* subtle glow */}
        <div className="absolute inset-0 -z-10 rounded-2xl bg-linear-to-br from-primary-500 via-transparent to-primary-500/10" />

        <h3 className="text-3xl sm:text-4xl  text-white leading-normal">
          Confused about what to learn next?
        </h3>

        <p className="mt-4 mx-auto max-w-md text-gray-400 text-base sm:text-lg">
          Talk to an expert for just 15 minutes and walk away with a clear learning direction.
        </p>

        <div className="mt-8 flex justify-center">
          <BookingModal title="Book a Free Clarity Call" icon={<Calendar />} />
        </div>
      </div>
    </section>
  );
}
